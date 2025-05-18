<template>
    <div v-if="modelValue" class="popup__overlay" @click.self="$emit('update:modelValue', false)">
        <div class="popup">
            <h2>Регистрация</h2>
            <form class="popup__items" @submit.prevent="handleRegister">
                <input type="email" v-model="email" placeholder="Почта" required />
                <input type="password" v-model="password" placeholder="Пароль" required />
                <input type="text" v-model="first_name" placeholder="Имя" required />
                <input type="text" v-model="city" placeholder="Город" required />
                <input type="number" v-model="age" placeholder="Возраст" required min="1" />
                <button class="btn btn--login" type="submit">Зарегистрироваться</button>
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
const first_name = ref('');
const city = ref('');
const age = ref('');

const auth = useAuthStore();

const handleRegister = async () => {
    try {
        await auth.register({
            email: email.value,
            password: password.value,
            first_name: first_name.value,
            city: city.value,
            age: Number(age.value),
        });
        emit('update:modelValue', false);
        email.value = '';
        password.value = '';
        first_name.value = '';
        city.value = '';
        age.value = '';
    } catch (e) {
        alert('Ошибка регистрации');
    }
};
</script>
