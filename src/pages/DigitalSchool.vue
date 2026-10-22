<script setup lang="ts">
import { computed, ref } from 'vue';
import { directions } from '../data/directions';
import PortalIcon from '../components/portal/PortalIcon.vue';
import SchoolPlanets from '../components/portal/SchoolPlanets.vue';
import SpaceScene from '../components/portal/SpaceScene.vue';
import PopularCourses from '../components/portal/PopularCourses.vue';
import SchoolTeachers from '../components/portal/SchoolTeachers.vue';

const selectedIndex = ref(6);
const slideDirection = ref(1);
const selected = computed(() => directions[selectedIndex.value]!);
function changeSlide(step: number) {
  slideDirection.value = Math.sign(step);
  selectedIndex.value = (selectedIndex.value + step + directions.length) % directions.length;
}
function selectSlide(index: number) {
  if (index === selectedIndex.value) return;
  slideDirection.value = index > selectedIndex.value ? 1 : -1;
  selectedIndex.value = index;
}
</script>

<template>
  <section class="ds-hero" aria-labelledby="hero-title">
    <SpaceScene />
    <div class="ds-hero-content">
      <p class="ds-eyebrow">Большой мир начинается с любопытства</p>
      <h1 id="hero-title">Цифровая школа</h1>
      <p class="ds-hero-tagline">Учись, исследуй, открывай новое!</p>
      <p class="ds-hero-description">
        От первых открытий до новых профессиональных высот.<br class="ds-desktop-break" />
        Выбери своё направление и развивайся в своём темпе.
      </p>
      <a href="#directions" class="ds-button ds-button--hero"
        >Выбрать направление <PortalIcon name="arrow" :size="20"
      /></a>
    </div>
    <SchoolPlanets />
  </section>

  <div class="ds-container">
    <section id="directions" class="ds-section" aria-labelledby="directions-title">
      <div class="ds-section-heading">
        <div>
          <p class="ds-eyebrow">У каждого свой путь</p>
          <h2 id="directions-title">Найди свою школу</h2>
        </div>
        <p>Семь направлений. <br />Множество новых открытий.</p>
      </div>
      <div
        class="ds-spotlight"
        :style="{
          '--direction-color': selected.color,
          '--direction-tint': selected.tint,
          '--slide-offset': `${slideDirection * 20}px`,
        }"
        aria-roledescription="карусель"
        aria-label="Знакомство с направлениями"
        @keydown.left="changeSlide(-1)"
        @keydown.right="changeSlide(1)"
      >
        <div
          :key="`copy-${selected.id}`"
          class="ds-spotlight-copy"
          aria-live="polite"
          aria-atomic="true"
        >
          <span class="ds-badge">{{
            selected.to ? 'Уже можно учиться' : 'Готовим к запуску'
          }}</span>
          <h3>{{ selected.title }}</h3>
          <p>{{ selected.description }}</p>
          <router-link v-if="selected.to" :to="selected.to" class="ds-button ds-button--white"
            >Перейти в школу <PortalIcon name="arrow" :size="19" /></router-link
          ><a v-else :href="`#${selected.id}`" class="ds-button ds-button--white"
            >О направлении <PortalIcon name="arrow" :size="19"
          /></a>
        </div>
        <div :key="`art-${selected.id}`" class="ds-spotlight-art" aria-hidden="true">
          <span class="ds-orbit ds-orbit--one" /><span class="ds-orbit ds-orbit--two" /><PortalIcon
            :name="selected.icon"
            :size="132"
          /><span class="ds-art-star">✦</span><span class="ds-art-star ds-art-star--small">✧</span>
        </div>
        <button
          class="ds-slider-arrow ds-slider-arrow--prev"
          aria-label="Предыдущее направление"
          @click="changeSlide(-1)"
        >
          ←</button
        ><button
          class="ds-slider-arrow ds-slider-arrow--next"
          aria-label="Следующее направление"
          @click="changeSlide(1)"
        >
          →
        </button>
      </div>
      <div class="ds-slider-dots" aria-label="Выбор направления">
        <button
          v-for="(direction, index) in directions"
          :key="direction.id"
          :class="{ 'is-active': index === selectedIndex }"
          :aria-label="direction.title"
          :aria-pressed="index === selectedIndex"
          @click="selectSlide(index)"
        />
      </div>

      <div class="ds-directions-grid">
        <article
          v-for="direction in directions"
          :id="direction.id"
          :key="direction.id"
          class="ds-direction"
          :class="{ 'ds-direction--available': direction.to }"
          :style="{ '--direction-color': direction.color, '--direction-tint': direction.tint }"
        >
          <div class="ds-direction-top">
            <span class="ds-direction-icon"><PortalIcon :name="direction.icon" :size="29" /></span
            ><span class="ds-direction-age">{{ direction.audience }}</span>
          </div>
          <h3>{{ direction.title }}</h3>
          <p>{{ direction.description }}</p>
          <router-link v-if="direction.to" :to="direction.to" class="ds-direction-link"
            >Перейти в школу <PortalIcon name="arrow" :size="20" /></router-link
          ><span v-else class="ds-coming"><span />Скоро откроется</span>
        </article>
      </div>
    </section>

    <PopularCourses />
    <SchoolTeachers />
  </div>
</template>
