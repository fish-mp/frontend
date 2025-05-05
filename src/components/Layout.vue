<template>
  <div id="app">
    <Header @toggle-sidebar="toggleSidebar" />
    <Sidebar v-show="showSidebar" @close="toggleSidebar" />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
import Footer from './Footer.vue';

const showSidebar = ref(false);
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};
</script>

<style scoped></style>
