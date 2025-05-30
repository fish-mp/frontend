<template>
    <section class="department">
        <div class="department__wrapper">
            <span id="bg-circle-1"></span>
            <span id="bg-circle-2"></span>
            <h1 class="department__title">Новости и рыбки</h1>
            <p class="department__description">
                Здесь вы сможете более подробно познакомиться с последними новостями. У вас появится возможность
                пополнить свой багаж знаний.
            </p>
        </div>
    </section>

    <section class="news">
        <span id="bg-circle-5"></span>
        <div class="news__wrapper">
            <ul class="section__list">
                <li class="news__item" v-for="post in newsStore.news" :key="post.id">
                    <router-link :to="{ name: 'NewsDetail', params: { id: post.id } }" class="news__link">
                        <div class="news__image">
                            <img v-if="post.photos && post.photos.length > 0" :src="getPhotoUrl(post.photos[0].image)"
                                alt="" class="news__icon" />
                            <div v-else class="news__image--no-photo">
                                Нет фото
                            </div>
                        </div>
                        <div class="news__container">
                            <p class="news__date">{{ formatDate(post.created_at) }}</p>
                            <h3 class="news__subtitle">{{ post.title }}</h3>
                            <p class="news__description">{{ getShortText(post.text) }}</p>
                        </div>
                    </router-link>
                </li>
            </ul>
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

function getPhotoUrl(photoPath: string): string {
    if (!photoPath) return "";
    if (photoPath.startsWith("http://localhost/media")) {
        return photoPath.replace("http://localhost", "http://127.0.0.1:8000");
    }
    if (photoPath.startsWith("http://127.0.0.1/media")) {
        return photoPath.replace("http://127.0.0.1", "http://127.0.0.1:8000");
    }
    if (photoPath.startsWith("http://127.0.0.1:8000")) {
        return photoPath;
    }
    if (photoPath.startsWith("/media")) {
        return "http://127.0.0.1:8000" + photoPath;
    }
    return photoPath;
}

function formatDate(date: string): string {
    const [yyyy, mm, dd] = date.slice(0, 10).split('-');
    return `${dd}.${mm}.${yyyy}`;
}
function getShortText(text: string): string {
    return text.length > 60 ? text.slice(0, 60) + "..." : text;
}
</script>

<style scoped>
.section__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 0;
    margin: 0;
}

.news__item {
    list-style: none;
}

.news__icon {
    width: 100%;
    object-fit: cover;
}

.news__image--no-photo {
    width: 100%;
    height: 150px;
    background: #e0e0e0;
    color: #888;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (max-width: 768px) {
    .section__list {
        grid-template-columns: 1fr;
    }
}
</style>
