<template>
    <div v-if="modelValue" class="popup__overlay" @click.self="$emit('update:modelValue', false)">
        <div class="popup">
            <div class="popup__header">
                <h2 class="popup__title">Вход в систему</h2>
                <button class="popup__close" @click="$emit('update:modelValue', false)">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
            
            <form class="popup__form" @submit.prevent="handleLogin">
                <div class="form__group">
                    <label class="form__label">Почта</label>
                    <input 
                        type="email" 
                        v-model="email" 
                        placeholder="your@email.com" 
                        required 
                        class="form__input"
                    />
                </div>
                
                <div class="form__group">
                    <label class="form__label">Пароль</label>
                    <input 
                        type="password" 
                        v-model="password" 
                        placeholder="Введите пароль" 
                        required 
                        class="form__input"
                    />
                </div>
                
                <button class="btn btn--primary btn--full" type="submit" :disabled="loading">
                    <span v-if="!loading" class="btn-text">Войти</span>
                    <span v-else class="loading">Вход...</span>
                </button>
                
                <div class="form__footer">
                    <a href="#" class="form__link">Забыли пароль?</a>
                    <a href="#" class="form__link">Регистрация</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const props = defineProps({
    modelValue: { type: Boolean, required: true }
});
const emit = defineEmits(['update:modelValue']);

const email = ref('');
const password = ref('');
const loading = ref(false);
const auth = useAuthStore();

const handleLogin = async () => {
    loading.value = true;
    try {
        await auth.login({ email: email.value, password: password.value });
        emit('update:modelValue', false);
        email.value = '';
        password.value = '';
    } catch (e) {
        alert('Ошибка входа. Проверьте email и пароль.');
    } finally {
        loading.value = false;
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/LoginPopup.scss';
</style>