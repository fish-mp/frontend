<template>
    <section class="page">
      <h1 class="page-title">Новости</h1>
      <div class="card-grid">
        <router-link
          v-for="item in news"
          :key="item.id"
          :to="`/news/${item.id}`"
          class="news-card"
        >
          <h3>{{ item.title }}</h3>
          <p>{{ item.preview }}</p>
          <small>{{ item.date }}</small>
        </router-link>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const news = ref([
    {
      id: 1,
      title: 'Открыт новый курс по морскому аквариуму',
      preview: 'Узнайте, как запустить морской аквариум с нуля.',
      date: '17.04.2025'
    },
    {
      id: 2,
      title: 'Обновление методички по CO₂',
      preview: 'Добавлены советы по новым диффузорам ADA.',
      date: '15.04.2025'
    },
    {
      id: 3,
      title: 'Новинка: освещение ADA Solar RGB II',
      preview: 'Ультрасовременное освещение — теперь в продаже.',
      date: '12.04.2025'
    }
  ])
  </script>
  
  <style scoped>
  .page {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .page-title {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    color: white;
  }
  
  .card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
  }
  
  /* 📌 теперь карточка — это <router-link> */
  .news-card {
    display: block;
    background: #111;
    padding: 1.2rem;
    border-radius: 8px;
    max-width: 300px;
    width: 100%;
    color: #eee;
    text-decoration: none;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
    transition: 0.3s ease;
    cursor: pointer;
  }
  
  .news-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
  }
  
  .news-card h3 {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    color: white;
  }
  
  .news-card p {
    font-size: 0.95rem;
    color: #ccc;
  }
  
  .news-card small {
    display: block;
    margin-top: 0.8rem;
    color: #aaa;
    font-size: 0.8rem;
  }
  </style>
  