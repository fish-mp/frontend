<template>
    <section class="news">
        <span id="bg-circle-5"></span>
        <div class="news__wrapper">
            <div class="news__header">
                <h2 class="news__title">НОВОСТИ</h2>
                <router-link to="/news" class="news__more-link">ВСЕ НОВОСТИ</router-link>
            </div>
            <ul class="news__list">
                <li class="news__item" v-for="post in latestNews" :key="post.created_at">
                    <router-link :to="{ name: 'NewsDetail', params: { id: post.id } }" class="news__link">
                        <div class="news__image" v-if="post.photos && post.photos.length">
                            <img :src="post.photos[0].image" alt="" class="news__icon" />
                        </div>
                        <div class="news__container">
                            <p class="news__date">{{ formatDate(post.created_at) }}</p>
                            <h3 class="news__subtitle">{{ post.title }}</h3>
                            <p class="news__description">{{ post.text }}</p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useNewsStore } from "../stores/news";

const newsStore = useNewsStore();

onMounted(() => {
    newsStore.fetchNews();
});

const latestNews = computed(() => {
    const sortedNews = [...newsStore.news].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    return sortedNews.slice(0, 3);
});

function formatDate(date: string): string {
    const [yyyy, mm, dd] = date.slice(0, 10).split('-');
    return `${dd}.${mm}.${yyyy}`;
}
</script>

<style lang="scss" scoped>
@use '../assets/scss/news.scss';
</style>