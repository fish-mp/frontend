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
    name: "Бритвина Валентина Валентиновна",
    position: "доцент",
    experience: "Стаж 32 лет",
    photo: staffImg,
  },
  {
    id: 2,
    name: "Иванов Иван Иванович",
    position: "доцент",
    experience: "Стаж 32 лет",
    photo: staff1Img,
    noIcon: true,
  },
]
</script>

<style scoped>
.staff__image {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  align-items: flex-end;
}

.staff__image img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

@media (max-width: 500px) {
  .staff__image img {
    width: 120px;
    height: 120px;
  }

  .staff__details {
    min-height: auto;
  }
}
</style>
