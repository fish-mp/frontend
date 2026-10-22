<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import SchoolBanner from '../components/portal/SchoolBanner.vue';
import { previewProducts } from '../data/portalPreview';
import { useProductStore } from '../stores/product';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';

const products = useProductStore();
const cart = useCartStore();
const auth = useAuthStore();
const category = ref('Все товары'),
  search = ref(''),
  sort = ref('popular'),
  page = ref(1),
  notice = ref('');
const favorites = ref<string[]>([]);
const busy = ref<string | null>(null);
const preview = !import.meta.env.VITE_BACKEND_URL;
const categories = computed(() => [
  'Все товары',
  ...new Set(
    preview
      ? ['Канцелярия', 'Одежда', 'Творчество', 'Для аквариума', 'Книги']
      : products.products
          .map((item) => item.category?.name || item.category_name || '')
          .filter(Boolean)
  ),
]);
const all = computed(() =>
  preview
    ? previewProducts.map((item) => ({ ...item, image: '', available: false }))
    : products.products.map((item) => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        category: item.category?.name || item.category_name || '',
        color: '#8a2be2',
        tint: '#efe0ff',
        badge: item.is_new ? 'Новинка' : '',
        image: item.main_image?.image_url || item.main_image?.image || '',
        available: item.is_in_stock,
      }))
);
const filtered = computed(() => {
  const result = all.value.filter(
    (item) =>
      (category.value === 'Все товары' || item.category === category.value) &&
      item.name.toLocaleLowerCase('ru').includes(search.value.trim().toLocaleLowerCase('ru'))
  );
  if (sort.value === 'price') result.sort((a, b) => a.price - b.price);
  if (sort.value === '-price') result.sort((a, b) => b.price - a.price);
  if (sort.value === 'name') result.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
  return result;
});
const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / 12)));
const visible = computed(() => filtered.value.slice((page.value - 1) * 12, page.value * 12));
watch([category, search, sort], () => {
  page.value = 1;
});
function imageUrl(path: string) {
  return path.startsWith('/') ? `${import.meta.env.VITE_BACKEND_URL || ''}${path}` : path;
}
function toggleFavorite(id: string) {
  favorites.value = favorites.value.includes(id)
    ? favorites.value.filter((value) => value !== id)
    : [...favorites.value, id];
}
async function add(id: string) {
  if (preview) {
    notice.value = 'Магазин готовится к открытию. Оформление заказов пока недоступно.';
    return;
  }
  if (!auth.isAuthenticated) {
    notice.value = 'Войдите в аккаунт, чтобы добавить товар в корзину.';
    return;
  }
  busy.value = id;
  try {
    await cart.addToCart(id);
    notice.value = 'Товар добавлен в корзину.';
  } catch {
    notice.value = 'Не удалось добавить товар. Попробуйте ещё раз.';
  } finally {
    busy.value = null;
  }
}
async function load() {
  if (!preview) await products.fetchProducts();
}
onMounted(load);
</script>
<template>
  <div class="ds-container ds-school-shop">
    <SchoolBanner kind="shop" />
    <div class="ds-shop-toolbar">
      <div class="ds-tabs" aria-label="Категория товаров">
        <button
          v-for="name in categories"
          :key="name"
          :class="{ 'is-active': category === name }"
          :aria-pressed="category === name"
          @click="category = name"
        >
          {{ name }}
        </button>
      </div>
      <label class="ds-search"
        ><span class="ds-visually-hidden">Поиск товаров</span
        ><input v-model="search" type="search" placeholder="Поиск товаров"
      /></label>
    </div>
    <div class="ds-shop-summary">
      <p>Найдено {{ filtered.length }} товаров</p>
      <label
        ><span class="ds-visually-hidden">Сортировка товаров</span
        ><select v-model="sort">
          <option value="popular">Сначала популярные</option>
          <option value="price">Сначала дешевле</option>
          <option value="-price">Сначала дороже</option>
          <option value="name">По названию</option>
        </select></label
      >
    </div>
    <p v-if="notice" class="ds-shop-notice" role="status">
      {{ notice }}
      <router-link v-if="!preview && auth.isAuthenticated" to="/cart"
        >Перейти в корзину →</router-link
      ><button aria-label="Закрыть уведомление" @click="notice = ''">×</button>
    </p>
    <div v-if="products.loading" class="ds-empty" role="status">Загружаем товары…</div>
    <div v-else-if="products.error" class="ds-empty" role="alert">
      <h2>Не удалось загрузить магазин</h2>
      <button class="ds-button" @click="load">Повторить</button>
    </div>
    <div v-else-if="visible.length" class="ds-shop-grid">
      <article
        v-for="item in visible"
        :key="item.id"
        class="ds-product-card"
        :style="{ '--product-color': item.color, '--product-tint': item.tint }"
      >
        <div class="ds-product-image">
          <img v-if="item.image" :src="imageUrl(item.image)" :alt="item.name" loading="lazy" /><span
            v-else
            class="ds-product-placeholder"
            >Фото товара</span
          ><span
            v-if="item.badge"
            class="ds-product-badge"
            :class="{ 'is-new': item.badge === 'Новинка', 'is-sale': item.badge === 'Скидка' }"
            >{{ item.badge }}</span
          ><button
            class="ds-product-favorite"
            :class="{ 'is-active': favorites.includes(item.id) }"
            :aria-label="`${favorites.includes(item.id) ? 'Убрать из избранного' : 'В избранное'}: ${item.name}`"
            :aria-pressed="favorites.includes(item.id)"
            @click="toggleFavorite(item.id)"
          >
            {{ favorites.includes(item.id) ? '♥' : '♡' }}
          </button>
        </div>
        <div class="ds-product-copy">
          <h2>
            <span v-if="preview">{{ item.name }}</span
            ><router-link v-else :to="`/shop/${item.id}`">{{ item.name }}</router-link>
          </h2>
          <div>
            <strong>{{ item.price.toLocaleString('ru-RU') }} ₽</strong
            ><button
              class="ds-product-add"
              :disabled="busy === item.id || (!preview && !item.available)"
              :aria-label="`Добавить в корзину: ${item.name}`"
              @click="add(item.id)"
            >
              +
            </button>
          </div>
        </div>
      </article>
    </div>
    <div v-else class="ds-empty">
      <h2>Товары не найдены</h2>
      <p>Попробуйте изменить поиск или категорию.</p>
      <button
        class="ds-button ds-button--outline"
        @click="
          search = '';
          category = 'Все товары';
        "
      >
        Сбросить фильтры
      </button>
    </div>
    <nav v-if="pageCount > 1" class="ds-pagination" aria-label="Страницы товаров">
      <button
        v-for="index in pageCount"
        :key="index"
        :aria-current="index === page ? 'page' : undefined"
        :class="{ 'is-active': index === page }"
        @click="page = index"
      >
        {{ index }}
      </button>
    </nav>
  </div>
</template>
