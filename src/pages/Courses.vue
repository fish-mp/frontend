<template>
  <section class="page">
    <h1 class="page__title">Курсы по аквариумистике</h1>
    <div class="page__grid">
      <CourseCard v-for="course in visibleCourses" :key="course.id" :course="course" />
    </div>
    <button v-if="visibleCount < courses.length" @click="showMore" class="load-more">
      Показать ещё
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CourseCard from '../components/Card.vue'

interface Course {
  id: number
  title: string
  shortDescription: string
  fullDescription: string
  image: string
}

const courses = ref<Course[]>([
  { id: 1, title: 'Основы аквариумистики', shortDescription: 'Базовые принципы создания пресноводного аквариума.', fullDescription: '', image: 'https://picsum.photos/seed/freshwater/400/300' },
  { id: 2, title: 'Морской аквариум', shortDescription: 'Запуск и уход за солёным рифовым аквариумом.', fullDescription: '', image: 'https://picsum.photos/seed/reef/400/300' },
  { id: 3, title: 'Растения и удобрения', shortDescription: 'Выбор растений и поддержка их роста.', fullDescription: '', image: 'https://picsum.photos/seed/plants/400/300' },
  { id: 4, title: 'Системы фильтрации', shortDescription: 'Типы фильтров и их настройка.', fullDescription: '', image: 'https://picsum.photos/seed/filtration/400/300' },
  { id: 5, title: 'Освещение и фотопериод', shortDescription: 'Подбор ламп и режим работы.', fullDescription: '', image: 'https://picsum.photos/seed/lighting/400/300' },
  { id: 6, title: 'Химия воды', shortDescription: 'Контроль pH, GH, KH и удобрений.', fullDescription: '', image: 'https://picsum.photos/seed/chemistry/400/300' },
  { id: 7, title: 'Уход за рыбами', shortDescription: 'Кормление и профилактика болезней.', fullDescription: '', image: 'https://picsum.photos/seed/fishcare/400/300' },
  { id: 8, title: 'Акваскейпинг', shortDescription: 'Гармоничные композиции из камней и растений.', fullDescription: '', image: 'https://picsum.photos/seed/aquascape/400/300' },
  { id: 9, title: 'Разведение рыб', shortDescription: 'Методы разведения популярных видов.', fullDescription: '', image: 'https://picsum.photos/seed/breeding/400/300' },
  { id: 10, title: 'Ежедневное обслуживание', shortDescription: 'Чистка, подмены воды и проверка оборудования.', fullDescription: '', image: 'https://picsum.photos/seed/maintenance/400/300' }
])

const visibleCount = ref(4)
const visibleCourses = computed(() => {
  return courses.value.slice(0, visibleCount.value)
})

function showMore() {
  visibleCount.value = Math.min(visibleCount.value + 4, courses.value.length)
}
</script>

<style scoped>
.page {
  margin: 0 auto;
  padding: 2rem 1rem;
  text-align: center;
}

.page__title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #111;
}

.page__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  justify-items: center;
}

.load-more {
  width: 200px;
  text-align: center;
  margin-top: 2rem;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #000;
  border-radius: 6px;
  border: 1px solid black;
  cursor: pointer;
  transition: all 0.3s ease;
}

.load-more:hover {
  color: #000;
  background-color: white;
}
</style>
