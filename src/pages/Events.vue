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

            <ul v-if="filteredEvents.length" class="section__list">
                <li class="news__item" v-for="event in filteredEvents" :key="event.id"
                    :class="{ 'news__item--finished': event.status === 'finished' }">
                    <router-link :to="{ name: 'EventDetail', params: { id: event.id } }" class="news__link">
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
            <h2 v-else class="active__title">На выбранную дату событий нет</h2>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useEventStore } from "../stores/event";
import type { EventItem } from "../types/Event";

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

<style lang="scss" scoped>
@import '../assets/scss/EventsPage.scss';
</style>