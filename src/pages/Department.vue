<template>
  <main class="staff-page">
    <section class="staff-hero">
      <div class="staff-hero__wrapper">
        <div class="staff-hero__content">
          <router-link to="/" class="staff-hero__back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            На главную
          </router-link>
          <h1 class="staff-hero__title">Наши преподаватели</h1>
          <p class="staff-hero__subtitle">Профессионалы с многолетним опытом работы и научными достижениями</p>
          
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-card__number">18+</div>
              <div class="stat-card__label">Лет средний стаж</div>
            </div>
            <div class="stat-card">
              <div class="stat-card__number">95%</div>
              <div class="stat-card__label">Докторов и кандидатов наук</div>
            </div>
            <div class="stat-card">
              <div class="stat-card__number">50+</div>
              <div class="stat-card__label">Научных публикаций</div>
            </div>
            <div class="stat-card">
              <div class="stat-card__number">100%</div>
              <div class="stat-card__label">Практикующих специалистов</div>
            </div>
          </div>
        </div>
        <div class="staff-hero__decoration">
          <div class="decoration-circle decoration-circle--1"></div>
          <div class="decoration-circle decoration-circle--2"></div>
          <div class="decoration-circle decoration-circle--3"></div>
        </div>
      </div>
    </section>

    <section class="staff-list-section">
      <div class="staff-list__wrapper">
        <div class="staff-filters">
          <div class="filter-buttons">
            <button 
              v-for="filter in filters" 
              :key="filter.id"
              class="filter-btn"
              :class="{ 'filter-btn--active': activeFilter === filter.id }"
              @click="setFilter(filter.id)"
            >
              {{ filter.label }}
            </button>
          </div>
          <div class="search-box">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Поиск преподавателя..."
              class="search-input"
            />
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

        <div class="staff-grid">
          <div 
            v-for="person in filteredStaff" 
            :key="person.id" 
            class="staff-card"
            @click="openStaffModal(person)"
          >
            <div class="staff-card__image">
              <img :src="person.photo" :alt="person.name" class="staff-image" />
              <div class="staff-card__badge" v-if="person.isLead">
                <span class="badge badge--blue">Руководитель</span>
              </div>
            </div>
            <div class="staff-card__content">
              <h3 class="staff-card__name">{{ person.name }}</h3>
              <p class="staff-card__position">{{ person.position }}</p>
              <p class="staff-card__degree">{{ person.degree }}</p>
              
              <div class="staff-card__info">
                <div class="info-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>{{ person.experience }}</span>
                </div>
                <div class="info-item" v-if="person.courses">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>{{ person.courses }} курсов</span>
                </div>
              </div>

              <div class="staff-card__expertise" v-if="person.expertise">
                <div class="expertise-tags">
                  <span 
                    v-for="(skill, idx) in person.expertise.slice(0, 3)" 
                    :key="idx"
                    class="expertise-tag"
                  >
                    {{ skill }}
                  </span>
                  <span v-if="person.expertise.length > 3" class="expertise-tag expertise-tag--more">
                    +{{ person.expertise.length - 3 }}
                  </span>
                </div>
              </div>

              <button class="staff-card__button">
                <span>Подробнее</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="empty-state" v-if="filteredStaff.length === 0">
          <div class="empty-state__icon">👨‍🏫</div>
          <h3 class="empty-state__title">Преподаватели не найдены</h3>
          <p class="empty-state__text">Попробуйте изменить параметры поиска</p>
          <button class="btn btn--outline" @click="resetFilters">
            Сбросить фильтры
          </button>
        </div>
      </div>
    </section>

    <!-- Модальное окно преподавателя -->
    <div v-if="selectedStaff" class="staff-modal" @click.self="closeModal">
      <div class="staff-modal__content">
        <button class="staff-modal__close" @click="closeModal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <div class="staff-modal__header">
          <div class="staff-modal__image">
            <img :src="selectedStaff.photo" :alt="selectedStaff.name" />
          </div>
          <div class="staff-modal__info">
            <h2 class="staff-modal__name">{{ selectedStaff.name }}</h2>
            <p class="staff-modal__position">{{ selectedStaff.position }}</p>
            <p class="staff-modal__degree">{{ selectedStaff.degree }}</p>
            
            <div class="staff-modal__stats">
              <div class="stat">
                <div class="stat__value">{{ selectedStaff.experience }}</div>
                <div class="stat__label">Стаж</div>
              </div>
              <div class="stat" v-if="selectedStaff.courses">
                <div class="stat__value">{{ selectedStaff.courses }}</div>
                <div class="stat__label">Курсов</div>
              </div>
              <div class="stat" v-if="selectedStaff.publications">
                <div class="stat__value">{{ selectedStaff.publications }}</div>
                <div class="stat__label">Публикаций</div>
              </div>
            </div>
          </div>
        </div>

        <div class="staff-modal__body">
          <div class="staff-modal__section" v-if="selectedStaff.bio">
            <h3 class="section-title">О преподавателе</h3>
            <p class="staff-modal__bio">{{ selectedStaff.bio }}</p>
          </div>

          <div class="staff-modal__section" v-if="selectedStaff.expertise">
            <h3 class="section-title">Экспертиза</h3>
            <div class="expertise-list">
              <span 
                v-for="(skill, idx) in selectedStaff.expertise" 
                :key="idx"
                class="expertise-item"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="staff-modal__section" v-if="selectedStaff.coursesList">
            <h3 class="section-title">Ведет курсы</h3>
            <div class="courses-list">
              <div 
                v-for="course in selectedStaff.coursesList" 
                :key="course.id"
                class="course-item"
              >
                <h4 class="course-item__title">{{ course.title }}</h4>
                <p class="course-item__desc">{{ course.description }}</p>
              </div>
            </div>
          </div>

          <div class="staff-modal__section" v-if="selectedStaff.education">
            <h3 class="section-title">Образование</h3>
            <p class="staff-modal__education">{{ selectedStaff.education }}</p>
          </div>

          <div class="staff-modal__section" v-if="selectedStaff.achievements">
            <h3 class="section-title">Достижения</h3>
            <ul class="achievements-list">
              <li 
                v-for="(achievement, idx) in selectedStaff.achievements" 
                :key="idx"
                class="achievement-item"
              >
                <span class="achievement-icon">🏆</span>
                <span>{{ achievement }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import staffImg from '../../src/assets/image/staff.png'
import staff1Img from '../../src/assets/image/staff1.png'

interface StaffPerson {
  id: number
  name: string
  position: string
  degree: string
  experience: string
  photo: string
  expertise?: string[]
  bio?: string
  courses?: number
  publications?: number
  education?: string
  achievements?: string[]
  coursesList?: { id: number; title: string; description: string }[]
  department?: 'mathematics' | 'physics' | 'informatics' | 'engineering' | 'lead'
  isLead?: boolean
}

const staff: StaffPerson[] = [
  {
    id: 1,
    name: "Кузнецов Павел Андреевич",
    position: "Заведующий кафедрой",
    degree: "Доктор физико-математических наук, профессор",
    experience: "18 лет стажа",
    photo: staff1Img,
    expertise: ["Математический анализ", "Дифференциальные уравнения", "Теория вероятностей", "Машинное обучение"],
    bio: "Ведущий специалист в области прикладной математики и математического моделирования. Автор более 50 научных публикаций в международных журналах.",
    courses: 8,
    publications: 52,
    education: "МГУ им. М.В. Ломоносова, механико-математический факультет",
    achievements: [
      "Лауреат премии Правительства РФ в области науки и техники",
      "Грант РНФ на исследование машинного обучения",
      "Научный руководитель 5 кандидатских диссертаций"
    ],
    coursesList: [
      { id: 1, title: "Математический анализ", description: "Углубленный курс для программистов" },
      { id: 2, title: "Теория вероятностей", description: "Применение в data science" }
    ],
    department: "mathematics",
    isLead: true
  },
  {
    id: 2,
    name: "Бритвина Валентина Валентиновна",
    position: "-",
    degree: "-",
    experience: "-",
    photo: staffImg,
    expertise: ["-",],
    bio: "-",
    courses: 6,
    publications: 15,
    education: "-",
    achievements: [
      "-"
    ],
    coursesList: [
      { id: 3, title: "-", description: "-" },
    ],
    department: "lead"
  },
]

// Фильтры и поиск
const filters = [
  { id: 'all', label: 'Все' },
  { id: 'mathematics', label: 'Математика' },
  { id: 'lead', label: 'Руководство' }
]

const activeFilter = ref('all')
const searchQuery = ref('')
const selectedStaff = ref<StaffPerson | null>(null)

const setFilter = (filterId: string) => {
  activeFilter.value = filterId
}

const resetFilters = () => {
  activeFilter.value = 'all'
  searchQuery.value = ''
}

const openStaffModal = (person: StaffPerson) => {
  selectedStaff.value = person
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedStaff.value = null
  document.body.style.overflow = ''
}

// Компьютед свойства
const filteredStaff = computed(() => {
  let result = staff

  // Применяем фильтр по категории
  if (activeFilter.value !== 'all') {
    if (activeFilter.value === 'lead') {
      result = result.filter(person => person.isLead)
    } else {
      result = result.filter(person => person.department === activeFilter.value)
    }
  }

  // Применяем поиск
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(person => 
      person.name.toLowerCase().includes(query) ||
      person.position.toLowerCase().includes(query) ||
      person.degree.toLowerCase().includes(query) ||
      person.expertise?.some(skill => skill.toLowerCase().includes(query))
    )
  }

  return result
})

onMounted(() => {
  // Инициализация
})
</script>

<style lang="scss" scoped>
// Цветовая схема как в EventDetail
$pure-white: #ffffff;
$soft-white: #fafbfc;
$light-grey: #f0f4f8;
$primary-blue: #173DED;
$blue-gradient: linear-gradient(135deg, #173DED 0%, #4d7cfe 50%, #8ba9ff 100%);
$text-dark: #1a1a1a;
$text-medium: #5d6d87;
$text-light: #8a9bb8;
$accent-glow: rgba(23, 61, 237, 0.15);
$success-color: #00BFA6;
$warning-color: #FFB800;
$error-color: #FF4757;
$finished-color: #757575;

// Миксины
@mixin glass-effect {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 -1px 0 rgba(0, 0, 0, 0.05);
}

@mixin smooth-transition {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

// Основные стили
.staff-page {
  background: 
    radial-gradient(circle at 0% 0%, rgba(23, 61, 237, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 100% 100%, rgba(23, 61, 237, 0.02) 0%, transparent 50%),
    linear-gradient(135deg, $pure-white 0%, $soft-white 100%);
  color: $text-dark;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='1' fill='%23173DED' fill-opacity='0.05'/%3E%3C/svg%3E");
    pointer-events: none;
  }
}

.staff-hero {
  padding: 160px 0 80px;
  position: relative;
  
  &__wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    z-index: 2;
  }
  
  &__content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  
  &__back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: $primary-blue;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 30px;
    @include smooth-transition;
    padding: 10px 16px;
    border-radius: 12px;
    background: rgba(23, 61, 237, 0.08);
    
    &:hover {
      background: rgba(23, 61, 237, 0.15);
      transform: translateX(-5px);
    }
    
    svg {
      margin-right: 4px;
    }
  }
  
  &__title {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 800;
    background: linear-gradient(135deg, $text-dark 0%, $primary-blue 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin: 0 0 20px 0;
  }
  
  &__subtitle {
    font-size: 1.3rem;
    color: $text-medium;
    line-height: 1.6;
    margin-bottom: 50px;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.stat-card {
  @include glass-effect;
  padding: 25px;
  border-radius: 20px;
  text-align: center;
  @include smooth-transition;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
  
  &__number {
    font-size: 2.5rem;
    font-weight: 800;
    background: $blue-gradient;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 10px;
  }
  
  &__label {
    font-size: 0.95rem;
    color: $text-medium;
    line-height: 1.4;
  }
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: $blue-gradient;
  opacity: 0.1;
  filter: blur(20px);
  
  &--1 {
    width: 300px;
    height: 300px;
    top: -150px;
    right: -150px;
  }
  
  &--2 {
    width: 200px;
    height: 200px;
    bottom: -100px;
    left: 10%;
  }
  
  &--3 {
    width: 150px;
    height: 150px;
    bottom: 50px;
    right: 20%;
  }
}

.staff-list-section {
  padding: 0 0 100px;
  position: relative;
  
  &__wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.staff-filters {
  @include glass-effect;
  padding: 25px;
  border-radius: 20px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-btn {
  padding: 10px 20px;
  border-radius: 12px;
  border: 2px solid rgba(23, 61, 237, 0.2);
  background: transparent;
  color: $text-medium;
  font-weight: 600;
  cursor: pointer;
  @include smooth-transition;
  
  &:hover {
    border-color: $primary-blue;
    color: $primary-blue;
    background: rgba(23, 61, 237, 0.05);
  }
  
  &--active {
    background: $primary-blue;
    color: $pure-white;
    border-color: $primary-blue;
    
    &:hover {
      background: darken($primary-blue, 10%);
    }
  }
}

.search-box {
  flex: 1;
  max-width: 300px;
  position: relative;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
}

.search-input {
  width: 100%;
  padding: 12px 20px 12px 50px;
  border-radius: 12px;
  border: 2px solid rgba(23, 61, 237, 0.2);
  background: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  color: $text-dark;
  @include smooth-transition;
  
  &:focus {
    outline: none;
    border-color: $primary-blue;
    box-shadow: 0 0 0 3px rgba(23, 61, 237, 0.1);
  }
  
  &::placeholder {
    color: $text-light;
  }
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: $text-light;
  pointer-events: none;
}

.staff-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.staff-card {
  @include glass-effect;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  @include smooth-transition;
  position: relative;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.15),
      0 10px 20px rgba(23, 61, 237, 0.1);
    
    .staff-card__button {
      background: $primary-blue;
      color: $pure-white;
      transform: translateX(5px);
    }
  }
  
  &__image {
    position: relative;
    height: 200px;
    overflow: hidden;
    
    .staff-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      @include smooth-transition;
    }
    
    &:hover .staff-image {
      transform: scale(1.05);
    }
  }
  
  &__badge {
    position: absolute;
    top: 15px;
    right: 15px;
  }
  
  &__content {
    padding: 25px;
  }
  
  &__name {
    font-size: 1.5rem;
    font-weight: 700;
    color: $text-dark;
    margin: 0 0 10px 0;
    line-height: 1.3;
  }
  
  &__position {
    font-size: 1rem;
    color: $primary-blue;
    font-weight: 600;
    margin: 0 0 8px 0;
  }
  
  &__degree {
    font-size: 0.9rem;
    color: $text-medium;
    margin: 0 0 20px 0;
    line-height: 1.4;
  }
  
  &__info {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(23, 61, 237, 0.1);
  }
  
  &__expertise {
    margin-bottom: 25px;
  }
  
  &__button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: transparent;
    border: 2px solid $primary-blue;
    color: $primary-blue;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    @include smooth-transition;
    
    svg {
      @include smooth-transition;
    }
    
    &:hover svg {
      transform: translateX(5px);
    }
  }
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: $text-medium;
  
  svg {
    color: $primary-blue;
  }
}

.expertise-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.expertise-tag {
  padding: 6px 12px;
  background: rgba(23, 61, 237, 0.1);
  color: $primary-blue;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  
  &--more {
    background: rgba(23, 61, 237, 0.05);
    color: $text-light;
  }
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &--blue {
    background: $blue-gradient;
    color: $pure-white;
  }
}

.empty-state {
  @include glass-effect;
  padding: 60px 40px;
  border-radius: 24px;
  text-align: center;
  grid-column: 1 / -1;
  
  &__icon {
    font-size: 4rem;
    margin-bottom: 20px;
  }
  
  &__title {
    font-size: 1.8rem;
    color: $text-dark;
    margin-bottom: 15px;
  }
  
  &__text {
    font-size: 1.1rem;
    color: $text-medium;
    margin-bottom: 30px;
  }
}

.btn {
  padding: 12px 24px;
  border-radius: 12px;
  border: 2px solid $primary-blue;
  background: transparent;
  color: $primary-blue;
  font-weight: 600;
  cursor: pointer;
  @include smooth-transition;
  
  &:hover {
    background: rgba(23, 61, 237, 0.1);
  }
  
  &--outline {
    &:hover {
      background: $primary-blue;
      color: $pure-white;
    }
  }
}

// Модальное окно
.staff-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.3s ease;
  
  &__content {
    @include glass-effect;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 24px;
    position: relative;
    animation: slideUp 0.4s ease;
  }
  
  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.9);
    color: $text-dark;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    @include smooth-transition;
    
    &:hover {
      background: $pure-white;
      transform: rotate(90deg);
    }
  }
  
  &__header {
    display: flex;
    gap: 30px;
    padding: 40px 40px 30px;
    border-bottom: 1px solid rgba(23, 61, 237, 0.1);
    
    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
      padding: 30px 20px;
    }
  }
  
  &__image {
    flex-shrink: 0;
    width: 150px;
    height: 150px;
    border-radius: 20px;
    overflow: hidden;
    border: 4px solid $pure-white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    @media (max-width: 768px) {
      width: 120px;
      height: 120px;
      margin: 0 auto;
    }
  }
  
  &__info {
    flex: 1;
  }
  
  &__name {
    font-size: 2rem;
    font-weight: 800;
    color: $text-dark;
    margin: 0 0 10px 0;
  }
  
  &__position {
    font-size: 1.2rem;
    color: $primary-blue;
    font-weight: 600;
    margin: 0 0 8px 0;
  }
  
  &__degree {
    font-size: 1rem;
    color: $text-medium;
    margin: 0 0 25px 0;
  }
  
  &__stats {
    display: flex;
    gap: 30px;
    
    @media (max-width: 480px) {
      flex-direction: column;
      gap: 15px;
    }
  }
  
  &__body {
    padding: 30px 40px;
    
    @media (max-width: 768px) {
      padding: 20px;
    }
  }
  
  &__section {
    margin-bottom: 30px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  &__bio, &__education {
    font-size: 1.1rem;
    line-height: 1.6;
    color: $text-medium;
    margin: 15px 0 0 0;
  }
}

.section-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: $text-dark;
  margin-bottom: 15px;
  position: relative;
  padding-bottom: 10px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: $blue-gradient;
    border-radius: 2px;
  }
}

.stat {
  text-align: center;
  
  &__value {
    font-size: 1.8rem;
    font-weight: 800;
    background: $blue-gradient;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 5px;
  }
  
  &__label {
    font-size: 0.9rem;
    color: $text-medium;
  }
}

.expertise-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
}

.expertise-item {
  padding: 8px 16px;
  background: rgba(23, 61, 237, 0.1);
  color: $primary-blue;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.courses-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
}

.course-item {
  padding: 15px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(23, 61, 237, 0.1);
  
  &__title {
    font-size: 1.1rem;
    font-weight: 600;
    color: $text-dark;
    margin: 0 0 5px 0;
  }
  
  &__desc {
    font-size: 0.95rem;
    color: $text-medium;
    margin: 0;
  }
}

.achievements-list {
  list-style: none;
  padding: 0;
  margin: 15px 0 0 0;
}

.achievement-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .achievement-icon {
    flex-shrink: 0;
    font-size: 1.2rem;
  }
  
  span {
    color: $text-medium;
    line-height: 1.5;
  }
}

// Анимации
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Адаптивность
@media (max-width: 1200px) {
  .staff-hero {
    padding: 140px 0 60px;
  }
}

@media (max-width: 768px) {
  .staff-hero {
    padding: 120px 0 40px;
  }
  
  .staff-hero__subtitle {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .staff-hero {
    padding: 100px 0 30px;
  }
  
  .staff-hero__title {
    font-size: 2rem;
  }
}
</style>
