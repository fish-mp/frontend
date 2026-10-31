<template>
  <div class="order-success">
    <div class="container">
      <h1>Оплата заказа</h1>

      <div v-if="loading" class="status loading">
        <div class="spinner"></div>
        <p>Проверка статуса оплаты...</p>
      </div>

      <div v-else-if="status === 'paid'" class="status success">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h2>Спасибо за покупку!</h2>
        <p>Ваш заказ успешно оплачен. В ближайшее время с вами свяжется менеджер.</p>
        <router-link to="/shop" class="btn">Вернуться в магазин</router-link>
      </div>

      <div v-else-if="status === 'pending'" class="status pending">
        <p v-if="reviewRequired">Нужна дополнительная проверка платежа поддержкой. Не оплачивайте этот заказ повторно.</p>
        <p v-else>Оплата ещё не подтверждена. Это может занять несколько секунд.</p>
        <button @click="() => checkStatus(false)" class="btn btn-outline">Проверить снова</button>
        <a v-if="confirmationUrl" :href="confirmationUrl" class="btn">Продолжить оплату</a>
      </div>

      <div v-else-if="status === 'cancelled'" class="status pending"><h2>Оплата отменена</h2><p>Резерв товара снят. Товары остались в корзине, и заказ можно оформить заново.</p><router-link to="/cart" class="btn">В корзину</router-link></div>
      <div v-else class="status error">
        <p>Не удалось проверить оплату. Это не означает, что платёж не прошёл. Повторите проверку позже или свяжитесь с поддержкой.</p>
        <router-link to="/shop" class="btn">Перейти в магазин</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiFetch } from '../utils/api'
import { useCartStore } from '../stores/cart'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const loading = ref(true)
const status = ref<string | null>(null)
const confirmationUrl = ref<string | null>(null)
const reviewRequired = ref(false)

// Сколько раз автоматически перепроверить статус, если оплата ещё не подтверждена
// (вебхук от ЮKassa может прийти на пару секунд позже возврата пользователя).
const MAX_RETRIES = 5
const RETRY_DELAY_MS = 2000

const checkStatus = async (autoRetry = true) => {
  const orderId = localStorage.getItem('last_order_id')
  if (!orderId) {
    status.value = 'error'
    loading.value = false
    return
  }

  loading.value = true
  let attempt = 0

  while (true) {
    try {
      // apiFetch подставляет JWT (Authorization: Bearer) — эндпоинт требует авторизации
      const response = await apiFetch(`${BACKEND_URL}/api/orders/${orderId}/payment/`, { method: 'POST' })
      if (response.ok) {
        const data = await response.json()
        status.value = ['paid', 'processing', 'shipped', 'delivered'].includes(data.status) ? 'paid' : data.status
        confirmationUrl.value = data.confirmation_url || null
        reviewRequired.value = data.payment_review_required === true
        if (status.value === 'paid') {
          localStorage.removeItem('last_order_id')
          localStorage.removeItem('checkout_attempt')
          await useCartStore().fetchCart()
          break
        }
        // Заказ ещё в pending — даём вебхуку время и пробуем снова
        if (autoRetry && !reviewRequired.value && data.status === 'pending' && attempt < MAX_RETRIES) {
          attempt++
          await new Promise((r) => setTimeout(r, RETRY_DELAY_MS))
          continue
        }
        break
      } else {
        status.value = 'error'
        break
      }
    } catch (e) {
      console.error('Ошибка проверки статуса:', e)
      status.value = 'error'
      break
    }
  }

  loading.value = false
}

onMounted(() => {
  checkStatus()
})
</script>

<style scoped>
.order-success {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #f5f7fb;
}

.container {
  max-width: 600px;
  width: 100%;
  background: white;
  border-radius: 24px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
}

.status {
  margin: 1.5rem 0;
}

.loading .spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e0e0e0;
  border-top-color: #173DED;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.success .icon {
  width: 60px;
  height: 60px;
  color: #22c55e;
  margin-bottom: 1rem;
}

.success h2 {
  color: #22c55e;
  margin-bottom: 0.5rem;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  background: #173DED;
  color: white;
  text-decoration: none;
  border-radius: 40px;
  font-weight: 600;
  transition: background 0.2s;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background: #0e2db5;
}

.btn-outline {
  background: transparent;
  border: 1px solid #173DED;
  color: #173DED;
}

.btn-outline:hover {
  background: #173DED;
  color: white;
}

.pending p {
  margin-bottom: 1.5rem;
  color: #e67e22;
}
</style>
