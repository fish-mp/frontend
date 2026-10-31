import type { ConsentValue } from '../utils/legal'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useCartStore } from './cart'
import { useFavoritesStore } from './favorites'

interface User {
  email: string
  first_name: string
  city: string
  age: number
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

async function responseError(response: Response, fallback: string) {
  const data = await response.json().catch(() => ({}))
  return new Error(data.detail || Object.values(data).flat().join(' ') || fallback)
}

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const sessionRevision = ref(0)
  const hasTokens = computed(() => !!accessToken.value && !!refreshToken.value)
  let refreshPromise: Promise<string | null> | null = null

  const clearSession = () => {
    sessionRevision.value++
    refreshPromise = null
    isAuthenticated.value = false
    user.value = null
    accessToken.value = null
    refreshToken.value = null
    for (const key of ['accessToken', 'refreshToken', 'userData', 'last_order_id', 'checkout_attempt']) localStorage.removeItem(key)
    useCartStore().resetCart()
    useFavoritesStore().resetFavorites()
  }

  const saveTokens = (tokens: { access: string; refresh?: string }) => {
    accessToken.value = tokens.access
    localStorage.setItem('accessToken', tokens.access)
    if (tokens.refresh) {
      refreshToken.value = tokens.refresh
      localStorage.setItem('refreshToken', tokens.refresh)
    }
  }

  const revokeRefresh = async (token: string) => {
    const response = await fetch(`${BACKEND_URL}/api/users/logout/`, {
      method: 'POST', credentials: 'omit',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: token }),
    })
    if (!response.ok) throw new Error('Не удалось завершить сессию на сервере.')
  }

  const logout = async () => {
    const token = refreshToken.value
    clearSession()
    if (token) await revokeRefresh(token)
  }

  const refresh = (): Promise<string | null> => {
    if (refreshPromise) return refreshPromise
    const token = refreshToken.value
    if (!token) return Promise.resolve(null)
    const revision = sessionRevision.value
    const pending = (async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/token/refresh/`, {
          method: 'POST', credentials: 'omit',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh: token }),
        })
        if (!response.ok) {
          if (revision === sessionRevision.value) clearSession()
          return null
        }
        const data = await response.json()
        if (revision !== sessionRevision.value || refreshToken.value !== token) {
          // A logout/account switch happened while rotation was in flight.
          if (data.refresh) await revokeRefresh(data.refresh)
          return null
        }
        saveTokens(data)
        return data.access as string
      } catch {
        if (revision === sessionRevision.value) clearSession()
        return null
      }
    })()
    refreshPromise = pending
    void pending.finally(() => { if (refreshPromise === pending) refreshPromise = null })
    return pending
  }

  const checkAuth = async () => {
    const revision = sessionRevision.value
    try {
      let response = await fetch(`${BACKEND_URL}/api/users/me/`, {
        credentials: 'omit', headers: { Authorization: `Bearer ${accessToken.value}` },
      })
      if (response.status === 401 && await refresh()) {
        response = await fetch(`${BACKEND_URL}/api/users/me/`, {
          credentials: 'omit', headers: { Authorization: `Bearer ${accessToken.value}` },
        })
      }
      if (revision !== sessionRevision.value) return false
      if (!response.ok) {
        clearSession()
        return false
      }
      const profile = await response.json()
      if (revision !== sessionRevision.value) return false
      user.value = profile
      isAuthenticated.value = true
      localStorage.setItem('userData', JSON.stringify(profile))
      return true
    } catch {
      if (revision === sessionRevision.value) clearSession()
      return false
    }
  }

  const initAuth = async () => {
    const access = localStorage.getItem('accessToken')
    const refresh = localStorage.getItem('refreshToken')
    if (access && refresh) {
      sessionRevision.value++
      isAuthenticated.value = false
      user.value = null
      useCartStore().resetCart()
      useFavoritesStore().resetFavorites()
      saveTokens({ access, refresh })
      await checkAuth()
    } else {
      clearSession()
    }
  }

  const login = async (credentials: { email: string; password: string }) => {
    clearSession()
    const revision = sessionRevision.value
    const response = await fetch(`${BACKEND_URL}/api/token/`, {
      method: 'POST', credentials: 'omit',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    if (!response.ok) throw await responseError(response, 'Не удалось войти.')
    const data = await response.json()
    if (revision !== sessionRevision.value) {
      await revokeRefresh(data.refresh)
      throw new Error('Сессия изменилась. Повторите вход.')
    }
    saveTokens(data)
    if (!await checkAuth()) throw new Error('Не удалось загрузить профиль. Повторите вход.')
    return data
  }

  const register = async (payload: { email: string; password: string; first_name: string; city: string; age: number; privacy_consent?: ConsentValue }) => {
    const response = await fetch(`${BACKEND_URL}/api/users/register/`, {
      method: 'POST', credentials: 'omit',
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
    })
    if (!response.ok) throw await responseError(response, 'Не удалось зарегистрироваться.')
    return response.json()
  }

  const resendVerification = async (email: string) => {
    const response = await fetch(`${BACKEND_URL}/api/users/resend-verification/`, {
      method: 'POST', credentials: 'omit',
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }),
    })
    if (!response.ok) throw await responseError(response, 'Не удалось отправить письмо.')
    return response.json()
  }

  return { isAuthenticated, user, hasTokens, initAuth, login, logout, clearSession,
    checkAuth, register, resendVerification, refresh, accessToken, refreshToken, sessionRevision }
})
