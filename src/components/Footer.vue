<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <ul class="footer__list">
        <li class="footer__item">
          <router-link to="/" class="footer__logo-link"><img src="../assets/image/logo.svg" alt="Логотип"
              class="footer__logo" /></router-link>
          <ul class="footer__contact-list">
            <li class="footer__contact-item"><img src="../assets/image/clock-front-gradient.svg" alt="Часы"
                class="footer__contact-icon" />
              <p class="footer__contact-text">пн-пт 09:30-18:30</p>
            </li>
            <li class="footer__contact-item"><img src="../assets/image/phone-ringing-front-gradient.svg" alt="Телефон"
                class="footer__contact-icon" />
              <p class="footer__contact-text">+7 (***) ***-**-**</p>
            </li>
            <li class="footer__contact-item"><img src="../assets/image/location-front-gradient.svg" alt="Адрес"
                class="footer__contact-icon" />
              <p class="footer__contact-text">г. Москва, ул. ****</p>
            </li>
          </ul>
        </li>
        <li class="footer__item footer__item-second">
          <div>
            <p class="footer__title">Контакты Администратора</p>
            <p class="footer__text">Администратор:<br>Бритвина Валентина Валентиновна</p>
            <div class="footer__contact-method"><img src="../assets/image/mail-front-gradient.svg" alt="Почта"
                class="footer__contact-icon" />
              <p class="footer__contact-text">*@mail.ru</p>
            </div>
          </div>
          <div>
            <p class="footer__title">Контакты Преподавателя</p>
            <p class="footer__text">Преподаватель:<br>Бритвина Валентина Валентиновна</p>
            <div class="footer__contact-method"><img src="../assets/image/mail-front-gradient.svg" alt="Почта"
                class="footer__contact-icon" />
              <p class="footer__contact-text">*@mail.ru</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </footer>
</template>
