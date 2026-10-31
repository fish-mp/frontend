import { validateLegalConsent, type ConsentValue } from '../utils/legal'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { apiFetch } from '../utils/api'
import { useAuthStore } from './auth'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export interface CartItemResponse {
  id: number
  product: {
    id: string
    name: string
    price: number
    main_image?: { image: string }
    image?: string
    category?: { name: string; parent_name?: string | null }
    category_name?: string
  }
  quantity: number
  total_price?: number
}

interface CartResponse {
  id: number
  items: CartItemResponse[]
  total_cart_price: string
}

export interface OrderPayload {
  email: string
  phone: string
  delivery_method: 'pickup' | 'delivery'
  city: string
  street: string
  house: string
  apartment?: string
  postal_code?: string
  beyond_mkad: boolean
  offer_accepted: boolean
  privacy_consent?: ConsentValue
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItemResponse[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
    const itemsCount = computed(() => {
      return items.value.reduce((total, item) => {
        return total + Number(item.quantity || 0)
      }, 0)
    })

  const fetchCart = async () => {
    const revision = useAuthStore().sessionRevision
    loading.value = true
    error.value = null
    try {
      const response = await apiFetch(`${BACKEND_URL}/api/cart/`)

      if (!response.ok) {
        if (response.status === 401) {
          items.value = []
          return
        }
        throw new Error('Не удалось загрузить корзину')
      }

      const data: CartResponse = await response.json()
      if (revision !== useAuthStore().sessionRevision) return
      
      if (data && Array.isArray(data.items)) {
        items.value = data.items
      } else {
        items.value = []
      }

    } catch (err: any) {
      if (revision !== useAuthStore().sessionRevision) return
      console.error('Fetch cart error:', err)
      error.value = err.message
      items.value = []
    } finally {
      if (revision === useAuthStore().sessionRevision) loading.value = false
    }
  }

  const addToCart = async (productId: string | number, quantity: number = 1) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiFetch(`${BACKEND_URL}/api/cart-items/`, {
        method: 'POST',
        body: JSON.stringify({ product_id: productId, quantity })
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.detail || 'Ошибка добавления в корзину')
      }

      // После успешного добавления обновляем состояние корзины с сервера
      await fetchCart()
      
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiFetch(`${BACKEND_URL}/api/cart-items/${cartItemId}/`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity })
      })
      if (!response.ok) throw new Error('Не удалось обновить количество')
      await fetchCart()
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const removeFromCart = async (cartItemId: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiFetch(`${BACKEND_URL}/api/cart-items/${cartItemId}/`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Не удалось удалить товар')
      await fetchCart()
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearCart = async () => {
    for (const item of items.value) {
      await removeFromCart(item.id)
    }
  }

  const createOrder = async (payload: OrderPayload) => {
    const auth = useAuthStore()
    const revision = auth.sessionRevision
    loading.value = true
    error.value = null
    try {
      await validateLegalConsent('checkout', payload.privacy_consent)
      const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify({
        payload, items: items.value.map(i => [i.product.id, i.quantity]),
      })))
      const fingerprint = Array.from(new Uint8Array(bytes)).map(n => n.toString(16).padStart(2, '0')).join('')
      if (revision !== auth.sessionRevision) throw new Error('Аккаунт изменился. Повторите оформление.')
      let attempt: { owner: string; fingerprint: string; key: string } | null = null
      try { attempt = JSON.parse(localStorage.getItem('checkout_attempt') || 'null') } catch { /* Start a new attempt. */ }
      if (!attempt || attempt.owner !== auth.user?.email || attempt.fingerprint !== fingerprint) {
        attempt = { owner: auth.user?.email || '', fingerprint, key: crypto.randomUUID() }
        localStorage.setItem('checkout_attempt', JSON.stringify(attempt))
      }
      const response = await apiFetch(`${BACKEND_URL}/api/orders/`, {
        method: 'POST', headers: { 'Idempotency-Key': attempt.key }, body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (revision !== auth.sessionRevision) throw new Error('Аккаунт изменился. Проверьте заказы после входа.')
      if (data.order_id) localStorage.setItem('last_order_id', String(data.order_id))
      if (!response.ok) throw new Error(data.error || data.detail || Object.values(data).flat().join(' ') || 'Не удалось оформить заказ')
      // The basket is changed only after confirmed payment on the server.
      return data
    } catch (err: any) {
      if (revision === auth.sessionRevision) error.value = err.message
      throw err
    } finally {
      if (revision === auth.sessionRevision) loading.value = false
    }
  }

  const totalItems = () => items.value.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = () =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const resetCart = () => {
    items.value = []
    loading.value = false
    error.value = null
  }

  return {
    items,
    loading,
    error,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    createOrder,
    totalItems,
    totalPrice,
    itemsCount,
    resetCart
  }
})
