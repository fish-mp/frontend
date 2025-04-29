<template>
  <header class="header">
    <!-- 👇 Кнопки входа/регистрации отдельно -->
    <div class="auth-panel">
      <template v-if="!auth.user">
        <button class="auth-btn" @click="showLogin = true">Войти</button>
        <button class="auth-btn" @click="showRegister = true">Регистрация</button>
      </template>
      <template v-else>
        <!-- <span class="welcome">Привет, {{ auth.user.name }}</span> -->
        <button class="auth-btn" @click="auth.logout()">Выйти</button>
      </template>
    </div>

    <!-- Логотип -->
    <div class="logo-container">
      <router-link to="/">
        <img src="/logo.png" alt="ADA Logo" class="logo" />
      </router-link>
      <button class="burger" @click="toggleNav">☰</button>
    </div>

    <!-- Навигация -->
    <nav :class="['main-nav', { open: isNavOpen }]">
      <router-link to="/">ГЛАВНАЯ</router-link>
      <router-link to="/intro">АКВА-ЖУРНАЛ</router-link>
      <router-link to="/news">НОВОСТИ</router-link>
      <router-link to="/courses">КУРСЫ</router-link>
      <router-link to="/contact">ПОДДЕРЖКА</router-link>
    </nav>

    <!-- Модалки -->
    <LoginModal v-if="showLogin" @close="showLogin = false" />
    <RegisterModal v-if="showRegister" @close="showRegister = false" />
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import LoginModal from './LoginModal.vue'
import RegisterModal from './RegisterModal.vue'

const isNavOpen = ref(false)
const showLogin = ref(false)
const showRegister = ref(false)

const toggleNav = () => (isNavOpen.value = !isNavOpen.value)

const auth = useAuthStore()
// onMounted(() => auth.loadFromStorage())
</script>

<style scoped>
.header {
  background-color: #000;
  color: white;
  text-align: center;
  padding-bottom: 1rem;
}

.top-bar {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.right-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.right-links a {
  color: #aaa;
  text-decoration: none;
}

.right-links span {
  color: #555;
}

.icon-btn {
  background: none;
  border: none;
  color: #aaa;
  font-size: 1rem;
  cursor: pointer;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 1rem 0 0.5rem 0;
}

.logo {
  max-width: 150px;
  height: auto;
}

.sub-logo {
  position: absolute;
  bottom: -1rem;
  font-size: 0.7rem;
  color: #777;
  text-transform: uppercase;
  letter-spacing: 2px;
  width: 100%;
}

.burger {
  display: none;
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.6rem;
  cursor: pointer;
}

/* Navigation */
.main-nav {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-size: 0.9rem;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
}

.main-nav a {
  color: white;
  text-decoration: none;
  letter-spacing: 1px;
}

.main-nav a.router-link-exact-active {
  border-bottom: 2px solid white;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .burger {
    display: block;
  }

  .main-nav {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
  }

  .main-nav.open {
    max-height: 300px;
    opacity: 1;
    pointer-events: auto;
  }

  .top-bar {
    justify-content: center;
    font-size: 0.75rem;
  }
}

.auth-panel {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.auth-btn {
  background: black;
  border: 1px solid #444;
  color: #ccc;
  padding: 0.4rem 0.9rem;
  font-size: 0.8rem;
  border-radius: 4px;
  transition: 0.3s ease all;
}

.auth-btn:hover {
  background: #111;
  color: white;
  border-color: white;
}

.welcome {
  color: #aaa;
  margin-right: 0.5rem;
  font-size: 0.8rem;
}
</style>
