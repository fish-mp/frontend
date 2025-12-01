<template>
    <section class="news-detail" v-if="post">
        <div class="news-detail__wrapper">
            <router-link to="/" class="news-detail__back">&larr; Главная</router-link>
            <h1 class="news-detail__title">{{ post.title }}</h1>
            <p class="news-detail__date">{{ post.date }}</p>
            
            <div v-if="post.image" class="news-detail__gallery">
                <img :src="post.image" :alt="post.title" class="news-detail__gallery-img" />
            </div>
            <div v-else class="news-detail__no-photo">
                Нет изображения для новости
            </div>
            
            <div class="news-detail__content">
                <p v-for="(paragraph, idx) in post.fullContent" :key="idx" class="news-detail__desc">
                    {{ paragraph }}
                </p>
            </div>
        </div>
    </section>
    <section v-else class="news-detail__notfound">
        <p>Новость не найдена</p>
        <router-link to="/" class="news-detail__back">&larr; Главная</router-link>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface NewsItem {
    id: number
    title: string
    date: string
    image: string
    fullContent: string[]
}

const route = useRoute()
const router = useRouter()

const news: NewsItem[] = [
    {
        id: 1,
        title: 'Открыт новый курс по морскому аквариуму',
        date: '17.04.2025',
        image: 'https://www.petshop.ru/upload/medialibrary/83d/83d4980402475fe776e5063f56b47514.jpg',
        fullContent: [
            'Узнайте, как запустить морской аквариум с нуля. В этом курсе мы расскажем об оборудовании, подборе обитателей и уходе за рифовой системой.',
            'Курс включает практические занятия: тестирование параметров воды, выбор и установку живого камня, знакомство с основными коралловыми видами.',
            'По итогу обучения вы сможете самостоятельно проектировать, запускать и обслуживать полноценный морской аквариум.'
        ]
    },
    {
        id: 2,
        title: 'Обновление методички по CO₂',
        date: '15.04.2025',
        image: 'https://astrakhan.angstrem-mebel.ru/upload/medialibrary/962/f8fmq4yp9cqsmrvax4p4rt4gny4f6eia.png',
        fullContent: [
            'Добавлены советы по новым диффузорам ADA и методики дозирования CO₂.',
            'Расширены разделы о влиянии pH и KH на рост растений, а также о современных системах контроля подачи газа.',
            'С использованием обновлённой методички вы сможете достичь стабильного уровня CO₂ в вашем аквариуме.'
        ]
    },
    {
        id: 3,
        title: 'Новинка: освещение ADA Solar RGB II',
        date: '12.04.2025',
        image: 'https://akvatoria.ru/upload/resize_cache/iblock/8f2/1230_758_13df4/8f2757d9a7166db58992d8e94811968b.JPG',
        fullContent: [
            'Ультрасовременное освещение нового поколения позволяет настроить спектр под любые виды растений.',
            'Режимы дневного света, имитация заката и лунной подсветки — всё это доступно в одном приборе.',
            'Устройства поддерживают управление по Wi-Fi через мобильное приложение для полной автоматизации.'
        ]
    }
]

const post = computed(() => {
    const idParam = Number(route.params.id)
    return news.find(item => item.id === idParam)
})

if (!post.value) {
    router.replace({ name: 'NewsList' })
}
</script>

<style lang="scss" scoped>
// Цветовая схема как в мероприятиях
$pure-white: #ffffff;
$soft-white: #fafbfc;
$light-grey: #f0f4f8;
$primary-blue: #173DED;
$blue-gradient: linear-gradient(135deg, #173DED 0%, #4d7cfe 50%, #8ba9ff 100%);
$text-dark: #1a1a1a;
$text-medium: #5d6d87;
$text-light: #8a9bb8;
$accent-glow: rgba(23, 61, 237, 0.15);
$success-color: #00BFA6;
$finished-color: #757575;

// Миксины
@mixin glass-effect {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 -1px 0 rgba(0, 0, 0, 0.05);
}

@mixin smooth-transition {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@mixin gradient-border {
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px;
    background: $blue-gradient;
    border-radius: inherit;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: xor;
    -webkit-mask-composite: xor;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
}

// Основные стили с учетом хедера
.news-detail {
  background: 
    radial-gradient(circle at 0% 0%, rgba(23, 61, 237, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 100% 100%, rgba(23, 61, 237, 0.02) 0%, transparent 50%),
    linear-gradient(135deg, $pure-white 0%, $soft-white 100%);
  color: $text-dark;
  padding: 160px 0 80px;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='1' fill='%23173DED' fill-opacity='0.05'/%3E%3C/svg%3E");
    pointer-events: none;
  }
}

.news-detail__wrapper {
  @include glass-effect;

  max-width: 900px;
  margin: 0 auto;
  border-radius: 24px;
  padding: 50px;
  position: relative;
  z-index: 2;
  animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both;
  
  @media (max-width: 768px) {
    padding: 35px 30px;
    border-radius: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 25px 20px;
    border-radius: 16px;
  }
}

.news-detail__back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: $primary-blue;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 30px;
  @include smooth-transition;
  padding: 10px 16px;
  border-radius: 12px;
  background: rgba(23, 61, 237, 0.08);
  
  &:hover {
    background: rgba(23, 61, 237, 0.15);
    transform: translateX(-5px);
  }
  
  @media (max-width: 768px) {
    margin-bottom: 25px;
    font-size: 0.95rem;
  }
}

.news-detail__title {
  font-size: clamp(2.2rem, 4vw, 3rem);
  font-weight: 800;
  background: linear-gradient(135deg, $text-dark 0%, $primary-blue 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0 0 20px 0;
  
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
}

.news-detail__date {
  color: $text-medium;
  font-size: 1.1rem;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 25px;
    gap: 12px;
  }
}

// Галерея для изображения
.news-detail__gallery {
  margin-bottom: 30px;
  border-radius: 20px;
  overflow: hidden;
  @include glass-effect;
  
  @media (max-width: 768px) {
    border-radius: 16px;
    margin-bottom: 25px;
  }
}

.news-detail__gallery-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  &:hover {
    transform: scale(1.03);
  }
  
  @media (max-width: 768px) {
    height: 300px;
  }
  
  @media (max-width: 480px) {
    height: 250px;
  }
}

// Блок без изображения
.news-detail__no-photo {
  padding: 40px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  color: $text-medium;
  border-radius: 16px;
  margin-bottom: 30px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  border: 2px dashed rgba(23, 61, 237, 0.2);
  
  @media (max-width: 768px) {
    padding: 30px;
    font-size: 1rem;
    margin-bottom: 25px;
  }
}

// Контент новости
.news-detail__content {
  margin-top: 30px;
}

.news-detail__desc {
  font-size: 1.15rem;
  line-height: 1.7;
  color: $text-medium;
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 24px;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 12px;
    width: 8px;
    height: 8px;
    background: $primary-blue;
    border-radius: 50%;
    opacity: 0.6;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    font-size: 1.05rem;
    line-height: 1.6;
    margin-bottom: 1.2rem;
    padding-left: 20px;
    
    &::before {
      width: 6px;
      height: 6px;
      top: 10px;
    }
  }
}

// Страница не найдена
.news-detail__notfound {
  text-align: center;
  margin: 160px auto;
  max-width: 500px;
  padding: 0 20px;
  animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  
  p {
    font-size: 1.5rem;
    color: $text-medium;
    margin-bottom: 30px;
    font-weight: 500;
    
    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
  }
  
  .news-detail__back {
    display: inline-flex;
  }
}

// Анимации
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Адаптивность с учетом хедера
@media (max-width: 1200px) {
  .news-detail {
    padding: 140px 40px 60px;
  }
}

@media (max-width: 968px) {
  .news-detail {
    padding: 130px 30px 50px;
  }
}

@media (max-width: 768px) {
  .news-detail {
    padding: 120px 20px 40px;
  }
}

@media (max-width: 480px) {
  .news-detail {
    padding: 110px 15px 30px;
  }
}
</style>