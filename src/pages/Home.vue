<template>
      <section class="department">
            <div class="department__wrapper">
                  <span id="bg-circle-1"></span>
                  <span id="bg-circle-2"></span>
                  <h1 class="department__title">Юношеская школа аквариумистики "АкваВселенная"</h1>
                  <p class="department__description">
                        Здесь вы сможете более подробно познакомиться с интересующими вас рыбками. У вас
                        появится возможность воспользоваться нашими курсами по аквариумистике.
                  </p>
            </div>
      </section>

      <AboutSection />
      <NewsSection />
      <CourseSection />
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

<style scoped>
.department__title {
      font-size: calc(65px + 1.5vw);
}

@media (max-width: 768px) {
      .department__title {
            font-size: calc(22px + 1.5vw);
      }

      .department__info {
            font-size: 1rem;
      }

      .staff__header {
            margin-bottom: 10px;
      }
}
</style>
