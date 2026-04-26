<template>
    <section class="about">
        <div class="about__floating-elements">
            <div></div>
            <div></div>
        </div>
        <div class="about__wrapper">
            <div class="about__header">
                <h2 class="about__title">Больше об аквариумистике</h2>
                <div class="about__content about__content--first">
                     <p class="about__text">
            Аквариумистика — это увлекательное хобби, сочетающее в себе биологию, химию и эстетику. 
            Создание гармоничного подводного мира требует знаний о водных экосистемах и правильного ухода.
        </p>
        <p class="about__text">
            Наши курсы помогут вам освоить все аспекты аквариумистики: от выбора оборудования до лечения рыб. 
            Мы учим не только содержать аквариум, но и понимать его экосистему.
        </p>
                </div>
                <router-link class="about__link" to="/aquaristics">ПОДРОБНЕЕ</router-link>
            </div>
            <div class="about__content about__content--second">
                <p class="about__text">
                    Аквариумистика — это искусство создания и ухода за подводными экосистемами, требующее внимания к
                    деталям и
                    понимания биологии водных обитателей.
                </p>
                <p class="about__text">
                    В этом разделе вы узнаете о том, какие факторы влияют на здоровье аквариума: качество воды,
                    параметры
                    температуры, уровень освещения и совместимость видов.
                    Правильно подобранные условия позволят предотвратить болезни рыб и рост нежелательных водорослей.
                </p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'AboutSection'
}
</script>

<style lang="scss" scoped>

@use '../assets/scss/about.scss';

</style>
