<template>
  <section class="course-detail">
    <div class="course-detail__wrapper" v-if="course">
      <router-link to="/courses" class="course-detail__back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Все курсы
      </router-link>
      
      <div class="course-detail__content">
        <h1 class="course-detail__title">{{ course.title }}</h1>
        <p class="course-detail__desc">{{ course.short_description }}</p>
        <p v-if="!isAuth"  class="course-access__msg course-access__msg--error">Чтобы записаться нужно авторизироваться!</p>
        <button v-else="course.enrollment_state === null" class="btn btn--primary course-detail__enroll"
          @click="fetchNewCourse(course.id)">
          Записаться на курс
        </button>
      </div>

      <div class="course-access">
        <p 
          v-if="course.enrollment_state === 'applied'" 
          class="course-access__msg course-access__msg--warning"
        >
          Ваша заявка на курс находится на рассмотрении
        </p>
        <p 
          v-else-if="course.enrollment_state === 'rejected'" 
          class="course-access__msg course-access__msg--error"
        >
          Ваша заявка отклонена
        </p>
      </div>

      <transition name="fade">
        <div v-if="course.enrollment_state === 'enrolled'" class="course-detail__content">
          <p class="course-detail__text">{{ course.description }}</p>
          
          <div class="course-detail__download" v-if="course.files && course.files.length">
            <h3 class="course-detail__download-title">Материалы курса</h3>
            <ul class="course-detail__files">
              <li v-for="file in course.files" :key="file.id" class="course-detail__file">
                <a :href="file.file" download class="btn btn--secondary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="margin-right: 8px;">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span class="btn-text">{{ file.title }}</span>
                  <div class="btn-glow"></div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>

    <div v-else-if="isLoading" class="course-detail__loading">
      <p>Загрузка курса…</p>
    </div>
    
    <div v-else class="course-detail__not-found">
      <p>Курс не найден</p>
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

const fetchCourse = async () => {
  try {
    isLoading.value = true
    const courseId = Number(route.params.id)

    const storedCourse = courseStore.courses.find(c => c.id === courseId)

    if (storedCourse) {
      course.value = storedCourse
    } else {
      const response = await fetch(`https://fish-mp.miv-dev.ru/api/courses/${courseId}/`, {
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

<style scoped>
.course-detail {
  padding: 3rem 1rem;
  max-width: 900px;
  margin: 100px auto;
  font-family: Inter, sans-serif;
}

.course-detail__download {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.course-detail__back {
  color: #4f9da6;
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 1rem;
  transition: color .3s;
}

.course-detail__back:hover {
  color: #31727a;
}

.course-detail__desc {
  font-size: 1.13rem;
  line-height: 1.6;
}

.course-detail__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.course-detail__title {
  font-size: 2.5rem;
  line-height: 1.2;
  margin: 0;
  color: #2c3e50;
}

.course-detail__enroll {
  margin-top: .5rem;
}

.course-access {
  margin-bottom: 2rem;
}

.course-access__msg {
  background: #e8f6ff;
  padding: .75rem 1rem;
  border-radius: .5rem;
  color: #31727a;
  font-size: 1rem;
}

.course-access__msg--error {
  background: #ffe8e8;
  color: #a12b2b;
}

.course-detail__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.course-detail__text {
  font-size: 1.125rem;
  line-height: 1.6;
  color: #444;
  margin: 0;
}

.course-detail__download-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.course-detail__files {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.course-detail__file .btn {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
}

.btn {
  padding: .75rem 1.25rem;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background .3s, transform .2s;
}

.btn--primary {
  background: #4f9da6;
  color: #fff;
}

.btn--primary:hover {
  background: #31727a;
  transform: translateY(-2px);
}

.btn--secondary {
  background: #f0f0f0;
  color: #444;
}

.btn--secondary:hover {
  background: #d9d9d9;
  transform: translateY(-2px);
}

.course-detail__loading,
.course-detail__not-found {
  text-align: center;
  padding: 2rem;
  color: #888;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .course-detail__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .course-detail__title {
    font-size: 2rem;
  }

  .course-detail {
    margin: 60px auto 20px;
  }
}
</style>
