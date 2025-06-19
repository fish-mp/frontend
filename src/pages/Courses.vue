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
        <select id="difficulty-select" v-model="selectedDifficulty">
          <option value="">Все сложности</option>
          <option
            v-for="level in difficultyLevels"
            :key="level.value"
            :value="level.value"
          >
            {{ level.label }}
          </option>
        </select>
      </div>
      <ul class="section__list">
        <li class="news__item" v-for="course in filteredCourses" :key="course.id">
          <router-link
            :to="{ name: 'CourseDetail', params: { id: course.id } }"
            class="news__link"
          >
            <div class="news__image">
              <img :src="course.image" alt="" class="news__icon" />
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
import { ref, computed, onMounted } from "vue";
import { useCourseStore } from "../stores/course";

const courseStore = useCourseStore();
const selectedDifficulty = ref<string>("");

const difficultyLevels = computed(() => {
  return Array.from(
    new Set(
      courseStore.courses.map((c) => c.tag?.name).filter((name): name is string => !!name)
    )
  ).map((name) => ({ value: name, label: name }));
});

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

<style scoped>
.department__title {
  font-size: calc(70px + 1.5vw);
}

.department__description {
  top: 0;
}

.section__list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 0;
  margin: 0;
}

.news__item {
  list-style: none;
}

@media (max-width: 768px) {
  .section__list {
    grid-template-columns: 1fr;
  }

  .department__title {
    font-size: calc(22px + 1.5vw);
  }
}
.filters__wrapper {
    margin-bottom: 25px;
}
</style>
