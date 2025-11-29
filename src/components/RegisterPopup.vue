<template>
    <div v-if="modelValue" class="popup__overlay" @click.self="$emit('update:modelValue', false)">
        <div class="popup">
            <div class="popup__header">
                <h2 class="popup__title">Регистрация</h2>
                <button class="popup__close" @click="$emit('update:modelValue', false)">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
            
            <form class="popup__form" @submit.prevent="handleRegister">
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
                        placeholder="Придумайте пароль" 
                        required 
                        class="form__input"
                    />
                </div>

                <div class="form__group">
                    <label class="form__label">Имя</label>
                    <input 
                        type="text" 
                        v-model="first_name" 
                        placeholder="Ваше имя" 
                        required 
                        class="form__input"
                    />
                </div>

                <div class="form__group">
                    <label class="form__label">Город</label>
                    <input 
                        type="text" 
                        v-model="city" 
                        placeholder="Ваш город" 
                        required 
                        class="form__input"
                    />
                </div>

                <div class="form__group">
                    <label class="form__label">Возраст</label>
                    <input 
                        type="number" 
                        v-model="age" 
                        placeholder="Ваш возраст" 
                        required 
                        min="1"
                        max="120"
                        class="form__input"
                    />
                </div>
                
                <button class="btn btn--primary btn--full" type="submit" :disabled="loading">
                    <span v-if="!loading" class="btn-text">Зарегистрироваться</span>
                    <span v-else class="loading">Регистрация...</span>
                </button>
                
                <div class="form__footer">
                    <a href="#" class="form__link" @click.prevent="$emit('showLogin')">Уже есть аккаунт? Войти</a>
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
const emit = defineEmits(['update:modelValue', 'showLogin']);

const email = ref('');
const password = ref('');
const first_name = ref('');
const city = ref('');
const age = ref('');
const loading = ref(false);

const auth = useAuthStore();

const handleRegister = async () => {
    loading.value = true;
    try {
        await auth.register({
            email: email.value,
            password: password.value,
            first_name: first_name.value,
            city: city.value,
            age: Number(age.value),
        });
        emit('update:modelValue', false);
        // Сброс полей
        email.value = '';
        password.value = '';
        first_name.value = '';
        city.value = '';
        age.value = '';
    } catch (e) {
        alert('Ошибка регистрации. Проверьте введенные данные.');
    } finally {
        loading.value = false;
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/RegisterPopup.scss';
</style>