<template>
  <section class="department">
    <div class="department__wrapper">
      <span id="bg-circle-1"></span>
      <span id="bg-circle-2"></span>
      <h1 class="department__title">Курсы по аквариумистике</h1>
      <p class="department__description">
        Здесь собраны курсы по морским, пресноводным и рифовым аквариумам. Изучайте и
        совершенствуйте свои знания!
      </p>
    </div>
  </section>

  <section class="news">
    <span id="bg-circle-5"></span>
    <div class="news__wrapper">
      <div class="filters__wrapper">
        <label for="difficulty-select">Фильтр по сложности:</label>
        <select id="difficulty-select" v-model="selectedDifficulty" class="filter-select">
          <option value="">Все сложности</option>
          <option v-for="level in difficultyLevels" :key="level.value" :value="level.value">
            {{ level.label }}
          </option>
        </select>
      </div>

      <ul class="section__list">
        <li class="news__item" v-for="course in filteredCourses" :key="course.id">
          <router-link :to="{ name: 'CourseDetail', params: { id: course.id } }" class="news__link">
            <div class="news__image">
              <img :src="course.image" :alt="course.title" class="news__icon" />
            </div>
            <div class="news__container">
              <h3 class="news__subtitle">{{ course.title }}</h3>
              <p class="news__description">{{ course.short_description }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useCourseStore } from "../stores/course";
import { useDifficultyLevels } from "../composables/useDifficultyLevels";

const route = useRoute();
const courseStore = useCourseStore();
const selectedDifficulty = ref<string>("");

// Обработка query параметра из URL
watch(() => route.query.difficulty, (newDifficulty) => {
  selectedDifficulty.value = newDifficulty ? (newDifficulty as string) : "";
}, { immediate: true });

// Получаем уровни сложности
const difficultyLevels = useDifficultyLevels();

// Фильтрация курсов
const filteredCourses = computed(() => {
  if (!selectedDifficulty.value) {
    return courseStore.courses;
  }
  return courseStore.courses.filter(
    (course) => course.tag?.name === selectedDifficulty.value
  );
});

onMounted(() => {
  courseStore.fetchCourses();
});
</script>

<style lang="scss" scoped>
@import '../assets/scss/Courses.scss';
</style>
