<template>
    <div class="fish-detail">
        <h1>{{ fish.name }}</h1>
        <img :src="fish.image" :alt="fish.name" />
        <p>{{ fish.description }}</p>
        <router-link to="/">
            <button>Назад на главную</button>
        </router-link>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { fishData, type Fish } from '../data/fishData'
import { computed } from 'vue'

const route = useRoute()
const fishId = route.params.id as string

const fish = computed<Fish>(() => {
    const found = fishData.find(f => f.id === fishId)
    if (!found) throw new Error('Fish not found')
    return found
})
</script>

<style scoped>
.fish-detail {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
    text-align: center;
}

.fish-detail img {
    width: 100%;
    height: auto;
    margin: 1rem 0;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

button {
    background-color: #0077aa;
    color: white;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

button:hover {
    background-color: #005577;
}
</style>