<template>
    <section class="fish-detail">
        <router-link to="/" class="news-detail__back">&larr; Назад к карте</router-link>
        <div v-if="fish" class="fish-card">
            <h1 class="fish-card__title">{{ fish.name }}</h1>
            <img :src="fish.image" :alt="fish.name" class="fish-card__image" />
            <p class="fish-card__description"><strong>Описание:</strong> {{ fish.description }}</p>
            <p class="fish-card__location"><strong>Место обитания:</strong> {{ fish.location }}</p>
        </div>
        <div v-else class="fish-not-found">
            <p>Рыбка с таким ID не найдена.</p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { fishData, type Fish } from "../data/fishData";

const route = useRoute();
const idParam = Number(route.params.id);

const fish = computed<Fish | undefined>(() =>
    fishData.find(item => item.id === idParam)
);
</script>

<style scoped>
.fish-detail {
    padding: 2rem;
    max-width: 800px;
    margin: 100px auto;
}

.news-detail__back {
    color: var(--color-turquoise);
}

.back-link {
    display: inline-block;
    margin-bottom: 1rem;
    color: #0077aa;
    text-decoration: none;
    font-size: 0.9rem;
}

.back-link:hover {
    text-decoration: underline;
}

.fish-card__title {
    font-size: 2rem;
    margin: 1rem;
    color: var(--color-text);
}

.fish-card__image {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
}

.fish-card__description,
.fish-card__location {
    font-size: 1.1rem;
    line-height: 1.5;
    margin-bottom: 0.5rem;
}

.fish-not-found {
    text-align: center;
    font-size: 1.2rem;
    color: #e53935;
}
</style>
