<template>
  <router-view v-if="isUniversityPage" />
  <Layout v-else>
    <router-view />
  </Layout>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { useCartStore } from './stores/cart';

const Layout = defineAsyncComponent(() => import('./components/Layout.vue'));
const route = useRoute();
const isUniversityPage = computed(() => route.meta.university === true);
const auth = useAuthStore();
const cart = useCartStore();

watch(isUniversityPage, async (university) => {
  if (university) return;
  await auth.initAuth();
  if (auth.isAuthenticated) {
    await cart.fetchCart();
  }
}, { immediate: true });
</script>

<style src="./assets/css/index.css"></style>
