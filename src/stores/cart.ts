import { defineStore } from 'pinia'
import { ref } from 'vue'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export interface CartItemResponse {
  id: number
  product: {
    id: string
    name: string
    price: number
    main_image?: { image: string }
    image?: string
  }
  quantity: number
  total_price?: number
}

interface CartResponse {
  id: number
  items: CartItemResponse[]
  total_cart_price: string
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItemResponse[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCart = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${BACKEND_URL}/api/cart/`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      })
      if (!response.ok) throw new Error('Не удалось загрузить корзину')
      const data: CartResponse = await response.json()
      items.value = data.items
    } catch (err: any) {
      error.value = err.message
      items.value = []
    } finally {
      loading.value = false
    }
  }

  const addToCart = async (productId: string, quantity: number = 1) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${BACKEND_URL}/api/cart-items/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ product: productId, quantity })
      })
      if (!response.ok) throw new Error('Не удалось добавить товар в корзину')
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
      const response = await fetch(`${BACKEND_URL}/api/cart-items/${cartItemId}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
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
      const response = await fetch(`${BACKEND_URL}/api/cart-items/${cartItemId}/`, {
        method: 'DELETE',
        credentials: 'include'
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

  const createOrder = async () => {
    loading.value = true
    error.value = null
    try {
      // Отправляем статус 'processing' – он будет установлен на бэкенде (или используется по умолчанию)
      const response = await fetch(`${BACKEND_URL}/api/orders/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: 'processing' })
      })
      if (!response.ok) throw new Error('Не удалось оформить заказ')
      await response.json()
      await clearCart()
      return true
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const totalItems = () => items.value.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = () =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

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
    totalPrice
  }
})