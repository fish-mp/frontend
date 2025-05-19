<template>
  <section class="staff">
    <span id="bg-circle-4"></span>
    <div class="staff__wrapper">
      <div class="staff__header">
        <h2 class="staff__title">
          Состав кафедры
        </h2>
        <router-link to="/department" class="staff__more-link">
          ВЕСЬ СОСТАВ
          <svg class="staff__more-icon" width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M14 15V1M14 1H0M14 1L1 14" stroke="#FEFEFE" />
          </svg>
        </router-link>
      </div>
      <ul class="staff__list">
        <li
          v-for="person in staff"
          :key="person.id"
          class="staff__item"
        >
          <span id="bg-circle-3"></span>
          <div
            :class="[
              'staff__image',
              { 'staff__image--no-icon': person.noIcon }
            ]"
          >
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
        <svg class="staff__more-icon" width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path d="M14 15V1M14 1H0M14 1L1 14" stroke="#FEFEFE" />
        </svg>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
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
    position: "доцент",
    experience: "Стаж 32 лет",
    photo: "/image/Department/logo1.svg",
  },
  {
    id: 2,
    name: "Иванов Иван Иванович",
    position: "доцент",
    experience: "Стаж 32 лет",
    photo: "/image/Department/logo2.svg",
    noIcon: true,
  },
]
</script>

<style scoped>

</style>
