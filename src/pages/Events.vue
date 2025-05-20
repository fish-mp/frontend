<template>
    <section class="department">
        <div class="department__wrapper">
            <span id="bg-circle-1"></span>
            <span id="bg-circle-2"></span>
            <h1 class="department__title">События и рыбки</h1>
            <p class="department__description">
                Здесь вы сможете более подробно познакомиться с последними новостями. У вас появится возможность
                пополнить свой багаж знаний.
            </p>
        </div>
    </section>

    <section class="news">
        <span id="bg-circle-5"></span>
        <div class="news__wrapper">
            <div class="news__wrapper">
                <label class="news__filter">
                    Выберите соответствующую дату
                    <input type="date" v-model="selectedDate" class="news__date-input" placeholder="Выберите дату" />
                </label>
            </div>

            <ul class="section__list">
                <li class="news__item" v-for="event in filteredEvents" :key="event.id">
                    <router-link :to="{ name: 'CardDetail', params: { id: event.id } }" class="news__link">
                        <div class="news__image">
                            <img :src="event.image" alt="" class="news__icon" />
                        </div>
                        <div class="news__container">
                            <p class="news__date">{{ event.date }}</p>
                            <h3 class="news__subtitle">{{ event.title }}</h3>
                            <p class="news__description">{{ event.shortDescription }}</p>
                        </div>
                    </router-link>
                </li>
            </ul>

            <router-link to="/news" class="news__more-link news__more-link--second">
                ВСЕ НОВОСТИ
            </router-link>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface EventItem {
    id: number
    title: string
    shortDescription: string
    date: string
    image: string
}

const events = ref<EventItem[]>([
    {
        id: 1,
        title: 'Выставка редких кораллов',
        shortDescription: 'Увидьте коллекцию редких кораллов со всего мира.',
        date: '05.06.2025',
        image: 'https://www.petshop.ru/upload/medialibrary/83d/83d4980402475fe776e5063f56b47514.jpg'
    },
    {
        id: 2,
        title: 'Мастер-класс по акваскейпингу',
        shortDescription: 'Научитесь создавать потрясающие подводные ландшафты.',
        date: '10.06.2025',
        image: 'https://akvatoria.ru/upload/resize_cache/iblock/8f2/1230_758_13df4/8f2757d9a7166db58992d8e94811968b.JPG'
    },
    {
        id: 3,
        title: 'Демонстрация кормления морских рыб',
        shortDescription: 'Смотрите захватывающее кормление акул и тропических рыб.',
        date: '12.06.2025',
        image: 'https://astrakhan.angstrem-mebel.ru/upload/medialibrary/962/f8fmq4yp9cqsmrvax4p4rt4gny4f6eia.png'
    },
    {
        id: 4,
        title: 'Ночь открытых дверей в океанариуме',
        shortDescription: 'Экскурсии, лекции и фотосессии после закрытия.',
        date: '15.06.2025',
        image: 'https://www.petshop.ru/upload/medialibrary/83d/83d4980402475fe776e5063f56b47514.jpg'
    },
])

const selectedDate = ref<string>('')

const filteredEvents = computed(() => {
    if (!selectedDate.value) return events.value
    return events.value.filter(event => {
        const [day, month, year] = event.date.split('.')
        const iso = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        return iso === selectedDate.value
    })
})
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

.news__filter {
    margin: 20px;
    font-size: 1.1rem;
    color: var(--color-text);
}

.news__wrapper {
    margin-bottom: 20px;
}

.news__date-input {
    width: 100%;
    max-width: 300px;
    padding: 14px 16px;
    font-size: 1.2rem;
    border: 2px solid var(--color-turquoise);
    border-radius: 8px;
    background-color: #e8f5e9;
    color: var(--color-text);
    font-family: inherit;
    transition: border-color 0.3s ease, background-color 0.3s ease;
    outline: none;
}

@media (max-width: 768px) {
    .section__list {
        grid-template-columns: 1fr;
    }
}
</style>
