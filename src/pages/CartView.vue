<template>
  <section class="cart">
    <div class="cart__wrapper">
      <h1 class="cart__title">Корзина</h1>

      <div v-if="cartStore.loading" class="cart__loading">
        <div class="loading-spinner"></div>
        <p>Загрузка корзины...</p>
      </div>

      <div v-else-if="cartStore.items.length === 0" class="cart__empty">
        <p>Корзина пуста</p>
        <router-link to="/shop" class="cart__continue">Продолжить покупки</router-link>
      </div>

      <div v-else class="cart__content">
        <div class="cart__items">
          <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
            <img :src="getProductImage(item.product)" alt="" class="cart-item__image" />
            <div class="cart-item__info">
              <h3 class="cart-item__name">{{ item.product.name }}</h3>
              <p class="cart-item__price">{{ item.product.price }} ₽</p>
            </div>
            <div class="cart-item__quantity">
              <button @click="updateQuantity(item, item.quantity - 1)" :disabled="cartStore.loading">−</button>
              <span class="quantity-value">{{ item.quantity }}</span>
              <button @click="updateQuantity(item, item.quantity + 1)" :disabled="cartStore.loading">+</button>
            </div>
            <div class="cart-item__total">{{ item.product.price * item.quantity }} ₽</div>
            <button @click="removeItem(item.id)" :disabled="cartStore.loading">🗑️</button>
          </div>
        </div>

        <div class="cart-summary">
          <h3>Итого</h3>
          <div class="cart-summary__row">
            <span>Товаров:</span>
            <span>{{ cartStore.totalItems() }} шт.</span>
          </div>
          <div class="cart-summary__row cart-summary__total">
            <span>Общая стоимость:</span>
            <span>{{ cartStore.totalPrice() }} ₽</span>
          </div>
          <button class="cart-summary__checkout" @click="handleCheckout" :disabled="cartStore.loading">
            Оформить заказ
          </button>
          <button class="cart-summary__clear" @click="clearCart" :disabled="cartStore.loading">
            Очистить корзину
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore, type CartItemResponse } from '../stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const getProductImage = (product: any) => {
  if (product.main_image?.image) return product.main_image.image
  if (product.image) return product.image
  return 'https://via.placeholder.com/300x200?text=Нет+фото'
}

onMounted(() => {
  cartStore.fetchCart()
})

const updateQuantity = (item: CartItemResponse, newQty: number) => {
  if (newQty <= 0) {
    cartStore.removeFromCart(item.id)
  } else {
    cartStore.updateQuantity(item.id, newQty)
  }
}

const removeItem = (itemId: number) => cartStore.removeFromCart(itemId)

const clearCart = async () => {
  if (confirm('Вы уверены, что хотите очистить корзину?')) {
    await cartStore.clearCart()
  }
}

const handleCheckout = async () => {
  if (cartStore.items.length === 0) return
  try {
    await cartStore.createOrder()
    alert('Спасибо за заказ! С вами свяжется менеджер после уточнения наличия товара на складе.')
    router.push('/shop')
  } catch (err) {
    alert('Не удалось оформить заказ. Попробуйте позже.')
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

.cart {
  padding: 100px 2rem;
  background: $soft-white;
  min-height: 100vh;

  &__wrapper {
    max-width: 1400px;
    margin: 0 auto;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 40px;
  }

  &__empty {
    text-align: center;
    padding: 60px;
    background: white;
    border-radius: 24px;
    p {
      font-size: 1.5rem;
      color: $text-medium;
      margin-bottom: 20px;
    }
  }

  &__continue {
    display: inline-block;
    padding: 14px 40px;
    background: $primary-blue;
    color: white;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.3s;
    &:hover {
      background: darken($primary-blue, 10%);
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 30px;
  }

  &__items {
    background: white;
    border-radius: 24px;
    padding: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.05);
  }
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid $light-grey;
  &:last-child {
    border-bottom: none;
  }

  &__image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 12px;
  }

  &__info {
    flex: 1;
  }

  &__name {
    font-size: 1.2rem;
    font-weight: 600;
    color: $text-dark;
    margin-bottom: 5px;
  }

  &__price {
    font-size: 1.1rem;
    color: $primary-blue;
    font-weight: 600;
  }

  &__quantity {
    display: flex;
    align-items: center;
    gap: 10px;

    .quantity-btn {
      width: 36px;
      height: 36px;
      border: 1px solid $light-grey;
      background: white;
      border-radius: 10px;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: $primary-blue;
        color: white;
        border-color: $primary-blue;
      }
    }

    .quantity-value {
      font-size: 1.2rem;
      font-weight: 600;
      min-width: 40px;
      text-align: center;
    }
  }

  &__total {
    font-size: 1.2rem;
    font-weight: 700;
    color: $text-dark;
    min-width: 100px;
    text-align: right;
  }

  &__remove {
    background: none;
    border: none;
    color: $text-light;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: all 0.2s;

    &:hover {
      background: #fee;
      color: #f00;
    }

    svg {
      display: block;
    }
  }
}

.cart-summary {
  background: white;
  border-radius: 24px;
  padding: 30px;
  height: fit-content;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.05);

  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 20px;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    font-size: 1.1rem;
    color: $text-medium;
    border-bottom: 1px solid $light-grey;

    &:last-of-type {
      border-bottom: none;
    }
  }

  &__total {
    font-size: 1.3rem;
    font-weight: 700;
    color: $text-dark;
    margin-top: 10px;
  }

  &__checkout {
    width: 100%;
    padding: 16px;
    margin-top: 20px;
    background: $blue-gradient;
    border: none;
    border-radius: 16px;
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.9;
    }
  }

  &__clear {
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    background: none;
    border: 1px solid $light-grey;
    border-radius: 16px;
    color: $text-medium;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: $light-grey;
    }
  }
}

@media (max-width: 1024px) {
  .cart__content {
    grid-template-columns: 1fr;
  }
  .cart-item {
    flex-wrap: wrap;
  }
  .cart-item__total {
    text-align: left;
  }
}
</style>