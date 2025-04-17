<template>
    <div class="modal">
      <div class="modal-box">
        <button class="modal-close" @click="emit('close')">×</button>
        <h3 class="modal-title">Вход</h3>
        <input class="modal-input" v-model="email" placeholder="Email" />
        <input class="modal-input" type="password" v-model="password" placeholder="Пароль" />
        <button class="modal-btn" @click="handleLogin">Войти</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useAuthStore } from '../stores/auth'
  
  const email = ref('')
  const password = ref('')
  const auth = useAuthStore()
  
  const emit = defineEmits(['close'])
  
  const handleLogin = async () => {
    const res = await fetch('/users.json')
    const users = await res.json()
  
    const user = users.find(
      (u: any) => u.email === email.value && u.password === password.value
    )
  
    if (user) {
      auth.login(user)
      email.value = ''
      password.value = ''
      emit('close')
    } else {
      alert('Неверный логин или пароль')
    }
  }
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .modal-box {
    background: #0d0d0d;
    padding: 2.5rem;
    border-radius: 12px;
    color: white;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.05);
    position: relative;
    animation: fadeIn 0.3s ease;
  }
  
  .modal-title {
    margin-bottom: 1.5rem;
    font-weight: 600;
    font-size: 1.5rem;
    text-align: center;
    letter-spacing: 1px;
  }
  
  .modal-input {
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.6rem;
    background: #1a1a1a;
    border: 1px solid #333;
    color: white;
    border-radius: 6px;
    font-size: 0.95rem;
  }
  
  .modal-btn {
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
  
  .modal-btn:hover {
    background: #005577;
  }
  
  .modal-close {
    position: absolute;
    top: 0.6rem;
    right: 0.8rem;
    background: none;
    border: none;
    color: #888;
    font-size: 1.5rem;
    cursor: pointer;
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
  