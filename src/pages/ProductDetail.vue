<template>
  <section class="product-detail">
    <!-- Фоновые элементы (без ярких кругов) -->
    <div class="product-detail__bg"></div>

    <div class="product-detail__wrapper" v-if="product">
      <!-- Хлебные крошки -->
      <nav class="product-detail__breadcrumbs">
        <router-link to="/shop">Магазин</router-link>
        <span>/</span>
        <span>{{ product.category }}</span>
        <span>/</span>
        <span>{{ product.name }}</span>
      </nav>

      <div class="product-detail__main">
        <!-- Левая колонка: галерея -->
        <div class="product-detail__gallery">
          <div class="product-detail__main-image">
            <img :src="currentImage" :alt="product.name" />
          </div>
          <div class="product-detail__thumbnails" v-if="product.images && product.images.length > 1">
            <button
              v-for="(img, idx) in product.images"
              :key="idx"
              class="product-detail__thumbnail"
              :class="{ active: currentImage === img }"
              @click="currentImage = img"
            >
              <img :src="img" :alt="`${product.name} - ${idx + 1}`" />
            </button>
          </div>
        </div>

        <!-- Правая колонка: информация -->
        <div class="product-detail__info">
          <h1 class="product-detail__title">{{ product.name }}</h1>
          
          <div class="product-detail__rating">
            <div class="rating-stars">
              <span
                v-for="star in 5"
                :key="star"
                class="star"
                :class="{ filled: star <= (userRating || product.rating) }"
                @click="setRating(star)"
              >
                ★
              </span>
            </div>
            <span class="rating-value">{{ product.rating.toFixed(1) }} / 5</span>
            <span class="rating-count">({{ product.reviews || 0 }} отзывов)</span>
          </div>

          <div class="product-detail__price">{{ product.price }} ₽</div>

          <div class="product-detail__stock" :class="{ 'in-stock': product.stock > 0, 'out-of-stock': product.stock === 0 }">
            {{ product.stock > 0 ? 'В наличии' : 'Нет в наличии' }}
          </div>

          <div class="product-detail__actions">
            <button class="product-detail__cart btn btn--primary" @click="addToCart" :disabled="product.stock === 0">
              <span class="btn-text">В корзину</span>
            </button>
          </div>

          <div class="product-detail__specs">
            <h3 class="product-detail__specs-title">Характеристики</h3>
            <dl class="specs-list">
              <div class="specs-item">
                <dt>Категория</dt>
                <dd>{{ product.category }}</dd>
              </div>
              <div class="specs-item">
                <dt>Бренд</dt>
                <dd>{{ product.brand }}</dd>
              </div>
              <div class="specs-item">
                <dt>Цвет</dt>
                <dd>{{ product.color }}</dd>
              </div>
              <div class="specs-item">
                <dt>Вес</dt>
                <dd>{{ product.weight }} кг</dd>
              </div>
              <div class="specs-item">
                <dt>Габариты (Ш×В×Г)</dt>
                <dd>{{ product.width }} × {{ product.height }} × {{ product.length }} см</dd>
              </div>
              <div class="specs-item" v-if="product.material">
                <dt>Материал</dt>
                <dd>{{ product.material }}</dd>
              </div>
              <div class="specs-item" v-if="product.volume">
                <dt>Объём</dt>
                <dd>{{ product.volume }} л</dd>
              </div>
            </dl>
          </div>

          <div class="product-detail__description">
            <h3 class="product-detail__description-title">Описание</h3>
            <p>{{ product.description }}</p>
          </div>
        </div>
      </div>

      <!-- Похожие товары -->
      <div class="product-detail__similar" v-if="similarProducts.length">
        <h2 class="product-detail__similar-title">Похожие товары</h2>
        <div class="similar-grid">
          <div v-for="item in similarProducts" :key="item.id" class="similar-card">
            <router-link :to="`/shop/${item.id}`" class="similar-card__link">
              <div class="similar-card__image">
                <img :src="item.image" :alt="item.name" />
              </div>
              <div class="similar-card__info">
                <h4 class="similar-card__name">{{ item.name }}</h4>
                <div class="similar-card__price">{{ item.price }} ₽</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Загрузка / не найдено -->
    <div v-else-if="isLoading" class="product-detail__loading">
      <div class="loading-spinner"></div>
      <p>Загрузка товара…</p>
    </div>
    <div v-else class="product-detail__not-found">
      <h2>Товар не найден</h2>
      <p>Возможно, товар был удалён или вы перешли по неверной ссылке.</p>
      <router-link to="/shop" class="btn btn--secondary">Вернуться в магазин</router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// ---------- Тестовые данные (копируем из shop.vue с дополнениями) ----------
interface Product {
  id: number
  name: string
  price: number
  image: string
  images?: string[] // для галереи
  category: string
  brand: string
  color: string
  weight: number
  width: number
  height: number
  length: number
  material?: string
  volume?: number
  description: string
  rating: number
  reviews?: number
  stock: number
  isNew: boolean
  isPopular: boolean
}

const products: Product[] = [
  {
    id: 1,
    name: 'Аквариум AquaEl 100л',
    price: 8900,
    image: 'https://via.placeholder.com/600x400?text=Аквариум+100л',
    images: [
      'https://via.placeholder.com/600x400?text=Аквариум+100л+1',
      'https://via.placeholder.com/600x400?text=Аквариум+100л+2',
      'https://via.placeholder.com/600x400?text=Аквариум+100л+3',
    ],
    category: 'Аквариумы',
    brand: 'AquaEl',
    color: 'Прозрачный',
    weight: 15,
    width: 80,
    height: 40,
    length: 50,
    volume: 100,
    description: 'Просторный аквариум объёмом 100 литров. Изготовлен из высококачественного стекла, имеет укреплённые швы. Подходит для содержания пресноводных и морских рыб.',
    rating: 4.5,
    reviews: 12,
    stock: 5,
    isNew: true,
    isPopular: false,
  },
  {
    id: 2,
    name: 'Корм TetraMin хлопья',
    price: 650,
    image: 'https://via.placeholder.com/600x400?text=TetraMin',
    images: [
      'https://via.placeholder.com/600x400?text=TetraMin+1',
      'https://via.placeholder.com/600x400?text=TetraMin+2',
    ],
    category: 'Корма',
    brand: 'Tetra',
    color: 'Красный',
    weight: 0.25,
    width: 5,
    height: 10,
    length: 5,
    description: 'Сбалансированный корм в виде хлопьев для всех видов тропических рыб. Содержит все необходимые витамины и микроэлементы.',
    rating: 5,
    reviews: 34,
    stock: 20,
    isNew: false,
    isPopular: true,
  },
  {
    id: 3,
    name: 'Фильтр Eheim Classic',
    price: 4200,
    image: 'https://via.placeholder.com/600x400?text=Eheim+Classic',
    images: [
      'https://via.placeholder.com/600x400?text=Eheim+Classic+1',
      'https://via.placeholder.com/600x400?text=Eheim+Classic+2',
      'https://via.placeholder.com/600x400?text=Eheim+Classic+3',
    ],
    category: 'Оборудование',
    brand: 'Eheim',
    color: 'Чёрный',
    weight: 2.3,
    width: 15,
    height: 25,
    length: 15,
    description: 'Надёжный внешний фильтр для аквариумов до 250 литров. Обеспечивает механическую, биологическую и химическую фильтрацию.',
    rating: 4.8,
    reviews: 8,
    stock: 3,
    isNew: false,
    isPopular: true,
  },
  {
    id: 4,
    name: 'Грунт Sera гравий 5кг',
    price: 890,
    image: 'https://via.placeholder.com/600x400?text=Грунт+Sera',
    images: [
      'https://via.placeholder.com/600x400?text=Грунт+Sera+1',
      'https://via.placeholder.com/600x400?text=Грунт+Sera+2',
    ],
    category: 'Декор',
    brand: 'Sera',
    color: 'Коричневый',
    weight: 5,
    width: 20,
    height: 5,
    length: 30,
    description: 'Натуральный грунт для аквариума, фракция 2-4 мм. Не влияет на параметры воды, подходит для растений.',
    rating: 4.2,
    reviews: 6,
    stock: 15,
    isNew: true,
    isPopular: false,
  },
  {
    id: 5,
    name: 'Рыбка Петушок синий',
    price: 350,
    image: 'https://via.placeholder.com/600x400?text=Петушок',
    images: [
      'https://via.placeholder.com/600x400?text=Петушок+1',
      'https://via.placeholder.com/600x400?text=Петушок+2',
    ],
    category: 'Рыбки',
    brand: 'Laguna',
    color: 'Синий',
    weight: 0.05,
    width: 2,
    height: 3,
    length: 5,
    description: 'Яркий самец петушка (Betta splendens). Содержать поодиночке или с мирными рыбками.',
    rating: 4.9,
    reviews: 22,
    stock: 7,
    isNew: true,
    isPopular: true,
  },
  {
    id: 6,
    name: 'Обогреватель JBL 100W',
    price: 2100,
    image: 'https://via.placeholder.com/600x400?text=Обогреватель+JBL',
    images: [
      'https://via.placeholder.com/600x400?text=Обогреватель+JBL+1',
      'https://via.placeholder.com/600x400?text=Обогреватель+JBL+2',
    ],
    category: 'Оборудование',
    brand: 'JBL',
    color: 'Белый',
    weight: 0.8,
    width: 5,
    height: 25,
    length: 5,
    description: 'Погружной обогреватель с терморегулятором для аквариумов 80-150 л. Точная настройка температуры.',
    rating: 4.4,
    reviews: 5,
    stock: 0,
    isNew: false,
    isPopular: false,
  },
  {
    id: 7,
    name: 'Декор "Коралл"',
    price: 750,
    image: 'https://via.placeholder.com/600x400?text=Коралл',
    images: [
      'https://via.placeholder.com/600x400?text=Коралл+1',
      'https://via.placeholder.com/600x400?text=Коралл+2',
    ],
    category: 'Декор',
    brand: 'Dennerle',
    color: 'Красный',
    weight: 1.2,
    width: 15,
    height: 20,
    length: 15,
    description: 'Искусственный коралл из безопасного полимера. Создаёт естественный ландшафт в аквариуме.',
    rating: 4.0,
    reviews: 3,
    stock: 12,
    isNew: true,
    isPopular: false,
  },
  {
    id: 8,
    name: 'Аквариум Fluval 200л',
    price: 18500,
    image: 'https://via.placeholder.com/600x400?text=Fluval+200',
    images: [
      'https://via.placeholder.com/600x400?text=Fluval+200+1',
      'https://via.placeholder.com/600x400?text=Fluval+200+2',
      'https://via.placeholder.com/600x400?text=Fluval+200+3',
    ],
    category: 'Аквариумы',
    brand: 'Fluval',
    color: 'Прозрачный',
    weight: 28,
    width: 100,
    height: 50,
    length: 60,
    volume: 200,
    description: 'Панорамный аквариум Fluval с высококачественным стеклом и усиленным каркасом. В комплекте крышка с освещением.',
    rating: 5,
    reviews: 10,
    stock: 2,
    isNew: true,
    isPopular: true,
  },
]

const route = useRoute()
const productId = computed(() => Number(route.params.id))

const product = ref<Product | null>(null)
const isLoading = ref(true)
const currentImage = ref('')
const userRating = ref<number | null>(null) // оценка пользователя

// Загрузка товара по id
const loadProduct = () => {
  isLoading.value = true
  // Ищем в тестовых данных
  const found = products.find(p => p.id === productId.value)
  if (found) {
    product.value = found
    currentImage.value = found.image
  } else {
    product.value = null
  }
  isLoading.value = false
}

onMounted(loadProduct)

// Похожие товары (по категории, исключая текущий)
const similarProducts = computed(() => {
  if (!product.value) return []
  return products
    .filter(p => p.category === product.value!.category && p.id !== product.value!.id)
    .slice(0, 4)
})

// Установка рейтинга пользователем
const setRating = (star: number) => {
  userRating.value = star
  // Здесь можно было бы отправить на сервер, пока просто локально
  alert(`Вы поставили оценку ${star} звёзд (демо)`)
}

// Добавление в корзину
const addToCart = () => {
  if (product.value && product.value.stock > 0) {
    alert(`Товар "${product.value.name}" добавлен в корзину (демо)`)
  }
}
</script>

<style lang="scss" scoped>
// Переменные (как в shop.vue)
$pure-white: #ffffff;
$soft-white: #fafbfc;
$light-grey: #f0f4f8;
$primary-blue: #173DED;
$blue-gradient: linear-gradient(135deg, #173DED 0%, #4d7cfe 50%, #8ba9ff 100%);
$text-dark: #1a1a1a;
$text-medium: #5d6d87;
$text-light: #8a9bb8;
$accent-glow: rgba(23, 61, 237, 0.15);
$success-color: #00BFA6;
$warning-color: #FFB300;
$error-color: #FF5252;

// Глобальные стили для box-sizing
input, select, textarea, button {
  box-sizing: border-box;
}

@mixin glass-effect {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 -1px 0 rgba(0, 0, 0, 0.05);
}

@mixin smooth-transition {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.product-detail {
  background: $soft-white;
  padding: 120px 2rem 80px;
  min-height: 100vh;
  position: relative;

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(23, 61, 237, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(23, 61, 237, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }

  &__wrapper {
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  &__breadcrumbs {
    margin-bottom: 30px;
    font-size: 0.95rem;
    color: $text-light;

    a {
      color: $text-medium;
      text-decoration: none;
      &:hover {
        color: $primary-blue;
      }
    }

    span {
      margin: 0 8px;
      color: $text-light;
    }

    span:last-child {
      color: $text-dark;
      font-weight: 500;
    }
  }

  &__main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    margin-bottom: 60px;
  }

  // Левая колонка: галерея
  &__gallery {
    @include glass-effect;
    border-radius: 24px;
    padding: 20px;
  }

  &__main-image {
    width: 100%;
    height: 400px;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 16px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__thumbnails {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  &__thumbnail {
    width: 80px;
    height: 80px;
    border: 2px solid transparent;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    padding: 0;
    background: none;
    @include smooth-transition;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:hover {
      transform: scale(1.05);
    }

    &.active {
      border-color: $primary-blue;
      box-shadow: 0 0 0 2px rgba($primary-blue, 0.3);
    }
  }

  // Правая колонка: информация
  &__info {
    @include glass-effect;
    border-radius: 24px;
    padding: 40px;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 800;
    color: $text-dark;
    margin-bottom: 20px;
    line-height: 1.2;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
    flex-wrap: wrap;

    .rating-stars {
      display: flex;
      gap: 5px;

      .star {
        font-size: 1.8rem;
        color: $light-grey;
        cursor: pointer;
        @include smooth-transition;

        &.filled {
          color: #FFB800;
          text-shadow: 0 0 10px #FFB800;
        }

        &:hover {
          transform: scale(1.2);
        }
      }
    }

    .rating-value {
      font-weight: 600;
      color: $text-dark;
    }

    .rating-count {
      color: $text-light;
    }
  }

  &__price {
    font-size: 2.5rem;
    font-weight: 800;
    color: $primary-blue;
    margin-bottom: 15px;
  }

  &__stock {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 30px;

    &.in-stock {
      color: $success-color;
    }
    &.out-of-stock {
      color: $error-color;
    }
  }

  &__actions {
    margin-bottom: 40px;
  }

  &__cart {
    width: 100%;
    padding: 16px 32px;
    font-size: 1.2rem;
    background: $blue-gradient;
    color: white;
    border: none;
    border-radius: 16px;
    font-weight: 600;
    cursor: pointer;
    @include smooth-transition;

    &:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 0 20px 40px rgba($primary-blue, 0.3);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__specs {
    margin-bottom: 40px;
  }

  &__specs-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 20px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 60px;
      height: 3px;
      background: $blue-gradient;
      border-radius: 2px;
    }
  }

  .specs-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px 24px;

    .specs-item {
      display: flex;
      flex-direction: column;

      dt {
        font-size: 0.9rem;
        color: $text-light;
        margin-bottom: 4px;
      }

      dd {
        font-size: 1.1rem;
        font-weight: 500;
        color: $text-dark;
        margin: 0;
      }
    }
  }

  &__description {
    margin-bottom: 40px;
  }

  &__description-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 20px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 60px;
      height: 3px;
      background: $blue-gradient;
      border-radius: 2px;
    }
  }

  &__description p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: $text-medium;
  }

  // Похожие товары
  &__similar {
    margin-top: 60px;
  }

  &__similar-title {
    font-size: 2rem;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 30px;
  }

  .similar-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 24px;
  }

  .similar-card {
    @include glass-effect;
    border-radius: 20px;
    overflow: hidden;
    @include smooth-transition;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }

    &__link {
      text-decoration: none;
      color: inherit;
      display: block;
    }

    &__image {
      height: 180px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
    }

    &:hover &__image img {
      transform: scale(1.1);
    }

    &__info {
      padding: 16px;
    }

    &__name {
      font-size: 1.1rem;
      font-weight: 600;
      color: $text-dark;
      margin-bottom: 8px;
      line-height: 1.3;
    }

    &__price {
      font-size: 1.2rem;
      font-weight: 700;
      color: $primary-blue;
    }
  }

  // Состояния загрузки / не найдено
  &__loading {
    text-align: center;
    padding: 80px 20px;

    .loading-spinner {
      width: 60px;
      height: 60px;
      margin: 0 auto 20px;
      border: 4px solid rgba($primary-blue, 0.1);
      border-top-color: $primary-blue;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    p {
      font-size: 1.2rem;
      color: $text-medium;
    }
  }

  &__not-found {
    text-align: center;
    padding: 80px 20px;

    h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: $text-dark;
      margin-bottom: 20px;
    }

    p {
      font-size: 1.2rem;
      color: $text-medium;
      margin-bottom: 30px;
    }

    .btn {
      display: inline-block;
      padding: 14px 32px;
      background: rgba($primary-blue, 0.1);
      color: $primary-blue;
      text-decoration: none;
      border-radius: 16px;
      font-weight: 600;
      @include smooth-transition;

      &:hover {
        background: $primary-blue;
        color: white;
      }
    }
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

// Адаптивность
@media (max-width: 1200px) {
  .product-detail__main {
    gap: 40px;
  }
}

@media (max-width: 968px) {
  .product-detail {
    padding: 100px 1.5rem 60px;
  }

  .product-detail__main {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .product-detail__title {
    font-size: 2rem;
  }

  .product-detail__price {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .product-detail {
    padding: 80px 1rem 40px;
  }

  .product-detail__main-image {
    height: 300px;
  }

  .product-detail__thumbnail {
    width: 60px;
    height: 60px;
  }

  .specs-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .product-detail__title {
    font-size: 1.6rem;
  }

  .product-detail__price {
    font-size: 1.8rem;
  }

  .product-detail__rating {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .similar-grid {
    grid-template-columns: 1fr;
  }
}
</style>
