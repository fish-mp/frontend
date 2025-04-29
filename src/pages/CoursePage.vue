<template>
  <section class="course-page">
    <div v-if="course" class="detail-wrapper">
      <img :src="course.image" :alt="course.title" class="detail-image" />
      <div class="detail-content">
        <h1>{{ course.title }}</h1>
        <p class="full-desc">{{ course.fullDescription }}</p>
        <p class="short-desc">{{ course.shortDescription }}</p>
        <div class="course-actions">
          <button class="btn btn--primary" @click="enroll">Записаться на курс</button>
          <router-link to="/courses" class="btn btn--secondary">← Назад к курсам</router-link>
        </div>
      </div>
    </div>
    <div v-else class="not-found">
      <h2>Курс не найден</h2>
      <router-link to="/courses" class="back-button">← Вернуться к курсам</router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

interface Course {
  id: number
  title: string
  fullDescription: string
  shortDescription: string
  image: string
}

const route = useRoute()
const courseId = Number(route.params.id)

const courseList: Course[] = ([
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


const course = computed(() =>
  courseList.find((c) => c.id === courseId)
)

const enroll = () => {
  if (course.value) {
    alert(`Вы записались на курс "${course.value.title}"!`)
  }
}
</script>


<style scoped>
.course-page {
  margin: 0 auto;
  padding: 3rem 1.5rem;
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  font-size: 2.6rem;
  margin-bottom: 1rem;
  text-align: center;
  letter-spacing: 1px;
}

.description {
  font-size: 1.15rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  text-align: justify;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.btn {
  display: block;
  padding: 1rem 2rem;
  font-size: 1.05rem;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  min-width: 180px;
  transition: all 0.25s ease;
  text-decoration: none;
}

/* 🎨 Модификаторы */
.btn--primary {
  background: linear-gradient(to right, #00aaff, #0077cc);
  color: white;
  border: none;
  box-shadow: 0 5px 20px rgba(0, 170, 255, 0.3);
}

.btn--primary:hover {
  background-color: #008ecc;
  box-shadow: 0 8px 24px rgba(0, 170, 255, 0.4);
  transform: translateY(-2px);
}

.btn--secondary {
  background-color: transparent;
  color: #aaa;
  border: 1px solid #555;
}

.btn--secondary:hover {
  background-color: #111;
  color: #fff;
  border-color: #fff;
}

.course-actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.course-actions>* {
  max-width: 300px;
  width: 100%;
}

.not-found {
  text-align: center;
  margin-top: 5rem;
  color: #bbb;
  font-size: 1.2rem;
}

.detail-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.detail-image {
  width: 800px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.detail-content {
  flex: 1;
}

.full-desc {
  font-size: 1.15rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  text-align: center;
}

.short-desc {
  font-size: 1rem;
  margin-bottom: 2rem;
  text-align: center;
}
</style>
