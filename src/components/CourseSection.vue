<template>
    <section class="staff">
        <span id="bg-circle-4"></span>
        <div class="staff__wrapper">
            <div class="staff__header">
                <h2 class="staff__title">Курсы по аквариумистике</h2>
                <router-link to="/department" class="staff__more-link">ВСЕ КУРСЫ</router-link>
            </div>
            <ul class="staff__list">
                <li v-for="course in courses" :key="course.id">
                    <router-link :to="{ name: 'CardDetail', params: { id: course.id } }" class="staff__item">
                        <span id="bg-circle-3"></span>
                        <div class="staff__image">
                            <img :src="course.image" alt="Фото курса" />
                        </div>
                        <div class="staff__details">
                            <h3 class="staff__name">{{ course.title }}</h3>
                            <p class="staff__position">{{ course.shortDescription }}</p>
                        </div>
                    </router-link>
                </li>
            </ul>
            <router-link to="/department" class="staff__more-link staff__more-link--second">ВСЕ КУРСЫ</router-link>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Course {
    id: number
    title: string
    shortDescription: string
    fullDescription: string
    image: string
}

const courses = ref<Course[]>([
    { id: 1, title: 'Основы аквариумистики', shortDescription: 'Базовые принципы создания пресноводного аквариума.', fullDescription: '', image: 'https://www.petshop.ru/upload/medialibrary/83d/83d4980402475fe776e5063f56b47514.jpg' },
    { id: 2, title: 'Морской аквариум', shortDescription: 'Запуск и уход за солёным рифовым аквариумом.', fullDescription: '', image: 'https://astrakhan.angstrem-mebel.ru/upload/medialibrary/962/f8fmq4yp9cqsmrvax4p4rt4gny4f6eia.png' },
])
</script>
