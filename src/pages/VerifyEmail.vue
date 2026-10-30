<template>
  <section class="verification">
    <div class="verification__card">
      <span class="verification__eyebrow">FISHKIDS · ЛИЧНЫЙ КАБИНЕТ</span>
      <div class="verification__icon" aria-hidden="true">{{ confirmed ? '✓' : '@' }}</div>
      <h1>{{ confirmed ? 'Почта подтверждена' : 'Остался один шаг' }}</h1>
      <p v-if="confirmed" role="status">Добро пожаловать в FishKids! Теперь можно войти в аккаунт с вашей почтой и паролем.</p>
      <p v-else>Подтвердите адрес, чтобы открыть свой личный кабинет.</p>
      <p v-if="error" role="alert" class="verification__error">{{ error }}</p>
      <button v-if="!confirmed && token" :disabled="loading" @click="verify">{{ loading ? 'Подтверждаем…' : 'Подтвердить почту' }}</button>
      <router-link v-else to="/">{{ confirmed ? 'На главную — войти в аккаунт' : 'На главную' }}</router-link>
      <small>Если срок ссылки истёк, запросите новое письмо в форме входа.</small>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const token = new URLSearchParams(window.location.hash.slice(1)).get('token') || ''
// Keep the secret out of subsequent navigation and browser history entries.
window.history.replaceState(window.history.state, '', window.location.pathname)
const loading = ref(false)
const confirmed = ref(false)
const error = ref(token ? '' : 'В ссылке нет кода подтверждения. Запросите новое письмо.')

async function verify() {
  loading.value = true
  error.value = ''
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/verify-email/`, {
      method: 'POST', credentials: 'omit',
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.detail || 'Не удалось подтвердить почту.')
    confirmed.value = true
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Проверьте подключение и повторите попытку.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.verification { min-height: 70vh; padding: 64px 20px; display: grid; place-items: center; background: #f1f5fa; }
.verification__card { width: min(100%, 520px); box-sizing: border-box; background: white; padding: 40px 32px; border: 1px solid #e4eaf2; border-radius: 24px; text-align: center; color: #142745; box-shadow: 0 16px 48px #14274509; }
.verification__eyebrow { color: #65758e; font-size: 11px; letter-spacing: 1.5px; }
.verification__icon { margin: 28px auto 24px; width: 64px; height: 64px; display: grid; place-items: center; border-radius: 20px; background: #edf1ff; color: #173ded; font-size: 30px; font-weight: 700; }
h1 { margin: 0 0 16px; font-size: 30px; line-height: 1.2; }
p { color: #516078; line-height: 1.7; font-size: 16px; }
button, a { display: inline-block; margin: 16px 0 20px; padding: 15px 22px; border: none; border-radius: 12px; background: #173ded; color: white; font-size: 15px; font-weight: 600; text-decoration: none; cursor: pointer; }
button:disabled { opacity: .6; cursor: wait; }
small { display: block; color: #77859a; font-size: 12px; line-height: 1.7; }
.verification__error { color: #b42332; }
@media (max-width: 480px) { .verification__card { padding: 32px 20px; } h1 { font-size: 26px; } }
</style>
