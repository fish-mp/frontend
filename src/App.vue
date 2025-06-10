<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script setup>
import Layout from './components/Layout.vue'
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';

const auth = useAuthStore();

onMounted(() => {
  auth.initAuth();
});
</script>

<style src="./assets/css//index.css"></style>
