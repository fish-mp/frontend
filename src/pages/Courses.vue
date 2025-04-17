<template>
  <section class="page">
    <h1 class="page-title">Курсы по аквариумистике</h1>
    <div class="card-grid">
      <div class="course-card" v-for="course in courses" :key="course.id">
        <h3>{{ course.title }}</h3>
        <p>{{ course.description }}</p>
        <router-link :to="`/courses/${course.id}`" class="card-link">Подробнее</router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const courses = ref([
  {
    id: 1,
    title: 'Основы аквариумистики',
    description: 'Изучите базовые принципы создания пресноводного аквариума.'
  },
  {
    id: 2,
    title: 'Морской аквариум',
    description: 'Пошаговое руководство по запуску солёного рифового аквариума.'
  },
  {
    id: 3,
    title: 'Растения и удобрения',
    description: 'Как выбрать растения и поддерживать их рост.'
  }
])
</script>

<style scoped>
.page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: white;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.course-card {
  background: #111;
  padding: 1.2rem;
  border-radius: 8px;
  max-width: 300px;
  color: #eee;
  box-shadow: 0 0 10px rgba(255,255,255,0.05);
  transition: 0.3s;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 15px rgba(255,255,255,0.1);
}

.course-card h3 {
  margin-bottom: 0.5rem;
}

.card-link {
  display: inline-block;
  margin-top: 1rem;
  color: #00aaff;
  text-decoration: underline;
  font-size: 0.9rem;
}
</style>
