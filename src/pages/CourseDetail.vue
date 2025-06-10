<template>
  <section class="course-detail">
    <div class="course-detail__wrapper" v-if="course">
      <router-link to="/courses" class="course-detail__back">&larr; Курсы</router-link>
      <h1 class="course-detail__title">{{ course.title }}</h1>

      <div v-if="course.enrollment_state === null" class="section__course course-access-message">
        <p>Для доступа к курсу необходимо записаться</p>
        <button class="btn btn--login" @click="fetchNewCourse(course.id)">
          Записаться на курс
        </button>
      </div>

      <div v-else-if="course.enrollment_state === 'applied'" class="course-access-message">
        <p>Ваша заявка на курс находится на рассмотрении</p>
      </div>

      <div v-else-if="course.enrollment_state === 'rejected'" class="course-access-message">
        <p>Ваша заявка на курс была отклонена</p>
      </div>

      <div v-else-if="course.enrollment_state === 'enrolled'">
        <div class="course-detail__content">
          <p class="course-detail__text">{{ course.description }}</p>
        </div>
        <div class="course-detail__download" v-if="course.files.length">
          <h3>Материалы курса:</h3>
          <ul>
            <li v-for="file in course.files" :key="file.id">
              <a :href="file.file" download class="course-detail__download-button">
                Скачать {{ file.title || 'файл' }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-else-if="isLoading">
      <p>Загрузка курса...</p>
    </div>
    <div v-else>
      <p>Курс не найден.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCourseStore } from '../stores/course'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const courseStore = useCourseStore()

const course = ref(null)
const isLoading = ref(false)

const fetchCourse = async () => {
  try {
    isLoading.value = true
    const courseId = Number(route.params.id)

    const storedCourse = courseStore.courses.find(c => c.id === courseId)

    if (storedCourse) {
      course.value = storedCourse
    } else {
      const response = await fetch(`http://fish-mp.miv-dev.ru:8000/api/courses/${courseId}/`, {
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
      setTimeout(fetchCourse, 1000)
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
  padding: 2rem;
  max-width: 800px;
  margin: 100px auto;
}

.course-detail__back {
  display: inline-block;
  margin-bottom: 1rem;
  color: var(--color-turquoise);
  text-decoration: none;
}

.course-detail__title {
  font-size: 2rem;
  margin: 0.5rem 0;
}

.course-access-message {
  background: #fff8e1;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  color: #ff8f00;
}

.course-detail__content {
  margin: 2rem 0;
}

.course-detail__text {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.course-detail__download {
  margin-top: 2rem;
}

.course-detail__download-button {
  display: inline-block;
  background-color: var(--color-turquoise);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

.course-detail__download-button:hover {
  background-color: var(--color-turquoise-dark);
}

@media (max-width: 768px) {
  .course-detail {
    margin: 80px auto 20px;
    padding: 1rem;
  }

  .course-detail__title {
    font-size: 1.75rem;
  }
}

.section__course {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>