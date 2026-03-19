<template>
  <section class="profile">
    <div class="profile__wrapper">
      <h1 class="profile__title">Личный кабинет</h1>

      <!-- Навигация по вкладкам -->
      <div class="profile__tabs">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          class="profile__tab"
          :class="{ 'profile__tab--active': activeTab === tab.value }"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Контент вкладок -->
      <div class="profile__content">
        <!-- Профиль (информация о пользователе) -->
        <div v-if="activeTab === 'profile'" class="profile-section">
          <div class="profile-section__header">
            <h2 class="profile-section__title">Информация о пользователе</h2>
          </div>
          <div class="profile-info">
            <div class="profile-info__avatar">
              {{ userInitials }}
            </div>
            <div class="profile-info__details">
              <div class="profile-info__row">
                <span class="profile-info__label">Имя:</span>
                <span class="profile-info__value">{{ user?.first_name || 'Не указано' }}</span>
              </div>
              <div class="profile-info__row">
                <span class="profile-info__label">Фамилия:</span>
                <span class="profile-info__value">{{ user?.last_name || 'Не указано' }}</span>
              </div>
              <div class="profile-info__row">
                <span class="profile-info__label">Email:</span>
                <span class="profile-info__value">{{ user?.email }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Избранное (заглушка) -->
        <div v-else-if="activeTab === 'favorites'" class="profile-section">
          <div class="profile-section__header">
            <h2 class="profile-section__title">Избранное</h2>
          </div>
          <div class="profile-placeholder">
            <p>Здесь будут отображаться товары, добавленные в избранное.</p>
          </div>
        </div>

        <!-- Заказы (заглушка) -->
        <div v-else-if="activeTab === 'orders'" class="profile-section">
          <div class="profile-section__header">
            <h2 class="profile-section__title">История заказов</h2>
          </div>
          <div class="profile-placeholder">
            <p>У вас пока нет заказов.</p>
          </div>
        </div>

        <!-- Настройки (смена пароля и email) -->
        <div v-else-if="activeTab === 'settings'" class="profile-section">
          <div class="profile-section__header">
            <h2 class="profile-section__title">Настройки</h2>
          </div>

          <!-- Смена пароля -->
          <div class="settings-block">
            <h3 class="settings-block__title">Смена пароля</h3>
            <form @submit.prevent="changePassword" class="settings-form">
              <div class="form-group">
                <label>Текущий пароль</label>
                <input type="password" v-model="passwordForm.current" />
              </div>
              <div class="form-group">
                <label>Новый пароль</label>
                <input type="password" v-model="passwordForm.new" />
              </div>
              <div class="form-group">
                <label>Подтверждение пароля</label>
                <input type="password" v-model="passwordForm.confirm" />
              </div>
              <button type="submit" class="settings-block__btn">Сменить пароль</button>
            </form>
          </div>

          <!-- Смена email -->
          <div class="settings-block">
            <h3 class="settings-block__title">Смена email</h3>
            <form @submit.prevent="changeEmail" class="settings-form">
              <div class="form-group">
                <label>Новый email</label>
                <input type="email" v-model="emailForm.newEmail" />
              </div>
              <div class="form-group">
                <label>Пароль (для подтверждения)</label>
                <input type="password" v-model="emailForm.password" />
              </div>
              <button type="submit" class="settings-block__btn">Сменить email</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const user = computed(() => auth.user)

const userInitials = computed(() => {
  return user.value?.first_name?.[0] || user.value?.email?.[0]?.toUpperCase() || 'U'
})

// Вкладки
const tabs = [
  { label: 'Профиль', value: 'profile' },
  { label: 'Избранное', value: 'favorites' },
  { label: 'Заказы', value: 'orders' },
  { label: 'Настройки', value: 'settings' },
]
const activeTab = ref('profile')

// Формы (заглушки)
const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
})

const emailForm = ref({
  newEmail: '',
  password: ''
})

function changePassword() {
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    alert('Пароли не совпадают')
    return
  }
  alert('Функция смены пароля будет реализована позже (заглушка)')
  passwordForm.value = { current: '', new: '', confirm: '' }
}

function changeEmail() {
  alert('Функция смены email будет реализована позже (заглушка)')
  emailForm.value = { newEmail: '', password: '' }
}
</script>

<style lang="scss" scoped>
$pure-white: #ffffff;
$soft-white: #fafbfc;
$light-grey: #f0f4f8;
$primary-blue: #173DED;
$blue-gradient: linear-gradient(135deg, #173DED 0%, #4d7cfe 50%, #8ba9ff 100%);
$text-dark: #1a1a1a;
$text-medium: #5d6d87;
$text-light: #8a9bb8;
$accent-glow: rgba(23, 61, 237, 0.15);

.profile {
  padding: 100px 2rem;
  background: $soft-white;
  min-height: 100vh;

  &__wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 40px;
    background: $blue-gradient;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    border-bottom: 1px solid $light-grey;
    padding-bottom: 10px;
    flex-wrap: wrap;
  }

  &__tab {
    padding: 10px 20px;
    background: none;
    border: none;
    border-radius: 30px;
    font-size: 1rem;
    font-weight: 600;
    color: $text-medium;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      color: $primary-blue;
      background: rgba($primary-blue, 0.05);
    }

    &--active {
      background: $blue-gradient;
      color: white;
    }
  }

  &__content {
    background: white;
    border-radius: 24px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }
}

.profile-section {
  &__header {
    margin-bottom: 25px;
  }

  &__title {
    font-size: 1.8rem;
    font-weight: 700;
    color: $text-dark;
  }
}

.profile-info {
  display: flex;
  gap: 30px;
  align-items: center;

  &__avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: $blue-gradient;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    text-transform: uppercase;
    box-shadow: 0 10px 20px rgba($primary-blue, 0.3);
  }

  &__details {
    flex: 1;
  }

  &__row {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid $light-grey;

    &:last-child {
      border-bottom: none;
    }
  }

  &__label {
    width: 120px;
    font-weight: 600;
    color: $text-dark;
  }

  &__value {
    color: $text-medium;
  }
}

.profile-placeholder {
  padding: 40px;
  text-align: center;
  background: $light-grey;
  border-radius: 16px;
  color: $text-light;
  font-size: 1.2rem;
}

.settings-block {
  margin-bottom: 40px;
  padding: 20px;
  background: $soft-white;
  border-radius: 16px;

  &__title {
    font-size: 1.3rem;
    font-weight: 600;
    color: $text-dark;
    margin-bottom: 20px;
  }

  &__btn {
    padding: 12px 30px;
    background: $blue-gradient;
    border: none;
    border-radius: 30px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.9;
    }
  }
}

.settings-form {
  max-width: 400px;

  .form-group {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: $text-dark;
    }

    input {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid $light-grey;
      border-radius: 12px;
      font-size: 1rem;
      background: white;

      &:focus {
        outline: none;
        border-color: $primary-blue;
      }
    }
  }
}

@media (max-width: 768px) {
  .profile-info {
    flex-direction: column;
    text-align: center;
  }
  .profile-info__row {
    flex-direction: column;
    text-align: left;
    gap: 5px;
  }
  .profile-info__label {
    width: auto;
  }
  .profile__tabs {
    justify-content: center;
  }
}
</style>