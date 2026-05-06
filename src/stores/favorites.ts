import { defineStore } from 'pinia'
import { ref } from 'vue'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

interface FavoriteItem {
  id: number
  product: {
    id: string
    name: string
    price: number
    main_image?: { image: string }
  }
  created_at: string
}

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<FavoriteItem[]>([])
  const loading = ref(false)

  // Загрузить все избранные товары текущего пользователя
  const fetchFavorites = async () => {
    loading.value = true
    try {
      const response = await fetch(`${BACKEND_URL}/api/favorites/`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      })
      if (!response.ok) throw new Error('Не удалось загрузить избранное')
      favorites.value = await response.json()
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Проверить, добавлен ли товар в избранное (по id товара)
  const isFavorite = (productId: string): boolean => {
    return favorites.value.some(fav => fav.product.id === productId)
  }

  // Получить id записи избранного по id товара (нужно для удаления)
  const getFavoriteId = (productId: string): number | null => {
    const fav = favorites.value.find(f => f.product.id === productId)
    return fav ? fav.id : null
  }

  // Добавить товар в избранное
  const addToFavorites = async (productId: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/favorites/`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId })
      })
      if (!response.ok) throw new Error('Не удалось добавить в избранное')
      await fetchFavorites() // обновить список
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  // Удалить товар из избранного (по id записи избранного)
  const removeFromFavorites = async (favoriteId: number) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/favorites/${favoriteId}/`, {
        method: 'DELETE',
        credentials: 'include'
      })
      if (!response.ok) throw new Error('Не удалось удалить из избранного')
      await fetchFavorites() // обновить список
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  return {
    favorites,
    loading,
    fetchFavorites,
    isFavorite,
    getFavoriteId,
    addToFavorites,
    removeFromFavorites
  }
})