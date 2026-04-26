<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script setup>
import Layout from './components/Layout.vue'
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import { useCartStore } from './stores/cart';

const auth = useAuthStore();
const cart = useCartStore();

onMounted(async () => {
  auth.initAuth();
  if (auth.isAuthenticated) {
    await cart.fetchCart();
  }
});
</script>

<style src="./assets/css/index.css"></style>