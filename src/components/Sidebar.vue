<template>
    <div class="sidebar">
        <button class="sidebar__close" @click="$emit('close')">&times;</button>
        <nav class="sidebar__nav">
            <router-link to="/" class="sidebar__nav-link">Главная</router-link>
            <router-link to="/department" class="sidebar__nav-link">О кафедре</router-link>
            <div>
                <button @click="toggle('students')" class="sidebar__nav-link sidebar__nav-link--dropdown">
                    Студентам
                    <svg class="arrow" width="18" height="10" viewBox="0 0 18 10" fill="none">
                        <path d="M8.91115 ..." fill="#E8EDFF" />
                    </svg>
                </button>
                <div v-show="open === 'students'" class="sidebar__subnav">
                    <router-link to="/test-work" class="sidebar__subnav-link">Контрольные работы</router-link>
                    <router-link to="/materials" class="sidebar__subnav-link">Учебные материалы</router-link>
                    <router-link to="/video" class="sidebar__subnav-link">Видеолекции</router-link>
                </div>
            </div>
            <router-link to="/news" class="sidebar__nav-link">Новости</router-link>
            <div>
                <button @click="toggle('olympic')" class="sidebar__nav-link sidebar__nav-link--dropdown">
                    Олимпиада
                    <svg class="arrow" width="18" height="10" viewBox="0 0 18 10" fill="none">
                        <path d="M8.91115 ..." fill="#E8EDFF" />
                    </svg>
                </button>
                <div v-show="open === 'olympic'" class="sidebar__subnav">
                    <router-link to="/olimpic" class="sidebar__subnav-link">Текущая олимпиада</router-link>
                    <router-link to="/archive" class="sidebar__subnav-link">Архив</router-link>
                    <router-link to="/regulations" class="sidebar__subnav-link">Регламенты</router-link>
                    <router-link to="/result" class="sidebar__subnav-link">Результаты</router-link>
                    <a href="https://online.mospolytech.ru/" class="sidebar__subnav-link" target="_blank">Курс для
                        подготовки</a>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(null);
const toggle = (key) => {
    open.value = open.value === key ? null : key;
};
</script>
