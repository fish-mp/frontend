<template>
  <footer class="footer">
    <!-- Верхний контент: ссылки -->
    <div class="footer-links">
      <div class="col">
        <h3>НОВОСТИ</h3>
        <ul>
          <li><a href="#">Новости</a></li>
          <li><a href="#">Рассылка</a></li>
          <li><a href="#">Где купить</a></li>
        </ul>
      </div>

      <div class="col">
        <h3>АКВАРИУМИСТИКА</h3>
        <ul>
          <li><a href="#">Что такое аквариумистика?</a></li>
          <li><a href="#">Такэси Амано</a></li>
          <li><a href="#">Начать</a></li>
          <li><a href="#">Галерея</a></li>
        </ul>
      </div>

      <div class="col">
        <h3>ПОДДЕРЖКА</h3>
        <ul>
          <li><a href="#">Центр поддержки</a></li>
          <li><a href="#">Форма обратной связи</a></li>
          <li><a href="#">Политика конфиденциальности</a></li>
        </ul>
      </div>

      <div class="col">
        <h3>ПРОДУКЦИЯ</h3>
        <ul>
          <li><a href="#">Свет</a></li>
          <li><a href="#">CO₂-система</a></li>
          <li><a href="#">Фильтры</a></li>
          <li><a href="#">Растения и декор</a></li>
          <li><a href="#">Питательные добавки</a></li>
        </ul>
      </div>

      <div class="col">
        <h3>СОЦСЕТИ</h3>
        <div class="socials">
          <a href="#"><i class="icon">X</i></a>
          <a href="#"><i class="icon">F</i></a>
          <a href="#"><i class="icon">I</i></a>
        </div>
      </div>
    </div>

    <!-- Нижняя часть -->
    <div class="footer-bottom">
      <p>© {{ new Date().getFullYear() }} Aqua Design Amano</p>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.footer {
  background-color: #0a0a0a;
  color: #ccc;
  padding: 2rem 1rem;
  font-size: 0.85rem;
  font-family: 'Segoe UI', sans-serif;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  border-bottom: 1px solid #333;
  padding-bottom: 2rem;
}

.col {
  flex: 1 1 180px;
  min-width: 150px;
}

h3 {
  font-size: 0.9rem;
  color: white;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin: 0.4rem 0;
}

a {
  text-decoration: none;
  color: #999;
  transition: color 0.2s ease;
}

a:hover {
  color: white;
}

.socials {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.icon {
  background: #333;
  color: white;
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
  font-size: 0.9rem;
}

.footer-bottom {
  text-align: center;
  padding-top: 1.5rem;
  color: #666;
  font-size: 0.75rem;
}
</style>
