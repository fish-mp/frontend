<template>
    <section v-if="post" class="news-detail">
        <div class="news-detail__wrapper">
            <router-link to="/" class="news-detail__back">&larr; Главная</router-link>
            <h1 class="news-detail__title">{{ post.title }}</h1>
            <p class="news-detail__date">{{ post.date }}</p>
            <img :src="post.image" alt="Изображение новости" class="news-detail__image" />
            <div class="news-detail__content">
                <p v-for="(paragraph, idx) in post.fullContent" :key="idx" class="news-detail__text">
                    {{ paragraph }}
                </p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface NewsItem {
    id: number
    title: string
    date: string
    image: string
    fullContent: string[]
}

const route = useRoute()
const router = useRouter()

const news: NewsItem[] = [
    {
        id: 1,
        title: 'Открыт новый курс по морскому аквариуму',
        date: '17.04.2025',
        image: 'https://www.petshop.ru/upload/medialibrary/83d/83d4980402475fe776e5063f56b47514.jpg',
        fullContent: [
            'Узнайте, как запустить морской аквариум с нуля. В этом курсе мы расскажем об оборудовании, подборе обитателей и уходе за рифовой системой.',
            'Курс включает практические занятия: тестирование параметров воды, выбор и установку живого камня, знакомство с основными коралловыми видами.',
            'По итогу обучения вы сможете самостоятельно проектировать, запускать и обслуживать полноценный морской аквариум.'
        ]
    },
    {
        id: 2,
        title: 'Обновление методички по CO₂',
        date: '15.04.2025',
        image: 'https://astrakhan.angstrem-mebel.ru/upload/medialibrary/962/f8fmq4yp9cqsmrvax4p4rt4gny4f6eia.png',
        fullContent: [
            'Добавлены советы по новым диффузорам ADA и методики дозирования CO₂.',
            'Расширены разделы о влиянии pH и KH на рост растений, а также о современных системах контроля подачи газа.',
            'С использованием обновлённой методички вы сможете достичь стабильного уровня CO₂ в вашем аквариуме.'
        ]
    },
    {
        id: 3,
        title: 'Новинка: освещение ADA Solar RGB II',
        date: '12.04.2025',
        image: 'https://akvatoria.ru/upload/resize_cache/iblock/8f2/1230_758_13df4/8f2757d9a7166db58992d8e94811968b.JPG',
        fullContent: [
            'Ультрасовременное освещение нового поколения позволяет настроить спектр под любые виды растений.',
            'Режимы дневного света, имитация заката и лунной подсветки — всё это доступно в одном приборе.',
            'Устройства поддерживают управление по Wi-Fi через мобильное приложение для полной автоматизации.'
        ]
    }
]

const post = computed(() => {
    const idParam = Number(route.params.id)
    return news.find(item => item.id === idParam)
})

if (!post.value) {
    router.replace({ name: 'NewsList' })
}
</script>

<style scoped>
.news-detail {
    padding: 2rem;
    max-width: 800px;
    margin: 100px auto;
}

.news-detail__back {
    display: inline-block;
    margin-bottom: 1rem;
    color: var(--color-turquoise);
}

.news-detail__title {
    font-size: 2rem;
    margin: 0.5rem 0;
}

.news-detail__date {
    color: var(--color-turquoise-dark);
    margin-bottom: 1.5rem;
}

.news-detail__image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 1.5rem;
}

.news-detail__text {
    margin-bottom: 1rem;
    line-height: 1.6;
}

</style>
