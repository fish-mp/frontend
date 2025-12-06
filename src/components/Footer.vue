<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <ul class="footer__list">
        <li class="footer__item">
          <router-link to="/" class="footer__logo-link">
            <img src="../assets/image/logo.svg" alt="Логотип" class="footer__logo" />
          </router-link>
          <ul class="footer__contact-list">
            <li class="footer__contact-item">
              <div class="footer__icon-wrapper">
                <svg class="footer__icon" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <p class="footer__contact-text">пн-пт 09:30-18:30</p>
            </li>
            <li class="footer__contact-item">
              <div class="footer__icon-wrapper">
                <svg class="footer__icon" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <p class="footer__contact-text">+7 (***) ***-**-**</p>
            </li>
            <li class="footer__contact-item">
              <div class="footer__icon-wrapper">
                <svg class="footer__icon" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <p class="footer__contact-text">г. Москва, ул. ****</p>
            </li>
          </ul>
        </li>
        <li class="footer__item footer__item-second">
          <div class="footer__contact-block">
            <p class="footer__title">Контакты Администратора</p>
            <p class="footer__text">Администратор:<br>Бритвина Валентина Валентиновна</p>
            <div class="footer__contact-method">
              <div class="footer__icon-wrapper">
                <svg class="footer__icon" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <p class="footer__contact-text">*@mail.ru</p>
            </div>
          </div>
          <div class="footer__contact-block">
            <p class="footer__title">Контакты Преподавателя</p>
            <p class="footer__text">Преподаватель:<br>Бритвина Валентина Валентиновна</p>
            <div class="footer__contact-method">
              <div class="footer__icon-wrapper">
                <svg class="footer__icon" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <p class="footer__contact-text">*@mail.ru</p>
            </div>
          </div>
        </li>
      </ul>
      
      <div class="footer__bottom">
        <div class="footer__decorative-line"></div>
        <p class="footer__copyright">© 2024 Юношеская школа аквариумистики "АкваВселенная". Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Логика компонента, если потребуется
</script>

<style lang="scss" scoped>
@use '../assets/scss/Footer.scss';
</style>