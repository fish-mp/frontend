<template>
  <section class="page">
    <h1 class="page-title">Курсы по аквариумистике</h1>
    <div class="card-grid">
      <div class="course-card" v-for="course in courses" :key="course.id">
        <img :src="course.image" :alt="course.title" class="card-image" />
        <h3>{{ course.title }}</h3>
        <p class="short-desc">{{ course.shortDescription }}</p>
        <router-link :to="`/courses/${course.id}`" class="card-link card-button">Подробнее</router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Course {
  id: number
  title: string
  shortDescription: string
  fullDescription: string
  image: string
}

const courses = ref<Course[]>([
  {
    id: 1,
    title: 'Основы аквариумистики',
    shortDescription: 'Базовые принципы создания пресноводного аквариума.',
    fullDescription: 'Изучите всё: выбор аквариума, оборудование, запуск и уход за пресноводным уголком.',
    image: 'https://picsum.photos/seed/freshwater/400/300'
  },
  {
    id: 2,
    title: 'Морской аквариум',
    shortDescription: 'Запуск и уход за солёным рифовым аквариумом.',
    fullDescription: 'Пошаговое руководство: оборудование, соль, параметры воды и содержание кораллов.',
    image: 'https://picsum.photos/seed/reef/400/300'
  },
  {
    id: 3,
    title: 'Растения и удобрения',
    shortDescription: 'Выбор растений и поддержка их роста.',
    fullDescription: 'Все о правильном питании аквариумных растений, подбор удобрений и настройка света.',
    image: 'https://picsum.photos/seed/plants/400/300'
  },
  {
    id: 4,
    title: 'Системы фильтрации',
    shortDescription: 'Типы фильтров и их настройка.',
    fullDescription: 'Обзор внешних, внутренних и канистровых фильтров, советы по чистке и обслуживанию.',
    image: 'https://picsum.photos/seed/filtration/400/300'
  },
  {
    id: 5,
    title: 'Освещение и фотопериод',
    shortDescription: 'Подбор ламп и режим работы.',
    fullDescription: 'Как правильно настроить освещение для баланса растений и снижения водорослей.',
    image: 'https://picsum.photos/seed/lighting/400/300'
  },
  {
    id: 6,
    title: 'Химия воды',
    shortDescription: 'Контроль pH, GH, KH и удобрений.',
    fullDescription: 'Измерение и коррекция параметров воды для здоровья рыб и растений.',
    image: 'https://picsum.photos/seed/chemistry/400/300'
  },
  {
    id: 7,
    title: 'Уход за рыбами',
    shortDescription: 'Кормление и профилактика болезней.',
    fullDescription: 'Режим кормежки, карантин новых обитателей и лечение распространённых заболеваний.',
    image: 'https://picsum.photos/seed/fishcare/400/300'
  },
  {
    id: 8,
    title: 'Акваскейпинг',
    shortDescription: 'Гармоничные композиции из камней и растений.',
    fullDescription: 'Дизайн подводного ландшафта: выбор материалов, планировка и уход.',
    image: 'https://picsum.photos/seed/aquascape/400/300'
  },
  {
    id: 9,
    title: 'Разведение рыб',
    shortDescription: 'Методы разведения популярных видов.',
    fullDescription: 'Условия для нереста, инкубации икры и выращивания мальков.',
    image: 'https://picsum.photos/seed/breeding/400/300'
  },
  {
    id: 10,
    title: 'Ежедневное обслуживание',
    shortDescription: 'Чистка, подмены воды и проверка оборудования.',
    fullDescription: 'Ежедневный и еженедельный план ухода для стабильного микроклимата аквариума.',
    image: 'https://picsum.photos/seed/maintenance/400/300'
  }
])
</script>

<style scoped>
.page {
  max-width: 1200px;
  padding: 2rem 1rem;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.course-card {
  background: #111;
  padding: 0 0 1rem;
  border-radius: 8px;
  color: #eee;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

.card-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  margin-bottom: 1rem;
}

.short-desc {
  flex-grow: 1;
  margin: 0.5rem 0 1rem;
  font-size: 0.95rem;
  line-height: 1.4;
}

.card-link {
  text-decoration: underline;
  font-size: 0.9rem;
}

.card-button {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #000000;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s, transform 0.2s;
  margin-top: auto;
}

.card-button:hover {
  background-color: #f2f2f2;
  transform: translateY(-2px);
}
</style>
