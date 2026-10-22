<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useNewsStore } from '../stores/news';
import { useEventStore } from '../stores/event';
import PortalIcon from '../components/portal/PortalIcon.vue';
import { previewEvents, previewNews, schoolThemes, type SchoolKey } from '../data/portalPreview';

const route = useRoute();
const newsStore = useNewsStore();
const eventStore = useEventStore();
const isEvent = computed(() => route.path.startsWith('/events/'));
const loading = ref(true);
const error = computed(() => (isEvent.value ? eventStore.error : newsStore.error));
const article = computed(() => {
  const id = Number(route.params.id);
  if (isEvent.value) {
    const event = (import.meta.env.VITE_BACKEND_URL ? eventStore.events : previewEvents).find(
      (item) => item.id === id
    );
    return event
      ? {
          title: event.title,
          school: ('school' in event ? event.school : 'aquarium') as SchoolKey,
          text: event.description,
          date: event.date,
          photos: 'photos' in event ? event.photos : [],
          location: event.location,
          registration: event.registration_link,
          upcoming: event.status === 'upcoming',
        }
      : undefined;
  }
  const post = (import.meta.env.VITE_BACKEND_URL ? newsStore.news : previewNews).find(
    (item) => item.id === id
  );
  return post
    ? {
        title: post.title,
        school: ('school' in post ? post.school : 'aquarium') as SchoolKey,
        text: post.text,
        date: post.created_at,
        photos: 'photos' in post ? post.photos : [],
        location: '',
        registration: '',
        upcoming: false,
      }
    : undefined;
});
function imageUrl(path: string) {
  return path.startsWith('/') ? `${import.meta.env.VITE_BACKEND_URL || ''}${path}` : path;
}
const registrationUrl = computed(() => {
  try {
    const url = new URL(article.value?.registration || '');
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
});
async function load() {
  loading.value = true;
  try {
    if (import.meta.env.VITE_BACKEND_URL) {
      if (isEvent.value) await eventStore.fetchEvents();
      else await newsStore.fetchNews();
    }
  } finally {
    loading.value = false;
  }
}
watch(() => route.fullPath, load, { immediate: true });
</script>

<template>
  <div class="ds-container ds-article">
    <router-link :to="isEvent ? '/events' : '/news'" class="ds-text-link"
      >← {{ isEvent ? 'Все мероприятия' : 'Все новости' }}</router-link
    >
    <div v-if="loading" class="ds-empty" role="status">Загружаем материал…</div>
    <div v-else-if="error" class="ds-empty" role="alert">
      <h1>Не удалось загрузить материал</h1>
      <button class="ds-button" @click="load">Повторить</button>
    </div>
    <article v-else-if="article">
      <span class="ds-school-tag">{{ schoolThemes[article.school].label }}</span>
      <h1>{{ article.title }}</h1>
      <time :datetime="article.date">{{
        new Date(article.date).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      }}</time>
      <div v-if="article.photos?.length" class="ds-article-photos">
        <figure v-for="photo in article.photos" :key="photo.id">
          <img
            :src="imageUrl(photo.image)"
            :alt="photo.description || article.title"
            loading="lazy"
          />
          <figcaption v-if="photo.description">{{ photo.description }}</figcaption>
        </figure>
      </div>
      <p class="ds-article-text">{{ article.text }}</p>
      <p v-if="article.location">Место: {{ article.location }}</p>
      <p v-if="article.upcoming && !registrationUrl">Информация о записи появится позже.</p>
      <a
        v-if="registrationUrl && article.upcoming"
        :href="registrationUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="ds-button"
        >Записаться на мероприятие <PortalIcon name="arrow" :size="20"
      /></a>
    </article>
    <div v-else class="ds-empty">
      <h1>Материал не найден</h1>
      <p>Возможно, он был удалён или ссылка устарела.</p>
      <router-link :to="isEvent ? '/events' : '/news'" class="ds-button"
        >Вернуться к списку</router-link
      >
    </div>
  </div>
</template>
