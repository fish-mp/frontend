<template>
    <section class="department">
        <div class="department__wrapper">
            <span id="bg-circle-1"></span>
            <span id="bg-circle-2"></span>
            <h1 class="department__title">Курсы по аквариумистике</h1>
            <p class="department__description">
                Здесь собраны курсы по морским, пресноводным и рифовым аквариумам. Изучайте и совершенствуйте свои знания!
            </p>
        </div>
    </section>

    <section class="news">
        <span id="bg-circle-5"></span>
        <div class="news__wrapper">
            <ul class="section__list">
                <li class="news__item" v-for="course in courses" :key="course.id">
                    <router-link :to="{ name: 'CourseDetail', params: { id: course.id } }" class="news__link">
                        <div class="news__image">
                            <img :src="course.image" alt="" class="news__icon" />
                        </div>
                        <div class="news__container">
                            <h3 class="news__subtitle">{{ course.title }}</h3>
                            <p class="news__description">{{ course.shortDescription }}</p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Course {
    id: number
    title: string
    shortDescription: string
    image: string
}

const courses = ref<Course[]>([
    {
        id: 1,
        title: 'Морской аквариум',
        shortDescription: 'Пошаговый запуск морской экосистемы с кораллами.',
        image: 'https://www.petshop.ru/upload/medialibrary/83d/83d4980402475fe776e5063f56b47514.jpg'
    },
    {
        id: 2,
        title: 'Пресноводный аквариум',
        shortDescription: ' ',
        image: 'https://astrakhan.angstrem-mebel.ru/upload/medialibrary/962/f8fmq4yp9cqsmrvax4p4rt4gny4f6eia.png'
    },
    {
        id: 3,
        title: 'Рифовый аквариум',
        shortDescription: 'Уход за коралловыми рифами и совместимость видов.',
        image: 'https://akvatoria.ru/upload/resize_cache/iblock/8f2/1230_758_13df4/8f2757d9a7166db58992d8e94811968b.JPG'
    }
])
</script>

<style scoped>
.department__title {
    font-size: calc(60px + 1.5vw);
}
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
