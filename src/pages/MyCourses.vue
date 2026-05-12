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
          <li class="news__item" v-for="enrollment in filteredCourses" :key="enrollment.id">
            <router-link 
              :to="{ name: 'CourseDetail', params: { id: enrollment.course.id } }" 
              class="news__link"
              @click.prevent="goToCourseDetail(enrollment.course.id)"
            >
              <div class="news__image">
                <img 
                  :src="enrollment.course.image || '/api/placeholder/400/300'" 
                  :alt="enrollment.course.title" 
                  class="news__icon" 
                />
              </div>
              <div class="news__container">
                <h3 class="news__subtitle">{{ enrollment.course.title }}</h3>
                <p class="news__description">{{ enrollment.course.short_description }}</p>
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
            {{ searchQuery ? 'Попробуйте изменить параметры поиска' : 'Вы еще не записались ни на один курс' }}
          </p>
          <router-link 
            v-if="!searchQuery"
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

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const router = useRouter();
const authStore = useAuthStore();

// Типы данных
interface Course {
  id: number;
  title: string;
  short_description: string;
  description: string;
  image: string;
  tag?: {
    id: number;
    name: string;
  };
  files?: Array<{
    id: number;
    file: string;
    title: string;
  }>;
  enrollment_state?: string | null;
}

interface Enrollment {
  id: number;
  course: Course;
  state: string;
  created_at: string;
}

// Реактивные переменные
const searchQuery = ref<string>("");
const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);
const myEnrollments = ref<Enrollment[]>([]);

const isAuth = computed(() => authStore.isAuthenticated);

const fetchMyCourses = async () => {
  if (!isAuth.value) return;
  
  try {
    isLoading.value = true;
    error.value = null;
    
    const response = await fetch(`${BACKEND_URL}/api/courses/my/`, {
      headers: {
        'Authorization': `Bearer ${authStore.accessToken}`,
        'Content-Type': 'application/json'
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка загрузки курсов: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    myEnrollments.value = data;
  } catch (err: any) {
    error.value = err.message || 'Ошибка загрузки курсов';
    console.error('Ошибка загрузки моих курсов:', err);
  } finally {
    isLoading.value = false;
  }
};

const filteredCourses = computed(() => {
  let filtered = myEnrollments.value;

  // Фильтрация по поисковому запросу
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    filtered = filtered.filter(
      (enrollment) => 
        enrollment.course.title.toLowerCase().includes(query) ||
        enrollment.course.short_description.toLowerCase().includes(query)
    );
  }

  return filtered;
});

const clearSearch = () => {
  searchQuery.value = "";
};

// Функция для перехода к деталям курса
const goToCourseDetail = (courseId: number) => {
  // Сначала загружаем курс, затем переходим
  router.push({ 
    name: 'CourseDetail', 
    params: { id: courseId.toString() } 
  });
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

// Исправляем стили для изображений курсов
.news__icon {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
}

// Исправляем стили для карточек курсов
.news__link {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    
    .news__subtitle {
      color: $primary-blue;
    }
    
    .news__read-more {
      transform: translateX(5px);
    }
  }
}
</style>