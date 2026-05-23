import { useAuthStore } from '../stores/auth'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

let isRefreshing = false
let pendingRequests: Array<(token: string) => void> = []

async function refreshAccessToken(): Promise<string | null> {
  const auth = useAuthStore()
  if (!auth.refreshToken) return null

  try {
    const response = await fetch(`${BACKEND_URL}/api/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: auth.refreshToken }),
    })

    if (!response.ok) {
      auth.logout()
      return null
    }

    const data = await response.json()
    auth.accessToken = data.access
    localStorage.setItem('accessToken', data.access)
    return data.access
  } catch {
    auth.logout()
    return null
  }
}

export async function apiFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const auth = useAuthStore()
  const token = auth.accessToken

  const headers = new Headers(options.headers || {})
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  let response = await fetch(url, { ...options, headers })

  if (response.status === 401 || response.status === 403) {
    if (!isRefreshing) {
      isRefreshing = true
      const newToken = await refreshAccessToken()
      isRefreshing = false

      if (newToken) {
        headers.set('Authorization', `Bearer ${newToken}`)
        response = await fetch(url, { ...options, headers })
        pendingRequests.forEach((cb) => cb(newToken))
        pendingRequests = []
      }
    } else {
      const newToken = await new Promise<string | null>((resolve) => {
        pendingRequests.push((token: string) => resolve(token))
      })
      if (newToken) {
        headers.set('Authorization', `Bearer ${newToken}`)
        response = await fetch(url, { ...options, headers })
      }
    }
  }

  return response
}
