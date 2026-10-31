import assert from 'node:assert/strict'
import { before, after, beforeEach, test } from 'node:test'
import { createServer } from 'vite'
import { createPinia, setActivePinia } from 'pinia'

const originalFetch = globalThis.fetch
const storage = new Map()
globalThis.localStorage = {
  getItem: key => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, String(value)),
  removeItem: key => storage.delete(key),
}
let server, useAuthStore, useCartStore, useFavoritesStore, apiFetch

before(async () => {
  server = await createServer({ configFile: false,
    server: { middlewareMode: true },
    define: { 'import.meta.env.VITE_BACKEND_URL': JSON.stringify('http://api.test') },
  })
  ;({ useAuthStore } = await server.ssrLoadModule('/src/stores/auth.ts'))
  ;({ useCartStore } = await server.ssrLoadModule('/src/stores/cart.ts'))
  ;({ useFavoritesStore } = await server.ssrLoadModule('/src/stores/favorites.ts'))
  ;({ apiFetch } = await server.ssrLoadModule('/src/utils/api.ts'))
})
after(async () => { globalThis.fetch = originalFetch; await server.close() })
beforeEach(() => { storage.clear(); setActivePinia(createPinia()) })

function session() {
  const auth = useAuthStore()
  auth.accessToken = 'old-access'
  auth.refreshToken = 'old-refresh'
  auth.isAuthenticated = true
  localStorage.setItem('accessToken', auth.accessToken)
  localStorage.setItem('refreshToken', auth.refreshToken)
  return auth
}
const json = (body, status = 200) => new Response(JSON.stringify(body), { status })
const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

test('concurrent expired requests share a refresh and persist rotation', async () => {
  const auth = session()
  let refreshes = 0
  globalThis.fetch = async (url, options) => {
    assert.equal(options.credentials, 'omit')
    if (url.endsWith('/refresh/')) {
      refreshes++
      await pause(20)
      return json({ access: 'new-access', refresh: 'new-refresh' })
    }
    return json({}, options.headers.get('Authorization') === 'Bearer old-access' ? 401 : 200)
  }
  const result = await Promise.all([apiFetch('http://api.test/first'), apiFetch('http://api.test/second')])
  assert.deepEqual(result.map(r => r.status), [200, 200])
  assert.equal(refreshes, 1)
  assert.equal(auth.refreshToken, 'new-refresh')
  assert.equal(localStorage.getItem('refreshToken'), 'new-refresh')
})

test('failed refresh settles every waiter and clears private state', async () => {
  const auth = session()
  useCartStore().items = [{ id: 1, product: { id: 'p1', name: 'Private', price: 1 }, quantity: 1 }]
  globalThis.fetch = async url => { if (url.endsWith('/refresh/')) await pause(20); return json({}, 401) }
  const result = await Promise.race([
    Promise.allSettled([apiFetch('http://api.test/first'), apiFetch('http://api.test/second')]),
    pause(1000).then(() => 'timeout'),
  ])
  assert.notEqual(result, 'timeout')
  assert.equal(result.length, 2)
  assert.equal(auth.isAuthenticated, false)
  assert.deepEqual(useCartStore().items, [])
})

test('logout clears private state and ignores a late cart response', async () => {
  const auth = session(), cart = useCartStore(), favorites = useFavoritesStore()
  favorites.favorites = [{ id: 1, product: { id: 'p1' } }]
  const revoked = []
  globalThis.fetch = async (url, options) => {
    if (url.endsWith('/logout/')) { revoked.push(JSON.parse(options.body).refresh); return new Response(null, { status: 204 }) }
    await pause(50)
    return json({ items: [{ id: 1, product: { id: 'private', price: 1 }, quantity: 1 }] })
  }
  const pending = cart.fetchCart()
  await pause(10)
  await auth.logout()
  await pending
  assert.equal(auth.isAuthenticated, false)
  assert.deepEqual(cart.items, [])
  assert.deepEqual(favorites.favorites, [])
  assert.equal(localStorage.getItem('refreshToken'), null)
  assert.deepEqual(revoked, ['old-refresh'])
})

test('late refresh after logout is revoked and cannot restore authentication', async () => {
  const auth = session(), revoked = []
  globalThis.fetch = async (url, options) => {
    if (url.endsWith('/logout/')) { revoked.push(JSON.parse(options.body).refresh); return new Response(null, { status: 204 }) }
    await pause(50)
    return json({ access: 'late-access', refresh: 'late-refresh' })
  }
  const pending = auth.refresh()
  await pause(10)
  await auth.logout()
  assert.equal(await pending, null)
  assert.equal(auth.refreshToken, null)
  assert.deepEqual(revoked, ['old-refresh', 'late-refresh'])
})

test('a permission denial does not rotate tokens', async () => {
  session()
  let calls = 0
  globalThis.fetch = async () => { calls++; return json({}, 403) }
  assert.equal((await apiFetch('http://api.test/forbidden')).status, 403)
  assert.equal(calls, 1)
})


test('checkout retry keeps its idempotency key and preserves the basket until payment', async () => {
  const auth = session()
  auth.user = { email: 'buyer@example.com', first_name: 'Buyer', city: 'Moscow', age: 25 }
  const cart = useCartStore()
  cart.items = [{ id: 1, product: { id: 'plant', name: 'Plant', price: 100 }, quantity: 1 }]
  const keys = []
  globalThis.fetch = async (url, options) => {
    if (url.includes('/api/legal/documents/')) return json({ ready: false, documents: [], consent_purposes: [] })
    if (url.endsWith('/api/orders/')) {
      keys.push(new Headers(options.headers).get('Idempotency-Key'))
      return keys.length === 1 ? json({ error: 'Payment status is unknown', order_id: 7 }, 502)
        : json({ order_id: 7, status: 'pending', confirmation_url: 'https://example.com/pay' }, 201)
    }
    throw new Error('Unexpected request: ' + url)
  }
  const payload = { email: 'buyer@example.com', phone: '+79991234567', delivery_method: 'pickup',
    city: '', street: '', house: '', beyond_mkad: false, offer_accepted: true }
  await assert.rejects(cart.createOrder(payload), /unknown/)
  assert.equal(localStorage.getItem('last_order_id'), '7')
  assert.equal(cart.items.length, 1)
  await cart.createOrder(payload)
  assert.equal(keys[0], keys[1])
  assert(keys[0])
  assert.equal(cart.items.length, 1)
  assert(!localStorage.getItem('checkout_attempt').includes(payload.phone))
})

test('a late checkout response after logout cannot restore another account order', async () => {
  const auth = session()
  auth.user = { email: 'buyer@example.com', first_name: 'Buyer', city: 'Moscow', age: 25 }
  const cart = useCartStore()
  cart.items = [{ id: 1, product: { id: 'plant', name: 'Plant', price: 100 }, quantity: 1 }]
  let started
  const requestStarted = new Promise(resolve => { started = resolve })
  globalThis.fetch = async (url) => {
    if (url.includes('/api/legal/documents/')) return json({ ready: false, documents: [], consent_purposes: [] })
    if (url.endsWith('/api/orders/')) { started(); await pause(50); return json({ order_id: 9, confirmation_url: 'https://example.com/pay' }, 201) }
    if (url.endsWith('/logout/')) return new Response(null, { status: 204 })
    throw new Error('Unexpected request: ' + url)
  }
  const creating = cart.createOrder({ email: 'buyer@example.com', phone: '+79991234567',
    delivery_method: 'pickup', city: '', street: '', house: '', beyond_mkad: false, offer_accepted: true })
  await requestStarted
  await auth.logout()
  await assert.rejects(creating)
  assert.equal(localStorage.getItem('last_order_id'), null)
  assert.equal(localStorage.getItem('checkout_attempt'), null)
  assert.equal(auth.isAuthenticated, false)
})
