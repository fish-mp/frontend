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
      <!-- Карусель подборок (коллекций) из API -->
      <div class="shop-carousel" v-if="productStore.collections.length">
        <h2 class="shop-carousel__title">Популярные подборки</h2>
        <div class="carousel-container">
          <button class="carousel-arrow carousel-arrow--left" @click="prevCollectionSlide" :disabled="currentCollectionSlide === 0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <div class="carousel-track" :style="{ transform: `translateX(-${currentCollectionSlide * 100}%)` }">
            <div
              v-for="collection in productStore.collections"
              :key="collection.id"
              class="carousel-slide"
              @click="openCollectionModal(collection)"
            >
              <img
                v-if="collection.cover_image"
                :src="getFullImageUrl(collection.cover_image)"
                :alt="collection.name"
                class="carousel-image"
              />
              <div v-else class="carousel-placeholder">
                <span>📦</span>
                <p>{{ collection.name }}</p>
              </div>
              <div class="carousel-overlay">
                <h3 class="carousel-title">{{ collection.name }}</h3>
              </div>
            </div>
          </div>
          <button class="carousel-arrow carousel-arrow--right" @click="nextCollectionSlide" :disabled="currentCollectionSlide === productStore.collections.length - 1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        <div class="carousel-dots">
          <span
            v-for="(_, index) in productStore.collections"
            :key="index"
            class="carousel-dot"
            :class="{ active: currentCollectionSlide === index }"
            @click="currentCollectionSlide = index"
          ></span>
        </div>
      </div>

      <!-- Баннер для новичков -->
      <div class="beginner-banner">
        <div class="beginner-banner__content">
          <h3>🐟 Новичок в аквариумистике?</h3>
          <p>Выбор аквариума, совместимость рыб, оборудование и запуск</p>
        </div>
        <router-link to="/beginner-guide" class="beginner-banner__btn">Руководство для новичков →</router-link>
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
                <option value="-created_at">Новые</option>
                <option value="-average_rating">Популярные</option>
                <option value="price">Дешевле</option>
                <option value="-price">Дороже</option>
              </select>
              <div class="select-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>
          <!-- Модальное окно коллекции -->
<Teleport to="body">
  <div v-if="isCollectionModalOpen" class="modal-overlay" @click.self="closeCollectionModal">
    <div class="modal-container">
      <button class="modal-close" @click="closeCollectionModal">×</button>
      <h2 class="modal-title">{{ selectedCollection?.name }}</h2>
      <div class="modal-products">
        <div v-for="product in selectedCollection?.products" :key="product.id" class="modal-product-card">
          <router-link :to="`/shop/${product.id}`" class="product-card__link" @click="closeCollectionModal">
            <div class="product-card__image">
              <img :src="getMainImageUrl(product)" :alt="product.name" />
            </div>
            <div class="product-card__info">
              <h3 class="product-card__name">{{ product.name }}</h3>
              <p class="product-card__category">{{ product.brand_name }}</p>
              <div class="product-card__price">{{ product.price }} ₽</div>
            </div>
          </router-link>
          <button class="product-card__cart" @click="addToCart(product)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</Teleport>
<!-- Категория (только дочерние с радио, родительские – для раскрытия) -->
<div class="shop-filters__group">
  <label class="shop-filters__label">Категория</label>
  <div class="category-tree">
    <div
      v-for="parent in categoryTree"
      :key="parent.id"
      class="category-parent"
    >
      <div
        class="category-parent__header"
        @click="toggleParentExpand(parent.id)"
      >
        <span class="expand-icon">{{ expandedParents[parent.id] ? '▼' : '▶' }}</span>
        <span class="parent-name">{{ parent.name }}</span>
      </div>
      <div class="category-children" v-if="expandedParents[parent.id]">
        <label
          v-for="child in parent.children"
          :key="child.id"
          class="category-child"
          :class="{ active: selectedCategoryId === child.id }"
        >
          <input type="radio" :value="child.id" v-model="selectedCategoryId" />
          <span>{{ child.name }}</span>
        </label>
      </div>
    </div>
  </div>
</div>

          <!-- Бренд -->
          <div class="shop-filters__group">
            <label class="shop-filters__label">Бренд</label>
            <div class="shop-filters__options">
              <label v-for="brand in brands" :key="brand.id" class="shop-filters__checkbox">
                <input type="checkbox" :value="brand.id" v-model="selectedBrandIds" />
                <span>{{ brand.name }}</span>
              </label>
            </div>
          </div>

          <!-- Цвет (выпадающий список) -->
          <div class="shop-filters__group">
            <label class="shop-filters__label">Цвет</label>
            <div class="select-wrapper">
              <select v-model="selectedColorId" class="filter-select">
                <option value="">Все цвета</option>
                <option
                  v-for="color in productColors"
                  :key="color.id"
                  :value="color.id"
                >
                  {{ color.name }}
                </option>
              </select>
              <div class="select-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>

          <!-- Вес -->
          <div class="shop-filters__group">
            <label class="shop-filters__label">Вес, кг</label>
            <div class="price-range">
              <input type="number" v-model.number="weightMin" placeholder="от" min="0" step="0.1" />
              <span>—</span>
              <input type="number" v-model.number="weightMax" placeholder="до" min="0" step="0.1" />
            </div>
          </div>

          <!-- Размеры (габариты) -->
          <div class="shop-filters__group">
            <label class="shop-filters__label">Габариты, см</label>
            <div class="shop-filters__dimensions">
              <div class="dimension-row">
                <span>Ширина:</span>
                <div class="dimension-inputs">
                  <input type="number" v-model.number="widthMin" placeholder="от" min="0" />
                  <span>—</span>
                  <input type="number" v-model.number="widthMax" placeholder="до" min="0" />
                </div>
              </div>
              <div class="dimension-row">
                <span>Высота:</span>
                <div class="dimension-inputs">
                  <input type="number" v-model.number="heightMin" placeholder="от" min="0" />
                  <span>—</span>
                  <input type="number" v-model.number="heightMax" placeholder="до" min="0" />
                </div>
              </div>
              <div class="dimension-row">
                <span>Длина:</span>
                <div class="dimension-inputs">
                  <input type="number" v-model.number="lengthMin" placeholder="от" min="0" />
                  <span>—</span>
                  <input type="number" v-model.number="lengthMax" placeholder="до" min="0" />
                </div>
              </div>
            </div>
          </div>

          <!-- Цена -->
       

          <!-- Кнопка сброса -->
          <button class="shop-filters__reset" @click="resetFilters">Сбросить фильтры</button>
        </aside>

        <!-- Правая колонка с товарами -->
        <main class="shop-products">
          <div class="shop-products__header">
            <h2 class="shop-products__title">Товары</h2>
            <span class="shop-products__count">Найдено: {{ products.length }}</span>
          </div>

          <div v-if="productStore.loading" class="shop-products__loading">
            <div class="loading-spinner"></div>
            <p>Загрузка товаров...</p>
          </div>
          <div v-else-if="productStore.error" class="shop-products__error">
            <p>{{ productStore.error }}</p>
          </div>
          <div v-else class="shop-products__grid">
            <div v-for="product in products" :key="product.id" class="product-card">
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
                <!-- Новая красивая белая иконка корзины -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24" height="24">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                  <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  </section>
  <router-link to="/cart" class="cart-fab">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C16.4696 17 15.9609 17.2107 15.5858 17.5858C15.2107 17.9609 15 18.4696 15 19C15 19.5304 15.2107 20.0391 15.5858 20.4142C15.9609 20.7893 16.4696 21 17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 18.0391 18.4142 17.5858C17.9609 17.2107 17.5304 17 17 17ZM9 19C9 19.5304 8.78929 20.0391 8.41421 20.4142C8.03914 20.7893 7.53043 21 7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19C5 18.4696 5.21071 18.0391 5.58579 17.5858C5.96086 17.2107 6.46957 17 7 17C7.53043 17 8.03914 17.2107 8.41421 17.5858C8.78929 17.9609 9 18.4696 9 19Z"/>
    </svg>
    <span v-if="cartItemsCount > 0" class="cart-badge" style="background: red !important; color: white !important; z-index: 9999 !important; display: flex !important;">{{ cartItemsCount }}</span>
  </router-link>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useProductStore } from '../stores/product'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'
import type { Product,Category} from '../types/Product'


const productStore = useProductStore()
const authStore = useAuthStore()
const cartStore = useCartStore()
const expandedParents = ref<Record<number, boolean>>({})

const cartItemsCount = computed(() => {
  return cartStore.itemsCount})

// ---------- Карусель коллекций ----------
const currentCollectionSlide = ref(0)
const prevCollectionSlide = () => { if (currentCollectionSlide.value > 0) currentCollectionSlide.value-- }
const nextCollectionSlide = () => {
  if (currentCollectionSlide.value < productStore.collections.length - 1) currentCollectionSlide.value++
}

// ---------- Фильтры ----------

const sortBy = ref('-created_at')
const selectedCategoryId = ref<number | null>(null)
const selectedBrandIds = ref<number[]>([])
const selectedColorId = ref<string>('')
const weightMin = ref<number | null>(null)
const weightMax = ref<number | null>(null)
const widthMin = ref<number | null>(null)
const widthMax = ref<number | null>(null)
const heightMin = ref<number | null>(null)
const heightMax = ref<number | null>(null)
const lengthMin = ref<number | null>(null)
const lengthMax = ref<number | null>(null)
const priceMin = ref<number | null>(null)
const priceMax = ref<number | null>(null)
const selectedCollection = ref<any>(null)
const isCollectionModalOpen = ref(false)

const openCollectionModal = (collection: any) => {
  selectedCollection.value = collection
  isCollectionModalOpen.value = true
}

const closeCollectionModal = () => {
  isCollectionModalOpen.value = false
  selectedCollection.value = null
}

const categories = computed(() => productStore.categories)
const brands = computed(() => productStore.brands)
const productColors = computed(() => productStore.colors)
const products = computed(() => productStore.products)

// Построение дерева категорий
const categoryTree = computed<Array<Category & { children: Category[] }>>(() => {
  const parents = categories.value.filter(c => c.parent === null)
  const childrenByParent: Record<number, Category[]> = {}
  categories.value.forEach(c => {
    if (c.parent !== null) {
      if (!childrenByParent[c.parent]) childrenByParent[c.parent] = []
      childrenByParent[c.parent].push(c)
    }
  })
  return parents.map(p => ({
    ...p,
    children: childrenByParent[p.id] || []
  }))
})


// Получить все ID категорий для выбранной (включая потомков, если выбрана родительская)
const getSelectedCategoryIds = (): number[] => {
  if (!selectedCategoryId.value) return []
  const selected = selectedCategoryId.value
  const parent = categoryTree.value.find(p => p.id === selected)
  if (parent) {
    const childIds = parent.children.map(c => c.id)
    return [selected, ...childIds]
  } else {
    return [selected]
  }
}

// Определить, выбрана ли родительская категория (для подсветки)
const isCategorySelected = (parent: Category & { children: Category[] }) => {
  if (!selectedCategoryId.value) return false
  if (selectedCategoryId.value === parent.id) return true
  return parent.children.some(child => child.id === selectedCategoryId.value)
}

const toggleParentExpand = (parentId: number) => {
  expandedParents.value[parentId] = !expandedParents.value[parentId]
}

const onCategorySelect = (parent: Category) => {
  // Можно оставить пустым, либо добавить логику, если нужно
}

// Загрузка товаров
const loadProducts = async () => {
  const params: Record<string, any> = {}
  if (sortBy.value) params.ordering = sortBy.value
  const selectedCats = getSelectedCategoryIds()
  if (selectedCats.length) params.category = selectedCats.join(',')
  if (selectedBrandIds.value.length) params.brand = selectedBrandIds.value.join(',')
  if (selectedColorId.value) params.color = selectedColorId.value
  if (weightMin.value !== null) params.weight_min = weightMin.value
  if (weightMax.value !== null) params.weight_max = weightMax.value
  if (widthMin.value !== null) params.width_min = widthMin.value
  if (widthMax.value !== null) params.width_max = widthMax.value
  if (heightMin.value !== null) params.height_min = heightMin.value
  if (heightMax.value !== null) params.height_max = heightMax.value
  if (lengthMin.value !== null) params.length_min = lengthMin.value
  if (lengthMax.value !== null) params.length_max = lengthMax.value
  if (priceMin.value !== null) params.price_min = priceMin.value
  if (priceMax.value !== null) params.price_max = priceMax.value
  await productStore.fetchProducts(params)
}

const resetFilters = () => {
  selectedCategoryId.value = null
  selectedBrandIds.value = []
  selectedColorId.value = ''
  weightMin.value = null
  weightMax.value = null
  widthMin.value = null
  widthMax.value = null
  heightMin.value = null
  heightMax.value = null
  lengthMin.value = null
  lengthMax.value = null
  priceMin.value = null
  priceMax.value = null
  sortBy.value = '-created_at'
  expandedParents.value = {}
}

watch(
  [sortBy, selectedCategoryId, selectedBrandIds, selectedColorId, weightMin, weightMax,
   widthMin, widthMax, heightMin, heightMax, lengthMin, lengthMax, priceMin, priceMax],
  () => loadProducts(),
  { deep: true }
)

// Утилиты
const getFullImageUrl = (path: string) => {
  if (!path) return ''
  if (path.startsWith('/media')) return import.meta.env.VITE_BACKEND_URL + path
  return path
}

const getMainImageUrl = (product: Product) => {
  if (product.main_image?.image) return getFullImageUrl(product.main_image.image)
  return 'https://via.placeholder.com/300x200?text=Нет+фото'
}

const addToCart = async (product: Product) => {
  if (!authStore.isAuthenticated) {
    console.warn('Для добавления в корзину необходимо авторизоваться')
    return
  }
  try {
    await cartStore.addToCart(product.id, 1)
    console.log(`Товар "${product.name}" добавлен в корзину`)
  } catch (err) {
    console.error('Ошибка при добавлении в корзину', err)
  }
}

const selectCollection = (collection: any) => {
  console.log('Выбрана подборка:', collection.name)
}

onMounted(async () => {
  await productStore.fetchColors()
  await productStore.fetchCategories()
  await productStore.fetchBrands()
  await productStore.fetchCollections()
  await loadProducts()
  await cartStore.fetchCart()
})
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

input, select, textarea, button {
  box-sizing: border-box;
}

@mixin glass-effect {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.05);
}

@mixin smooth-transition {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.department {
  position: relative;
  padding: 120px 2rem 80px;
  background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
  overflow: hidden;
  &__wrapper {
    max-width: 1200px;
    margin: 0 auto;
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
    animation: titleSlideUp 0.8s ease-out;
  }
  &__description {
    font-size: 1.25rem;
    color: $text-medium;
    max-width: 600px;
    margin: 0 auto;
    animation: fadeInUp 0.8s ease-out 0.2s both;
  }
}

.shop-section {
  position: relative;
  padding: 80px 2rem;
  background: $soft-white;
  min-height: 100vh;
  &__wrapper {
    max-width: 1400px;
    margin: 0 auto;
  }
}

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
  overflow: hidden;
  border-radius: 24px;
  @include glass-effect;
  padding: 0;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-slide {
  flex: 0 0 100%;
  position: relative;
  cursor: pointer;
  height: 400px;
  overflow: hidden;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.carousel-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: $light-grey;
  color: $text-medium;
  font-size: 3rem;
  p {
    margin-top: 1rem;
    font-size: 1rem;
  }
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
  &--left { left: 20px; }
  &--right { right: 20px; }
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

.shop-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  margin-top: 40px;
}

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
    &:last-child { margin-bottom: 0; }
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
  }
  &__radio, &__checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 0.95rem;
    color: $text-medium;
    &:hover { color: $primary-blue; }
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
      span:first-child { min-width: 70px; }
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
          background: rgba(255,255,255,0.8);
          &:focus { outline: none; border-color: $primary-blue; }
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
    min-width: 0;
    padding: 10px 12px;
    border: 1px solid $light-grey;
    border-radius: 12px;
    &:focus { outline: none; border-color: $primary-blue; }
  }
  span { color: $text-light; }
}

.select-wrapper {
  position: relative;
  select {
    width: 100%;
    padding: 14px 18px;
    border: 1px solid $light-grey;
    border-radius: 16px;
    background: $pure-white;
    appearance: none;
    cursor: pointer;
    &:focus { outline: none; border-color: $primary-blue; }
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

.shop-products {
  &__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  &__title { font-size: 1.8rem; font-weight: 700; color: $text-dark; }
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
  &__loading, &__error {
    text-align: center;
    padding: 60px;
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
    height: 200px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    &:hover img { transform: scale(1.1); }
  }
  &__info { padding: 20px; }
  &__name { font-size: 1.2rem; font-weight: 700; margin-bottom: 6px; }
  &__category { font-size: 0.9rem; color: $text-light; margin-bottom: 10px; }
  &__price { font-size: 1.4rem; font-weight: 700; color: $primary-blue; margin-bottom: 15px; }
  &__cart {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: $blue-gradient;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    @include smooth-transition;
    z-index: 2;
    &:hover { transform: scale(1.15); }
    svg {
      width: 24px;
      height: 24px;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
    }
  }
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

@keyframes titleSlideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1200px) {
  .shop-layout { grid-template-columns: 280px 1fr; gap: 30px; }
  .carousel-slide { height: 350px; }
  .carousel-title { font-size: 1.8rem; }
}
@media (max-width: 968px) {
  .shop-layout { grid-template-columns: 1fr; }
  .shop-filters { order: 2; margin-top: 40px; }
  .department { padding: 100px 1.5rem 60px; }
  .shop-section { padding: 60px 1.5rem; }
  .carousel-slide { height: 300px; }
}
@media (max-width: 768px) {
  .shop-products__grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
  .carousel-slide { height: 250px; }
  .carousel-overlay { padding: 20px; }
  .carousel-title { font-size: 1.3rem; }
}
@media (max-width: 480px) {
  .carousel-slide { height: 200px; }
  .carousel-arrow { width: 36px; height: 36px; }
  .carousel-overlay { padding: 15px; }
  .carousel-title { font-size: 1.1rem; }
}
.category-tree {
  .category-parent {
    margin-bottom: 0.5rem;
    &__header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.2s;
      .expand-icon {
        font-size: 0.75rem;
        color: $text-light;
        width: 20px;
        text-align: center;
      }
      .parent-name {
        flex: 1;
        font-weight: 500;
      }
      &:hover {
        background: rgba($primary-blue, 0.05);
      }
    }
    .category-children {
      margin-left: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      .category-child {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.4rem 0.5rem;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.2s;
        &.active {
          background: rgba($primary-blue, 0.08);
        }
        input[type="radio"] {
          accent-color: $primary-blue;
        }
        &:hover {
          background: rgba($primary-blue, 0.05);
        }
      }
    }
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
}

.modal-container {
  @include glass-effect;
  background: white;
  border-radius: 32px;
  max-width: 90vw;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
  text-align: center;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1.2rem;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: $text-light;
  transition: color 0.2s;
  &:hover {
    color: $primary-blue;
  }
}

.modal-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: $text-dark;
  margin: 0 0 1rem 0;
}

.modal-products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.modal-product-card {
  @include glass-effect;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }
  .product-card__link {
    display: block;
    text-decoration: none;
    color: inherit;
  }
  .product-card__image {
    height: 160px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }
    &:hover img {
      transform: scale(1.05);
    }
  }
  .product-card__info {
    padding: 0.75rem;
    text-align: left;
  }
  .product-card__name {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    line-height: 1.3;
  }
  .product-card__category {
    font-size: 0.75rem;
    color: $text-light;
    margin-bottom: 0.5rem;
  }
  .product-card__price {
    font-size: 1rem;
    font-weight: 700;
    color: $primary-blue;
  }
  .product-card__cart {
    position: absolute;
    bottom: 0.75rem;
    right: 0.75rem;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: $blue-gradient;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s;
    svg {
      width: 20px;
      height: 20px;
      filter: none;
    }
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>