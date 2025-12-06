<template>
    <section class="news-detail" v-if="post">
        <div class="news-detail__wrapper">
            <router-link to="/news" class="news-detail__back">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Назад
            </router-link>
            
            <h1 class="news-detail__title">{{ post.title }}</h1>
            <p class="news-detail__date">{{ formatDate(post.created_at) }}</p>
            
            <div v-if="post.photos && post.photos.length" class="news-detail__slider">
                <button v-if="post.photos.length > 1" class="slider__arrow slider__arrow--left" @click="prevSlide">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                
                <img :src="getPhotoUrl(post.photos[currentSlide].image)" class="slider__image" />
                
                <button v-if="post.photos.length > 1" class="slider__arrow slider__arrow--right" @click="nextSlide">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                
                <div class="slider__pagination" v-if="post.photos.length > 1">
                    <span v-for="(photo, idx) in post.photos" :key="photo.id"
                        :class="['slider__dot', { active: idx === currentSlide }]" @click="goToSlide(idx)">
                    </span>
                </div>
            </div>
            
            <div v-else class="news-detail__no-photo">
                Нет фотографий
            </div>
            
            <div class="news-detail__content">
                <p class="news-detail__desc">{{ post.text }}</p>
            </div>
        </div>
    </section>
    
    <section v-else class="news-detail__notfound">
        <p>Новость не найдена</p>
        <router-link to="/news" class="news-detail__back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-right: 8px;">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Назад
        </router-link>
    </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNewsStore } from "../stores/news";

const route = useRoute();
const router = useRouter();
const newsStore = useNewsStore();

const post = computed(() => {
    const idParam = Number(route.params.id);
    return newsStore.news.find((item) => item.id === idParam);
});

const currentSlide = ref(0);

function prevSlide() {
    if (!post.value?.photos) return;
    currentSlide.value = (currentSlide.value - 1 + post.value.photos.length) % post.value.photos.length;
}

function nextSlide() {
    if (!post.value?.photos) return;
    currentSlide.value = (currentSlide.value + 1) % post.value.photos.length;
}

function goToSlide(idx: number) {
    currentSlide.value = idx;
}

function getPhotoUrl(photoPath: string): string {
    if (!photoPath) return "";
    if (photoPath.startsWith("http://localhost/media")) {
        return photoPath.replace("http://localhost", "http://127.0.0.1:8000");
    }
    if (photoPath.startsWith("http://127.0.0.1/media")) {
        return photoPath.replace("http://127.0.0.1", "http://127.0.0.1:8000");
    }
    if (photoPath.startsWith("http://127.0.0.1:8000")) {
        return photoPath;
    }
    if (photoPath.startsWith("/media")) {
        return "http://127.0.0.1:8000" + photoPath;
    }
    return photoPath;
}

function formatDate(date: string): string {
    const [yyyy, mm, dd] = date.slice(0, 10).split('-');
    return `${dd}.${mm}.${yyyy}`;
}

if (!post.value && !newsStore.loading) {
    setTimeout(() => router.replace('/'), 1800)
}
</script>

<style lang="scss" scoped>
// Цветовая схема как в EventDetail
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
$warning-color: #FFB800;
$error-color: #FF4757;
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

// Основные стили
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
  
  svg {
    margin-right: 4px;
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
}

.news-detail__date {
  color: $text-medium;
  font-size: 1.1rem;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &::before {
    content: '📅';
    font-size: 1.2rem;
  }
}

// Слайдер
.news-detail__slider {
  position: relative;
  width: 100%;
  margin-bottom: 30px;
  border-radius: 20px;
  overflow: hidden;
  @include glass-effect;
  
  @media (max-width: 768px) {
    border-radius: 16px;
    margin-bottom: 25px;
  }
}

.slider__image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
  @include smooth-transition;
  
  @media (max-width: 768px) {
    height: 300px;
  }
  
  @media (max-width: 480px) {
    height: 250px;
  }
}

.slider__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: none;
  color: $primary-blue;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  @include smooth-transition;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  
  &:hover {
    background: $pure-white;
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
  }
  
  &--left {
    left: 20px;
  }
  
  &--right {
    right: 20px;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    
    &--left {
      left: 15px;
    }
    
    &--right {
      right: 15px;
    }
  }
}

.slider__pagination {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 2;
  
  @media (max-width: 768px) {
    bottom: 15px;
  }
}

.slider__dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  margin: 0 6px;
  cursor: pointer;
  border: 2px solid transparent;
  @include smooth-transition;
  
  &.active {
    background: $pure-white;
    border-color: $primary-blue;
    transform: scale(1.2);
  }
  
  &:hover {
    background: $pure-white;
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
    margin: 0 4px;
  }
}

// Блок без фотографий
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
  margin-bottom: 30px;
  white-space: pre-line;
  
  @media (max-width: 768px) {
    font-size: 1.05rem;
    line-height: 1.6;
    margin-bottom: 25px;
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
    justify-content: center;
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