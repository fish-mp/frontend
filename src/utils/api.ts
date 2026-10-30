import { useAuthStore } from '../stores/auth'

export async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const auth = useAuthStore()
  const revision = auth.sessionRevision
  const sentToken = auth.accessToken
  const headers = new Headers(options.headers)
  if (sentToken) headers.set('Authorization', `Bearer ${sentToken}`)
  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  const request = () => fetch(url, { ...options, credentials: 'omit', headers })
  let response = await request()
  if (revision !== auth.sessionRevision) throw new Error('Сессия изменилась.')
  if (response.status === 401 && auth.refreshToken) {
    // One shared promise in the auth store settles all waiters, including on
    // failure. A late 401 may belong to a token already replaced by a refresh.
    const token = auth.accessToken !== sentToken ? auth.accessToken : await auth.refresh()
    if (revision !== auth.sessionRevision) throw new Error('Сессия изменилась.')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
      response = await request()
    }
  }
  if (revision !== auth.sessionRevision) throw new Error('Сессия изменилась.')
  return response
}
