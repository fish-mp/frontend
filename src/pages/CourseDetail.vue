<template>
  <section class="course-detail">
    <!-- Фоновые элементы -->
    <div class="bg-circle-1"></div>
    <div class="bg-circle-2"></div>
    
    <div class="course-detail__wrapper" v-if="course">
      <router-link to="/courses" class="course-detail__back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Все курсы
      </router-link>
      
      <div class="course-detail__content course-detail__header">
        <h1 class="course-detail__title">{{ course.title }}</h1>
        <p class="course-detail__desc">{{ course.short_description }}</p>
        
        <div class="course-detail__actions">
          <p v-if="!isAuth" class="course-access__msg course-access__msg--error">
            Чтобы записаться, нужно авторизоваться!
          </p>
          <button 
            v-else-if="course.enrollment_state === null" 
            class="btn btn--primary course-detail__enroll"
            @click="fetchNewCourse(course.id)"
          >
            <span class="btn-text">Записаться на курс</span>
            <div class="btn-glow"></div>
            <div class="btn-sparkle"></div>
          </button>
        </div>
      </div>

      <div class="course-access" v-if="course.enrollment_state">
        <div 
          v-if="course.enrollment_state === 'applied'" 
          class="course-access__msg course-access__msg--warning"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>Ваша заявка на курс находится на рассмотрении</span>
        </div>
        <div 
          v-else-if="course.enrollment_state === 'rejected'" 
          class="course-access__msg course-access__msg--error"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>Ваша заявка отклонена</span>
        </div>
        <div 
          v-else-if="course.enrollment_state === 'enrolled'" 
          class="course-access__msg course-access__msg--success"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>Вы успешно записаны на курс!</span>
        </div>
      </div>

      <transition name="fade">
        <div v-if="course.enrollment_state === 'enrolled'" class="course-detail__content course-detail__main">
          <div class="course-detail__text-content">
            <h2 class="course-detail__subtitle">Описание курса</h2>
            <div class="course-detail__text">{{ course.description }}</div>
          </div>
          
          <div class="course-detail__download" v-if="course.files && course.files.length">
            <div class="course-detail__download-header">
              <h3 class="course-detail__download-title">Материалы курса</h3>
              <p class="course-detail__download-subtitle">Доступные файлы для изучения</p>
            </div>
            <div class="course-detail__files-grid">
              <div v-for="file in course.files" :key="file.id" class="course-detail__file-card">
                <div class="file-card__content">
                  <div class="file-card__icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" stroke-width="1.5"/>
                      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                  </div>
                  <div class="file-card__info">
                    <h4 class="file-card__title">{{ file.title }}</h4>
                    <p class="file-card__type">{{ getFileType(file.file) }}</p>
                  </div>
                </div>
                <a :href="file.file" download class="file-card__download-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  <span>Скачать</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div v-else-if="isLoading" class="course-detail__loading">
      <div class="loading-spinner"></div>
      <p>Загрузка курса…</p>
    </div>
    
    <div v-else class="course-detail__not-found">
      <div class="not-found__icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
          <path d="M9.172 16.242L12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828 1.414 1.414zM12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </div>
      <h2>Курс не найден</h2>
      <p>Возможно, курс был удален или вы перешли по неверной ссылке</p>
      <router-link to="/courses" class="btn btn--secondary">
        <span class="btn-text">Вернуться к курсам</span>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCourseStore } from '../stores/course'
import { useAuthStore } from '../stores/auth'
import type { Course } from '../types/Course'

const route = useRoute()
const router = useRouter()
const courseStore = useCourseStore()

const auth = useAuthStore();
const isAuth = computed(() => auth.isAuthenticated);

const course = ref<Course | null>(null)
const isLoading = ref(false)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getFileType = (url: string) => {
  const extension = url.split('.').pop()?.toLowerCase();
  const types: Record<string, string> = {
    'pdf': 'PDF документ',
    'doc': 'Word документ',
    'docx': 'Word документ',
    'ppt': 'Презентация',
    'pptx': 'Презентация',
    'xls': 'Таблица Excel',
    'xlsx': 'Таблица Excel',
    'jpg': 'Изображение',
    'jpeg': 'Изображение',
    'png': 'Изображение'
  };
  return types[extension || ''] || 'Файл';
};

const fetchCourse = async () => {
  try {
    isLoading.value = true
    const courseId = Number(route.params.id)

    const storedCourse = courseStore.courses.find(c => c.id === courseId)

    if (storedCourse) {
      course.value = storedCourse
    } else {
      const response = await fetch(`${BACKEND_URL}/api/courses/${courseId}/`, {
        headers: {
          'Authorization': `Bearer ${useAuthStore().accessToken}`
        }
      })

      if (!response.ok) throw new Error('Курс не найден')
      course.value = await response.json()
    }
  } catch (error) {
    console.error('Ошибка загрузки курса:', error)
    router.replace({ name: 'Courses' })
  } finally {
    isLoading.value = false
  }
}

const fetchNewCourse = async (id: number) => {
  try {
    const ok = await courseStore.enrollToCourse(id)
    if (ok) {
      setTimeout(fetchCourse, 100)
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchCourse()
})
</script>

<style lang="scss" scoped>
// Цветовая схема как в других компонентах
$pure-white: #ffffff;
$soft-white: #fafbfc;
$light-grey: #f0f4f8;
$primary-blue: #173DED;
$blue-gradient: linear-gradient(135deg, #173DED 0%, #4d7cfe 50%, #8ba9ff 100%);
$text-dark: #1a1a1a;
$text-medium: #5d6d87;
$text-light: #8a9bb8;
$accent-glow: rgba(23, 61, 237, 0.15);
$success-color: #00BFA6;
$warning-color: #FFB300;
$error-color: #FF5252;

// Миксины
@mixin glass-effect {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 -1px 0 rgba(0, 0, 0, 0.05);
}

@mixin smooth-transition {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@mixin fade-in-up($delay: 0s) {
  animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) #{$delay} both;
}

@mixin gradient-button {
  background: $blue-gradient;
  color: $pure-white;
  border: none;
  border-radius: 16px;
  padding: 16px 32px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  @include smooth-transition;

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 
      0 20px 40px rgba(23, 61, 237, 0.3),
      0 10px 25px rgba(23, 61, 237, 0.2);
  }
}

@mixin decorative-circle($size: 300px, $opacity: 0.05, $blur: 40px) {
  position: absolute;
  width: $size;
  height: $size;
  background: $blue-gradient;
  border-radius: 50%;
  opacity: $opacity;
  filter: blur($blur);
  z-index: 1;
}

// Основные стили
.course-detail {
  background: 
    radial-gradient(circle at 0% 0%, rgba(23, 61, 237, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 100% 100%, rgba(23, 61, 237, 0.02) 0%, transparent 50%),
    linear-gradient(135deg, $pure-white 0%, $soft-white 100%);
  color: $text-dark;
  padding: 160px 0 80px;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='1' fill='%23173DED' fill-opacity='0.05'/%3E%3C/svg%3E");
    pointer-events: none;
  }
}

.bg-circle-1 {
  @include decorative-circle(400px, 0.08, 60px);
  top: 15%;
  left: -10%;
  animation: float 15s ease-in-out infinite;
}

.bg-circle-2 {
  @include decorative-circle(350px, 0.06, 50px);
  bottom: 20%;
  right: -8%;
  animation: float 20s ease-in-out infinite reverse;
}

.course-detail__wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  z-index: 2;
  animation: fadeInUp 0.6s ease-out;
}

.course-detail__back {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: $primary-blue;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 40px;
  padding: 12px 24px;
  border-radius: 12px;
  background: rgba(23, 61, 237, 0.08);
  @include smooth-transition;
  
  &:hover {
    background: rgba(23, 61, 237, 0.15);
    transform: translateX(-5px);
  }
  
  svg {
    @include smooth-transition;
  }
  
  &:hover svg {
    transform: translateX(-3px);
  }
}

.course-detail__content {
  @include glass-effect;
  border-radius: 24px;
  padding: 40px;
  margin-bottom: 24px;
  
  &.course-detail__header {
    text-align: center;
  }
  
  &.course-detail__main {
    animation: fadeInUp 0.8s ease-out 0.2s both;
  }
}

.course-detail__title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, $text-dark 0%, $primary-blue 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
}

.course-detail__desc {
  font-size: 1.25rem;
  line-height: 1.6;
  color: $text-medium;
  max-width: 800px;
  margin: 0 auto 30px;
}

.course-detail__actions {
  margin-top: 30px;
}

.course-access {
  margin-bottom: 24px;
}

.course-access__msg {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 500;
  @include glass-effect;
  animation: fadeInUp 0.6s ease-out;
  
  svg {
    flex-shrink: 0;
  }
  
  &--warning {
    color: $warning-color;
    background: rgba($warning-color, 0.08);
    border-left: 4px solid $warning-color;
  }
  
  &--error {
    color: $error-color;
    background: rgba($error-color, 0.08);
    border-left: 4px solid $error-color;
  }
  
  &--success {
    color: $success-color;
    background: rgba($success-color, 0.08);
    border-left: 4px solid $success-color;
  }
}

// Кнопки
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  @include smooth-transition;
  overflow: hidden;
  
  &--primary {
    @include gradient-button;
    
    .btn-glow {
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .btn-sparkle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: white;
      border-radius: 50%;
      opacity: 0;
    }
    
    &:hover .btn-glow {
      opacity: 1;
    }
  }
  
  &--secondary {
    background: rgba(23, 61, 237, 0.1);
    color: $primary-blue;
    
    &:hover {
      background: rgba(23, 61, 237, 0.15);
      transform: translateY(-2px);
    }
  }
}

.course-detail__text-content {
  margin-bottom: 40px;
}

.course-detail__subtitle {
  font-size: 1.8rem;
  font-weight: 700;
  color: $text-dark;
  margin-bottom: 20px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background: $blue-gradient;
    border-radius: 2px;
  }
}

.course-detail__text {
  font-size: 1.15rem;
  line-height: 1.7;
  color: $text-medium;
  
  p {
    margin-bottom: 1.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

// Секция с файлами
.course-detail__download {
  margin-top: 40px;
}

.course-detail__download-header {
  margin-bottom: 30px;
  text-align: center;
}

.course-detail__download-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: $text-dark;
  margin-bottom: 8px;
}

.course-detail__download-subtitle {
  font-size: 1.1rem;
  color: $text-light;
}

.course-detail__files-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.course-detail__file-card {
  @include glass-effect;
  border-radius: 20px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include smooth-transition;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
}

.file-card__content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.file-card__icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(23, 61, 237, 0.08);
  border-radius: 12px;
  color: $primary-blue;
}

.file-card__info {
  flex: 1;
}

.file-card__title {
  font-size: 1.1rem;
  font-weight: 600;
  color: $text-dark;
  margin-bottom: 4px;
}

.file-card__type {
  font-size: 0.9rem;
  color: $text-light;
}

.file-card__download-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(23, 61, 237, 0.1);
  color: $primary-blue;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 500;
  @include smooth-transition;
  
  &:hover {
    background: rgba(23, 61, 237, 0.15);
    transform: translateY(-2px);
  }
}

// Состояния загрузки
.course-detail__loading {
  text-align: center;
  padding: 80px 20px;
  animation: fadeInUp 0.6s ease-out;
  
  p {
    font-size: 1.2rem;
    color: $text-medium;
    margin-top: 20px;
  }
}

.loading-spinner {
  width: 60px;
  height: 60px;
  margin: 0 auto;
  border: 4px solid rgba(23, 61, 237, 0.1);
  border-top-color: $primary-blue;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

// Состояние "не найдено"
.course-detail__not-found {
  text-align: center;
  padding: 100px 20px;
  animation: fadeInUp 0.6s ease-out;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: $text-dark;
    margin: 30px 0 15px;
  }
  
  p {
    font-size: 1.2rem;
    color: $text-medium;
    margin-bottom: 40px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
}

.not-found__icon {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba($error-color, 0.08);
  border-radius: 50%;
  color: $error-color;
}

// Анимации
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(10px) rotate(240deg);
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

// Адаптивность
@media (max-width: 1200px) {
  .course-detail__wrapper {
    padding: 0 30px;
  }
  
  .course-detail__content {
    padding: 35px;
  }
}

@media (max-width: 768px) {
  .course-detail {
    padding: 140px 0 60px;
  }
  
  .course-detail__wrapper {
    padding: 0 20px;
  }
  
  .course-detail__content {
    padding: 30px;
    border-radius: 20px;
  }
  
  .course-detail__title {
    font-size: 2.2rem;
  }
  
  .course-detail__desc {
    font-size: 1.1rem;
  }
  
  .course-detail__files-grid {
    grid-template-columns: 1fr;
  }
  
  .bg-circle-1,
  .bg-circle-2 {
    display: none;
  }
}

@media (max-width: 480px) {
  .course-detail {
    padding: 120px 0 40px;
  }
  
  .course-detail__content {
    padding: 25px 20px;
    border-radius: 16px;
  }
  
  .course-detail__title {
    font-size: 1.8rem;
  }
  
  .course-detail__desc {
    font-size: 1rem;
  }
  
  .course-access__msg {
    flex-direction: column;
    text-align: center;
    gap: 12px;
    padding: 20px;
  }
  
  .course-detail__file-card {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }
  
  .file-card__content {
    flex-direction: column;
    text-align: center;
  }
}
</style>