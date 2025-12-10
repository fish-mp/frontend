<template>
  <section class="department">
    <div class="department__wrapper">
      <span id="bg-circle-1"></span>
      <span id="bg-circle-2"></span>
      <h1 class="department__title">Мои курсы</h1>
      <p class="department__description">
        Здесь вы найдете все курсы, на которые вы записались. Продолжайте обучение и отслеживайте свой прогресс!
      </p>
    </div>
  </section>

  <section class="news">
    <span id="bg-circle-5"></span>
    <div class="news__wrapper">
      <div v-if="!isAuth" class="auth-required">
        <div class="auth-required__icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h2 class="auth-required__title">Требуется авторизация</h2>
        <p class="auth-required__description">
          Для просмотра ваших курсов необходимо войти в систему.
        </p>
        
      </div>

      <div v-else>
        <div class="filters__wrapper">
          <div class="search__container">
            <label for="search-input" class="search__label">
              <svg class="search__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input 
                id="search-input" 
                v-model="searchQuery" 
                type="text" 
                placeholder="Поиск по названию курса..." 
                class="search__input"
              />
              <button v-if="searchQuery" @click="clearSearch" class="search__clear" aria-label="Очистить поиск">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
              </button>
            </label>
          </div>

          <label for="status-select" class="difficulty__label">Фильтр по статусу:</label>
          <div class="select-wrapper">
            <select id="status-select" v-model="selectedStatus" class="filter-select">
              <option value="">Все статусы</option>
              <option value="enrolled">Записан</option>
              <option value="in_progress">В процессе</option>
              <option value="completed">Завершен</option>
            </select>
            <div class="select-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        <div v-if="isLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">Загрузка курсов...</p>
        </div>

        <div v-else-if="error" class="error-container">
          <div class="error-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 8v4M12 16h.01"/>
            </svg>
          </div>
          <h2 class="error-title">Ошибка загрузки</h2>
          <p class="error-description">{{ error }}</p>
          <button @click="fetchMyCourses" class="error-button">Попробовать снова</button>
        </div>

        <ul v-else-if="filteredCourses.length" class="section__list">
          <li class="news__item" v-for="course in filteredCourses" :key="course.id">
            <router-link :to="{ name: 'CourseDetail', params: { id: course.id } }" class="news__link">
              <div class="news__image">
                <img :src="course.image" :alt="course.title" class="news__icon" />
                <span class="news__status" :class="course.enrollment_state">
                  {{ getStatusText(course.enrollment_state) }}
                </span>
              </div>
              <div class="news__container">
                <div class="course-meta">
                  <span class="course-difficulty" :class="course.tag?.name?.toLowerCase()">
                    {{ course.tag?.name || 'Не указано' }}
                  </span>
                  <span class="course-progress" v-if="course.progress !== undefined">
                    Прогресс: {{ course.progress }}%
                  </span>
                </div>
                <h3 class="news__subtitle">{{ course.title }}</h3>
                <p class="news__description">{{ course.short_description }}</p>
                <div class="news__footer">
                  <span class="news__read-more">
                    Продолжить обучение
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        
        <div v-else class="no-courses">
          <div class="no-courses__icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <h2 class="no-courses__title">Курсов пока нет</h2>
          <p class="no-courses__description">
            {{ searchQuery || selectedStatus ? 'Попробуйте изменить параметры фильтрации' : 'Вы еще не записались ни на один курс' }}
          </p>
          <router-link 
            v-if="!searchQuery && !selectedStatus"
            to="/courses" 
            class="no-courses__button"
          >
            Перейти к курсам
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

import type { Course } from "../types/Course";

const router = useRouter();
const authStore = useAuthStore();


const searchQuery = ref<string>("");
const selectedStatus = ref<string>("");
const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);
const myCourses = ref<Course[]>([]);

const isAuth = computed(() => authStore.isAuthenticated);

const fetchMyCourses = async () => {
  if (!isAuth.value) return;
  
  try {
    isLoading.value = true;
    error.value = null;
    
    const response = await fetch('http://127.0.0.1:8000/api/courses/my/', {
      headers: {
        'Authorization': `Bearer ${authStore.accessToken}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Ошибка загрузки курсов');
    }
    
    myCourses.value = await response.json();
  } catch (err: any) {
    error.value = err.message;
    console.error('Ошибка загрузки моих курсов:', err);
  } finally {
    isLoading.value = false;
  }
};

const filteredCourses = computed(() => {
  let filtered = myCourses.value;

  // Фильтрация по поисковому запросу
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    filtered = filtered.filter(
      (course) => course.title.toLowerCase().includes(query)
    );
  }

  // Фильтрация по статусу
  if (selectedStatus.value) {
    filtered = filtered.filter(
      (course) => course.enrollment_state === selectedStatus.value
    );
  }

  return filtered;
});

const clearSearch = () => {
  searchQuery.value = "";
};

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    'enrolled': 'Записан',
    'in_progress': 'В процессе',
    'completed': 'Завершен',
    'applied': 'Ожидает подтверждения'
  };
  return statusMap[status] || status;
};


onMounted(() => {
  if (isAuth.value) {
    fetchMyCourses();
  }
});
</script>

<style lang="scss" scoped>
@import '../assets/scss/Courses.scss';

// Дополнительные стили для страницы Мои курсы
.auth-required {
  text-align: center;
  padding: 80px 0;
  
  &__icon {
    margin-bottom: 24px;
    
    svg {
      color: $primary-blue;
    }
  }
  
  &__title {
    font-size: 1.8rem;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 16px;
    font-family: 'Inter', sans-serif;
  }
  
  &__description {
    font-size: 1.1rem;
    color: $text-medium;
    margin-bottom: 32px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.5;
  }
  
  &__actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  &__button {
    padding: 12px 28px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
    
    &--primary {
      background: $blue-gradient;
      color: $pure-white;
      box-shadow: 0 4px 15px rgba(23, 61, 237, 0.3);
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(23, 61, 237, 0.4);
      }
    }
    
    &--secondary {
      background: transparent;
      color: $primary-blue;
      border: 2px solid $primary-blue;
      
      &:hover {
        background: rgba(23, 61, 237, 0.08);
        transform: translateY(-2px);
      }
    }
  }
}

.course-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}

.course-difficulty {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background: rgba(23, 61, 237, 0.1);
  color: $primary-blue;
  
  &.новичок {
    background: rgba(0, 191, 166, 0.1);
    color: #00BFA6;
  }
  
  &.продвинутый {
    background: rgba(255, 183, 77, 0.1);
    color: #FFB74D;
  }
  
  &.эксперт {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }
}

.course-progress {
  font-size: 0.85rem;
  font-weight: 600;
  color: $text-medium;
  background: rgba(255, 255, 255, 0.7);
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.news__status {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  color: $pure-white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  
  &.enrolled {
    background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
  }
  
  &.in_progress {
    background: linear-gradient(135deg, #2196F3 0%, #0D47A1 100%);
  }
  
  &.completed {
    background: linear-gradient(135deg, #9C27B0 0%, #6A1B9A 100%);
  }
  
  &.applied {
    background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%);
  }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  text-align: center;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid $light-grey;
  border-top-color: $primary-blue;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

.loading-text {
  font-size: 1.1rem;
  color: $text-medium;
  font-weight: 500;
}

.error-container {
  text-align: center;
  padding: 80px 0;
  
  .error-icon {
    margin-bottom: 24px;
    
    svg {
      color: #ef4444;
    }
  }
  
  .error-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 16px;
    font-family: 'Inter', sans-serif;
  }
  
  .error-description {
    font-size: 1.1rem;
    color: $text-medium;
    margin-bottom: 32px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.5;
  }
  
  .error-button {
    padding: 12px 28px;
    font-size: 1rem;
    font-weight: 600;
    background: $blue-gradient;
    color: $pure-white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(23, 61, 237, 0.4);
    }
  }
}

.no-courses {
  text-align: center;
  padding: 80px 0;
  
  &__icon {
    margin-bottom: 24px;
    
    svg {
      color: $text-light;
    }
  }
  
  &__title {
    font-size: 1.8rem;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 16px;
    font-family: 'Inter', sans-serif;
  }
  
  &__description {
    font-size: 1.1rem;
    color: $text-medium;
    margin-bottom: 32px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.5;
  }
  
  &__button {
    display: inline-block;
    padding: 12px 28px;
    font-size: 1rem;
    font-weight: 600;
    background: $blue-gradient;
    color: $pure-white;
    text-decoration: none;
    border-radius: 12px;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(23, 61, 237, 0.4);
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>