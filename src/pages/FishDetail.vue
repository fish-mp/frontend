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
            <router-link to="/" class="news-detail__back">&larr; Назад к карте</router-link>
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

<style lang="scss" scoped>
@import '../assets/scss/FishDetail.scss';
</style>