import { defineStore } from 'pinia'
import type { User } from '../types/User'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null
  }),
  actions: {
    login(user: User) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
    },
    loadFromStorage() {
      const saved = localStorage.getItem('user')
      if (saved) this.user = JSON.parse(saved)
    }
  }
})
