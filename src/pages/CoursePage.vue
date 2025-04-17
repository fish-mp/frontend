<template>
  <section class="course-page">
    <div v-if="course">
      <h1>{{ course.title }}</h1>
      <p class="description">{{ course.description }}</p>
      <div class="course-actions">
        <button class="btn btn--primary" @click="enroll">Записаться на курс</button>
        <router-link to="/courses" class="btn btn--secondary">← Назад к курсам</router-link>
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
  description: string
}

const route = useRoute()
const courseId = Number(route.params.id)

const courseList: Course[] = [
  {
    id: 1,
    title: 'Основы аквариумистики',
    description: 'Изучите всё от выбора аквариума до запуска и ухода. Подходит для новичков.'
  },
  {
    id: 2,
    title: 'Морской аквариум',
    description: 'Погрузитесь в мир морской воды: оборудование, солёность, рифы и рыбы.'
  },
  {
    id: 3,
    title: 'Болезни рыб',
    description: 'Распознавание симптомов, карантин, безопасное лечение и профилактика.'
  }
]

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
  max-width: 900px;
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

/* 🔥 Общая кнопка */
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

/* 💡 Раскладка кнопок */
.course-actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.course-actions > * {
  max-width: 300px;
  width: 100%;
}

.not-found {
  text-align: center;
  margin-top: 5rem;
  color: #bbb;
  font-size: 1.2rem;
}

</style>