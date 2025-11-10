<template>
    <section class="news-detail" v-if="event">
        <div class="news-detail__wrapper">
            <router-link to="/events" class="news-detail__back">&larr; Мероприятия</router-link>
            <h1 class="news-detail__title">{{ event.title }}</h1>
            <p class="news-detail__date">
                {{ formatDate(event.date) }} · {{ event.location }}
                <span v-if="event.status === 'finished'" class="badge badge--gray">Прошедшее</span>
                <span v-else class="badge badge--turquoise">Скоро</span>
            </p>
            <div v-if="event.status === 'finished' && event.photos && event.photos.length" class="news-detail__slider">
                <button v-if="event.photos.length > 1" class="slider__arrow slider__arrow--left"
                    @click="prevSlide">&#8592;</button>
                <img :src="getPhotoUrl(event.photos[currentSlide].image)" class="slider__image" />
                <button v-if="event.photos.length > 1" class="slider__arrow slider__arrow--right"
                    @click="nextSlide">&#8594;</button>
                <div class="slider__pagination" v-if="event.photos.length > 1">
                    <span v-for="(photo, idx) in event.photos" :key="photo.id"
                        :class="['slider__dot', { active: idx === currentSlide }]" @click="goToSlide(idx)"></span>
                </div>
            </div>
            <div v-else-if="event.photos && event.photos.length" class="news-detail__gallery">
                <img :src="getPhotoUrl(event.photos[0].image)" class="news-detail__gallery-img" />
            </div>
            <div v-else class="news-detail__no-photo">
                Нет фотографий мероприятия
            </div>
            <div class="news-detail__content">
                <p class="news-detail__desc">{{ event.description }}</p>
                <a v-if="event.registration_link && event.status === 'upcoming'" :href="event.registration_link"
                    target="_blank" class="news-detail__register">
                    Зарегистрироваться на мероприятие
                </a>
                <div v-if="event.certificates && event.certificates.length">
                    <h3>Сертификаты</h3>
                    <ul>
                        <li v-for="(cert, idx) in event.certificates" :key="idx">
                            {{ cert.name || 'Сертификат #' + (idx + 1) }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <section v-else class="news-detail__notfound">
        <p>Мероприятие не найдено</p>
        <router-link to="/" class="news-detail__back">&larr; Главная</router-link>
    </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEventStore } from '../stores/event'

const eventStore = useEventStore()
const route = useRoute()
const router = useRouter()

function getPhotoUrl(photoPath: string): string {
    if (!photoPath) return ""
    if (photoPath.startsWith("http://localhost/media")) {
        return photoPath.replace("http://localhost", "http://127.0.0.1:8000");
    }
    if (photoPath.startsWith("http://127.0.0.1/media")) {
        return photoPath.replace("http://127.0.0.1", "http://127.0.0.1:8000");
    }
    if (photoPath.startsWith("http://127.0.0.1:8000")) {
        return photoPath;
    }
    if (photoPath.startsWith("/media")) {
        return "http://127.0.0.1:8000" + photoPath;
    }
    return photoPath;
}

const event = computed(() => {
    const idParam = Number(route.params.id)
    return eventStore.events.find(ev => ev.id === idParam)
})

const currentSlide = ref(0)
function prevSlide() {
    if (!event.value?.photos) return
    currentSlide.value = (currentSlide.value - 1 + event.value.photos.length) % event.value.photos.length
}
function nextSlide() {
    if (!event.value?.photos) return
    currentSlide.value = (currentSlide.value + 1) % event.value.photos.length
}
function goToSlide(idx: number) {
    currentSlide.value = idx
}

function formatDate(date: string): string {
    const [yyyy, mm, dd] = date.slice(0, 10).split('-')
    return `${dd}.${mm}.${yyyy}`
}

if (!event.value && !eventStore.loading) {
    setTimeout(() => router.replace('/'), 1800)
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/EventDetail.scss';
</style>