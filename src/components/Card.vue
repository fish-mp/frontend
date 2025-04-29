<template>
    <div class="card">
        <img :src="course.image" :alt="course.title" class="card__image" />
        <div class="card__body">
            <h3 class="card__title">{{ course.title }}</h3>
            <p class="card__desc">{{ course.shortDescription }}</p>
            <router-link :to="`/courses/${course.id}`" class="card__button">Подробнее</router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Course {
    id: number
    title: string
    shortDescription: string
    image: string
}

defineProps<{ course: Course }>()
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
    width: 450px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card__body {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.card__title {
    font-size: 1.125rem;
    margin: 0 0 0.5rem;
    color: #333;
}

.card__desc {
    flex-grow: 1;
    font-size: 0.95rem;
    color: #666;
    margin: 0 0 1rem;
}

.card__button {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    text-decoration: none;
    color: #fff;
    background-color: #000;
    border-radius: 6px;
    border: 1px solid black;
    transition: all 0.3s ease;
}

.card__button:hover {
    color: #000;
    background-color: white;
}
</style>
