<template>
  <header :class="styles.header">
    <div :class="styles.headerWrapper">
      <!-- Логотип -->
      <router-link to="/" :class="styles.headerLogoLink">
        <div :class="styles.logoContainer">
          <div :class="styles.logoGlow"></div>
          <img src="../assets/image/logo.svg" alt="Логотип" :class="styles.logo" />
        </div>
      </router-link>

      <!-- Навигация -->
      <nav ref="mobileNav" :class="[styles.nav, { [styles.navOpen]: isMobileNavOpen }]">
        <div :class="styles.navBackdrop"></div>

        <router-link to="/" :class="[styles.navLink, { [styles.navLinkActive]: $route.path === '/' }]"
          @click="closeMobileNav">
          <div :class="styles.navIcon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <span :class="styles.navText">Главная</span>
          <div :class="styles.navHighlight"></div>
        </router-link>

        <router-link to="/aquaristics"
          :class="[styles.navLink, { [styles.navLinkActive]: $route.path === '/aquaristics' }]" @click="closeMobileNav">
          <div :class="styles.navIcon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <span :class="styles.navText">Аквариумистика</span>
          <div :class="styles.navHighlight"></div>
        </router-link>

        <router-link to="/news" :class="[styles.navLink, { [styles.navLinkActive]: $route.path === '/news' }]"
          @click="closeMobileNav">
          <div :class="styles.navIcon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 20H5C3.89543 20 3 19.1046 3 18V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20Z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M16 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M3 10H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </div>
          <span :class="styles.navText">Новости</span>
          <div :class="styles.navHighlight"></div>
        </router-link>

        <router-link to="/courses" :class="[styles.navLink, { [styles.navLinkActive]: $route.path === '/courses' }]"
          @click="closeMobileNav">
          <div :class="styles.navIcon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 14L21 9L12 4L3 9L12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
              <path
                d="M9 12V20C9 20.2652 9.10536 20.5196 9.29289 20.7071C9.48043 20.8946 9.73478 21 10 21H14C14.2652 21 14.5196 20.8946 14.7071 20.7071C14.8946 20.5196 15 20.2652 15 20V12"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <span :class="styles.navText">Курсы</span>
          <div :class="styles.navHighlight"></div>
        </router-link>

        <router-link to="/events" :class="[styles.navLink, { [styles.navLinkActive]: $route.path === '/events' }]"
          @click="closeMobileNav">
          <div :class="styles.navIcon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <span :class="styles.navText">Мероприятия</span>
          <div :class="styles.navHighlight"></div>
        </router-link>
      </nav>

      <!-- Кнопки авторизации -->
      <div :class="styles.actions">
        <template v-if="!isAuth">
          <button :class="[styles.btn, styles.btnPrimary]" @click="showLogin = true">
            <span :class="styles.btnText">Войти</span>
            <div :class="styles.btnShine"></div>
          </button>
          <button :class="[styles.btn, styles.btnSecondary]" @click="showRegister = true">
            <span :class="styles.btnText">Регистрация</span>
            <div :class="styles.btnGlow"></div>
          </button>
        </template>
        <template v-else>
          <div :class="styles.userProfile">
            <div :class="styles.userAvatar">
              {{ user?.first_name?.[0] || user?.email?.[0] || 'U' }}
            </div>
            <span :class="styles.userName">{{ user?.first_name || user?.email }}</span>
            <button :class="[styles.btn, styles.btnLogout]" @click="auth.logout()">
              <span :class="styles.btnText">Выйти</span>
            </button>
          </div>
        </template>
      </div>

      <!-- Бургер меню -->
      <button :class="[styles.burger, { [styles.burgerOpen]: isMobileNavOpen }]" ref="burger" @click="toggleMobileNav">
        <div :class="[styles.burgerLine, styles.burgerLine1]"></div>
        <div :class="[styles.burgerLine, styles.burgerLine2]"></div>
        <div :class="[styles.burgerLine, styles.burgerLine3]"></div>
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
import LoginPopup from "../components/LoginPopup.vue";
import RegisterPopup from "../components/RegisterPopup.vue";

// Импортируем CSS модуль
import styles from '../assets/scss/Header.module.scss';

const emit = defineEmits(['toggle-sidebar'])
const router = useRouter();
const route = useRoute();

const showLogin = ref(false);
const showRegister = ref(false);
const isMobileNavOpen = ref(false);

const mobileNav = ref(null);
const burger = ref(null);

const auth = useAuthStore();
const isAuth = computed(() => auth.isAuthenticated);
const user = computed(() => auth.user);

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
</script>

<style lang="scss" scoped>
@use '../assets/scss/index.scss';
</style>
