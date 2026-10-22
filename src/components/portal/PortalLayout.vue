<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { directions } from '../../data/directions';
import Header from '../Header.vue';

import PortalIcon from './PortalIcon.vue';
import logo from '../../assets/digital-school/logo.png';
import '../../assets/scss/digital-school.scss';

const route = useRoute();
const isHome = computed(() => route.name === 'DigitalSchool');
const year = new Date().getFullYear();
</script>

<template>
  <Header portal />
  <div class="ds-site" :class="{ 'ds-site--home': isHome }">
    <a class="ds-skip" href="#main-content">Перейти к содержимому</a>
    <main id="main-content" tabindex="-1"><slot /></main>
    <footer class="ds-footer">
      <div class="ds-container ds-footer-grid">
        <div>
          <router-link to="/" class="ds-brand ds-brand--footer"
            ><img :src="logo" alt="" /><span>Цифровая школа</span></router-link
          >
          <p class="ds-footer-tagline">Учись, исследуй, открывай новое!</p>
        </div>
        <div>
          <h2>Направления</h2>
          <ul>
            <li v-for="direction in directions" :key="direction.id">
              <router-link v-if="direction.to" :to="direction.to"
                >{{ direction.title }} ↗</router-link
              ><router-link v-else :to="{ path: '/', hash: `#${direction.id}` }">{{
                direction.title
              }}</router-link>
            </li>
          </ul>
        </div>
        <div>
          <h2>О проекте</h2>
          <ul>
            <li><router-link to="/#popular-courses">Популярные курсы</router-link></li>
            <li><router-link to="/news">Новости</router-link></li>
            <li><router-link to="/events">Мероприятия</router-link></li>
            <li><router-link to="/shop">Магазин</router-link></li>
            <li><router-link to="/aquarium">Школа аквариумистики ↗</router-link></li>
          </ul>
        </div>
        <div>
          <h2>Контакты</h2>
          <address class="ds-footer-contacts">
            <a href="tel:+79164354010">+7 (916) 435-40-10</a>
            <a href="mailto:Saaturn2015@mail.ru">Saaturn2015@mail.ru</a>
            <span>Пн–пт, 09:30–18:30</span>
            <span>Бритвина Валентина Валентиновна</span>
          </address>
          <router-link to="/#directions" class="ds-footer-cta"
            >Выбрать направление <PortalIcon name="arrow" :size="18"
          /></router-link>
        </div>
      </div>
      <div class="ds-container ds-footer-bottom">
        <span>© {{ year }} Цифровая школа</span
        ><a
          href="/fishkids_politika_konfidencialnosti.pdf"
          target="_blank"
          rel="noopener noreferrer"
          >Политика конфиденциальности</a
        >
      </div>
    </footer>
  </div>
</template>
