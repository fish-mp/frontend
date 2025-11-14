<template>
  <header class="header">
    <div class="header__wrapper">
      <!-- Логотип -->
      <router-link to="/" class="header__logo-link">
        <div class="logo-container">
          <div class="logo-glow"></div>
          <img src="../assets/image/logo.svg" alt="Логотип" class="header__logo" />
        </div>
      </router-link>

      <!-- Навигация -->
      <nav ref="mobileNav" :class="['header__nav', { 'header__nav--open': isMobileNavOpen }]">
        <div class="nav-backdrop"></div>
        
        <router-link to="/" class="header__nav-link" active-class="header__nav-link--active" @click="closeMobileNav">
          <div class="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="nav-text">Главная</span>
          <div class="nav-highlight"></div>
        </router-link>
        
        <router-link to="/aquaristics" class="header__nav-link" active-class="header__nav-link--active" @click="closeMobileNav">
          <div class="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="nav-text">Аквариумистика</span>
          <div class="nav-highlight"></div>
        </router-link>
        
        <router-link to="/news" class="header__nav-link" active-class="header__nav-link--active" @click="closeMobileNav">
          <div class="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 20H5C3.89543 20 3 19.1046 3 18V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 10H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="nav-text">Новости</span>
          <div class="nav-highlight"></div>
        </router-link>

        <div class="header__nav-dropdown" @mouseenter="dropdownOpen = true" @mouseleave="dropdownOpen = false">
          <div class="header__nav-link" :class="{ 'header__nav-link--active': $route.path === '/courses' }">
            <div class="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 14L21 9L12 4L3 9L12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 12V20C9 20.2652 9.10536 20.5196 9.29289 20.7071C9.48043 20.8946 9.73478 21 10 21H14C14.2652 21 14.5196 20.8946 14.7071 20.7071C14.8946 20.5196 15 20.2652 15 20V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="nav-text">
              Курсы
              <svg width="16" height="16" style="margin-left: 8px; vertical-align: middle" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <div class="nav-highlight"></div>
          </div>
          <transition name="dropdown">
            <div v-if="dropdownOpen" class="header__dropdown-list">
              <a v-for="level in difficultyLevels" :key="level.value" 
                 href="#" class="header__dropdown-link" 
                 @click.prevent="navigateToCoursesWithFilter(level.value)">
                <span class="dropdown-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span class="dropdown-text">{{ level.label }}</span>
              </a>
            </div>
          </transition>
        </div>

        <router-link to="/events" class="header__nav-link" active-class="header__nav-link--active" @click="closeMobileNav">
          <div class="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="nav-text">Мероприятия</span>
          <div class="nav-highlight"></div>
        </router-link>
      </nav>

      <!-- Кнопки авторизации -->
      <div class="header__actions">
        <template v-if="!isAuth">
          <button class="btn btn--primary" @click="showLogin = true">
            <span class="btn-text">Войти</span>
            <div class="btn-shine"></div>
          </button>
          <button class="btn btn--secondary" @click="showRegister = true">
            <span class="btn-text">Регистрация</span>
            <div class="btn-glow"></div>
          </button>
        </template>
        <template v-else>
          <div class="user-profile">
            <div class="user-avatar">
              {{ user?.first_name?.[0] || user?.email?.[0] || 'U' }}
            </div>
            <span class="user__name">{{ user?.first_name || user?.email }}</span>
            <button class="btn btn--logout" @click="auth.logout()">
              <span class="btn-text">Выйти</span>
            </button>
          </div>
        </template>
      </div>

      <!-- Бургер меню -->
      <button class="header__burger" ref="burger" :class="{ 'header__burger--open': isMobileNavOpen }" @click="toggleMobileNav">
        <div class="burger-line burger-line-1"></div>
        <div class="burger-line burger-line-2"></div>
        <div class="burger-line burger-line-3"></div>
      </button>
    </div>
  </header>

  <LoginPopup v-model="showLogin" />
  <RegisterPopup v-model="showRegister" />
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRoute, useRouter } from "vue-router";
import { useCourseStore } from "../stores/course";
import { useDifficultyLevels } from "../composables/useDifficultyLevels";
import LoginPopup from "../components/LoginPopup.vue";
import RegisterPopup from "../components/RegisterPopup.vue";

const emit = defineEmits(['toggle-sidebar'])
const router = useRouter();
const courseStore = useCourseStore();

const showLogin = ref(false);
const showRegister = ref(false);
const dropdownOpen = ref(false);
const isMobileNavOpen = ref(false);

const difficultyLevels = useDifficultyLevels();

const mobileNav = ref(null);
const burger = ref(null);

const auth = useAuthStore();
const isAuth = computed(() => auth.isAuthenticated);
const user = computed(() => auth.user);

const route = useRoute();

function closeMobileNav() {
  isMobileNavOpen.value = false;
}

function toggleMobileNav() {
  isMobileNavOpen.value = !isMobileNavOpen.value;
  emit('toggle-sidebar')
}

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

onBeforeUnmount(() => {
  document.removeEventListener("click", onClickOutside);
});

watch(
  () => route.fullPath,
  () => {
    isMobileNavOpen.value = false;
  }
);

const navigateToCoursesWithFilter = (difficulty) => {
  router.push({
    path: '/courses',
    query: { difficulty }
  });
  closeMobileNav();
  dropdownOpen.value = false;
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/Header.scss';
</style>
