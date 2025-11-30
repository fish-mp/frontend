<template>
    <section class="courses news">
        <span id="bg-circle-5"></span>
        <div class="courses__wrapper news__wrapper">
            <div class="courses__header news__header">
                <h2 class="courses__title news__title">КУРСЫ</h2>
                <router-link to="/courses" class="courses__more-link news__more-link">
                    ВСЕ КУРСЫ
                </router-link>
            </div>
            <ul class="courses__list news__list">
                <li class="courses__item news__item" v-for="course in courses" :key="course.id">
                    <router-link :to="{ name: 'CourseDetail', params: { id: course.id } }" 
                                class="courses__link news__link">
                        <div class="courses__image news__image">
                            <img :src="course.image" :alt="course.title" 
                                 class="courses__icon news__icon" />
                        </div>
                        <div class="courses__container news__container">
                            <h3 class="courses__subtitle news__subtitle">{{ course.title }}</h3>
                            <p class="courses__description news__description">
                                {{ course.shortDescription }}
                            </p>
                        </div>
                    </router-link>
                </li>
            </ul>
            <router-link to="/courses" 
                        class="courses__more-link courses__more-link--second news__more-link news__more-link--second">
                ВСЕ КУРСЫ
            </router-link>
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
        title: 'Основы аквариумистики',
        shortDescription: 'Базовые принципы создания пресноводного аквариума.',
        image: 'https://www.petshop.ru/upload/medialibrary/83d/83d4980402475fe776e5063f56b47514.jpg'
    },
    {
        id: 2,
        title: 'Морской аквариум',
        shortDescription: 'Запуск и уход за солёным рифовым аквариумом.',
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

<style lang="scss" scoped>
@use '../assets/scss/Courses2.scss';
</style>