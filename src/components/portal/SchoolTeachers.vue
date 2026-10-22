<script setup lang="ts">
import teacherPhoto from '../../assets/image/staff.jpg';
const schools = [
  { label: 'Школа для дошколят', color: '#2fbf71' },
  { label: 'Школа для дошколят', color: '#2fbf71' },
  { label: 'Школа для школьников', color: '#ff8a1f' },
  { label: 'Школа для школьников', color: '#ff8a1f' },
  { label: 'Школа аквариумистики', color: '#1ea7e1' },
  { label: 'Школа аквариумистики', color: '#1ea7e1' },
];
</script>
<template>
  <section class="ds-section ds-teachers" aria-labelledby="teachers-title">
    <h2 id="teachers-title">Наши преподаватели</h2>
    <div class="ds-teachers-grid">
      <article
        v-for="(school, index) in schools"
        :key="index"
        :style="{ '--teacher-color': school.color }"
      >
        <img :src="teacherPhoto" alt="Фото преподавателя" loading="lazy" />
        <h3>Имя Фамилия</h3>
        <p>{{ school.label }}</p>
      </article>
    </div>
  </section>
</template>
