<template>
  <section class="page">
    <div v-if="article" class="news-page">
      <h1>{{ article.title }}</h1>
      <small class="date">{{ article.date }}</small>
      <p class="text">{{ article.content }}</p>
      <router-link to="/news" class="back-button">← Назад к новостям</router-link>
    </div>
    <div v-else class="not-found">
      <h2>Новость не найдена</h2>
      <router-link to="/news" class="back-button">← Вернуться к новостям</router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, computed } from "vue";

const route = useRoute();
const newsId = Number(route.params.id);

const newsList = ref([
  {
    id: 1,
    title: "Открыт новый курс по морскому аквариуму",
    date: "17.04.2025",
    content:
      "Мы рады сообщить об открытии нового курса, посвящённого морским аквариумам. В этом курсе вы узнаете, как правильно подбирать оборудование, солёность воды и морских обитателей.",
  },
  {
    id: 2,
    title: "Обновление методички по CO₂",
    date: "15.04.2025",
    content:
      "Методичка по использованию CO₂ обновлена! Новое издание включает рекомендации по установке диффузоров ADA и предотвращению избытка углекислого газа в воде.",
  },
  {
    id: 3,
    title: "Новинка: освещение ADA Solar RGB II",
    date: "12.04.2025",
    content:
      "ADA представляет новинку: Solar RGB II — освещение для аквариумов нового поколения с улучшенной передачей цвета и энергосбережением.",
  },
]);

const article = computed(() => newsList.value.find((n) => n.id === newsId));
</script>

<style scoped>
.page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.news-page h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.date {
  font-size: 0.85rem;
  display: block;
  margin-bottom: 1.5rem;
}

.text {
  font-size: 1.05rem;
  line-height: 1.7;
  white-space: pre-line;
}

.not-found {
  text-align: center;
  margin-top: 3rem;
}

.not-found h2 {
  margin-bottom: 1rem;
}

.back-button {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.6rem 1.2rem;
  background: transparent;
  border: 1px solid #555;
  color: black;
  text-decoration: none;
  border-radius: 6px;
  transition: 0.3s;
  font-size: 0.9rem;
}

.back-button:hover {
  color: white;
  border-color: white;
  background-color: #111;
}
</style>
