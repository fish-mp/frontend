<template>
  <img class="style" src="../assets/image/wave.png" alt="" />
  <header class="header">
    <div class="header__wrapper">
      <router-link to="/" class="header__logo-link">
        <img src="../assets/image/logo.png" alt="Логотип" class="header__logo" />
      </router-link>
      <nav class="header__nav">
        <router-link to="/" class="header__nav-link" active-class="header__nav-link--active">Главная</router-link>
        <router-link to="/aquaristics" class="header__nav-link"
          active-class="header__nav-link--active">Аквариумистика</router-link>
        <router-link active-class="header__nav-link--active" to="/news" class="header__nav-link">Новости</router-link>
        <div class="header__nav-dropdown" @mouseenter="dropdownOpen = true" @mouseleave="dropdownOpen = false">
          <router-link to="/courses" class="header__nav-link" active-class="header__nav-link--active">Курсы
            <svg width="13" height="8" style="margin-left: 4px; vertical-align: middle" viewBox="0 0 13 8" fill="none">
              <path d="M1 1L6.5 7L12 1" stroke="#19b2b2" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </router-link>
          <ul v-if="dropdownOpen" class="header__dropdown-list">
            <li>
              <router-link to="/courses/1" class="header__dropdown-link">Морской аквариум</router-link>
            </li>
            <li>
              <router-link to="/courses/2" class="header__dropdown-link">Пресноводный аквариум</router-link>
            </li>
            <li>
              <router-link to="/courses/3" class="header__dropdown-link">Рифовый аквариум</router-link>
            </li>
          </ul>
        </div>
        <router-link to="/news" class="header__nav-link"
          active-class="header__nav-link--active">Мероприятия</router-link>
      </nav>

      <div class="header__actions">
        <template v-if="!isAuth">
          <button class="btn btn--login" @click="showLogin = true">Войти</button>
          <button class="btn btn--register" @click="showRegister = true">
            Зарегистрироваться
          </button>
        </template>
        <template v-else>
          <span class="user__name">{{ user?.first_name || user?.email }}</span>
          <button class="btn btn--login" @click="auth.logout()">Выйти</button>
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
import { ref, computed } from "vue";
import { useAuthStore } from "../stores/auth";
import LoginPopup from "../components/LoginPopup.vue";
import RegisterPopup from "../components/RegisterPopup.vue";
import { useRoute } from "vue-router";

const showLogin = ref(false);
const showRegister = ref(false);

const dropdownOpen = ref(false);

const auth = useAuthStore();
const isAuth = computed(() => auth.isAuthenticated);
const user = computed(() => auth.user);

const route = useRoute();
const isCoursesActive = computed(() => route.path.startsWith("/courses"));
</script>

<style scoped>
.header__nav-dropdown {
  position: relative;
  display: inline-block;
}

.header__dropdown-list {
  position: absolute;
  left: 0;
  top: 110%;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 32px rgba(0, 0, 0, 0.07);
  min-width: 190px;
  padding: 8px 0;
  z-index: 15;
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  transition: opacity 0.2s, transform 0.2s;
}

.header__dropdown-link {
  display: block;
  padding: 12px 22px;
  font-size: 1rem;
  color: #19b2b2;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}

.header__dropdown-link:hover {
  background: #e6f7f7;
  color: #157a7a;
}

@media (max-width: 700px) {
  .header__dropdown-list {
    position: static;
    box-shadow: none;
    min-width: unset;
    background: transparent;
    padding: 0;
  }
}
</style>
