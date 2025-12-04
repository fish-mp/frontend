<template>
  <section class="department" @click="createRipple" ref="departmentSection">
    <!-- Фоновые элементы -->
    <span id="bg-circle-1"></span>
    <span id="bg-circle-2"></span>
    
    <!-- Декоративные камни на дне -->
    <div class="decorative-stones">
      <div class="stone stone-1"></div>
      <div class="stone stone-2"></div>
      <div class="stone stone-3"></div>
      <div class="stone stone-4"></div>
    </div>
    
    <!-- Красивые анимированные рыбки -->
    <div class="fish clown-fish">
      <div class="fish-body">
        <div class="fin dorsal-fin"></div>
        <div class="fin pectoral-fin"></div>
        <div class="tail"></div>
      </div>
    </div>
    
    <div class="fish neon-fish">
      <div class="fish-body">
        <div class="neon-stripe"></div>
        <div class="tail"></div>
      </div>
    </div>
    
    <div class="fish gold-fish">
      <div class="fish-body">
        <div class="veil-tail"></div>
        <div class="flowing-fin"></div>
      </div>
    </div>
    
    <div class="fish angel-fish">
      <div class="fish-body">
        <div class="angel-fin"></div>
        <div class="angel-tail"></div>
      </div>
    </div>
    
    <!-- Интерактивные пузырьки -->
    <div 
      v-for="i in 20" 
      :key="`bubble-${i}`" 
      :class="`bubble bubble-${i}`"
      @click="popBubble(i, $event)"
    ></div>
    
    <!-- Водоросли -->
    <div class="seaweed seaweed-1">
      <div class="stem">
        <div class="leaf" :style="`--initial-rotate: -25deg`"></div>
        <div class="leaf" :style="`--initial-rotate: 20deg`"></div>
        <div class="leaf" :style="`--initial-rotate: -15deg`"></div>
      </div>
    </div>
    <div class="seaweed seaweed-2">
      <div class="stem">
        <div class="leaf" :style="`--initial-rotate: -12deg`"></div>
        <div class="leaf" :style="`--initial-rotate: 15deg`"></div>
      </div>
    </div>
    
    <!-- Эффекты ряби -->
    <div 
      v-for="ripple in ripples" 
      :key="ripple.id"
      class="ripple"
      :style="{
        left: ripple.x + 'px',
        top: ripple.y + 'px',
        width: ripple.size + 'px',
        height: ripple.size + 'px'
      }"
    ></div>
    
    <div class="department__wrapper">
      <h1 class="department__title">Юношеская школа аквариумистики "АкваВселенная"</h1>
      <p class="department__description">
        Здесь вы сможете более подробно познакомиться с интересующими вас рыбками. У вас
        появится возможность воспользоваться нашими курсами по аквариумистике.
      </p>
    </div>
  </section>

  <AboutSection />
  <NewsSection />
  <StaffSection />
  <YandexMaps />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import AboutSection from "../components/AboutSection.vue";
import NewsSection from "../components/NewsSection.vue";
import CourseSection from "../components/CourseSection.vue";
import YandexMaps from "../components/YandexMaps.vue";
import StaffSection from "../components/StaffSection.vue";

const departmentSection = ref(null);
const ripples = ref([]);
let rippleId = 0;

// Создание эффекта ряби при клике
const createRipple = (event) => {
  if (!departmentSection.value) return;
  
  const rect = departmentSection.value.getBoundingClientRect();
  const size = Math.min(rect.width, rect.height) * 0.1;
  
  const ripple = {
    id: rippleId++,
    x: event.clientX - rect.left - size / 2,
    y: event.clientY - rect.top - size / 2,
    size: size
  };
  
  ripples.value.push(ripple);
  
  // Удаляем рябь через 1.5 секунды
  setTimeout(() => {
    ripples.value = ripples.value.filter(r => r.id !== ripple.id);
  }, 1500);
};

// Лопание пузырьков
const popBubble = (index, event) => {
  event.stopPropagation();
  const bubble = event.target;
  bubble.classList.add('pop');
  
  // Сбрасываем анимацию и возвращаем пузырек через 3 секунды
  setTimeout(() => {
    bubble.classList.remove('pop');
    bubble.style.animation = 'none';
    setTimeout(() => {
      bubble.style.animation = '';
    }, 100);
  }, 500);
  
  // Создаем дополнительные маленькие пузырьки при лопании
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const miniBubble = document.createElement('div');
      miniBubble.className = 'bubble mini-bubble';
      miniBubble.style.cssText = `
        position: absolute;
        left: ${event.clientX}px;
        top: ${event.clientY}px;
        width: 5px;
        height: 5px;
        background: white;
        border-radius: 50%;
        animation: miniBubbleRise 1s ease-out forwards;
        z-index: 2;
      `;
      departmentSection.value.appendChild(miniBubble);
      
      setTimeout(() => {
        if (miniBubble.parentNode) {
          miniBubble.parentNode.removeChild(miniBubble);
        }
      }, 1000);
    }, i * 100);
  }
};

// Добавляем CSS для мини-пузырьков
onMounted(() => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes miniBubbleRise {
      0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(${Math.random() * 40 - 20}px, -100px) scale(0.5);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});

onUnmounted(() => {
  ripples.value = [];
});
</script>

<style lang="scss" scoped>
// Импорт SCSS файла
@use '../assets/scss/Department.scss';
</style>