<template>
  <section class="staff">
    <span id="bg-circle-4"></span>
    <div class="staff__wrapper">
      <div class="staff__header">
        <h2 class="staff__title">
          Состав преподавателей
        </h2>
        <router-link to="/department" class="staff__more-link">
          ВЕСЬ СОСТАВ
        </router-link>
      </div>
      <ul class="staff__list">
        <li v-for="person in staff" :key="person.id" class="staff__item">
          <span id="bg-circle-3"></span>
          <div class="staff__image">
            <img :src="person.photo" alt="Фото преподавателя" />
          </div>
          <div class="staff__details">
            <h3 class="staff__name">{{ person.name }}</h3>
            <p class="staff__position">{{ person.position }}</p>
            <p class="staff__experience">{{ person.experience }}</p>
          </div>
        </li>
      </ul>
      <router-link to="/department" class="staff__more-link staff__more-link--second">
        ВЕСЬ СОСТАВ
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import staffImg from '../../src/assets/image/staff.jpg'

interface StaffPerson {
  id: number
  name: string
  position: string
  experience: string
  photo: string
  noIcon?: boolean
}

const staff: StaffPerson[] = [
  {
    id: 1,
    name: "Бритвина Валентина Валентиновна",
    position: "Доцент. Кандидат педагогических наук",
    experience: "Стаж 32 лет",
    photo: staffImg,
  }
]
</script>

<style lang="scss" scoped>
@use '../assets/scss/Staff.scss';
</style>
