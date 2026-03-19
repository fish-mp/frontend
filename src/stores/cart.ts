import { defineStore } from 'pinia'

export interface CartItem {
  product: {
    id: number
    name: string
    price: number
    image: string
    // другие поля, если нужны
  }
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),
  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  },
  actions: {
    addToCart(product: any, quantity = 1) {
      const existing = this.items.find(item => item.product.id === product.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ product, quantity })
      }
    },
    removeFromCart(productId: number) {
      this.items = this.items.filter(item => item.product.id !== productId)
    },
    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find(item => item.product.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
        }
      }
    },
    clearCart() {
      this.items = []
    }
  },
  persist: true // включает сохранение в localStorage
})