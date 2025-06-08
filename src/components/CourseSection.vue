<template>
    <section class="news courses">
        <span id="bg-circle-5"></span>
        <div class="news__wrapper">
            <div class="news__header">
                <h2 class="news__title">КУРСЫ</h2>
                <router-link to="/courses" class="news__more-link">ВСЕ КУРСЫ</router-link>
            </div>
            <ul class="news__list courses__list">
                <li class="news__item courses__item" v-for="course in courses" :key="course.id">
                    <router-link :to="{ name: 'CourseDetail', params: { id: course.id } }"
                        class="news__link courses__link">
                        <div class="news__image courses__image">
                            <img :src="course.image" alt="" class="news__icon courses__icon" />
                        </div>
                        <div class="news__container courses__container">
                            <!-- убрали .news__date -->
                            <h3 class="news__subtitle courses__subtitle">{{ course.title }}</h3>
                            <p class="news__description courses__description">{{ course.shortDescription }}</p>
                        </div>
                    </router-link>
                </li>
            </ul>
            <router-link to="/courses" class="news__more-link news__more-link--second">ВСЕ КУРСЫ</router-link>
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

<style scoped>
/* основы из вашего news__list */
.news__list {
    display: flex;
    gap: 20px;
    padding: 0;
    margin: 0;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
}

.news__item {
    list-style: none;
    /* два элемента сразу: каждый занимает половину контейнера минус gap */
    flex: 0 0 calc((100% - 20px) / 2);
    scroll-snap-align: start;
}

/* прячем скроллбар */
.news__list::-webkit-scrollbar {
    display: none;
}

.news__list {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

/* адаптив: на мобилке — один элемент */
@media (max-width: 768px) {
    .news__item {
        flex: 0 0 100%;
    }

    .news__more-link {
        margin-top: 20px;
    }
}

/* можно скопировать остальные стили из новостей для картинок и текста */
.news__image,
.courses__image {
    width: 100%;
    height: 180px;
    overflow: hidden;
}

.news__image img,
.courses__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* заголовок */
.news__subtitle,
.courses__subtitle {
    font-size: 1.25rem;
    margin: 12px 0 8px;
}

/* описание */
.news__description,
.courses__description {
    font-size: 1rem;
    color: #555;
}
</style>