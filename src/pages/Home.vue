<template>
  <section class="hero">
    <h1>Аквариумистика — красиво, живо, увлекательно</h1>
    <p>Обучающие онлайн-курсы по созданию и уходу за аквариумом.</p>
    <router-link to="/courses">
      <button>Смотреть курсы</button>
    </router-link>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.hero {
  text-align: center;
  padding: 3rem 1rem;
}
h1 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}
button {
  background-color: #0077aa;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
}
button:hover {
  background-color: #005577;
}
</style>
