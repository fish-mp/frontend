<template>
    <div class="slider">
        <div class="slider__track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }" @mouseenter="pause"
            @mouseleave="play">
            <div v-for="(item, idx) in items" :key="idx" class="slider__slide">
                <img :src="item.image" :alt="item.title" />
                <div class="slider__caption">
                    <h2>{{ item.title }}</h2>
                    <p>{{ item.shortDescription }}</p>
                </div>
            </div>
        </div>
        <button class="slider__nav slider__nav--prev" @click="prev">‹</button>
        <button class="slider__nav slider__nav--next" @click="next">›</button>
        <div class="slider__dots">
            <span v-for="(_, idx) in items" :key="idx" :class="{ 'active': idx === currentIndex }"
                @click="goTo(idx)"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

interface Item { image: string; title: string; shortDescription: string }

const props = defineProps<{ items: Item[] }>()
const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval>

const next = () => {
    currentIndex.value = (currentIndex.value + 1) % props.items.length
}
const prev = () => {
    currentIndex.value =
        (currentIndex.value - 1 + props.items.length) % props.items.length
}
const goTo = (i: number) => {
    currentIndex.value = i
}

const play = () => {
    timer = setInterval(next, 5000)
}
const pause = () => {
    clearInterval(timer)
}

onMounted(play)
onBeforeUnmount(pause)

watch(() => props.items, () => (currentIndex.value = 0))
</script>

<style scoped>
.slider {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    background: #f9f9f9;
}

.slider__track {
    display: flex;
    transition: transform 0.5s ease;
}

.slider__slide {
    min-width: 100%;
    position: relative;
}

.slider__slide img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    display: block;
}

.slider__caption {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    padding: 0.8rem 1rem;
    border-radius: 6px;
}

.slider__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.7);
    border: none;
    font-size: 2rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
}

.slider__nav--prev {
    left: 1rem
}

.slider__nav--next {
    right: 1rem
}

.slider__dots {
    position: absolute;
    bottom: 0.8rem;
    right: 1rem;
    display: flex;
    gap: 0.5rem;
}

.slider__dots span {
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s;
}

.slider__dots span.active {
    transform: scale(1.3);
    background: #000;
}
</style>
