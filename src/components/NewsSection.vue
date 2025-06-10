<template>
    <section class="news">
        <span id="bg-circle-5"></span>
        <div class="news__wrapper">
            <div class="news__header">
                <h2 class="news__title">НОВОСТИ</h2>
                <router-link to="/news" class="news__more-link">ВСЕ НОВОСТИ</router-link>
            </div>
            <ul class="news__list">
                <li class="news__item" v-for="post in newsStore.news" :key="post.date">
                    <router-link :to="{ name: 'NewsDetail', params: { id: post.id } }" class="news__link">
                        <div class="news__image"><img :src="post.photos[0].image" alt="" class="news__icon" /></div>
                        <div class="news__container">
                            <p class="news__date">{{ post.date }}</p>
                            <h3 class="news__subtitle">{{ post.title }}</h3>
                            <p class="news__description">{{ post.shortDescription }}</p>
                        </div>
                    </router-link>
                </li>
            </ul>
            <router-link to="/news" class="news__more-link news__more-link--second">ВСЕ НОВОСТИ</router-link>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useNewsStore } from "../stores/news";

const newsStore = useNewsStore();

onMounted(() => {
    newsStore.fetchNews();
});
</script>
