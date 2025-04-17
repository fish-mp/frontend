<template>
  <div class="modal">
    <div class="modal-box">
      <button class="modal-close" @click="$emit('close')">×</button>
      <h3 class="modal-title">Регистрация</h3>
      <p class="modal-text">Регистрация пока недоступна. Используйте тестовый аккаунт.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['close'])
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

.modal-text {
  text-align: center;
  color: #bbb;
  font-size: 0.95rem;
  margin-top: 1rem;
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
