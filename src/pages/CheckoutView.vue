<template>
  <section class="checkout">
    <div class="checkout__wrapper">
      <h1 class="checkout__title">Оформление заказа</h1>

      <div v-if="cartStore.loading && cartStore.items.length === 0" class="checkout__loading">
        <div class="loading-spinner"></div>
        <p>Загрузка...</p>
      </div>

      <div v-else-if="cartStore.items.length === 0" class="checkout__empty">
        <p>Корзина пуста</p>
        <router-link to="/shop" class="checkout__continue">Перейти в магазин</router-link>
      </div>

      <form v-else class="checkout__content" @submit.prevent="submit">
        <div class="checkout__form">
          <h2 class="checkout__section-title">Контактные данные</h2>

          <div class="field" :class="{ 'field--error': errors.email }">
            <label for="email">Электронная почта *</label>
            <input id="email" v-model.trim="form.email" type="email" placeholder="you@example.com" autocomplete="email" />
            <span v-if="errors.email" class="field__error">{{ errors.email }}</span>
            <span class="field__hint">На неё придёт чек об оплате</span>
          </div>

          <div class="field" :class="{ 'field--error': errors.phone }">
            <label for="phone">Телефон *</label>
            <input id="phone" v-model.trim="form.phone" type="tel" placeholder="+7 900 000-00-00" autocomplete="tel" />
            <span v-if="errors.phone" class="field__error">{{ errors.phone }}</span>
          </div>

          <h2 class="checkout__section-title">Адрес доставки</h2>

          <div class="field" :class="{ 'field--error': errors.city }">
            <label for="city">Город *</label>
            <input id="city" v-model.trim="form.city" type="text" autocomplete="address-level2" />
            <span v-if="errors.city" class="field__error">{{ errors.city }}</span>
          </div>

          <div class="field" :class="{ 'field--error': errors.street }">
            <label for="street">Улица *</label>
            <input id="street" v-model.trim="form.street" type="text" autocomplete="address-line1" />
            <span v-if="errors.street" class="field__error">{{ errors.street }}</span>
          </div>

          <div class="field-row">
            <div class="field" :class="{ 'field--error': errors.house }">
              <label for="house">Дом *</label>
              <input id="house" v-model.trim="form.house" type="text" />
              <span v-if="errors.house" class="field__error">{{ errors.house }}</span>
            </div>
            <div class="field">
              <label for="apartment">Квартира</label>
              <input id="apartment" v-model.trim="form.apartment" type="text" />
            </div>
            <div class="field">
              <label for="postal_code">Индекс</label>
              <input id="postal_code" v-model.trim="form.postal_code" type="text" autocomplete="postal-code" />
            </div>
          </div>
        </div>

        <aside class="checkout__summary">
          <h3>Ваш заказ</h3>
          <div v-for="item in cartStore.items" :key="item.id" class="summary-item">
            <span class="summary-item__name">{{ item.product.name }} × {{ item.quantity }}</span>
            <span class="summary-item__price">{{ item.product.price * item.quantity }} ₽</span>
          </div>
          <div class="summary-total">
            <span>Итого:</span>
            <span>{{ cartStore.totalPrice() }} ₽</span>
          </div>

          <label class="offer" :class="{ 'offer--error': errors.offer_accepted }">
            <input v-model="form.offer_accepted" type="checkbox" />
            <span>
              Я согласен с
              <a href="/fishkids_publichnaya_oferta.pdf" target="_blank" rel="noopener noreferrer">публичной офертой</a>
              и
              <a href="/fishkids_usloviya_vozvrata.pdf" target="_blank" rel="noopener noreferrer">условиями возврата</a>
            </span>
          </label>
          <span v-if="errors.offer_accepted" class="field__error">{{ errors.offer_accepted }}</span>

          <p v-if="submitError" class="submit-error">{{ submitError }}</p>

          <button type="submit" class="checkout__pay" :disabled="cartStore.loading">
            {{ cartStore.loading ? 'Создание заказа...' : 'Перейти к оплате' }}
          </button>
          <router-link to="/cart" class="checkout__back">Вернуться в корзину</router-link>
        </aside>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useCartStore, type OrderPayload } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

const cartStore = useCartStore()
const authStore = useAuthStore()

const form = reactive<OrderPayload>({
  email: '',
  phone: '',
  city: '',
  street: '',
  house: '',
  apartment: '',
  postal_code: '',
  offer_accepted: false,
})

const errors = reactive<Record<string, string>>({})
const submitError = ref<string | null>(null)

onMounted(async () => {
  await cartStore.fetchCart()
  // Предзаполняем тем, что знаем о пользователе
  if (authStore.user) {
    form.email = authStore.user.email || ''
    form.city = authStore.user.city || ''
  }
})

const validate = (): boolean => {
  Object.keys(errors).forEach((k) => delete errors[k])

  if (!form.email) errors.email = 'Укажите email'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Некорректный email'
  if (!form.phone) errors.phone = 'Укажите телефон'
  if (!form.city) errors.city = 'Укажите город'
  if (!form.street) errors.street = 'Укажите улицу'
  if (!form.house) errors.house = 'Укажите дом'
  if (!form.offer_accepted) errors.offer_accepted = 'Необходимо согласие с офертой'

  return Object.keys(errors).length === 0
}

const submit = async () => {
  submitError.value = null
  if (!validate()) return

  try {
    const result = await cartStore.createOrder({ ...form })
    if (result && result.confirmation_url) {
      localStorage.setItem('last_order_id', result.order_id.toString())
      window.location.href = result.confirmation_url
    } else {
      submitError.value = 'Не удалось получить ссылку на оплату'
    }
  } catch (err: any) {
    submitError.value = err?.message || 'Не удалось оформить заказ. Попробуйте позже.'
  }
}
</script>

<style scoped>
.checkout {
  min-height: 60vh;
  padding: 2rem 1rem;
  background: #f5f7fb;
}

.checkout__wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

.checkout__title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
}

.checkout__loading,
.checkout__empty {
  text-align: center;
  padding: 3rem 1rem;
}

.checkout__continue {
  display: inline-block;
  margin-top: 1rem;
  color: #173DED;
  font-weight: 600;
}

.checkout__content {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 1.5rem;
  align-items: start;
}

.checkout__form,
.checkout__summary {
  background: #fff;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
}

.checkout__summary {
  position: sticky;
  top: 1rem;
}

.checkout__section-title {
  font-size: 1.1rem;
  margin: 0.5rem 0 1rem;
  color: #1a1a1a;
}

.checkout__section-title:not(:first-child) {
  margin-top: 1.5rem;
  border-top: 1px solid #eef1f6;
  padding-top: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.field label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 0.35rem;
}

.field input {
  padding: 11px 14px;
  border: 1px solid #d8dee8;
  border-radius: 12px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.15s;
}

.field input:focus {
  border-color: #173DED;
}

.field--error input {
  border-color: #e74c3c;
}

.field__error {
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 0.3rem;
}

.field__hint {
  color: #8a94a6;
  font-size: 0.78rem;
  margin-top: 0.3rem;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.75rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.9rem;
  padding: 0.4rem 0;
  color: #555;
}

.summary-item__price {
  white-space: nowrap;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1.1rem;
  margin: 0.75rem 0 1.25rem;
  padding-top: 0.75rem;
  border-top: 1px solid #eef1f6;
  color: #1a1a1a;
}

.offer {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  font-size: 0.85rem;
  color: #555;
  cursor: pointer;
  line-height: 1.4;
}

.offer input {
  margin-top: 0.15rem;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  accent-color: #173DED;
}

.offer a {
  color: #173DED;
  text-decoration: underline;
}

.offer--error span {
  color: #e74c3c;
}

.submit-error {
  color: #e74c3c;
  font-size: 0.85rem;
  margin: 0.75rem 0 0;
}

.checkout__pay {
  width: 100%;
  margin-top: 1.25rem;
  padding: 14px;
  background: #173DED;
  color: #fff;
  border: none;
  border-radius: 40px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.checkout__pay:hover:not(:disabled) {
  background: #0e2db5;
}

.checkout__pay:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.checkout__back {
  display: block;
  text-align: center;
  margin-top: 0.85rem;
  color: #173DED;
  font-size: 0.9rem;
}

.loading-spinner {
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

@media (max-width: 768px) {
  .checkout__content {
    grid-template-columns: 1fr;
  }
  .checkout__summary {
    position: static;
  }
}
</style>
