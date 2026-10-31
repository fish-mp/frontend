<template>
  <aside v-if="legalState.config.ready && (cookieSettingsOpen || !cookieChoice)" class="cookie-preferences" aria-label="Настройки cookies">
    <h2>Настройки конфиденциальности</h2>
    <p>Для входа и работы сайта используется необходимое хранилище браузера. Необязательную аналитику Яндекс.Метрики можно разрешить или оставить выключенной.</p>
    <router-link to="/legal/cookies-policy">Подробнее о cookies и аналитике</router-link>
    <div class="cookie-actions">
      <button type="button" @click="chooseAnalytics(false)">Только необходимые</button>
      <button type="button" @click="chooseAnalytics(true)">Разрешить аналитику</button>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { legalState, loadLegal, cookieSettingsOpen, cookieChoice, chooseAnalytics } from '../utils/legal'
onMounted(loadLegal)
</script>
<style scoped>
.cookie-preferences { position: fixed; z-index: 10000; bottom: 20px; left: 20px; right: 20px; max-width: 640px; margin-left: auto; padding: 24px; border: 1px solid #dce3ef; border-radius: 20px; background: white; color: #142745; box-shadow: 0 12px 40px #14274525; }
h2 { margin: 0 0 12px; font-size: 20px; } p { font-size: 14px; line-height: 1.6; } a { color: #173ded; }
.cookie-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 18px; }
button { flex: 1 1 220px; border: 1px solid #173ded; border-radius: 10px; padding: 12px; background: #fff; color: #173ded; font: inherit; cursor: pointer; }
</style>
