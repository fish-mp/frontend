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

<style scoped>
.news-detail {
    padding: 2rem;
    max-width: 800px;
    margin: 100px auto;
}

.news-detail__wrapper {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.07);
    padding: 2rem;
}

.news-detail__back {
    display: inline-block;
    margin-bottom: 1rem;
    color: var(--color-turquoise);
}

.news-detail__title {
    font-size: 2rem;
    margin: 0.5rem 0;
}

.news-detail__date {
    color: var(--color-turquoise-dark);
    margin-bottom: 1.2rem;
    font-size: 1.1rem;
}

.badge {
    display: inline-block;
    margin-left: 10px;
    padding: 4px 12px;
    border-radius: 8px;
    font-size: 0.95em;
    font-weight: 500;
    vertical-align: middle;
}

.badge--gray {
    background: #757575;
    color: #fff;
}

.badge--turquoise {
    background: #10bebc;
    color: #fff;
}

.news-detail__slider {
    position: relative;
    width: 100%;
    margin-bottom: 1.5rem;
    border-radius: 12px;
    overflow: hidden;
}

.slider__image {
    width: 100%;
    height: 340px;
    object-fit: cover;
    border-radius: 12px;
    display: block;
}

.slider__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(22, 191, 166, 0.83);
    border: none;
    color: #fff;
    font-size: 2.3rem;
    padding: 0 18px;
    cursor: pointer;
    border-radius: 50%;
    z-index: 2;
    transition: background 0.15s;
    opacity: 0.82;
    user-select: none;
}

.slider__arrow--left {
    left: 16px;
}

.slider__arrow--right {
    right: 16px;
}

.slider__arrow:hover {
    background: #109ea0;
}

.slider__pagination {
    text-align: center;
    margin-top: 10px;
}

.slider__dot {
    display: inline-block;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #c2efea;
    margin: 0 5px;
    cursor: pointer;
    border: 1.5px solid #17a2b8;
    transition: background 0.17s;
}

.slider__dot.active {
    background: #17a2b8;
}

.news-detail__gallery-img {
    width: 100%;
    max-height: 340px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    display: block;
}

.news-detail__no-photo {
    padding: 1.5rem;
    background: #f1f8f7;
    color: #00bfa6;
    border-radius: 10px;
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.15rem;
}

.news-detail__desc {
    font-size: 1.13rem;
    margin-bottom: 1.2rem;
    line-height: 1.6;
}

.news-detail__register {
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 1.2rem;
    padding: 14px 0;
    background: linear-gradient(135deg, #10bebc 0%, #00BFA6 100%);
    color: #fff;
    border-radius: 8px;
    font-weight: 500;
    text-decoration: none;
    font-size: 1.13rem;
    transition: background 0.2s;
}

.news-detail__register:hover {
    background: linear-gradient(135deg, #0db3a8 0%, #009688 100%);
}

.news-detail__notfound {
    text-align: center;
    margin-top: 160px;
    color: #999;
    font-size: 1.2rem;
}

@media (max-width: 768px) {
    .news-detail {
        padding: 10px;
        margin: 80px auto 20px;
    }
}
</style>
