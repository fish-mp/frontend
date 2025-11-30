<template>
  <section class="department">
    <!-- Фоновые элементы -->
    <span id="bg-circle-1"></span>
    <span id="bg-circle-2"></span>
    
    <!-- Красивые анимированные рыбки -->
    <div class="fish clown-fish">
      <div class="fish-body">
        <div class="fin dorsal-fin"></div>
        <div class="fin pectoral-fin"></div>
        <div class="tail"></div>
      </div>
    </div>
    
    <div class="fish neon-fish">
      <div class="fish-body">
        <div class="neon-stripe"></div>
        <div class="tail"></div>
      </div>
    </div>
    
    <div class="fish gold-fish">
      <div class="fish-body">
        <div class="veil-tail"></div>
        <div class="flowing-fin"></div>
      </div>
    </div>
    
    <div class="fish angel-fish">
      <div class="fish-body">
        <div class="angel-fin"></div>
        <div class="angel-tail"></div>
      </div>
    </div>
    
    <!-- Пузырьки -->
    <div v-for="i in 15" :key="`bubble-${i}`" :class="`bubble bubble-${i}`"></div>
    
    <!-- Водоросли -->
    <div class="seaweed seaweed-1">
      <div class="stem">
        <div class="leaf"></div>
        <div class="leaf"></div>
        <div class="leaf"></div>
      </div>
    </div>
    <div class="seaweed seaweed-2">
      <div class="stem">
        <div class="leaf"></div>
        <div class="leaf"></div>
      </div>
    </div>
    
    <div class="department__wrapper">
      <h1 class="department__title">Юношеская школа аквариумистики "АкваВселенная"</h1>
      <p class="department__description">
        Здесь вы сможете более подробно познакомиться с интересующими вас рыбками. У вас
        появится возможность воспользоваться нашими курсами по аквариумистике.
      </p>
    </div>
  </section>

  <AboutSection />
  <NewsSection />
  <StaffSection />
  <YandexMaps />
</template>

<script setup>
import AboutSection from "../components/AboutSection.vue";
import NewsSection from "../components/NewsSection.vue";
import CourseSection from "../components/CourseSection.vue";
import YandexMaps from "../components/YandexMaps.vue";
import StaffSection from "../components/StaffSection.vue";
</script>

<style lang="scss" scoped>
@use '../assets/scss/Department.scss';
</style>