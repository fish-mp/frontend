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
                <li class="news__item" v-for="post in news" :key="post.date">
                    <router-link :to="{ name: 'CardDetail', params: { id: post.id } }" class="news__link">
                        <div class="news__image"><img :src="post.image" alt="" class="news__icon" /></div>
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
import { ref } from 'vue'

interface NewsItem {
    id: number
    title: string
    shortDescription: string
    date: string
    image: string
}

const news = ref<NewsItem[]>([
    {
        id: 1,
        title: 'Открыт новый курс по морскому аквариуму',
        shortDescription: 'Узнайте, как запустить морской аквариум с нуля.',
        date: '17.04.2025',
        image: 'https://www.petshop.ru/upload/medialibrary/83d/83d4980402475fe776e5063f56b47514.jpg'
    },
    {
        id: 2,
        title: 'Обновление методички по CO₂',
        shortDescription: 'Добавлены советы по новым диффузорам ADA.',
        date: '15.04.2025',
        image: 'https://astrakhan.angstrem-mebel.ru/upload/medialibrary/962/f8fmq4yp9cqsmrvax4p4rt4gny4f6eia.png'
    },
    {
        id: 3,
        title: 'Новинка: освещение ADA Solar RGB II',
        shortDescription: 'Ультрасовременное освещение — теперь в продаже.',
        date: '12.04.2025',
        image: 'https://akvatoria.ru/upload/resize_cache/iblock/8f2/1230_758_13df4/8f2757d9a7166db58992d8e94811968b.JPG'
    },
    {
        id: 4,
        title: 'Открыт новый курс по морскому аквариуму',
        shortDescription: 'Узнайте, как запустить морской аквариум с нуля.',
        date: '17.04.2025',
        image: 'https://www.petshop.ru/upload/medialibrary/83d/83d4980402475fe776e5063f56b47514.jpg'
    },
    {
        id: 5,
        title: 'Обновление методички по CO₂',
        shortDescription: 'Добавлены советы по новым диффузорам ADA.',
        date: '15.04.2025',
        image: 'https://astrakhan.angstrem-mebel.ru/upload/medialibrary/962/f8fmq4yp9cqsmrvax4p4rt4gny4f6eia.png'
    },
    {
        id: 6,
        title: 'Новинка: освещение ADA Solar RGB II',
        shortDescription: 'Ультрасовременное освещение — теперь в продаже.',
        date: '12.04.2025',
        image: 'https://akvatoria.ru/upload/resize_cache/iblock/8f2/1230_758_13df4/8f2757d9a7166db58992d8e94811968b.JPG'
    },
    {
        id: 7,
        title: 'Открыт новый курс по морскому аквариуму',
        shortDescription: 'Узнайте, как запустить морской аквариум с нуля.',
        date: '17.04.2025',
        image: 'https://www.petshop.ru/upload/medialibrary/83d/83d4980402475fe776e5063f56b47514.jpg'
    },
    {
        id: 8,
        title: 'Обновление методички по CO₂',
        shortDescription: 'Добавлены советы по новым диффузорам ADA.',
        date: '15.04.2025',
        image: 'https://astrakhan.angstrem-mebel.ru/upload/medialibrary/962/f8fmq4yp9cqsmrvax4p4rt4gny4f6eia.png'
    },
    {
        id: 9,
        title: 'Новинка: освещение ADA Solar RGB II',
        shortDescription: 'Ультрасовременное освещение — теперь в продаже.',
        date: '12.04.2025',
        image: 'https://akvatoria.ru/upload/resize_cache/iblock/8f2/1230_758_13df4/8f2757d9a7166db58992d8e94811968b.JPG'
    }
])
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

@media (max-width: 768px) {
    .news__list {
        grid-template-columns: 1fr;
    }
}
</style>