<template>
    <div v-if="modelValue" class="popup__overlay" @click.self="$emit('update:modelValue', false)">
        <div class="popup">
            <h2>Вход</h2>
            <form class="popup__items" @submit.prevent="handleLogin">
                <input type="email" v-model="email" placeholder="Почта" required />
                <input type="password" v-model="password" placeholder="Пароль" required />
                <button class="btn btn--login" type="submit">Войти</button>
            </form>
            <button class="popup__close" @click="$emit('update:modelValue', false)">х</button>
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
const auth = useAuthStore();

const handleLogin = async () => {
    try {
        await auth.login({ email: email.value, password: password.value });
        emit('update:modelValue', false);
        email.value = '';
        password.value = '';
    } catch (e) {
        alert('Ошибка входа');
    }
};
</script>

<style lang="scss">
.popup__overlay {
    position: fixed;
    z-index: 2000;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
}

.popup__items {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
}

.popup {
    background: #fff;
    max-width: 340px;
    width: 100%;
    box-shadow: 0 6px 32px rgba(50, 50, 100, .12);
    padding: 32px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 8px;
}

.popup__close {
    position: absolute;
    top: 12px;
    right: 12px;
    border: none;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
}

.popup input {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #009688;
    font-size: 1rem;
    background: #f5f4fb;
    outline: none;
    border-radius: 8px;
}

.popup h2 {
    margin-bottom: 10px;
    font-size: 1.25rem;
    text-align: center;
    color: #009688;
}

@media (max-width: 500px) {
    .popup {
        padding: 20px;
        max-width: 98vw;
    }
}
</style>
