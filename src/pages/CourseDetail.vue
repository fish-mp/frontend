<template>
    <section class="course-detail">
        <div class="course-detail__wrapper" v-if="course">
            <router-link to="/courses" class="course-detail__back">&larr; Курсы</router-link>
            <h1 class="course-detail__title">{{ course.title }}</h1>
            <p class="course-detail__date" v-if="course.date">{{ course.date }}</p>
            <img :src="course.image" alt="Изображение курса" class="course-detail__image" />
            <div class="course-detail__content">
                <p v-for="(paragraph, idx) in course.fullContent" :key="idx" class="course-detail__text">
                    {{ paragraph }}
                </p>
            </div>
        </div>
        <div v-else>
            <p>Курс не найден.</p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courses } from '../data/coursesData'

const route = useRoute()
const router = useRouter()

const course = computed(() => {
    const idParam = Number(route.params.id)
    return courses.find(item => item.id === idParam)
})

if (!course.value) {
    router.replace({ name: 'Courses' })
}
</script>

<style scoped>
.course-detail {
    padding: 2rem;
    max-width: 800px;
    margin: 100px auto;
}
.course-detail__back {
    display: inline-block;
    margin-bottom: 1rem;
    color: var(--color-turquoise);
}
.course-detail__title {
    font-size: 2rem;
    margin: 0.5rem 0;
}
.course-detail__date {
    color: var(--color-turquoise-dark);
    margin-bottom: 1.5rem;
}
.course-detail__image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 1.5rem;
}
.course-detail__text {
    margin-bottom: 1rem;
    line-height: 1.6;
}
</style>
