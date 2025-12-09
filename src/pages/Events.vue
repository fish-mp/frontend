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
            <!-- Контейнер для фильтров -->
            <div class="filters__wrapper">
                <!-- Левая часть с фильтром по дате -->
                <div class="filter-group">
                    <label for="date-filter" class="filter__label">Фильтр по дате:</label>
                    <div class="select-wrapper date-wrapper">
                        <input 
                            id="date-filter"
                            type="date" 
                            v-model="selectedDate" 
                            class="filter-input date-input"
                            :class="{ 'has-value': selectedDate }"
                            placeholder="Выберите дату"
                        />
                        <div class="calendar-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                        </div>
                        <button 
                            v-if="selectedDate" 
                            @click="clearDateFilter" 
                            class="clear-filter" 
                            aria-label="Очистить фильтр"
                            type="button"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Правая часть с фильтром по статусу -->
                <div class="filter-group status-group">
                    <label class="filter__label">Фильтр по статусу:</label>
                    <div class="status-buttons">
                        <button 
                            @click="toggleStatus('all')" 
                            :class="{ 'active': selectedStatus === 'all' }" 
                            class="status-btn"
                            type="button"
                        >
                            Все события
                        </button>
                        <button 
                            @click="toggleStatus('upcoming')" 
                            :class="{ 'active': selectedStatus === 'upcoming' }" 
                            class="status-btn"
                            type="button"
                        >
                            Скоро
                        </button>
                        <button 
                            @click="toggleStatus('finished')" 
                            :class="{ 'active': selectedStatus === 'finished' }" 
                            class="status-btn"
                            type="button"
                        >
                            Прошедшие
                        </button>
                    </div>
                </div>
            </div>

            <!-- Список событий -->
            <div v-if="isLoading" class="loading-container">
                <div class="loading-spinner"></div>
                <p class="loading-text">Загрузка событий...</p>
            </div>

            <ul v-else-if="filteredEvents.length" class="section__list">
                <li class="news__item" v-for="event in filteredEvents" :key="event.id"
                    :class="{ 'news__item--finished': event.status === 'finished' }">
                    <router-link :to="{ name: 'EventDetail', params: { id: event.id } }" class="news__link">
                        <div class="news__image">
                            <template v-if="event.status === 'upcoming'">
                                <div class="news__image--soon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    <span>Мероприятие скоро начнется</span>
                                </div>
                            </template>
                            <template v-else>
                                <img 
                                    v-if="event.photos && event.photos.length > 0"
                                    :src="getPhotoUrl(event.photos[0].image)" 
                                    :alt="event.title" 
                                    class="news__icon" 
                                    @error="handleImageError"
                                />
                                <div v-else class="news__image--no-photo">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                        <polyline points="21 15 16 10 5 21"></polyline>
                                    </svg>
                                    <span>Нет фото</span>
                                </div>
                            </template>
                            <span class="news__status" :class="event.status">
                                {{ event.status === 'finished' ? 'ПРОШЕДШЕЕ' : 'СКОРО' }}
                            </span>
                        </div>

                        <div class="news__container">
                            <div class="news__meta">
                                <span class="news__date">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    {{ formatDate(event.date) }}
                                </span>
                                <span class="news__location">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    {{ event.location }}
                                </span>
                            </div>
                            <h3 class="news__subtitle">{{ event.title }}</h3>
                            <p class="news__description">{{ getShortDescription(event) }}</p>
                            <div class="news__footer">
                                <span class="news__read-more">
                                    Подробнее
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
            
            <div v-else class="no-events">
                <div class="no-events__icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                </div>
                <h2 class="no-events__title">Событий не найдено</h2>
                <p class="no-events__description">
                    {{ selectedDate || selectedStatus !== 'all' ? 'Попробуйте изменить параметры фильтрации' : 'В данный момент нет доступных событий' }}
                </p>
                <button 
                    v-if="selectedDate || selectedStatus !== 'all'" 
                    @click="resetFilters" 
                    class="no-events__button"
                    type="button"
                >
                    Сбросить фильтры
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useEventStore } from "../stores/event";
import type { EventItem } from "../types/Event";

const eventStore = useEventStore();
const selectedDate = ref<string>("");
const selectedStatus = ref<string>("all");
const isLoading = ref<boolean>(true);

onMounted(async () => {
    try {
        await eventStore.fetchEvents();
    } finally {
        isLoading.value = false;
    }
});

function getShortDescription(event: EventItem): string {
    return event.description.length > 120
        ? event.description.slice(0, 120) + "..."
        : event.description;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function getPhotoUrl(photoPath: string): string {
    if (!photoPath) return "";
    
    // Обработка различных форматов URL
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
    
    // Для относительных путей
    if (photoPath.startsWith("media/")) {
        return "http://127.0.0.1:8000/" + photoPath;
    }
    
    return photoPath;
}

function handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    const container = img.parentElement;
    if (container) {
        const noPhotoDiv = document.createElement('div');
        noPhotoDiv.className = 'news__image--no-photo';
        noPhotoDiv.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span>Нет фото</span>
        `;
        container.appendChild(noPhotoDiv);
    }
}

function clearDateFilter(): void {
    selectedDate.value = "";
}

function toggleStatus(status: string): void {
    selectedStatus.value = status;
}

function resetFilters(): void {
    selectedDate.value = "";
    selectedStatus.value = "all";
}

const filteredEvents = computed(() => {
    let filtered = eventStore.events;
    
    // Фильтрация по дате
    if (selectedDate.value) {
        filtered = filtered.filter((event: EventItem) => {
            return event.date.slice(0, 10) === selectedDate.value;
        });
    }
    
    // Фильтрация по статусу
    if (selectedStatus.value !== 'all') {
        filtered = filtered.filter((event: EventItem) => {
            return event.status === selectedStatus.value;
        });
    }
    
    // Сортировка: сначала предстоящие, затем прошедшие
    return filtered.sort((a: EventItem, b: EventItem) => {
        if (a.status === 'upcoming' && b.status === 'finished') return -1;
        if (a.status === 'finished' && b.status === 'upcoming') return 1;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/EventsPage.scss';
</style>