<template>
  <Layout>
    <router-view v-if="ready" />
    <p v-else role="status" style="padding: 140px 24px 64px; text-align: center">Восстанавливаем сессию…</p>
  </Layout>
  <CookiePreferences />
</template>

<script setup>
import CookiePreferences from './components/CookiePreferences.vue'
import Layout from './components/Layout.vue'
import { onMounted, ref } from 'vue';
const ready = ref(false);
import { useAuthStore } from './stores/auth';
import { useCartStore } from './stores/cart';

const auth = useAuthStore();
const cart = useCartStore();

onMounted(async () => {
  try {
    await auth.initAuth();
    if (auth.isAuthenticated) await cart.fetchCart();
  } finally { ready.value = true; }
});
</script>

<style src="./assets/css/index.css"></style>
