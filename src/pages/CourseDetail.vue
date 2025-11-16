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
        
        <button 
          v-if="course.enrollment_state === null" 
          class="btn btn--primary course-detail__enroll"
          @click="fetchNewCourse(course.id)"
        >
          <span class="btn-text">Записаться на курс</span>
          <div class="btn-shine"></div>
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCourseStore } from '../stores/course'
import { useAuthStore } from '../stores/auth'
import type { Course } from '../types/Course'

const route = useRoute()
const router = useRouter()
const courseStore = useCourseStore()

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

<style lang="scss" scoped>
@import '../assets/scss/CourseDetail.scss';
</style>