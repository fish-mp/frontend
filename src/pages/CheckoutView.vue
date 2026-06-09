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

          <h2 class="checkout__section-title">Способ получения</h2>

          <div class="delivery-methods">
            <label class="delivery-method" :class="{ 'delivery-method--active': form.delivery_method === 'pickup' }">
              <input type="radio" v-model="form.delivery_method" value="pickup" />
              <div class="delivery-method__content">
                <span class="delivery-method__title">Самовывоз</span>
              </div>
            </label>
            <label class="delivery-method" :class="{ 'delivery-method--active': form.delivery_method === 'delivery' }">
              <input type="radio" v-model="form.delivery_method" value="delivery" />
              <div class="delivery-method__content">
                <span class="delivery-method__title">Доставка</span>
                <span v-if="cartStore.totalPrice() > 10000" class="delivery-method__free">Бесплатно</span>
                <span v-else class="delivery-method__desc">от 300 ₽</span>
              </div>
            </label>
          </div>

          <template v-if="form.delivery_method === 'delivery'">
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

            <label v-if="cartStore.totalPrice() < 10000" class="checkbox-field">
              <input type="checkbox" v-model="form.beyond_mkad" />
              <span>Адрес находится за МКАД (+1000 ₽ к доставке)</span>
            </label>
          </template>
        </div>

        <aside class="checkout__summary">
          <h3>Ваш заказ</h3>
          <div v-for="item in cartStore.items" :key="item.id" class="summary-item">
            <span class="summary-item__name">{{ item.product.name }} × {{ item.quantity }}</span>
            <span class="summary-item__price">{{ item.product.price * item.quantity }} ₽</span>
          </div>
          <div class="summary-subtotal">
            <span>Сумма заказа</span>
            <span>{{ cartStore.totalPrice() }} ₽</span>
          </div>
          <div v-if="form.delivery_method === 'delivery'" class="summary-delivery">
            <span>Доставка</span>
            <span>
              <template v-if="cartStore.totalPrice() >= 10000">Бесплатно</template>
              <template v-else>{{ deliveryCost }} ₽</template>
            </span>
          </div>
          <div class="summary-total">
            <span>Итого:</span>
            <span>{{ cartStore.totalPrice() + deliveryCost }} ₽</span>
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
import { computed, onMounted, reactive, ref } from 'vue'
import { useCartStore, type OrderPayload } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

const cartStore = useCartStore()
const authStore = useAuthStore()

const form = reactive<OrderPayload>({
  email: '',
  phone: '',
  delivery_method: 'pickup',
  city: '',
  street: '',
  house: '',
  apartment: '',
  postal_code: '',
  beyond_mkad: false,
  offer_accepted: false,
})

const errors = reactive<Record<string, string>>({})
const submitError = ref<string | null>(null)

const deliveryCost = computed(() => {
  if (cartStore.totalPrice() >= 10000 || form.delivery_method === 'pickup') return 0
  return form.beyond_mkad ? 1000 : 300
})

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
  if (form.delivery_method === 'delivery') {
    if (!form.city) errors.city = 'Укажите город'
    if (!form.street) errors.street = 'Укажите улицу'
    if (!form.house) errors.house = 'Укажите дом'
  }
  if (!form.offer_accepted) errors.offer_accepted = 'Необходимо согласие с офертой'

  return Object.keys(errors).length === 0
}

const submit = async () => {
  submitError.value = null
  if (!validate()) return

  const isFreeDelivery = cartStore.totalPrice() > 10000
  const payload: OrderPayload = {
    ...form,
    delivery_method: isFreeDelivery ? 'pickup' : form.delivery_method,
    beyond_mkad: isFreeDelivery ? false : form.beyond_mkad,
  }

  try {
    const result = await cartStore.createOrder(payload)
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

<style lang="scss" scoped>
$pure-white: #ffffff;
$soft-white: #fafbfc;
$light-grey: #f0f4f8;
$primary-blue: #173DED;
$blue-gradient: linear-gradient(135deg, #173DED 0%, #4d7cfe 50%, #8ba9ff 100%);
$text-dark: #1a1a1a;
$text-medium: #5d6d87;
$text-light: #8a9bb8;
$accent-glow: rgba(23, 61, 237, 0.15);

.checkout {
  min-height: 60vh;
  padding: 2rem 1rem;
  margin-top: 7rem;


  &__wrapper {
    max-width: 1000px;
    margin: 0 auto;
  }

  &__title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: $text-dark;
  }

  &__loading,
  &__empty {
    text-align: center;
    padding: 3rem 1rem;
  }

  &__continue {
    display: inline-block;
    margin-top: 1rem;
    color: $primary-blue;
    font-weight: 600;
  }

  &__content {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 1.5rem;
    align-items: start;
  }

  &__form,
  &__summary {
    background: $pure-white;
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  }

  &__summary {
    position: sticky;
    top: 1rem;
  }

  &__section-title {
    font-size: 1.1rem;
    margin: 0.5rem 0 1rem;
    color: $text-dark;

    &:not(:first-child) {
      margin-top: 1.5rem;
      border-top: 1px solid #eef1f6;
      padding-top: 1.5rem;
    }
  }

  &__pay {
    width: 100%;
    margin-top: 1.25rem;
    padding: 14px;
    background: $primary-blue;
    color: $pure-white;
    border: none;
    border-radius: 40px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover:not(:disabled) {
      background: darken($primary-blue, 10%);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &__back {
    display: block;
    text-align: center;
    margin-top: 0.85rem;
    color: $primary-blue;
    font-size: 0.9rem;
  }
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #444;
    margin-bottom: 0.35rem;
  }

  input {
    padding: 11px 14px;
    border: 1px solid #d8dee8;
    border-radius: 12px;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.15s;

    &:focus {
      border-color: $primary-blue;
    }
  }

  &--error input {
    border-color: #e74c3c;
  }

  &__error {
    color: #e74c3c;
    font-size: 0.8rem;
    margin-top: 0.3rem;
  }

  &__hint {
    color: #8a94a6;
    font-size: 0.78rem;
    margin-top: 0.3rem;
  }

  &-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.75rem;
  }
}

.delivery-methods {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.delivery-method {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 2px solid #eef1f6;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s;

  input {
    margin-top: 0.15rem;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    accent-color: $primary-blue;
  }

  &:hover {
    border-color: lighten($primary-blue, 30%);
    background: rgba($primary-blue, 0.03);
  }

  &--active {
    border-color: $primary-blue;
    background: rgba($primary-blue, 0.05);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  &__title {
    font-weight: 700;
    font-size: 1rem;
    color: $text-dark;
  }

  &__desc {
    font-size: 0.85rem;
    color: $text-medium;
    line-height: 1.3;
  }

  &__free {
    font-size: 0.85rem;
    font-weight: 700;
    color: #27ae60;
    line-height: 1.3;
  }
}

.checkbox-field {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  font-size: 0.85rem;
  color: $text-medium;
  cursor: pointer;
  line-height: 1.4;
  margin-top: 0.5rem;

  input {
    margin-top: 0.15rem;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    accent-color: $primary-blue;
  }
}

.summary-item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.9rem;
  padding: 0.4rem 0;
  color: $text-medium;

  &__price {
    white-space: nowrap;
  }
}

.summary-subtotal,
.summary-delivery {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  padding: 0.5rem 0;
  color: $text-medium;
}

.summary-delivery {
  border-top: 1px solid #eef1f6;
  padding-top: 0.75rem;
  margin-top: 0.25rem;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1.1rem;
  margin: 0.75rem 0 1.25rem;
  padding-top: 0.75rem;
  border-top: 1px solid #eef1f6;
  color: $text-dark;
}

.offer {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  font-size: 0.85rem;
  color: $text-medium;
  cursor: pointer;
  line-height: 1.4;

  input {
    margin-top: 0.15rem;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    accent-color: $primary-blue;
  }

  a {
    color: $primary-blue;
    text-decoration: underline;
  }

  &--error span {
    color: #e74c3c;
  }
}

.submit-error {
  color: #e74c3c;
  font-size: 0.85rem;
  margin: 0.75rem 0 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e0e0e0;
  border-top-color: $primary-blue;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 1024px) {
  .checkout {
    padding: 1.5rem 1rem;
  }

  .checkout__title {
    font-size: 1.6rem;
  }
}

@media (max-width: 768px) {
  .checkout {
    padding: 1rem 0.75rem;
  }

  .checkout__title {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  .checkout__content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .checkout__summary {
    position: static;
  }

  .checkout__form,
  .checkout__summary {
    padding: 1rem;
    border-radius: 16px;
  }

  .delivery-methods {
    grid-template-columns: 1fr;
  }

  .field-row {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .checkout__title {
    font-size: 1.2rem;
  }

  .checkout__form,
  .checkout__summary {
    padding: 0.75rem;
  }

  .field-row {
    grid-template-columns: 1fr;
  }

  .delivery-method {
    padding: 0.75rem;
  }
}
</style>
