<template>
  <img class="style" src="../assets/image/wave.png" alt="">
  <header class="header">
    <div class="header__wrapper">
      <router-link to="/" class="header__logo-link">
        <img src="../assets/image/logo.png" alt="Логотип" class="header__logo" />
      </router-link>
      <nav class="header__nav">
        <router-link to="/" class="header__nav-link" active-class="header__nav-link--active">Главная</router-link>
        <router-link to="/department" class="header__nav-link">Аквариумистика</router-link>
        <router-link to="/news" class="header__nav-link">Новости</router-link>
        <button @click="showOlympic = !showOlympic" class="header__nav-link header__nav-link--dropdown">
          Курсы
        </button>
        <router-link to="/news" class="header__nav-link">Мероприятия</router-link>
        <div v-show="showStudents" class="header__subnav">
          <router-link to="/test-work" class="header__subnav-link">Контрольные работы</router-link>
          <router-link to="/materials" class="header__subnav-link">Учебные материалы</router-link>
          <router-link to="/video" class="header__subnav-link">Видеолекции</router-link>
        </div>
        <div v-show="showOlympic" class="header__subnav header__subnav--second">
          <router-link to="/olimpic" class="header__subnav-link">Текущая олимпиада</router-link>
          <router-link to="/archive" class="header__subnav-link">Архив</router-link>
          <router-link to="/regulations" class="header__subnav-link">Регламенты</router-link>
          <router-link to="/result" class="header__subnav-link">Результаты</router-link>
          <a href="https://online.mospolytech.ru/" class="header__subnav-link" target="_blank">Курс для подготовки</a>
        </div>
      </nav>
      <div class="header__actions">
        <template v-if="!isAuth">
          <button class="btn btn--login" @click="showLogin = true">Войти</button>
          <button class="btn btn--register" @click="showRegister = true">Зарегистрироваться</button>
        </template>
        <template v-else>
          <span class="user__name">{{ user?.first_name || user?.email }}</span>
          <button class="btn btn--logout" @click="auth.logout()">Выйти</button>
        </template>
      </div>
      <button class="header__burger" @click="$emit('toggle-sidebar')">
        <img class="header__menu" src="../assets/image/burgerMenu.svg" alt="Меню" />
      </button>
    </div>
  </header>
  <LoginPopup v-model="showLogin" />
  <RegisterPopup v-model="showRegister" />
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import LoginPopup from '../components/LoginPopup.vue';
import RegisterPopup from '../components/RegisterPopup.vue';

const showLogin = ref(false);
const showRegister = ref(false);

const auth = useAuthStore();
const isAuth = computed(() => auth.isAuthenticated);
const user = computed(() => auth.user);
</script>
