<template>
    <section class="department">
        <div class="department__wrapper">
            <span id="bg-circle-1"></span>
            <span id="bg-circle-2"></span>
            <h1 class="department__title">События и рыбки</h1>
            <p class="department__description">
                Здесь вы сможете более подробно познакомиться с последними новостями. У вас появится возможность
                пополнить свой багаж знаний.
            </p>
        </div>
    </section>

    <section class="news">
        <span id="bg-circle-5"></span>
        <div class="news__wrapper">
            <div class="news__wrapper">
                <label class="news__filter">
                    Выберите соответствующую дату
                    <input type="date" v-model="selectedDate" class="news__date-input" placeholder="Выберите дату" />
                </label>
            </div>

            <ul class="section__list">
                <li class="news__item" v-for="event in filteredEvents" :key="event.id"
                    :class="{ 'news__item--finished': event.status === 'finished' }">
                    <router-link :to="{ name: 'CardDetail', params: { id: event.id } }" class="news__link">
                        <div class="news__image">
                            <template v-if="event.status === 'upcoming'">
                                <div class="news__image--soon">
                                    Мероприятие еще не началось
                                </div>
                            </template>
                            <template v-else>
                                <img v-if="event.photos && event.photos.length > 0"
                                    :src="getPhotoUrl(event.photos[0].image)" alt="" class="news__icon" />
                                <div v-else class="news__image--no-photo">
                                    Нет фото
                                </div>
                            </template>
                            <span class="news__status" :class="event.status">
                                {{ event.status === 'finished' ? 'ПРОШЕДШЕЕ' : 'СКОРО' }}
                            </span>
                        </div>

                        <div class="news__container">
                            <p class="news__date">
                                {{ event.date.slice(0, 10).split('-').reverse().join('.') }} - {{ event.location }}
                            </p>
                            <h3 class="news__subtitle">{{ event.title }}</h3>
                            <p class="news__description">{{ getShortDescription(event) }}</p>
                        </div>
                    </router-link>
                </li>
            </ul>

            <router-link to="/news" class="news__more-link news__more-link--second">
                ВСЕ НОВОСТИ
            </router-link>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useEventStore } from "../stores/event";
import { EventItem } from "../types/Event";

const eventStore = useEventStore();
const selectedDate = ref<string>("");

onMounted(() => {
    eventStore.fetchEvents();
});

function getShortDescription(event: EventItem): string {
    return event.description.length > 80
        ? event.description.slice(0, 80) + "..."
        : event.description;
}

function getPhotoUrl(photoPath: string): string {
    if (!photoPath) return "";
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

const filteredEvents = computed(() => {
    if (!selectedDate.value) return eventStore.events;
    return eventStore.events.filter((event: EventItem) => {
        return event.date.slice(0, 10) === selectedDate.value;
    });
});
</script>

<style scoped>
.section__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 0;
    margin: 0;
}

.news__item {
    list-style: none;
}

.news__filter {
    margin: 20px;
    font-size: 1.1rem;
    color: var(--color-text);
}

.news__wrapper {
    margin-bottom: 20px;
}

.news__date-input {
    width: 100%;
    max-width: 300px;
    padding: 14px 16px;
    font-size: 1.2rem;
    border: 2px solid var(--color-turquoise);
    border-radius: 8px;
    background-color: #e8f5e9;
    color: var(--color-text);
    font-family: inherit;
    transition: border-color 0.3s ease, background-color 0.3s ease;
    outline: none;
}

@media (max-width: 768px) {
    .section__list {
        grid-template-columns: 1fr;
    }
}

.news__item--finished {
    filter: grayscale(0.5) brightness(0.85);
    background: #f4f4f6;
}

.news__status {
    position: absolute;
    top: 8px;
    left: 8px;
    padding: 4px 10px;
    border-radius: 8px;
    font-size: 0.95em;
    color: #fff;
    background: #17a2b8;
    opacity: 0.95;
    z-index: 2;
    font-weight: bold;
    letter-spacing: 1px;
    text-shadow: 0 1px 4px #111;
}

.news__status.finished {
    background: #757575;
}

.news__status.upcoming {
    background: #009688;
}

.news__image {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    overflow: hidden;
}

.news__image--soon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1ad3c1 0%, #00BFA6 100%);
    color: #fff;
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
}
</style>
