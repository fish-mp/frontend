<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <ul class="footer__list">
        <li class="footer__item">
          <router-link to="/" class="footer__logo-link"><img src="../assets/image/logo.png" alt="Логотип"
              class="footer__logo" /></router-link>
          <ul class="footer__contact-list">
            <li class="footer__contact-item"><img src="../assets/image/clock-front-gradient.svg" alt="Часы"
                class="footer__contact-icon" />
              <p class="footer__contact-text">пн-пт 09:30-18:30</p>
            </li>
            <li class="footer__contact-item"><img src="../assets/image/phone-ringing-front-gradient.svg" alt="Телефон"
                class="footer__contact-icon" />
              <p class="footer__contact-text">+7 (495) 223-05-23 доб.3080</p>
            </li>
            <li class="footer__contact-item"><img src="../assets/image/location-front-gradient.svg" alt="Адрес"
                class="footer__contact-icon" />
              <p class="footer__contact-text">г. Москва, ул. Павла<br>Корчагина, д.22, ауд. ПК441</p>
            </li>
          </ul>
        </li>
        <li class="footer__item footer__item-second">
          <div>
            <p class="footer__title">Контакты кафедры</p>
            <p class="footer__text">Заведующий кафедрой:<br>Галевко Владимир Владимирович</p>
            <div class="footer__contact-method"><img src="../assets/image/mail-front-gradient.svg" alt="Почта"
                class="footer__contact-icon" />
              <p class="footer__contact-text">km@mospolytech.ru</p>
            </div>
          </div>
          <div>
            <p class="footer__title">Контакты координатора</p>
            <p class="footer__text">Доцент/координатор:<br>Муханов Сергей Александрович</p>
            <div class="footer__contact-method"><img src="../assets/image/mail-front-gradient.svg" alt="Почта"
                class="footer__contact-icon" />
              <p class="footer__contact-text">km@mospolytech.ru</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </footer>
</template>
