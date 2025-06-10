<template>
  <main>
    <section class="department">
      <div class="department__wrapper">
        <span id="bg-circle-1"></span>
        <span id="bg-circle-2"></span>
        <h1 class="department__title">Наши преподаватели</h1>
      </div>
    </section>
    <ul class="staff__list">
      <li v-for="person in staff" :key="person.id" class="staff__item">
        <span id="bg-circle-3"></span>
        <div :class="['staff__image', { 'staff__image--no-icon': person.noIcon }]">
          <img :src="person.photo" alt="Фото преподавателя" />
        </div>
        <div class="staff__details">
          <h3 class="staff__name">{{ person.name }}</h3>
          <p class="staff__position">{{ person.position }}</p>
          <p class="staff__experience">{{ person.experience }}</p>
        </div>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import staffImg from '../../src/assets/image/staff.png'
import staff1Img from '../../src/assets/image/staff1.png'

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
    name: "Кузнецов Павел Андреевич",
    position: "доцент, кандидат физико-математических наук",
    experience: "Стаж 18 лет",
    photo: staff1Img,
    noIcon: true,
  },
  {
    id: 2,
    name: "Смирнова Мария Викторовна",
    position: "старший преподаватель",
    experience: "Стаж 9 лет",
    photo: staffImg,
    noIcon: true,
  },
  {
    id: 3,
    name: "Иванов Сергей Петрович",
    position: "ассистент",
    experience: "Стаж 3 года",
    photo: staff1Img,
    noIcon: true,
  },
  {
    id: 4,
    name: "Попова Елена Дмитриевна",
    position: "доцент, кандидат наук",
    experience: "Стаж 21 год",
    photo: staffImg,
    noIcon: true,
  }
];
</script>

<style scoped>
.staff__list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 40px;
  list-style: none;
  padding: 0 50px;
}

@media (max-width: 900px) {
  .staff__list {
    grid-template-columns: 1fr;
  }
}
</style>
