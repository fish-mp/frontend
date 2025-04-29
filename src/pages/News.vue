<template>
  <section class="page">
    <Slider :items="news" />

    <h1 class="page-title">Новости</h1>

    <div class="page__grid">
      <Card v-for="item in news" :key="item.id" :course="item" base="news" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Slider from '../components/Slider.vue'
import Card from '../components/Card.vue'

interface NewsItem {
  id: number
  title: string
  shortDescription: string
  date: string
  image: string
}

const news = ref<NewsItem[]>([
  {
    id: 1,
    title: 'Открыт новый курс по морскому аквариуму',
    shortDescription: 'Узнайте, как запустить морской аквариум с нуля.',
    date: '17.04.2025',
    image: 'https://www.petshop.ru/upload/medialibrary/83d/83d4980402475fe776e5063f56b47514.jpg'
  },
  {
    id: 2,
    title: 'Обновление методички по CO₂',
    shortDescription: 'Добавлены советы по новым диффузорам ADA.',
    date: '15.04.2025',
    image: 'https://astrakhan.angstrem-mebel.ru/upload/medialibrary/962/f8fmq4yp9cqsmrvax4p4rt4gny4f6eia.png'
  },
  {
    id: 3,
    title: 'Новинка: освещение ADA Solar RGB II',
    shortDescription: 'Ультрасовременное освещение — теперь в продаже.',
    date: '12.04.2025',
    image: 'https://akvatoria.ru/upload/resize_cache/iblock/8f2/1230_758_13df4/8f2757d9a7166db58992d8e94811968b.JPG'
  },
  {
    id: 4,
    title: 'Открыт новый курс по морскому аквариуму',
    shortDescription: 'Узнайте, как запустить морской аквариум с нуля.',
    date: '17.04.2025',
    image: 'https://www.petshop.ru/upload/medialibrary/83d/83d4980402475fe776e5063f56b47514.jpg'
  },
  {
    id: 5,
    title: 'Обновление методички по CO₂',
    shortDescription: 'Добавлены советы по новым диффузорам ADA.',
    date: '15.04.2025',
    image: 'https://astrakhan.angstrem-mebel.ru/upload/medialibrary/962/f8fmq4yp9cqsmrvax4p4rt4gny4f6eia.png'
  },
  {
    id: 6,
    title: 'Новинка: освещение ADA Solar RGB II',
    shortDescription: 'Ультрасовременное освещение — теперь в продаже.',
    date: '12.04.2025',
    image: 'https://akvatoria.ru/upload/resize_cache/iblock/8f2/1230_758_13df4/8f2757d9a7166db58992d8e94811968b.JPG'
  },
  {
    id: 7,
    title: 'Открыт новый курс по морскому аквариуму',
    shortDescription: 'Узнайте, как запустить морской аквариум с нуля.',
    date: '17.04.2025',
    image: 'https://www.petshop.ru/upload/medialibrary/83d/83d4980402475fe776e5063f56b47514.jpg'
  },
  {
    id: 8,
    title: 'Обновление методички по CO₂',
    shortDescription: 'Добавлены советы по новым диффузорам ADA.',
    date: '15.04.2025',
    image: 'https://astrakhan.angstrem-mebel.ru/upload/medialibrary/962/f8fmq4yp9cqsmrvax4p4rt4gny4f6eia.png'
  },
  {
    id: 9,
    title: 'Новинка: освещение ADA Solar RGB II',
    shortDescription: 'Ультрасовременное освещение — теперь в продаже.',
    date: '12.04.2025',
    image: 'https://akvatoria.ru/upload/resize_cache/iblock/8f2/1230_758_13df4/8f2757d9a7166db58992d8e94811968b.JPG'
  }
])
</script>

<style scoped>
.page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.page-title {
  font-size: 2rem;
  text-align: center;
  color: #222;
}

.page__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  justify-items: center;
}

.news-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: #333;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.news-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.news-card h3 {
  margin: 0.8rem 1rem 0.4rem;
  font-size: 1.15rem;
}

.news-card p {
  margin: 0 1rem 0.8rem;
  color: #555;
  flex-grow: 1;
}

.news-card small {
  margin: 0 1rem 1rem;
  color: #999;
  font-size: 0.8rem;
}
</style>
