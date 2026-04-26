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
      <!-- Карусель-слайдер -->
      <div class="shop-carousel">
        <h2 class="shop-carousel__title">Актуальное</h2>
        <div class="carousel-container">
          <button class="carousel-arrow carousel-arrow--left" @click="prevSlide" :disabled="currentSlide === 0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <div class="carousel-slide" :style="{ backgroundImage: `url(${carouselImages[currentSlide].url})` }">
            <div class="carousel-overlay">
              <h3 class="carousel-title">{{ carouselImages[currentSlide].title }}</h3>
              <p class="carousel-subtitle">{{ carouselImages[currentSlide].subtitle }}</p>
            </div>
          </div>
          <button class="carousel-arrow carousel-arrow--right" @click="nextSlide" :disabled="currentSlide === carouselImages.length - 1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        <div class="carousel-dots">
          <span v-for="(_, index) in carouselImages" :key="index" class="carousel-dot"
            :class="{ active: currentSlide === index }" @click="currentSlide = index"></span>
        </div>
 <div class="beginner-banner">
  <div class="beginner-banner__content">
    <h3>🐟 Новичок в аквариумистике?</h3>
    <p>Выбор аквариума, совместимость рыб, оборудование и запуск</p>
  </div>
  <router-link to="/beginner-guide" class="beginner-banner__btn">Руководство для новичков →</router-link>
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

          <!-- Категория (радио-кнопки) -->
          <div class="shop-filters__group">
            <label class="shop-filters__label">Категория</label>
            <div class="shop-filters__options">
              <label v-for="cat in categories" :key="cat.id" class="shop-filters__radio">
                <input type="radio" :value="cat.id" v-model="selectedCategoryId" />
                <span>{{ cat.name }}</span>
              </label>
            </div>
          </div>

          <!-- Бренд -->
          <div class="shop-filters__group">
            <label class="shop-filters__label">Бренд</label>
            <div class="shop-filters__options">
              <label v-for="brand in filteredBrands" :key="brand.id" class="shop-filters__checkbox">
                <input type="checkbox" :value="brand.id" v-model="selectedBrandIds" />
                <span>{{ brand.name }}</span>
              </label>
              <div v-if="filteredBrands.length === 0" class="shop-filters__empty">
                Нет брендов для выбранной категории
              </div>
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

          <div v-if="productStore.loading" class="shop-products__loading">
            <div class="loading-spinner"></div>
            <p>Загрузка товаров...</p>
          </div>
          <div v-else-if="productStore.error" class="shop-products__error">
            <p>{{ productStore.error }}</p>
          </div>
          <div v-else class="shop-products__grid">
            <div v-for="product in filteredProducts" :key="product.id" class="product-card">
              <router-link :to="`/shop/${product.id}`" class="product-card__link">
                <div class="product-card__image">
                  <img :src="getMainImageUrl(product)" :alt="product.name" />
                </div>
                <div class="product-card__info">
                  <h3 class="product-card__name">{{ product.name }}</h3>
                  <p class="product-card__category">{{ product.category?.name || product.category_name }} • {{ product.brand_name }}</p>
                  <div class="product-card__price">{{ product.price }} ₽</div>
                </div>
              </router-link>
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
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '../stores/product'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'
import type { Product } from '../types/Product'

const productStore = useProductStore()
const authStore = useAuthStore()
const cartStore = useCartStore()

// ---------- Данные для карусели-слайдера ----------
const carouselImages = [
  { url: 'https://via.placeholder.com/1200x400?text=Акция+на+аквариумы', title: 'Скидки на аквариумы до 30%', subtitle: 'Только до конца месяца' },
  { url: 'https://via.placeholder.com/1200x400?text=Новые+корма+Tetra', title: 'Новая линейка кормов Tetra', subtitle: 'Сбалансированное питание для ваших рыб' },
  { url: 'https://via.placeholder.com/1200x400?text=Оборудование+Eheim', title: 'Фильтры Eheim со скидкой', subtitle: 'Профессиональное оборудование' },
  { url: 'https://via.placeholder.com/1200x400?text=Декор+для+аквариума', title: 'Коллекция декора 2025', subtitle: 'Создайте уникальный подводный мир' }
]
const currentSlide = ref(0)
const nextSlide = () => { if (currentSlide.value < carouselImages.length - 1) currentSlide.value++ }
const prevSlide = () => { if (currentSlide.value > 0) currentSlide.value-- }

// ---------- Фильтры и сортировка ----------
const sortBy = ref('new')
const selectedCategoryId = ref<number | null>(null)
const selectedBrandIds = ref<number[]>([])
const selectedColors = ref<string[]>([])
const selectedWeights = ref<string[]>([])
const dimensions = ref({
  width: { min: null as number | null, max: null as number | null },
  height: { min: null as number | null, max: null as number | null },
  length: { min: null as number | null, max: null as number | null },
})
const priceRange = ref({ min: null as number | null, max: null as number | null })

const colors = ['Красный', 'Синий', 'Зелёный', 'Жёлтый', 'Чёрный', 'Белый', 'Прозрачный']
const weightRanges = [
  { label: 'до 1 кг', value: 'lt1' },
  { label: '1-5 кг', value: '1-5' },
  { label: '5-10 кг', value: '5-10' },
  { label: 'более 10 кг', value: 'gt10' },
]

// ---------- Данные из API ----------
const categories = computed(() => productStore.categories)
const brands = computed(() => productStore.brands)
const products = computed(() => productStore.products)

const filteredBrands = computed(() => {
  if (!selectedCategoryId.value) return brands.value
  return brands.value
})

const getMainImageUrl = (product: Product) => {
  if (product.main_image?.image) {
    let url = product.main_image.image
    if (url.startsWith('/media')) url = import.meta.env.VITE_BACKEND_URL + url
    return url
  }
  return 'https://via.placeholder.com/300x200?text=Нет+фото'
}

// Вспомогательная функция для безопасного получения названия цвета
const getColorName = (color: any): string | undefined => {
  if (!color) return undefined
  return typeof color === 'object' ? color.name : color
}

const filteredProducts = computed(() => {
  let result = [...products.value]

  // Фильтр по категории
  if (selectedCategoryId.value) {
    result = result.filter(p => p.category?.id === selectedCategoryId.value || p.category_id === selectedCategoryId.value)
  }
  // Фильтр по брендам
  if (selectedBrandIds.value.length) {
    result = result.filter(p => {
      const brandId = p.brand?.id ?? p.brand_id
      return brandId !== undefined && selectedBrandIds.value.includes(brandId)
    })
  }
  // Фильтр по цвету (исправлено)
  if (selectedColors.value.length) {
    result = result.filter(p => {
      const colName = getColorName(p.color)
      return colName && selectedColors.value.includes(colName)
    })
  }
  // Фильтр по весу
  if (selectedWeights.value.length) {
    result = result.filter(p => {
      if (p.weight === undefined) return false
      return selectedWeights.value.some(range => {
        if (range === 'lt1') return p.weight! < 1
        if (range === '1-5') return p.weight! >= 1 && p.weight! <= 5
        if (range === '5-10') return p.weight! >= 5 && p.weight! <= 10
        if (range === 'gt10') return p.weight! > 10
        return false
      })
    })
  }
  // Фильтр по габаритам
  if (dimensions.value.width.min !== null) {
    result = result.filter(p => p.width !== undefined && p.width >= dimensions.value.width.min!)
  }
  if (dimensions.value.width.max !== null) {
    result = result.filter(p => p.width !== undefined && p.width <= dimensions.value.width.max!)
  }
  if (dimensions.value.height.min !== null) {
    result = result.filter(p => p.height !== undefined && p.height >= dimensions.value.height.min!)
  }
  if (dimensions.value.height.max !== null) {
    result = result.filter(p => p.height !== undefined && p.height <= dimensions.value.height.max!)
  }
  if (dimensions.value.length.min !== null) {
    result = result.filter(p => p.length !== undefined && p.length >= dimensions.value.length.min!)
  }
  if (dimensions.value.length.max !== null) {
    result = result.filter(p => p.length !== undefined && p.length <= dimensions.value.length.max!)
  }
  // Фильтр по цене
  if (priceRange.value.min !== null) {
    result = result.filter(p => p.price >= priceRange.value.min!)
  }
  if (priceRange.value.max !== null) {
    result = result.filter(p => p.price <= priceRange.value.max!)
  }

  // Сортировка
  switch (sortBy.value) {
    case 'new':
      result = result.sort((a, b) => (a.is_new === b.is_new ? 0 : a.is_new ? -1 : 1))
      break
    case 'popular':
      result = result.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0))
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

const resetFilters = () => {
  selectedCategoryId.value = null
  selectedBrandIds.value = []
  selectedColors.value = []
  selectedWeights.value = []
  dimensions.value = { width: { min: null, max: null }, height: { min: null, max: null }, length: { min: null, max: null } }
  priceRange.value = { min: null, max: null }
  sortBy.value = 'new'
}

const addToCart = async (product: Product) => {
  if (!authStore.isAuthenticated) {
    alert('Для добавления в корзину необходимо авторизоваться')
    return
  }
  try {
    await cartStore.addToCart(product.id, 1)
    alert(`Товар "${product.name}" добавлен в корзину`)
  } catch (err) {
    alert('Ошибка при добавлении в корзину')
  }
}

onMounted(async () => {
  await productStore.fetchProducts()
  await productStore.fetchCategories()
  await productStore.fetchBrands()
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

// Баннер для новичков
.beginner-banner {
  margin: 2rem 0;
  border-radius: 16px;
  background: #fff;
  border: 1px solid $light-grey;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;

  &__content {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: $text-dark;
    margin: 0;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    margin: 0;
    color: $text-medium;
    font-size: 1rem;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: $primary-blue;
    color: white;
    padding: 0.6rem 1.2rem;
    border-radius: 40px;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover {
      background: darken($primary-blue, 8%);
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba($primary-blue, 0.3);
    }
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

// Карусель-слайдер (одно большое изображение)
.shop-carousel {
  margin-bottom: 40px;
  
  &__title {
    font-size: 1.8rem;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 20px;
  }
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 24px;
  overflow: hidden;
  @include glass-effect;
  padding: 0; // убираем внутренние отступы
}

.carousel-slide {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: background-image 0.3s ease;
}

.carousel-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  color: white;
}

.carousel-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.carousel-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  backdrop-filter: blur(5px);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  @include smooth-transition;
  
  &:hover:not(:disabled) {
    background: rgba(255,255,255,0.5);
    transform: translateY(-50%) scale(1.1);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  svg {
    width: 28px;
    height: 28px;
    stroke: currentColor;
  }
  
  &--left {
    left: 20px;
  }
  
  &--right {
    right: 20px;
  }
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: $light-grey;
  cursor: pointer;
  @include smooth-transition;
  
  &.active {
    background: $primary-blue;
    transform: scale(1.3);
  }
  
  &:hover {
    background: $primary-blue;
    opacity: 0.7;
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
  
  // Стили для радио-кнопок (категории)
  &__radio {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 0.95rem;
    color: $text-medium;
    
    input[type="radio"] {
      width: 18px;
      height: 18px;
      accent-color: $primary-blue;
      cursor: pointer;
    }
    
    &:hover {
      color: $primary-blue;
    }
  }
  
  // Стили для чекбоксов
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
  
  &__empty {
    font-size: 0.9rem;
    color: $text-light;
    font-style: italic;
    padding: 5px 0;
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
  width: 100%; // контейнер занимает всю ширину
  
  input {
    flex: 1;
    min-width: 0;  // позволяет инпутам сжиматься
    width: 100%;   // занимает доступное пространство
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
    flex-shrink: 0;
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
  position: relative;
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
    z-index: 2;
    
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
  
  .carousel-container {
    height: 350px;
  }
  
  .carousel-title {
    font-size: 1.8rem;
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
  
  .carousel-container {
    height: 300px;
  }
  
  .carousel-title {
    font-size: 1.5rem;
  }
  
  .carousel-subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .shop-products__grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
  
  .carousel-container {
    height: 250px;
  }
  
  .carousel-overlay {
    padding: 20px;
  }
  
  .carousel-title {
    font-size: 1.3rem;
  }
  
  .carousel-subtitle {
    font-size: 0.9rem;
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
  
  .carousel-container {
    height: 200px;
  }
  
  .carousel-arrow {
    width: 36px;
    height: 36px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
  
  .carousel-overlay {
    padding: 15px;
  }
  
  .carousel-title {
    font-size: 1.1rem;
  }
  
  .carousel-subtitle {
    font-size: 0.8rem;
  }
}

// Дополнительный декор
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

.cart-fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: $blue-gradient;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba($primary-blue, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 15px 40px rgba($primary-blue, 0.6);
  }

  svg {
    width: 32px;
    height: 32px;
  }

  .cart-badge {
    position: absolute;
    top: 5px;
    right: 5px;
    background: #ff4757;
    color: white;
    font-size: 14px;
    font-weight: bold;
    height: 24px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  }
}
</style>