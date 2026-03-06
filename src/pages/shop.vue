<template>
  <section class="department">
    <div class="department__wrapper">
      <h1 class="department__title">Магазин аквариумистики</h1>
      <p class="department__description">
        Всё для вашего подводного мира: оборудование, корма, рыбки и декор
      </p>
    </div>
  </section>

  <section class="shop-section">
    <div class="shop-section__wrapper">
      <!-- Карусель подборок -->
      <div class="shop-carousel">
        <h2 class="shop-carousel__title">Популярные подборки</h2>
        <div class="shop-carousel__track" ref="carouselTrack">
          <button
            v-for="(collection, idx) in collections"
            :key="idx"
            class="shop-carousel__item"
            @click="selectCollection(collection)"
            :class="{ active: selectedCollection === collection }"
            :style="{ '--collection-color': collection.color }"
          >
            <div class="shop-carousel__item-icon">
              <!-- SVG иконки для каждой подборки -->
              <svg v-if="collection.icon === 'new'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v4M12 22v-4M4 12H2h2m14 0h2-2M5.636 5.636l2.828 2.828M18.364 18.364l-2.828-2.828M18.364 5.636l-2.828 2.828M5.636 18.364l2.828 2.828M16 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0z"/>
              </svg>
              <svg v-if="collection.icon === 'hit'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
              </svg>
              <svg v-if="collection.icon === 'beginner'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="8" r="5"/>
                <path d="M5 16v2a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-2"/>
              </svg>
              <svg v-if="collection.icon === 'premium'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <svg v-if="collection.icon === 'sale'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 12.5V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6.5"/><path d="M16 19h6"/><path d="M19 16v6"/><path d="M12 12h.01"/>
              </svg>
              <svg v-if="collection.icon === 'equipment'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
              <svg v-if="collection.icon === 'food'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2"/><path d="M12 2v6"/><path d="M8 2v6"/><path d="M16 2v6"/>
              </svg>
              <svg v-if="collection.icon === 'decor'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 12h20"/><path d="M12 2v20"/><path d="M4.93 4.93l14.14 14.14"/><path d="M19.07 4.93L4.93 19.07"/>
              </svg>
            </div>
            <span class="shop-carousel__item-name">{{ collection.name }}</span>
          </button>
        </div>
      </div>

      <!-- Основная часть: фильтры и товары -->
      <div class="shop-layout">
        <!-- Левая колонка фильтров -->
        <aside class="shop-filters">
          <h3 class="shop-filters__title">Фильтры</h3>

          <!-- Сортировка -->
          <div class="shop-filters__group">
            <label class="shop-filters__label">Сортировка</label>
            <div class="select-wrapper">
              <select v-model="sortBy" class="filter-select">
                <option value="new">Новые</option>
                <option value="popular">Популярные</option>
                <option value="priceAsc">Дешевле</option>
                <option value="priceDesc">Дороже</option>
              </select>
              <div class="select-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>

          <!-- Категория -->
          <div class="shop-filters__group">
            <label class="shop-filters__label">Категория</label>
            <div class="shop-filters__options">
              <label v-for="cat in categories" :key="cat" class="shop-filters__checkbox">
                <input type="checkbox" :value="cat" v-model="selectedCategories" />
                <span>{{ cat }}</span>
              </label>
            </div>
          </div>

          <!-- Бренд -->
          <div class="shop-filters__group">
            <label class="shop-filters__label">Бренд</label>
            <div class="shop-filters__options">
              <label v-for="brand in brands" :key="brand" class="shop-filters__checkbox">
                <input type="checkbox" :value="brand" v-model="selectedBrands" />
                <span>{{ brand }}</span>
              </label>
            </div>
          </div>

          <!-- Цвет -->
          <div class="shop-filters__group">
            <label class="shop-filters__label">Цвет</label>
            <div class="shop-filters__options shop-filters__colors">
              <label v-for="color in colors" :key="color" class="shop-filters__color">
                <input type="checkbox" :value="color" v-model="selectedColors" />
                <span class="color-dot" :style="{ backgroundColor: color }"></span>
                <span>{{ color }}</span>
              </label>
            </div>
          </div>

          <!-- Вес -->
          <div class="shop-filters__group">
            <label class="shop-filters__label">Вес, кг</label>
            <div class="shop-filters__options">
              <label v-for="weight in weightRanges" :key="weight.value" class="shop-filters__checkbox">
                <input type="checkbox" :value="weight.value" v-model="selectedWeights" />
                <span>{{ weight.label }}</span>
              </label>
            </div>
          </div>

          <!-- Размеры (габариты) -->
          <div class="shop-filters__group">
            <label class="shop-filters__label">Габариты, см</label>
            <div class="shop-filters__dimensions">
              <div class="dimension-row">
                <span>Ширина:</span>
                <div class="dimension-inputs">
                  <input type="number" v-model.number="dimensions.width.min" placeholder="от" min="0" />
                  <span>—</span>
                  <input type="number" v-model.number="dimensions.width.max" placeholder="до" min="0" />
                </div>
              </div>
              <div class="dimension-row">
                <span>Высота:</span>
                <div class="dimension-inputs">
                  <input type="number" v-model.number="dimensions.height.min" placeholder="от" min="0" />
                  <span>—</span>
                  <input type="number" v-model.number="dimensions.height.max" placeholder="до" min="0" />
                </div>
              </div>
              <div class="dimension-row">
                <span>Длина:</span>
                <div class="dimension-inputs">
                  <input type="number" v-model.number="dimensions.length.min" placeholder="от" min="0" />
                  <span>—</span>
                  <input type="number" v-model.number="dimensions.length.max" placeholder="до" min="0" />
                </div>
              </div>
            </div>
          </div>

          <!-- Цена -->
          <div class="shop-filters__group">
            <label class="shop-filters__label">Цена, ₽</label>
            <div class="price-range">
              <input type="number" v-model.number="priceRange.min" placeholder="от" min="0" />
              <span>—</span>
              <input type="number" v-model.number="priceRange.max" placeholder="до" min="0" />
            </div>
          </div>

          <!-- Кнопка сброса -->
          <button class="shop-filters__reset" @click="resetFilters">Сбросить фильтры</button>
        </aside>

        <!-- Правая колонка с товарами -->
        <main class="shop-products">
          <div class="shop-products__header">
            <h2 class="shop-products__title">Товары</h2>
            <span class="shop-products__count">Найдено: {{ filteredProducts.length }}</span>
          </div>

          <div class="shop-products__grid">
            <div v-for="product in filteredProducts" :key="product.id" class="product-card">
              <!-- Ссылка на детальную страницу (вся карточка, кроме кнопки) -->
              <router-link :to="`/shop/${product.id}`" class="product-card__link">
                <div class="product-card__image">
                  <img :src="product.image" :alt="product.name" />
                </div>
                <div class="product-card__info">
                  <h3 class="product-card__name">{{ product.name }}</h3>
                  <p class="product-card__category">{{ product.category }} • {{ product.brand }}</p>
                  <div class="product-card__price">{{ product.price }} ₽</div>
                </div>
              </router-link>
              <!-- Кнопка добавления в корзину -->
              <button class="product-card__cart" @click="addToCart(product)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C16.4696 17 15.9609 17.2107 15.5858 17.5858C15.2107 17.9609 15 18.4696 15 19C15 19.5304 15.2107 20.0391 15.5858 20.4142C15.9609 20.7893 16.4696 21 17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 18.0391 18.4142 17.5858C17.9609 17.2107 17.5304 17 17 17ZM9 19C9 19.5304 8.78929 20.0391 8.41421 20.4142C8.03914 20.7893 7.53043 21 7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19C5 18.4696 5.21071 17.9609 5.58579 17.5858C5.96086 17.2107 6.46957 17 7 17C7.53043 17 8.03914 17.2107 8.41421 17.5858C8.78929 17.9609 9 18.4696 9 19Z"/>
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// ---------- Тестовые данные ----------
const collections = [
  { name: 'Новинки', icon: 'new', color: '#FFD700' },
  { name: 'Хиты продаж', icon: 'hit', color: '#FF5252' },
  { name: 'Для начинающих', icon: 'beginner', color: '#4CAF50' },
  { name: 'Премиум', icon: 'premium', color: '#9C27B0' },
  { name: 'Акции', icon: 'sale', color: '#FF9800' },
  { name: 'Оборудование', icon: 'equipment', color: '#607D8B' },
  { name: 'Корма', icon: 'food', color: '#795548' },
  { name: 'Декор', icon: 'decor', color: '#009688' },
]

const categories = ['Аквариумы', 'Рыбки', 'Корма', 'Оборудование', 'Декор', 'Лекарства']
const brands = ['AquaEl', 'Tetra', 'Sera', 'JBL', 'Eheim', 'Fluval', 'Dennerle', 'Laguna']
const colors = ['Красный', 'Синий', 'Зелёный', 'Жёлтый', 'Чёрный', 'Белый', 'Прозрачный']
const weightRanges = [
  { label: 'до 1 кг', value: 'lt1' },
  { label: '1-5 кг', value: '1-5' },
  { label: '5-10 кг', value: '5-10' },
  { label: 'более 10 кг', value: 'gt10' },
]

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  brand: string
  color: string
  weight: number
  width: number
  height: number
  length: number
  isNew: boolean
  isPopular: boolean
  rating: number
}

const products: Product[] = [
  {
    id: 1,
    name: 'Аквариум AquaEl 100л',
    price: 8900,
    image: 'https://via.placeholder.com/300x200?text=Аквариум',
    category: 'Аквариумы',
    brand: 'AquaEl',
    color: 'Прозрачный',
    weight: 15,
    width: 80,
    height: 40,
    length: 50,
    isNew: true,
    isPopular: false,
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Корм TetraMin хлопья',
    price: 650,
    image: 'https://via.placeholder.com/300x200?text=Корм+TetraMin',
    category: 'Корма',
    brand: 'Tetra',
    color: 'Красный',
    weight: 0.25,
    width: 5,
    height: 10,
    length: 5,
    isNew: false,
    isPopular: true,
    rating: 5,
  },
  {
    id: 3,
    name: 'Фильтр Eheim Classic',
    price: 4200,
    image: 'https://via.placeholder.com/300x200?text=Фильтр+Eheim',
    category: 'Оборудование',
    brand: 'Eheim',
    color: 'Чёрный',
    weight: 2.3,
    width: 15,
    height: 25,
    length: 15,
    isNew: false,
    isPopular: true,
    rating: 4.8,
  },
  {
    id: 4,
    name: 'Грунт Sera гравий 5кг',
    price: 890,
    image: 'https://via.placeholder.com/300x200?text=Грунт+Sera',
    category: 'Декор',
    brand: 'Sera',
    color: 'Коричневый',
    weight: 5,
    width: 20,
    height: 5,
    length: 30,
    isNew: true,
    isPopular: false,
    rating: 4.2,
  },
  {
    id: 5,
    name: 'Рыбка Петушок синий',
    price: 350,
    image: 'https://via.placeholder.com/300x200?text=Петушок',
    category: 'Рыбки',
    brand: 'Laguna',
    color: 'Синий',
    weight: 0.05,
    width: 2,
    height: 3,
    length: 5,
    isNew: true,
    isPopular: true,
    rating: 4.9,
  },
  {
    id: 6,
    name: 'Обогреватель JBL 100W',
    price: 2100,
    image: 'https://via.placeholder.com/300x200?text=Обогреватель+JBL',
    category: 'Оборудование',
    brand: 'JBL',
    color: 'Белый',
    weight: 0.8,
    width: 5,
    height: 25,
    length: 5,
    isNew: false,
    isPopular: false,
    rating: 4.4,
  },
  {
    id: 7,
    name: 'Декор "Коралл"',
    price: 750,
    image: 'https://via.placeholder.com/300x200?text=Коралл',
    category: 'Декор',
    brand: 'Dennerle',
    color: 'Красный',
    weight: 1.2,
    width: 15,
    height: 20,
    length: 15,
    isNew: true,
    isPopular: false,
    rating: 4.0,
  },
  {
    id: 8,
    name: 'Аквариум Fluval 200л',
    price: 18500,
    image: 'https://via.placeholder.com/300x200?text=Fluval+200',
    category: 'Аквариумы',
    brand: 'Fluval',
    color: 'Прозрачный',
    weight: 28,
    width: 100,
    height: 50,
    length: 60,
    isNew: true,
    isPopular: true,
    rating: 5,
  },
]

// ---------- Состояние фильтров и сортировки ----------
const selectedCollection = ref<{ name: string; icon: string; color: string } | null>(null)
const sortBy = ref('new')
const selectedCategories = ref<string[]>([])
const selectedBrands = ref<string[]>([])
const selectedColors = ref<string[]>([])
const selectedWeights = ref<string[]>([])
const dimensions = ref({
  width: { min: null as number | null, max: null as number | null },
  height: { min: null as number | null, max: null as number | null },
  length: { min: null as number | null, max: null as number | null },
})
const priceRange = ref({ min: null as number | null, max: null as number | null })

// ---------- Методы ----------
const selectCollection = (collection: (typeof collections)[0]) => {
  selectedCollection.value = collection.name === selectedCollection.value?.name ? null : collection
}

const resetFilters = () => {
  selectedCategories.value = []
  selectedBrands.value = []
  selectedColors.value = []
  selectedWeights.value = []
  dimensions.value = { width: { min: null, max: null }, height: { min: null, max: null }, length: { min: null, max: null } }
  priceRange.value = { min: null, max: null }
  sortBy.value = 'new'
  selectedCollection.value = null
}

const addToCart = (product: Product) => {
  alert(`Товар "${product.name}" добавлен в корзину (демо)`)
}

// ---------- Фильтрация и сортировка ----------
const filteredProducts = computed(() => {
  let result = [...products]

  if (selectedCategories.value.length) {
    result = result.filter(p => selectedCategories.value.includes(p.category))
  }
  if (selectedBrands.value.length) {
    result = result.filter(p => selectedBrands.value.includes(p.brand))
  }
  if (selectedColors.value.length) {
    result = result.filter(p => selectedColors.value.includes(p.color))
  }
  if (selectedWeights.value.length) {
    result = result.filter(p => {
      return selectedWeights.value.some(range => {
        if (range === 'lt1') return p.weight < 1
        if (range === '1-5') return p.weight >= 1 && p.weight <= 5
        if (range === '5-10') return p.weight >= 5 && p.weight <= 10
        if (range === 'gt10') return p.weight > 10
        return false
      })
    })
  }
  if (dimensions.value.width.min !== null) result = result.filter(p => p.width >= dimensions.value.width.min!)
  if (dimensions.value.width.max !== null) result = result.filter(p => p.width <= dimensions.value.width.max!)
  if (dimensions.value.height.min !== null) result = result.filter(p => p.height >= dimensions.value.height.min!)
  if (dimensions.value.height.max !== null) result = result.filter(p => p.height <= dimensions.value.height.max!)
  if (dimensions.value.length.min !== null) result = result.filter(p => p.length >= dimensions.value.length.min!)
  if (dimensions.value.length.max !== null) result = result.filter(p => p.length <= dimensions.value.length.max!)
  if (priceRange.value.min !== null) result = result.filter(p => p.price >= priceRange.value.min!)
  if (priceRange.value.max !== null) result = result.filter(p => p.price <= priceRange.value.max!)

  switch (sortBy.value) {
    case 'new':
      result = result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1))
      break
    case 'popular':
      result = result.sort((a, b) => b.rating - a.rating)
      break
    case 'priceAsc':
      result = result.sort((a, b) => a.price - b.price)
      break
    case 'priceDesc':
      result = result.sort((a, b) => b.price - a.price)
      break
  }

  return result
})
</script>

<style lang="scss" scoped>
// Переменные
$pure-white: #ffffff;
$soft-white: #fafbfc;
$light-grey: #f0f4f8;
$primary-blue: #173DED;
$blue-gradient: linear-gradient(135deg, #173DED 0%, #4d7cfe 50%, #8ba9ff 100%);
$text-dark: #1a1a1a;
$text-medium: #5d6d87;
$text-light: #8a9bb8;
$accent-glow: rgba(23, 61, 237, 0.15);

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

// Секция department (hero)
.department {
  position: relative;
  padding: 120px 2rem 80px;
  background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
  overflow: hidden;
  
  &__wrapper {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    text-align: center;
  }
  
  &__title {
    font-size: calc(3.5rem + 1.5vw);
    font-weight: 700;
    background: $blue-gradient;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1.5rem;
    line-height: 1.1;
    font-family: 'Inter', 'SF Pro Display', system-ui, sans-serif;
    animation: titleSlideUp 0.8s ease-out;
  }
  
  &__description {
    font-size: 1.25rem;
    color: $text-medium;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
    font-weight: 400;
    animation: fadeInUp 0.8s ease-out 0.2s both;
  }
}

// Анимации
@keyframes titleSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Основная секция магазина
.shop-section {
  position: relative;
  padding: 80px 2rem;
  background: $soft-white;
  min-height: 100vh;
  
  &__wrapper {
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }
}

// Карусель подборок
.shop-carousel {
  margin-bottom: 40px;
  
  &__title {
    font-size: 1.8rem;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 20px;
  }
  
  &__track {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    padding-bottom: 10px;
    scrollbar-width: thin;
    scrollbar-color: $primary-blue $light-grey;
    
    &::-webkit-scrollbar {
      height: 6px;
    }
    &::-webkit-scrollbar-track {
      background: $light-grey;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background: $primary-blue;
      border-radius: 10px;
    }
  }
  
  &__item {
    @include smooth-transition;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 20px 24px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    min-width: 140px;
    
    --collection-color: #173DED; // fallback
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
      
      .shop-carousel__item-icon {
        border-color: var(--collection-color);
        box-shadow: 0 0 15px var(--collection-color);
      }
    }
    
    &.active {
      background: $blue-gradient;
      border-color: transparent;
      
      .shop-carousel__item-name {
        color: white;
      }
      
      .shop-carousel__item-icon {
        background: rgba(255,255,255,0.2);
        border-color: white;
        box-shadow: 0 0 20px white;
      }
    }
  }
  
  &__item-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
    color: var(--collection-color);
    
    svg {
      width: 30px;
      height: 30px;
      stroke: currentColor;
    }
  }
  
  &__item-name {
    font-weight: 600;
    color: $text-dark;
    white-space: nowrap;
  }
}

// Основной лейаут (фильтры + товары)
.shop-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  margin-top: 40px;
}

// Левая колонка фильтров
.shop-filters {
  @include glass-effect;
  border-radius: 24px;
  padding: 30px;
  height: fit-content;
  
  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 25px;
  }
  
  &__group {
    margin-bottom: 25px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  &__label {
    display: block;
    font-weight: 600;
    color: $text-dark;
    margin-bottom: 12px;
    font-size: 1.1rem;
  }
  
  &__options {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 200px;
    overflow-y: auto;
    padding-right: 10px;
    
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background: $light-grey;
    }
    &::-webkit-scrollbar-thumb {
      background: $primary-blue;
    }
  }
  
  &__checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 0.95rem;
    color: $text-medium;
    
    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      accent-color: $primary-blue;
      cursor: pointer;
    }
    
    &:hover {
      color: $primary-blue;
    }
  }
  
  &__colors {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  
  &__color {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    
    .color-dot {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid $light-grey;
    }
    
    input[type="checkbox"] {
      display: none;
    }
    
    input:checked + .color-dot {
      border-color: $primary-blue;
      box-shadow: 0 0 0 2px rgba($primary-blue, 0.3);
    }
  }
  
  &__dimensions {
    display: flex;
    flex-direction: column;
    gap: 15px;
    
    .dimension-row {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.95rem;
      color: $text-medium;
      
      span:first-child {
        min-width: 70px;
      }
      
      .dimension-inputs {
        display: flex;
        align-items: center;
        gap: 5px;
        flex: 1;
        
        input {
          width: 70px;
          padding: 8px 10px;
          border: 1px solid $light-grey;
          border-radius: 12px;
          font-size: 0.9rem;
          background: rgba(255,255,255,0.8);
          box-sizing: border-box;
          
          &:focus {
            outline: none;
            border-color: $primary-blue;
          }
        }
        
        span {
          color: $text-light;
        }
      }
    }
  }
  
  &__reset {
    width: 100%;
    padding: 14px;
    margin-top: 20px;
    background: rgba($primary-blue, 0.1);
    border: 1px solid rgba($primary-blue, 0.3);
    border-radius: 16px;
    color: $primary-blue;
    font-weight: 600;
    cursor: pointer;
    @include smooth-transition;
    
    &:hover {
      background: $primary-blue;
      color: white;
      border-color: transparent;
    }
  }
}

.price-range {
  display: flex;
  align-items: center;
  gap: 10px;
  
  input {
    flex: 1;
    padding: 10px 12px;
    border: 1px solid $light-grey;
    border-radius: 12px;
    font-size: 0.95rem;
    box-sizing: border-box;
    
    &:focus {
      outline: none;
      border-color: $primary-blue;
    }
  }
  
  span {
    color: $text-light;
  }
}

.select-wrapper {
  position: relative;
  
  select {
    width: 100%;
    padding: 14px 18px;
    border: 1px solid $light-grey;
    border-radius: 16px;
    background: $pure-white;
    font-size: 0.95rem;
    color: $text-dark;
    appearance: none;
    cursor: pointer;
    box-sizing: border-box;
    
    &:focus {
      outline: none;
      border-color: $primary-blue;
    }
  }
  
  .select-arrow {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: $text-medium;
  }
}

// Правая колонка товаров
.shop-products {
  &__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  
  &__title {
    font-size: 1.8rem;
    font-weight: 700;
    color: $text-dark;
  }
  
  &__count {
    font-size: 1rem;
    color: $text-light;
    background: rgba($primary-blue, 0.1);
    padding: 6px 15px;
    border-radius: 30px;
  }
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
  }
}

.product-card {
  position: relative; // для позиционирования кнопки
  @include glass-effect;
  border-radius: 24px;
  overflow: hidden;
  @include smooth-transition;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 40px rgba(0, 0, 0, 0.15);
  }
  
  &__link {
    display: block;
    text-decoration: none;
    color: inherit;
    // Занимает всё пространство карточки, но кнопка перекрывается благодаря абсолютному позиционированию
  }
  
  &__image {
    position: relative;
    height: 200px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    &:hover img {
      transform: scale(1.1);
    }
  }
  
  &__info {
    padding: 20px;
  }
  
  &__name {
    font-size: 1.2rem;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 6px;
    line-height: 1.3;
  }
  
  &__category {
    font-size: 0.9rem;
    color: $text-light;
    margin-bottom: 10px;
  }
  
  &__price {
    font-size: 1.4rem;
    font-weight: 700;
    color: $primary-blue;
    margin-bottom: 15px;
  }
  
  &__cart {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 46px;
    height: 46px;
    border: none;
    border-radius: 50%;
    background: $blue-gradient;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    @include smooth-transition;
    z-index: 2; // выше ссылки
    
    &:hover {
      transform: scale(1.15);
      box-shadow: 0 10px 20px rgba($primary-blue, 0.3);
    }
    
    svg {
      width: 22px;
      height: 22px;
    }
  }
}

// Адаптивность
@media (max-width: 1200px) {
  .shop-layout {
    grid-template-columns: 280px 1fr;
    gap: 30px;
  }
  
  .shop-filters {
    padding: 25px;
  }
}

@media (max-width: 968px) {
  .shop-layout {
    grid-template-columns: 1fr;
  }
  
  .shop-filters {
    order: 2;
    margin-top: 40px;
  }
  
  .shop-products {
    order: 1;
  }
  
  .department {
    padding: 100px 1.5rem 60px;
    &__title {
      font-size: calc(2.5rem + 1.5vw);
    }
  }
  
  .shop-section {
    padding: 60px 1.5rem;
  }
}

@media (max-width: 768px) {
  .shop-carousel__item {
    min-width: 120px;
    padding: 15px 18px;
    
    &-icon {
      width: 50px;
      height: 50px;
      
      svg {
        width: 25px;
        height: 25px;
      }
    }
  }
  
  .shop-products__grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .department {
    padding: 60px 0.75rem 30px;
    &__title {
      font-size: calc(1.5rem + 1.5vw);
    }
  }
  
  .shop-section {
    padding: 30px 0.75rem;
  }
  
  .shop-carousel__title {
    font-size: 1.5rem;
  }
  
  .shop-filters {
    padding: 20px;
  }
  
  .shop-filters__dimensions .dimension-row .dimension-inputs input {
    width: 50px;
  }
}

// Дополнительный декор (без ярких кругов)
.department::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(23, 61, 237, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(77, 124, 254, 0.05) 0%, transparent 50%);
  pointer-events: none;
}
</style>