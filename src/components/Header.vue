<template>
  <img class="style" src="../assets/image/wave.png" alt="" />
  <header class="header">
    <div class="header__wrapper">
      <!-- Логотип -->
      <router-link to="/" class="header__logo-link">
        <img src="../assets/image/logo.svg" alt="Логотип" class="header__logo" />
      </router-link>

      <!-- Навигация -->
      <!-- Добавили ref="mobileNav" -->
      <nav ref="mobileNav" :class="['header__nav', { 'header__nav--open': isMobileNavOpen }]">
        <!-- Закрываем меню при клике на ссылку -->
        <router-link to="/" class="header__nav-link" active-class="header__nav-link--active" @click="closeMobileNav">
          Главная
        </router-link>
        <router-link to="/aquaristics" class="header__nav-link" active-class="header__nav-link--active"
          @click="closeMobileNav">
          Аквариумистика
        </router-link>
        <router-link to="/news" class="header__nav-link" active-class="header__nav-link--active"
          @click="closeMobileNav">
          Новости
        </router-link>

        <div v-if="isAuth" class="header__nav-dropdown" @mouseenter="dropdownOpen = true"
          @mouseleave="dropdownOpen = false">
          <router-link to="/courses" class="header__nav-link" active-class="header__nav-link--active"
            @click="closeMobileNav">
            Курсы
            <svg width="13" height="8" style="margin-left: 4px; vertical-align: middle" viewBox="0 0 13 8" fill="none">
              <path d="M1 1L6.5 7L12 1" stroke="#19b2b2" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </router-link>
          <ul v-if="dropdownOpen" class="header__dropdown-list">
            <li>
              <router-link to="/courses/1" class="header__dropdown-link" @click="closeMobileNav">
                Мастер класс 1
              </router-link>
            </li>
            <li>
              <router-link to="/courses/2" class="header__dropdown-link" @click="closeMobileNav">
                Мастер класс 2
              </router-link>
            </li>
            <li>
              <router-link to="/courses/3" class="header__dropdown-link" @click="closeMobileNav">
                Мастер класс 3
              </router-link>
            </li>
          </ul>
        </div>

        <router-link to="/events" class="header__nav-link" active-class="header__nav-link--active"
          @click="closeMobileNav">
          Мероприятия
        </router-link>

        <!-- Мобильные кнопки внутри меню -->
        <div class="header__actions header__actions--mobile">
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
      </nav>

      <!-- Десктопные кнопки -->
      <div class="header__actions header__actions--desktop">
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

      <!-- Бургер -->
      <!-- Добавили ref="burger" -->
      <button class="header__burger" ref="burger" @click="toggleMobileNav">
        <img class="header__menu" src="../assets/image/burgerMenu.svg" alt="Меню" />
      </button>
    </div>
  </header>

  <LoginPopup v-model="showLogin" />
  <RegisterPopup v-model="showRegister" />
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRoute } from "vue-router";
import LoginPopup from "../components/LoginPopup.vue";
import RegisterPopup from "../components/RegisterPopup.vue";

const emit = defineEmits(['toggle-sidebar'])

const showLogin = ref(false);
const showRegister = ref(false);
const dropdownOpen = ref(false);
const isMobileNavOpen = ref(false);

// Новые ссылки на DOM
const mobileNav = ref(null);
const burger = ref(null);

const auth = useAuthStore();
const isAuth = computed(() => auth.isAuthenticated);
const user = computed(() => auth.user);

const route = useRoute();

// Функция закрытия меню
function closeMobileNav() {
  isMobileNavOpen.value = false;
}

function toggleMobileNav() {
  isMobileNavOpen.value = !isMobileNavOpen.value;
  emit('toggle-sidebar')
}

// Обработчик кликов вне меню/бургера
function onClickOutside(event) {
  if (
    isMobileNavOpen.value &&
    mobileNav.value &&
    burger.value &&
    !mobileNav.value.contains(event.target) &&
    !burger.value.contains(event.target)
  ) {
    isMobileNavOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", onClickOutside);
});

// Убираем слушатель при уничтожении компонента
onBeforeUnmount(() => {
  document.removeEventListener("click", onClickOutside);
});

// При каждом переходе по маршруту закрываем мобильное меню
watch(
  () => route.fullPath,
  () => {
    isMobileNavOpen.value = false;
  }
);
</script>

<style scoped>
.header {
  background-color: var(--overlay-bg);
  backdrop-filter: blur(30px);
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.header__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1375px;
  margin: 0 auto;
}

/* Логотип */
.header__logo {
  width: 80px;
  height: auto;
}

@media (max-width: 1024px) {
  .header {
    padding: 8px;
  }

  .header__logo {
    width: 70px;
  }
}

@media (max-width: 767px) {
  .header__logo {
    width: 60px;
  }
}

/* Навигация */
.header__nav {
  display: flex;
  gap: 50px;
  align-items: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.header__nav-link {
  color: var(--color-text);
  font-family: "Gotham Pro", sans-serif;
  font-weight: 400;
  line-height: 140%;
  text-decoration: none;
  transition: color 0.3s;
}

@media (min-width: 320px) {
  .header__nav-link {
    font-size: calc(10px + 0.5vw);
  }
}

@media (min-width: 900px) {
  .header__nav-link {
    font-size: calc(12px + 0.25vw);
  }
}

.header__nav-link--active {
  font-weight: 700;
}

.header__nav-link:hover {
  color: var(--color-turquoise);
}

/* Дропдаун */
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
    background: transparent;
    padding: 0;
    transform: none;
  }
}

/* Кнопки */
.header__actions {
  gap: 12px;
  align-items: center;
}

/* Десктоп */
.header__actions--desktop {
  display: flex;
}

@media (max-width: 1024px) {
  .header__actions--desktop {
    display: none;
  }
}

/* Мобайл */
.header__actions--mobile {
  display: none;
  flex-direction: column;
  margin-top: 20px;
}

@media (max-width: 1024px) {
  .header__actions--mobile {
    display: flex;
  }
}

/* Бургер и меню */
.header__burger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}

.header__menu {
  width: 40px;
  height: auto;
}

@media (max-width: 1024px) {
  .header__burger {
    display: flex;
  }

  /* Скрываем базовую навигацию */
  .header__nav {
    display: none;
  }

  /* Показываем, когда open-класс */
  .header__nav.header__nav--open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 150%;
    left: 0;
    width: 100%;
    padding: 20px 0;
    background-color: var(--overlay-bg);
    backdrop-filter: blur(30px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    background-color: white;
  }

  .header__nav.header__nav--open .header__nav-link {
    display: block;
    padding: 10px 20px;
    font-size: 1.1rem;
  }
}
</style>
