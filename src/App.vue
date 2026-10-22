<template>
  <component :is="route.meta.portal ? PortalLayout : Layout">
    <router-view />
  </component>
</template>

<script setup>
import Layout from './components/Layout.vue'
import PortalLayout from './components/portal/PortalLayout.vue'
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import { useCartStore } from './stores/cart';

const auth = useAuthStore();
const cart = useCartStore();
const route = useRoute();

onMounted(async () => {
  auth.initAuth();
  if (auth.isAuthenticated) {
    await cart.fetchCart();
  }
});
</script>

<style src="./assets/css/index.css"></style>
