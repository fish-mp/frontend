<template>
  <section class="page">
    <h1 class="page__title">Курсы по аквариумистике</h1>
    <div class="page__grid">
      <CourseCard v-for="course in visibleCourses" :key="course.id" :course="course" base="courses" />
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
  { id: 1, title: 'Основы аквариумистики', shortDescription: 'Базовые принципы создания пресноводного аквариума.', fullDescription: '', image: 'https://www.petshop.ru/upload/medialibrary/83d/83d4980402475fe776e5063f56b47514.jpg' },
  { id: 2, title: 'Морской аквариум', shortDescription: 'Запуск и уход за солёным рифовым аквариумом.', fullDescription: '', image: 'https://astrakhan.angstrem-mebel.ru/upload/medialibrary/962/f8fmq4yp9cqsmrvax4p4rt4gny4f6eia.png' },
  { id: 3, title: 'Растения и удобрения', shortDescription: 'Выбор растений и поддержка их роста.', fullDescription: '', image: 'https://akvatoria.ru/upload/resize_cache/iblock/8f2/1230_758_13df4/8f2757d9a7166db58992d8e94811968b.JPG' },
  { id: 4, title: 'Системы фильтрации', shortDescription: 'Типы фильтров и их настройка.', fullDescription: '', image: 'https://www.petshop.ru/upload/medialibrary/83d/83d4980402475fe776e5063f56b47514.jpg' },
  { id: 5, title: 'Освещение и фотопериод', shortDescription: 'Подбор ламп и режим работы.', fullDescription: '', image: 'https://astrakhan.angstrem-mebel.ru/upload/medialibrary/962/f8fmq4yp9cqsmrvax4p4rt4gny4f6eia.png' },
  { id: 6, title: 'Химия воды', shortDescription: 'Контроль pH, GH, KH и удобрений.', fullDescription: '', image: 'https://akvatoria.ru/upload/resize_cache/iblock/8f2/1230_758_13df4/8f2757d9a7166db58992d8e94811968b.JPG' },
  { id: 7, title: 'Уход за рыбами', shortDescription: 'Кормление и профилактика болезней.', fullDescription: '', image: 'https://www.petshop.ru/upload/medialibrary/83d/83d4980402475fe776e5063f56b47514.jpg' },
  { id: 8, title: 'Акваскейпинг', shortDescription: 'Гармоничные композиции из камней и растений.', fullDescription: '', image: 'https://astrakhan.angstrem-mebel.ru/upload/medialibrary/962/f8fmq4yp9cqsmrvax4p4rt4gny4f6eia.png' },
  { id: 9, title: 'Разведение рыб', shortDescription: 'Методы разведения популярных видов.', fullDescription: '', image: 'https://akvatoria.ru/upload/resize_cache/iblock/8f2/1230_758_13df4/8f2757d9a7166db58992d8e94811968b.JPG' },
  { id: 10, title: 'Ежедневное обслуживание', shortDescription: 'Чистка, подмены воды и проверка оборудования.', fullDescription: '', image: 'https://www.petshop.ru/upload/medialibrary/83d/83d4980402475fe776e5063f56b47514.jpg' }
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
