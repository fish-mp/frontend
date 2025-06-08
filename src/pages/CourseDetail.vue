<template>
  <section class="course-detail">
    <div class="course-detail__wrapper" v-if="course">
      <router-link to="/courses" class="course-detail__back">&larr; Курсы</router-link>
      <h1 class="course-detail__title">{{ course.title }}</h1>
      <p class="course-detail__date" v-if="course.date">{{ course.date }}</p>
      <img :src="course.image" alt="Изображение курса" class="course-detail__image" />

      <div class="course-detail__content">
        <p
          v-for="(paragraph, idx) in course.fullContent"
          :key="idx"
          class="course-detail__text"
        >
          {{ paragraph }}
        </p>
      </div>

      <div class="course-detail__download" v-if="course.downloadLink">
        <a
          :href="course.downloadLink"
          download
          class="course-detail__download-button"
        >
          Скачать курс (.docx)
        </a>
      </div>
    </div>

    <div v-else>
      <p>Курс не найден.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courses } from '../data/coursesData'

const route = useRoute()
const router = useRouter()

const course = computed(() => {
  const idParam = Number(route.params.id)
  return courses.find((item) => item.id === idParam)
})

if (!course.value) {
  router.replace({ name: 'Courses' })
}
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

.course-detail__date {
  color: var(--color-turquoise-dark);
  margin-bottom: 1.5rem;
}

.course-detail__image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.course-detail__text {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.course-detail__download {
  margin-top: 2rem;
  text-align: center;
}

.course-detail__download-button {
  display: inline-block;
  background-color: #3498db;
  color: #fff;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.course-detail__download-button:hover {
  background-color: #2980b9;
}

@media (max-width: 768px) {
  .course-detail {
    margin: 80px auto 20px;
    padding: 1rem;
  }
  .course-detail__title {
    font-size: 1.75rem;
  }
  .course-detail__download-button {
    padding: 0.65rem 1.2rem;
  }
}
</style>
