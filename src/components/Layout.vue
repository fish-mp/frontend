<template>
    <div class="layout">
      <Header />
      <main class="main-content">
        <slot />
      </main>
      <Footer />
    </div>
  </template>
  
  <script setup lang="ts">
  import Header from './Header.vue'
  import Footer from './Footer.vue'
  </script>
  
  <style scoped>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .main-content {
    flex: 1;
    padding: 2rem;
    margin: 0 auto;
  }
  </style>
  