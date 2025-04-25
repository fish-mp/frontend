<template>
  <div class="auth-modal">
    <div class="auth-modal__overlay" @click.self="emit('close')"></div>
    
    <div class="auth-modal__content">
      <button class="auth-modal__close" @click="emit('close')">X</button>
      
      <h2 class="auth-modal__title">Вход</h2>
      
      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="auth-form__group">
          <input
            v-model="username"
            class="auth-form__input"
            required
            placeholder="Username"
          />
        </div>
        
        <div class="auth-form__group">
          <input
            v-model="password"
            type="password"
            class="auth-form__input"
            required
            placeholder="Password"
          />
        </div>
        
        <button
          type="submit"
          class="auth-form__submit"
          :disabled="loading"
        >
          {{ loading ? 'Вход...' : 'Войти' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const emit = defineEmits(['close']);

const username = ref('');
const password = ref('');
const loading = ref(false);

const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    loading.value = true;
    
    await authStore.login({
      username: username.value,
      password: password.value
    });
    
    emit('close');
  } catch (error) {
    alert('Неверный логин или пароль');
    console.error('Login error:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.auth-modal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.auth-modal__content {
  background: #0d0d0d;
  padding: 2.5rem;
  border-radius: 12px;
  color: white;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.05);
  position: relative;
  animation: fadeIn 0.3s ease;
  z-index: 1;
}

.auth-modal__close {
  position: absolute;
  top: 0.6rem;
  right: 0.8rem;
  background: none;
  border: none;
  color: #888;
  font-size: 1.5rem;
  cursor: pointer;
}

.auth-modal__title {
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
  letter-spacing: 1px;
}

.auth-form__group {
  margin-bottom: 1rem;
}

.auth-form__input {
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  background: #1a1a1a;
  border: 1px solid #333;
  color: white;
  border-radius: 6px;
  font-size: 0.95rem;
}

.auth-form__input:focus {
  outline: none;
  border-color: #0077aa;
}

.auth-form__submit {
  width: 100%;
  padding: 0.7rem;
  background: #0077aa;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 6px;
  transition: 0.2s ease;
}

.auth-form__submit:hover:not(:disabled) {
  background: #005577;
}

.auth-form__submit:disabled {
  background: #004466;
  cursor: not-allowed;
  opacity: 0.7;
}

@keyframes fadeIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
