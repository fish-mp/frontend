<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useNewsStore } from '../stores/news';
import { useEventStore } from '../stores/event';
import { previewNews, previewEvents, schoolThemes, type SchoolKey } from '../data/portalPreview';
import SchoolBanner from '../components/portal/SchoolBanner.vue';
import EventCalendar from '../components/portal/EventCalendar.vue';

interface JournalItem {
  id: number;
  title: string;
  text: string;
  date: string;
  image?: string;
  status: string;
  school: SchoolKey;
  location: string;
  to: string;
}
const route = useRoute();
const newsStore = useNewsStore();
const eventStore = useEventStore();
const isEvents = computed(() => route.path.startsWith('/events'));
const status = ref('upcoming');
const school = ref<SchoolKey | 'all'>('all');
const selectedDate = ref('');
const notice = ref('');
const loading = computed(() => (isEvents.value ? eventStore.loading : newsStore.loading));
const error = computed(() => (isEvents.value ? eventStore.error : newsStore.error));
const allItems = computed<JournalItem[]>(() => {
  if (isEvents.value) {
    if (!import.meta.env.VITE_BACKEND_URL)
      return previewEvents.map((item) => ({
        ...item,
        text: item.description,
        to: `/events/${item.id}`,
      }));
    return eventStore.events.map((item) => ({
      ...item,
      text: item.description,
      image: item.photos?.[0]?.image,
      school: 'aquarium',
      to: `/events/${item.id}`,
    }));
  }
  if (!import.meta.env.VITE_BACKEND_URL)
    return previewNews.map((item) => ({
      ...item,
      date: item.created_at,
      location: '',
      status: '',
      to: `/news/${item.id}`,
    }));
  return newsStore.news.map((item) => ({
    ...item,
    date: item.created_at,
    image: item.photos?.[0]?.image,
    location: '',
    status: '',
    school: 'aquarium',
    to: `/news/${item.id}`,
  }));
});
const schoolItems = computed(() =>
  allItems.value.filter(
    (item) =>
      (school.value === 'all' || item.school === school.value) &&
      (!isEvents.value || item.status === status.value)
  )
);
const items = computed(() =>
  schoolItems.value
    .filter(
      (item) =>
        !isEvents.value || !selectedDate.value || item.date.slice(0, 10) === selectedDate.value
    )
    .sort((a, b) =>
      isEvents.value
        ? Date.parse(a.date) - Date.parse(b.date)
        : Date.parse(b.date) - Date.parse(a.date)
    )
);
const calendarEvents = computed(() =>
  schoolItems.value.map((item) => ({
    date: item.date,
    title: item.title,
    color: schoolThemes[item.school].color,
  }))
);
const featured = computed(() => items.value[0]);
const remainingNews = computed(() => items.value.slice(1));
function theme(item: JournalItem) {
  return {
    '--item-color': schoolThemes[item.school].color,
    '--item-tint': schoolThemes[item.school].tint,
  };
}
function imageUrl(path: string) {
  return path.startsWith('/') ? `${import.meta.env.VITE_BACKEND_URL || ''}${path}` : path;
}
function format(date: string, options: Intl.DateTimeFormatOptions) {
  return new Date(date).toLocaleDateString('ru-RU', options);
}
function eventInfo(item: JournalItem) {
  return `${format(item.date, { weekday: 'short', day: 'numeric', month: 'long' })} · ${new Date(item.date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Moscow' })} · ${item.location}`;
}
async function load() {
  if (!import.meta.env.VITE_BACKEND_URL) return;
  if (isEvents.value) await eventStore.fetchEvents();
  else await newsStore.fetchNews();
}
function reset() {
  selectedDate.value = '';
  school.value = 'all';
  status.value = 'upcoming';
}
watch(
  isEvents,
  () => {
    reset();
    notice.value = '';
    void load();
  },
  { immediate: true }
);
</script>

<template>
  <div class="ds-container ds-journal">
    <SchoolBanner :kind="isEvents ? 'events' : 'news'" />
    <div class="ds-content-filters">
      <div v-if="isEvents" class="ds-tabs ds-status-tabs" aria-label="Статус мероприятий">
        <button
          v-for="tab in [
            { value: 'upcoming', label: 'Предстоящие' },
            { value: 'finished', label: 'Прошедшие' },
          ]"
          :key="tab.value"
          :class="{ 'is-active': status === tab.value }"
          :aria-pressed="status === tab.value"
          @click="
            status = tab.value;
            selectedDate = '';
          "
        >
          {{ tab.label }}
        </button>
      </div>
      <div class="ds-school-filters" aria-label="Фильтр по школе">
        <button
          :class="{ 'is-active': school === 'all' }"
          @click="school = 'all'"
          :aria-pressed="school === 'all'"
        >
          {{ isEvents ? 'Все школы' : 'Все новости' }}</button
        ><button
          v-for="(value, key) in schoolThemes"
          v-show="!isEvents || key !== 'digital'"
          :key="key"
          :style="{ '--filter-color': value.color }"
          :class="{ 'is-active': school === key }"
          :aria-pressed="school === key"
          @click="school = key"
        >
          <i />{{ value.short }}
        </button>
      </div>
    </div>
    <div :class="{ 'ds-events-layout': isEvents }">
      <div class="ds-journal-results" aria-live="polite">
        <div v-if="loading" class="ds-empty" role="status">
          Загружаем {{ isEvents ? 'мероприятия' : 'новости' }}…
        </div>
        <div v-else-if="error" class="ds-empty" role="alert">
          <h2>Не удалось загрузить материалы</h2>
          <p>Попробуйте ещё раз немного позже.</p>
          <button class="ds-button" @click="load">Повторить</button>
        </div>
        <template v-else-if="items.length">
          <div v-if="isEvents" class="ds-event-list">
            <article v-for="item in items" :key="item.id" class="ds-event-row" :style="theme(item)">
              <div class="ds-event-date">
                <strong>{{ new Date(item.date).getDate() }}</strong
                ><span>{{ format(item.date, { month: 'short' }).replace('.', '') }}</span>
              </div>
              <div class="ds-event-copy">
                <h2>
                  <router-link :to="item.to">{{ item.title }}</router-link>
                </h2>
                <p>{{ eventInfo(item) }}</p>
                <span class="ds-colored-tag">{{ schoolThemes[item.school].label }}</span>
              </div>
              <router-link :to="item.to" class="ds-button ds-event-action">{{
                item.status === 'upcoming' ? 'Записаться' : 'Подробнее'
              }}</router-link>
            </article>
          </div>
          <template v-else>
            <article v-if="featured" class="ds-featured-news" :style="theme(featured)">
              <router-link :to="featured.to" class="ds-featured-image"
                ><img
                  v-if="featured.image"
                  :src="imageUrl(featured.image)"
                  :alt="featured.title"
                /><span v-else>Фото новости</span><i aria-hidden="true">✦</i></router-link
              >
              <div class="ds-featured-copy">
                <div>
                  <span class="ds-colored-tag">{{ schoolThemes[featured.school].label }}</span
                  ><time :datetime="featured.date">{{
                    format(featured.date, { day: 'numeric', month: 'long', year: 'numeric' })
                  }}</time>
                </div>
                <h2>
                  <router-link :to="featured.to">{{ featured.title }}</router-link>
                </h2>
                <p>{{ featured.text }}</p>
                <router-link :to="featured.to" class="ds-text-link">Читать далее →</router-link>
              </div>
            </article>
            <div class="ds-journal-grid ds-news-grid">
              <article
                v-for="item in remainingNews"
                :key="item.id"
                class="ds-journal-card ds-news-card"
                :style="theme(item)"
              >
                <router-link :to="item.to" class="ds-journal-image"
                  ><img
                    v-if="item.image"
                    :src="imageUrl(item.image)"
                    :alt="item.title"
                    loading="lazy"
                  /><span v-else>Обложка новости</span
                  ><span class="ds-colored-tag">{{
                    schoolThemes[item.school].label
                  }}</span></router-link
                >
                <div class="ds-journal-copy">
                  <time :datetime="item.date">{{
                    format(item.date, { day: 'numeric', month: 'long', year: 'numeric' })
                  }}</time>
                  <h2>
                    <router-link :to="item.to">{{ item.title }}</router-link>
                  </h2>
                  <p>{{ item.text }}</p>
                  <router-link :to="item.to" class="ds-text-link">Читать →</router-link>
                </div>
              </article>
            </div>
          </template>
        </template>
        <div v-else class="ds-empty">
          <h2>{{ isEvents ? 'Мероприятий пока нет' : 'Новостей пока нет' }}</h2>
          <p>
            {{
              selectedDate
                ? 'В выбранный день событий не запланировано.'
                : 'Выберите другую школу или следите за новыми публикациями.'
            }}
          </p>
          <button class="ds-button ds-button--outline" @click="reset">Сбросить фильтры</button>
        </div>
      </div>
      <aside v-if="isEvents" class="ds-events-sidebar">
        <EventCalendar v-model="selectedDate" :events="calendarEvents" />
        <section class="ds-announcement-card">
          <h2>Не пропустите анонсы</h2>
          <p>Подпишитесь, и мы напомним о ближайших мероприятиях.</p>
          <button
            class="ds-button ds-button--white"
            @click="notice = 'Подписка станет доступна после запуска.'"
          >
            Подписаться
          </button>
          <p v-if="notice" role="status">{{ notice }}</p>
        </section>
      </aside>
    </div>
  </div>
</template>
