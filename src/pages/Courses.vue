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
        <div class="search__container">
          <label for="search-input" class="search__label">
            <svg class="search__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input 
              id="search-input" 
              v-model="searchQuery" 
              type="text" 
              placeholder="Поиск по названию курса..." 
              class="search__input"
            />
            <button v-if="searchQuery" @click="clearSearch" class="search__clear" aria-label="Очистить поиск">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
          </label>
        </div>

        <label for="difficulty-select" class="difficulty__label">Фильтр по сложности:</label>
        <div class="select-wrapper">
          <select id="difficulty-select" v-model="selectedDifficulty" class="filter-select">
            <option value="">Все сложности</option>
            <option v-for="level in difficultyLevels" :key="level" :value="level">
              {{ level }}
            </option>
          </select>
          <div class="select-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
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
const searchQuery = ref<string>("");

// Обработка query параметра из URL
watch(() => route.query.difficulty, (newDifficulty) => {
  selectedDifficulty.value = newDifficulty ? (newDifficulty as string) : "";
}, { immediate: true });

// Получаем уникальные уровни сложности из данных
const difficultyLevels = useDifficultyLevels();

// Фильтрация курсов
const filteredCourses = computed(() => {
  let filtered = courseStore.courses;

  // Фильтрация по сложности
  if (selectedDifficulty.value) {
    filtered = filtered.filter(
      (course) => course.tag?.name === selectedDifficulty.value
    );
  }

  // Фильтрация по поисковому запросу
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    filtered = filtered.filter(
      (course) => course.title.toLowerCase().includes(query)
    );
  }

  return filtered;
});

// Очистка поиска
const clearSearch = () => {
  searchQuery.value = "";
};

onMounted(() => {
  courseStore.fetchCourses();
});
</script>

<style lang="scss" scoped>
@import '../assets/scss/Courses.scss';
</style>