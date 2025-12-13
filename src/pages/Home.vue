<template>
  <section class="aqua-universe" @click="createRipple" ref="aquaSection">
    <!-- Космический фон -->
    <div class="cosmic-background"></div>
    
    <!-- Звезды -->
    <div class="stars"></div>
    
    <!-- Туманности -->
    <div class="nebula nebula-1"></div>
    <div class="nebula nebula-2"></div>
    
    <!-- Планеты с КРАСИВЫМИ рыбами внутри -->
    <div class="planet-container planet-1">
      <div class="planet">
        <!-- Яркие золотые рыбки с деталями -->
        <div class="planet-fish gold-fish-1" style="--fish-speed: 8s">
          <div class="fish-fin dorsal-fin"></div>
          <div class="fish-fin pectoral-fin left"></div>
          <div class="fish-fin pectoral-fin right"></div>
          <div class="fish-tail"></div>
          <div class="fish-detail scale"></div>
        </div>
        <div class="planet-fish gold-fish-2" style="--fish-speed: 12s">
          <div class="fish-fin dorsal-fin"></div>
          <div class="fish-fin pectoral-fin left"></div>
          <div class="fish-fin pectoral-fin right"></div>
          <div class="fish-tail"></div>
          <div class="fish-detail stripe"></div>
        </div>
        <div class="planet-fish gold-fish-3" style="--fish-speed: 10s">
          <div class="fish-fin dorsal-fin"></div>
          <div class="fish-fin pelvic-fin left"></div>
          <div class="fish-fin pelvic-fin right"></div>
          <div class="fish-tail"></div>
        </div>
        
        <!-- Яркие синие рыбки с деталями -->
        <div class="planet-fish blue-fish-1" style="--fish-speed: 14s">
          <div class="fish-fin dorsal-fin"></div>
          <div class="fish-fin anal-fin"></div>
          <div class="fish-fin pectoral-fin left"></div>
          <div class="fish-fin pectoral-fin right"></div>
          <div class="fish-tail"></div>
          <div class="fish-detail spot"></div>
        </div>
        <div class="planet-fish blue-fish-2" style="--fish-speed: 9s">
          <div class="fish-fin dorsal-fin"></div>
          <div class="fish-fin pectoral-fin left"></div>
          <div class="fish-fin pectoral-fin right"></div>
          <div class="fish-tail"></div>
          <div class="fish-detail pattern"></div>
        </div>
        
        <!-- Яркие неоновые рыбки с деталями -->
        <div class="planet-fish neon-fish-1" style="--fish-speed: 11s">
          <div class="fish-fin dorsal-fin"></div>
          <div class="fish-fin anal-fin"></div>
          <div class="fish-fin pectoral-fin left"></div>
          <div class="fish-fin pectoral-fin right"></div>
          <div class="fish-tail"></div>
          <div class="fish-detail neon-stripe"></div>
        </div>
        <div class="planet-fish neon-fish-2" style="--fish-speed: 15s">
          <div class="fish-fin dorsal-fin long"></div>
          <div class="fish-fin pectoral-fin left"></div>
          <div class="fish-fin pectoral-fin right"></div>
          <div class="fish-tail fancy"></div>
          <div class="fish-detail dot-pattern"></div>
        </div>
        
        <!-- Блестящие рыбки с деталями -->
        <div class="planet-fish sparkle-fish-1" style="--fish-speed: 13s">
          <div class="fish-fin dorsal-fin"></div>
          <div class="fish-fin pectoral-fin left"></div>
          <div class="fish-fin pectoral-fin right"></div>
          <div class="fish-tail veil"></div>
          <div class="fish-detail sparkles"></div>
        </div>
        <div class="planet-fish sparkle-fish-2" style="--fish-speed: 7s">
          <div class="fish-fin dorsal-fin"></div>
          <div class="fish-fin anal-fin"></div>
          <div class="fish-fin pectoral-fin left"></div>
          <div class="fish-fin pectoral-fin right"></div>
          <div class="fish-tail"></div>
          <div class="fish-detail glitter"></div>
        </div>
        
        <!-- Водные пузырьки внутри планеты -->
        <div class="planet-bubble bubble-1"></div>
        <div class="planet-bubble bubble-2"></div>
        <div class="planet-bubble bubble-3"></div>
        <div class="planet-bubble bubble-4"></div>
        <div class="planet-bubble bubble-5"></div>
      </div>
    </div>
    
    <div class="planet-container planet-2">
      <div class="planet">
        <!-- Яркие фиолетовые рыбки с деталями -->
        <div class="planet-fish purple-fish-1" style="--fish-speed: 9s">
          <div class="fish-fin dorsal-fin"></div>
          <div class="fish-fin pectoral-fin left"></div>
          <div class="fish-fin pectoral-fin right"></div>
          <div class="fish-tail"></div>
          <div class="fish-detail pattern-2"></div>
        </div>
        <div class="planet-fish purple-fish-2" style="--fish-speed: 13s">
          <div class="fish-fin dorsal-fin spikey"></div>
          <div class="fish-fin pectoral-fin left"></div>
          <div class="fish-fin pectoral-fin right"></div>
          <div class="fish-tail split"></div>
          <div class="fish-detail spots"></div>
        </div>
        <div class="planet-fish purple-fish-3" style="--fish-speed: 11s">
          <div class="fish-fin dorsal-fin"></div>
          <div class="fish-fin anal-fin"></div>
          <div class="fish-fin pectoral-fin left"></div>
          <div class="fish-fin pectoral-fin right"></div>
          <div class="fish-tail"></div>
          <div class="fish-detail stripes"></div>
        </div>
        
        <!-- Яркие красные рыбки с деталями -->
        <div class="planet-fish red-fish-1" style="--fish-speed: 7s">
          <div class="fish-fin dorsal-fin"></div>
          <div class="fish-fin pectoral-fin left"></div>
          <div class="fish-fin pectoral-fin right"></div>
          <div class="fish-tail fancy-2"></div>
          <div class="fish-detail scale-pattern"></div>
        </div>
        <div class="planet-fish red-fish-2" style="--fish-speed: 15s">
          <div class="fish-fin dorsal-fin long"></div>
          <div class="fish-fin anal-fin"></div>
          <div class="fish-fin pectoral-fin left"></div>
          <div class="fish-fin pectoral-fin right"></div>
          <div class="fish-tail"></div>
          <div class="fish-detail wave-pattern"></div>
        </div>
        
        <!-- Яркие зеленые рыбки с деталями -->
        <div class="planet-fish green-fish-1" style="--fish-speed: 10s">
          <div class="fish-fin dorsal-fin"></div>
          <div class="fish-fin pectoral-fin left"></div>
          <div class="fish-fin pectoral-fin right"></div>
          <div class="fish-tail"></div>
          <div class="fish-detail mosaic"></div>
        </div>
        <div class="planet-fish green-fish-2" style="--fish-speed: 14s">
          <div class="fish-fin dorsal-fin"></div>
          <div class="fish-fin anal-fin"></div>
          <div class="fish-fin pectoral-fin left"></div>
          <div class="fish-fin pectoral-fin right"></div>
          <div class="fish-tail veil"></div>
          <div class="fish-detail chevron"></div>
        </div>
        
        <!-- Скалярии с деталями -->
        <div class="planet-fish angel-fish-1" style="--fish-speed: 12s">
          <div class="fish-fin dorsal-fin long-angel"></div>
          <div class="fish-fin anal-fin long-angel"></div>
          <div class="fish-fin pectoral-fin left angel"></div>
          <div class="fish-fin pectoral-fin right angel"></div>
          <div class="fish-tail angel-tail"></div>
          <div class="fish-detail angel-stripes"></div>
        </div>
        <div class="planet-fish angel-fish-2" style="--fish-speed: 8s">
          <div class="fish-fin dorsal-fin long-angel"></div>
          <div class="fish-fin anal-fin long-angel"></div>
          <div class="fish-fin pectoral-fin left angel"></div>
          <div class="fish-fin pectoral-fin right angel"></div>
          <div class="fish-tail angel-tail"></div>
          <div class="fish-detail angel-pattern"></div>
        </div>
        
        <!-- Водные пузырьки внутри планеты -->
        <div class="planet-bubble bubble-6"></div>
        <div class="planet-bubble bubble-7"></div>
        <div class="planet-bubble bubble-8"></div>
        <div class="planet-bubble bubble-9"></div>
        <div class="planet-bubble bubble-10"></div>
        
        <!-- Декорации внутри планеты -->
        <div class="planet-decoration decoration-1"></div>
        <div class="planet-decoration decoration-2"></div>
        <div class="planet-decoration decoration-3"></div>
      </div>
    </div>
    
    <!-- Космические рыбы (основные большие) -->
    <div class="fish clown-fish">
      <div class="fish-body">
        <div class="fin dorsal-fin"></div>
        <div class="fin pectoral-fin"></div>
        <div class="tail"></div>
        <div class="cosmic-glow"></div>
      </div>
    </div>
    
    <div class="fish neon-fish">
      <div class="fish-body">
        <div class="neon-stripe"></div>
        <div class="tail"></div>
        <div class="cosmic-glow"></div>
      </div>
    </div>
    
    <div class="fish gold-fish">
      <div class="fish-body">
        <div class="veil-tail"></div>
        <div class="flowing-fin"></div>
        <div class="cosmic-glow"></div>
      </div>
    </div>
    
    <div class="fish angel-fish">
      <div class="fish-body">
        <div class="angel-fin"></div>
        <div class="angel-tail"></div>
        <div class="cosmic-glow"></div>
      </div>
    </div>
    
    <!-- Космические косяки -->
    <div class="fish-shoal shoal-1">
      <div class="small-fish" v-for="n in 8" :key="n" :style="`--fish-index: ${n}`"></div>
    </div>
    
    <div class="fish-shoal shoal-2">
      <div class="small-fish" v-for="n in 6" :key="n" :style="`--fish-index: ${n}`"></div>
    </div>
    
    <!-- Космические пузыри -->
    <div 
      v-for="i in 15" 
      :key="`bubble-${i}`" 
      :class="`cosmic-bubble bubble-${i}`"
      @click="popBubble(i, $event)"
    ></div>
    
    <!-- Черные дыры -->
    <div class="black-hole black-hole-1"></div>
    <div class="black-hole black-hole-2"></div>
    
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
    
    <!-- Космические кристаллы -->
    <div class="crystal crystal-1"></div>
    <div class="crystal crystal-2"></div>
    <div class="crystal crystal-3"></div>
    
    <!-- Контент по центру -->
    <div class="universe-content">
      <div class="content-wrapper">
        <h1 class="department__title">Юношеская школа аквариумистики "АкваВселенная"</h1>
        <div class="planet-fish-demo">
          <div class="demo-fish demo-gold"></div>
          <div class="demo-fish demo-blue"></div>
          <div class="demo-fish demo-neon"></div>
          <div class="demo-fish demo-purple"></div>
        </div>
        <p class="department__description">
          Здесь вы сможете более подробно познакомиться с интересующими вас рыбками. У вас
          появится возможность воспользоваться нашими курсами по аквариумистике.
        </p>
        <button class="cta-button" @click.stop="scrollToAbout">
          Узнать больше
        </button>
      </div>
    </div>
  </section>
  <AboutSection />
  <NewsSection />
  <StaffSection />
  <YandexMaps />
</template>

<script setup>
import AboutSection from "../components/AboutSection.vue";
import NewsSection from "../components/NewsSection.vue";
import CourseSection from "../components/CourseSection.vue";
import YandexMaps from "../components/YandexMaps.vue";
import StaffSection from "../components/StaffSection.vue";

import { ref, onMounted } from 'vue'

const aquaSection = ref(null)
const ripples = ref([])
let rippleId = 0

// Создание эффекта ряби
const createRipple = (event) => {
  if (!aquaSection.value) return
  
  const rect = aquaSection.value.getBoundingClientRect()
  const size = Math.min(rect.width, rect.height) * 0.1
  
  const ripple = {
    id: rippleId++,
    x: event.clientX - rect.left - size / 2,
    y: event.clientY - rect.top - size / 2,
    size: size
  }
  
  ripples.value.push(ripple)
  
  setTimeout(() => {
    ripples.value = ripples.value.filter(r => r.id !== ripple.id)
  }, 1500)
}

// Лопание пузырьков
const popBubble = (index, event) => {
  event.stopPropagation()
  const bubble = event.target
  bubble.classList.add('pop')
  
  setTimeout(() => {
    bubble.classList.remove('pop')
    bubble.style.animation = 'none'
    setTimeout(() => {
      bubble.style.animation = ''
    }, 100)
  }, 500)
  
  // Создаем эффект взрыва
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const miniSpark = document.createElement('div')
      miniSpark.className = 'spark'
      miniSpark.style.cssText = `
        position: absolute;
        left: ${event.clientX}px;
        top: ${event.clientY}px;
        width: 3px;
        height: 3px;
        background: white;
        border-radius: 50%;
        animation: sparkExplode 1s ease-out forwards;
        z-index: 2;
      `
      aquaSection.value.appendChild(miniSpark)
      
      setTimeout(() => {
        if (miniSpark.parentNode) {
          miniSpark.parentNode.removeChild(miniSpark)
        }
      }, 1000)
    }, i * 100)
  }
}

// Прокрутка к следующей секции
const scrollToAbout = () => {
  const aboutSection = document.querySelector('.about-section') || 
                       document.querySelector('section:not(.aqua-universe)')
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// Добавляем CSS для эффектов
onMounted(() => {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes sparkExplode {
      0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)
  
  // Создаем звезды с учетом мобильных устройств
  createStars()
})

// Создание звездного поля
const createStars = () => {
  const starsContainer = document.querySelector('.stars')
  if (!starsContainer) return
  
  const isMobile = window.innerWidth < 768
  const starCount = isMobile ? 80 : 120
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div')
    star.className = 'star'
    star.style.cssText = `
      position: absolute;
      width: ${Math.random() * 2 + 1}px;
      height: ${Math.random() * 2 + 1}px;
      background: white;
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.7 + 0.3};
      animation: twinkle ${Math.random() * 5 + 3}s infinite alternate;
      z-index: 1;
    `
    starsContainer.appendChild(star)
  }
}
</script>

<style lang="scss" scoped>
.aqua-universe {
  /* ОСНОВНОЙ ФОН - СДЕЛАЛ ПОСВЕТЛЕЕ */
  background: 
    radial-gradient(ellipse at 50% 30%, 
      #0a1a4a 0%,     /* был #000428 */
      #1a2c6d 30%,    /* был #001233 */
      #2c3f8f 60%,    /* был #002855 */
      #0a1a4a 100%),  /* был #000428 */
    radial-gradient(circle at 20% 20%, 
      rgba(100, 150, 255, 0.3) 0%,  /* стал светлее */
      transparent 60%),
    radial-gradient(circle at 80% 60%, 
      rgba(150, 100, 255, 0.25) 0%, /* стал светлее */
      transparent 60%),
    radial-gradient(circle at 40% 70%, 
      rgba(255, 255, 255, 0.2) 0%,  /* стал светлее */
      transparent 40%),
    linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.05) 0%,
      transparent 50%,
      rgba(255, 255, 255, 0.05) 100%
    );
  
  /* Добавим легкую текстуру космической пыли */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.03) 1px, transparent 2px),
      radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.02) 1px, transparent 2px);
    background-size: 300px 300px;
    z-index: 1;
    pointer-events: none;
  }
  
  color: white;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.cosmic-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='1' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E");
  animation: spaceFlow 120s linear infinite;
  z-index: 1;
  pointer-events: none;
}

.stars {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}

.nebula {
  position: absolute;
  border-radius: 50%;
  z-index: 1;
  filter: blur(60px);
  opacity: 0.4;
  mix-blend-mode: screen;
  
  &.nebula-1 {
    width: 400px;
    height: 400px;
    top: 10%;
    left: 10%;
    background: radial-gradient(circle, 
      rgba(0, 153, 255, 0.6), 
      rgba(0, 102, 204, 0.4), 
      transparent 70%);
    animation: nebulaFloat 60s ease-in-out infinite;
  }
  
  &.nebula-2 {
    width: 300px;
    height: 300px;
    bottom: 20%;
    right: 15%;
    background: radial-gradient(circle, 
      rgba(153, 0, 255, 0.5), 
      rgba(102, 0, 204, 0.3), 
      transparent 70%);
    animation: nebulaFloat 80s ease-in-out infinite reverse;
  }
}

/* КОНТЕЙНЕРЫ ДЛЯ ПЛАНЕТ С РЫБКАМИ */
.planet-container {
  position: absolute;
  z-index: 1;
  pointer-events: none;
  
  &.planet-1 {
    width: 180px;
    height: 180px;
    top: 12%;
    right: 18%;
    animation: planetFloat 30s ease-in-out infinite;
  }
  
  &.planet-2 {
    width: 140px;
    height: 140px;
    bottom: 25%;
    left: 12%;
    animation: planetFloat 35s ease-in-out infinite reverse;
  }
  
  .planet {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: 
      radial-gradient(circle at 30% 30%, 
        rgba(100, 200, 255, 0.3) 0%,
        rgba(50, 150, 255, 0.2) 30%,
        rgba(0, 100, 200, 0.1) 60%,
        transparent 80%),
      radial-gradient(circle at 70% 70%,
        rgba(255, 255, 255, 0.2) 0%,
        transparent 50%);
    backdrop-filter: blur(10px);
    border: 3px solid rgba(255, 255, 255, 0.3);
    box-shadow: 
      inset 0 0 60px rgba(255, 255, 255, 0.4),
      0 0 80px rgba(100, 200, 255, 0.5),
      0 0 120px rgba(100, 200, 255, 0.3);
    position: relative;
    overflow: hidden;
    
    /* Эффект воды внутри */
    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      right: -50%;
      bottom: -50%;
      background: 
        radial-gradient(
          circle at 40% 40%,
          rgba(255, 255, 255, 0.15) 0%,
          transparent 60%
        ),
        conic-gradient(
          from 0deg at 50% 50%,
          transparent,
          rgba(255, 255, 255, 0.1) 20%,
          transparent 40%,
          rgba(255, 255, 255, 0.1) 60%,
          transparent 80%,
          rgba(255, 255, 255, 0.1) 100%
        );
      animation: waterFlow 20s linear infinite;
      z-index: 1;
    }
  }
}

/* КРАСИВЫЕ И ДЕТАЛЬНЫЕ РЫБКИ ВНУТРИ ПЛАНЕТ */
.planet-fish {
  position: absolute;
  z-index: 3;
  border-radius: 50% 40% 40% 50%;
  animation: planetFishSwim var(--fish-speed, 10s) linear infinite;
  filter: 
    drop-shadow(0 0 8px currentColor)
    drop-shadow(0 0 15px currentColor);
  transform-origin: center;
  will-change: transform;
  overflow: visible;
  
  /* Глазки у всех рыбок */
  &::before {
    content: '';
    position: absolute;
    top: 25%;
    right: 15%;
    width: 20%;
    height: 20%;
    background: white;
    border-radius: 50%;
    box-shadow: 
      0 0 10px white,
      0 0 20px rgba(255, 255, 255, 0.5);
    z-index: 15;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 27%;
    right: 17%;
    width: 10%;
    height: 10%;
    background: #000;
    border-radius: 50%;
    z-index: 16;
  }
}

/* ОБЩИЕ СТИЛИ ДЛЯ ДЕТАЛЕЙ РЫБОК */

/* Плавники */
.fish-fin {
  position: absolute;
  background: inherit;
  z-index: 4;
  filter: brightness(1.3) drop-shadow(0 0 5px currentColor);
  animation: finWiggle 1s ease-in-out infinite alternate;
  
  /* Спинной плавник */
  &.dorsal-fin {
    top: -20%;
    left: 40%;
    width: 30%;
    height: 40%;
    clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
    animation-delay: 0.1s;
    
    &.long {
      height: 60%;
      top: -30%;
    }
    
    &.spikey {
      clip-path: polygon(50% 0%, 70% 30%, 100% 50%, 70% 100%, 30% 100%, 0% 50%, 30% 30%);
    }
    
    &.long-angel {
      height: 80%;
      top: -40%;
      clip-path: polygon(50% 0%, 60% 20%, 80% 40%, 100% 60%, 80% 100%, 20% 100%, 0% 60%, 20% 40%, 40% 20%);
    }
  }
  
  /* Анальный плавник */
  &.anal-fin {
    bottom: -15%;
    left: 40%;
    width: 25%;
    height: 30%;
    clip-path: polygon(50% 100%, 100% 0%, 0% 0%);
    animation-delay: 0.3s;
    
    &.long-angel {
      height: 70%;
      bottom: -35%;
      clip-path: polygon(50% 100%, 60% 80%, 80% 60%, 100% 40%, 80% 0%, 20% 0%, 0% 40%, 20% 60%, 40% 80%);
    }
  }
  
  /* Грудные плавники */
  &.pectoral-fin {
    top: 35%;
    width: 20%;
    height: 25%;
    clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
    
    &.left {
      left: 10%;
      transform: rotate(-20deg);
      animation-delay: 0.2s;
    }
    
    &.right {
      left: 70%;
      transform: rotate(20deg) scaleX(-1);
      animation-delay: 0.4s;
    }
    
    &.angel {
      width: 15%;
      height: 35%;
      clip-path: polygon(0% 50%, 100% 20%, 100% 80%);
    }
  }
  
  /* Тазовые плавники */
  &.pelvic-fin {
    bottom: 15%;
    width: 15%;
    height: 20%;
    clip-path: polygon(100% 50%, 0% 0%, 0% 100%);
    
    &.left {
      left: 25%;
    }
    
    &.right {
      left: 60%;
    }
  }
}

/* Хвосты */
.fish-tail {
  position: absolute;
  left: -15%;
  top: 25%;
  width: 30%;
  height: 30%;
  background: inherit;
  z-index: 4;
  filter: brightness(0.9) drop-shadow(0 0 5px currentColor);
  animation: tailWiggle 0.8s ease-in-out infinite alternate;
  
  /* Базовый хвост */
  &:not(.fancy):not(.veil):not(.split):not(.angel-tail):not(.fancy-2) {
    clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
  }
  
  /* Причудливый хвост */
  &.fancy {
    clip-path: polygon(100% 0%, 40% 20%, 0% 50%, 40% 80%, 100% 100%);
    width: 35%;
    left: -18%;
  }
  
  &.fancy-2 {
    clip-path: polygon(100% 0%, 60% 30%, 20% 50%, 60% 70%, 100% 100%);
  }
  
  /* Вуалевый хвост */
  &.veil {
    clip-path: polygon(100% 0%, 30% 20%, 0% 50%, 30% 80%, 100% 100%, 70% 50%);
    height: 40%;
    filter: brightness(1.1) drop-shadow(0 0 8px currentColor);
  }
  
  /* Раздвоенный хвост */
  &.split {
    clip-path: polygon(100% 0%, 50% 30%, 0% 50%, 50% 70%, 100% 100%);
  }
  
  /* Хвост скалярии */
  &.angel-tail {
    clip-path: polygon(100% 0%, 70% 30%, 40% 50%, 70% 70%, 100% 100%);
    width: 25%;
    left: -12%;
  }
}

/* Детали узоров на теле */
.fish-detail {
  position: absolute;
  z-index: 5;
  pointer-events: none;
  
  /* Чешуя */
  &.scale {
    width: 80%;
    height: 60%;
    left: 10%;
    top: 20%;
    background: 
      radial-gradient(circle at 30% 30%, transparent 20%, currentColor 21%, transparent 22%),
      radial-gradient(circle at 50% 50%, transparent 20%, currentColor 21%, transparent 22%),
      radial-gradient(circle at 70% 70%, transparent 20%, currentColor 21%, transparent 22%);
    background-size: 15px 15px;
    opacity: 0.3;
    mix-blend-mode: overlay;
  }
  
  &.scale-pattern {
    width: 100%;
    height: 80%;
    background: 
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 5px,
        currentColor 5px,
        currentColor 7px
      );
    opacity: 0.2;
    mix-blend-mode: screen;
  }
  
  /* Полосы */
  &.stripe {
    width: 100%;
    height: 100%;
    background: 
      repeating-linear-gradient(
        to right,
        transparent,
        transparent 10px,
        rgba(255, 255, 255, 0.5) 10px,
        rgba(255, 255, 255, 0.5) 13px
      );
    opacity: 0.4;
  }
  
  &.stripes {
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(
        to right,
        transparent 30%,
        rgba(255, 255, 255, 0.4) 30%,
        rgba(255, 255, 255, 0.4) 35%,
        transparent 35%
      ),
      linear-gradient(
        to right,
        transparent 50%,
        rgba(255, 255, 255, 0.4) 50%,
        rgba(255, 255, 255, 0.4) 55%,
        transparent 55%
      ),
      linear-gradient(
        to right,
        transparent 70%,
        rgba(255, 255, 255, 0.4) 70%,
        rgba(255, 255, 255, 0.4) 75%,
        transparent 75%
      );
    opacity: 0.6;
  }
  
  &.angel-stripes {
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(
        45deg,
        transparent 40%,
        rgba(255, 255, 255, 0.6) 40%,
        rgba(255, 255, 255, 0.6) 45%,
        transparent 45%
      ),
      linear-gradient(
        -45deg,
        transparent 40%,
        rgba(255, 255, 255, 0.6) 40%,
        rgba(255, 255, 255, 0.6) 45%,
        transparent 45%
      );
    opacity: 0.5;
  }
  
  /* Пятна */
  &.spot {
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 40% 40%, currentColor 5%, transparent 6%),
      radial-gradient(circle at 60% 60%, currentColor 5%, transparent 6%);
    opacity: 0.4;
    mix-blend-mode: overlay;
  }
  
  &.spots {
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 30% 30%, currentColor 8%, transparent 9%),
      radial-gradient(circle at 50% 50%, currentColor 8%, transparent 9%),
      radial-gradient(circle at 70% 70%, currentColor 8%, transparent 9%);
    opacity: 0.3;
    mix-blend-mode: hard-light;
  }
  
  /* Узор */
  &.pattern {
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(
        90deg,
        transparent 25%,
        rgba(255, 255, 255, 0.3) 25%,
        rgba(255, 255, 255, 0.3) 35%,
        transparent 35%
      );
    opacity: 0.5;
    mix-blend-mode: soft-light;
  }
  
  &.pattern-2 {
    width: 100%;
    height: 100%;
    background: 
      repeating-linear-gradient(
        60deg,
        transparent,
        transparent 5px,
        currentColor 5px,
        currentColor 7px
      );
    opacity: 0.3;
    mix-blend-mode: color-dodge;
  }
  
  &.angel-pattern {
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(
        ellipse at 50% 50%,
        transparent 30%,
        rgba(255, 255, 255, 0.4) 31%,
        rgba(255, 255, 255, 0.4) 35%,
        transparent 36%
      );
    opacity: 0.6;
  }
  
  /* Неоновая полоса */
  &.neon-stripe {
    width: 60%;
    height: 10%;
    left: 20%;
    top: 45%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.8), 
      transparent);
    border-radius: 2px;
    animation: neonPulse 2s ease-in-out infinite;
    box-shadow: 0 0 10px white;
  }
  
  /* Точечный узор */
  &.dot-pattern {
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 25% 25%, white 1px, transparent 2px),
      radial-gradient(circle at 75% 25%, white 1px, transparent 2px),
      radial-gradient(circle at 25% 75%, white 1px, transparent 2px),
      radial-gradient(circle at 75% 75%, white 1px, transparent 2px);
    background-size: 20px 20px;
    opacity: 0.4;
  }
  
  /* Блестки */
  &.sparkles {
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.8) 1px, transparent 2px),
      radial-gradient(circle at 60% 50%, rgba(255, 255, 255, 0.8) 1px, transparent 2px),
      radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.8) 1px, transparent 2px);
    animation: sparkleTwinkle 3s infinite;
  }
  
  &.glitter {
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 40% 30%, rgba(255, 255, 255, 0.9) 2px, transparent 3px),
      radial-gradient(circle at 70% 40%, rgba(255, 255, 255, 0.9) 2px, transparent 3px),
      radial-gradient(circle at 50% 70%, rgba(255, 255, 255, 0.9) 2px, transparent 3px);
    animation: glitterShine 4s infinite;
  }
  
  /* Мозаика */
  &.mosaic {
    width: 100%;
    height: 100%;
    background: 
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 4px,
        rgba(255, 255, 255, 0.2) 4px,
        rgba(255, 255, 255, 0.2) 6px
      ),
      repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 4px,
        rgba(255, 255, 255, 0.1) 4px,
        rgba(255, 255, 255, 0.1) 6px
      );
    opacity: 0.3;
  }
  
  /* Волновой узор */
  &.wave-pattern {
    width: 100%;
    height: 100%;
    background: 
      repeating-radial-gradient(
        circle at 50% 50%,
        transparent,
        transparent 5px,
        rgba(255, 255, 255, 0.3) 5px,
        rgba(255, 255, 255, 0.3) 7px
      );
    opacity: 0.4;
  }
  
  /* Шеврон */
  &.chevron {
    width: 100%;
    height: 100%;
    background: 
      repeating-linear-gradient(
        60deg,
        transparent,
        transparent 8px,
        currentColor 8px,
        currentColor 10px
      );
    opacity: 0.2;
    mix-blend-mode: overlay;
  }
}

/* РАЗНЫЕ ТИПЫ ЯРКИХ РЫБОК */

/* Золотые рыбки - очень яркие */
.gold-fish-1, .gold-fish-2, .gold-fish-3 {
  width: 35px;
  height: 18px;
  background: 
    radial-gradient(circle at 70% 50%, 
      #FFD700 0%,
      #FFC400 30%,
      #FFA000 70%,
      #FF8C00 100%),
    linear-gradient(45deg, 
      #FFD700 0%,
      #FFC400 50%,
      #FFA000 100%);
  box-shadow: 
    0 0 20px rgba(255, 215, 0, 0.8),
    0 0 40px rgba(255, 195, 0, 0.6),
    inset 0 0 15px rgba(255, 255, 255, 0.5);
  animation-delay: calc(var(--fish-speed) * 0.3);
  
  &.gold-fish-1 { top: 30%; left: 20%; animation-duration: 9s; }
  &.gold-fish-2 { top: 60%; left: 50%; animation-duration: 11s; }
  &.gold-fish-3 { top: 40%; left: 70%; animation-duration: 8s; }
}

/* Синие рыбки - яркие неоновые */
.blue-fish-1, .blue-fish-2 {
  width: 32px;
  height: 16px;
  background: 
    radial-gradient(circle at 70% 50%, 
      #00FFFF 0%,
      #00BFFF 30%,
      #0080FF 70%,
      #0000FF 100%),
    linear-gradient(45deg, 
      #00FFFF 0%,
      #00BFFF 50%,
      #0080FF 100%);
  box-shadow: 
    0 0 20px rgba(0, 255, 255, 0.8),
    0 0 40px rgba(0, 191, 255, 0.6),
    inset 0 0 15px rgba(255, 255, 255, 0.5);
  animation-delay: calc(var(--fish-speed) * 0.5);
  
  &.blue-fish-1 { top: 20%; left: 60%; animation-duration: 13s; }
  &.blue-fish-2 { top: 70%; left: 30%; animation-duration: 10s; }
}

/* Неоновые зеленые рыбки - супер яркие */
.neon-fish-1, .neon-fish-2 {
  width: 28px;
  height: 14px;
  background: 
    radial-gradient(circle at 70% 50%, 
      #00FF00 0%,
      #00CC00 30%,
      #009900 70%,
      #006600 100%),
    linear-gradient(45deg, 
      #00FF00 0%,
      #00CC00 50%,
      #009900 100%);
  box-shadow: 
    0 0 25px rgba(0, 255, 0, 0.9),
    0 0 50px rgba(0, 255, 0, 0.7),
    inset 0 0 20px rgba(255, 255, 255, 0.6);
  animation-delay: calc(var(--fish-speed) * 0.7);
  
  &.neon-fish-1 { top: 50%; left: 20%; animation-duration: 12s; }
  &.neon-fish-2 { top: 30%; left: 70%; animation-duration: 14s; }
}

/* Блестящие рыбки */
.sparkle-fish-1, .sparkle-fish-2 {
  width: 30px;
  height: 15px;
  background: 
    radial-gradient(circle at 70% 50%, 
      #FF69B4 0%,
      #FF1493 30%,
      #C71585 70%,
      #8B008B 100%),
    linear-gradient(45deg, 
      #FF69B4 0%,
      #FF1493 50%,
      #C71585 100%);
  box-shadow: 
    0 0 20px rgba(255, 105, 180, 0.8),
    0 0 40px rgba(255, 20, 147, 0.6),
    inset 0 0 15px rgba(255, 255, 255, 0.5);
  animation-delay: calc(var(--fish-speed) * 0.4);
  
  &.sparkle-fish-1 { top: 65%; left: 15%; animation-duration: 11s; }
  &.sparkle-fish-2 { top: 25%; left: 45%; animation-duration: 9s; }
}

/* Фиолетовые рыбки для второй планеты */
.purple-fish-1, .purple-fish-2, .purple-fish-3 {
  width: 33px;
  height: 17px;
  background: 
    radial-gradient(circle at 70% 50%, 
      #DA70D6 0%,
      #BA55D3 30%,
      #9932CC 70%,
      #8A2BE2 100%),
    linear-gradient(45deg, 
      #DA70D6 0%,
      #BA55D3 50%,
      #9932CC 100%);
  box-shadow: 
    0 0 20px rgba(218, 112, 214, 0.8),
    0 0 40px rgba(186, 85, 211, 0.6),
    inset 0 0 15px rgba(255, 255, 255, 0.5);
  
  &.purple-fish-1 { top: 25%; left: 25%; animation-duration: 10s; }
  &.purple-fish-2 { top: 60%; left: 60%; animation-duration: 14s; }
  &.purple-fish-3 { top: 40%; left: 75%; animation-duration: 12s; }
}

/* Красные рыбки */
.red-fish-1, .red-fish-2 {
  width: 31px;
  height: 16px;
  background: 
    radial-gradient(circle at 70% 50%, 
      #FF4500 0%,
      #FF0000 30%,
      #CC0000 70%,
      #990000 100%),
    linear-gradient(45deg, 
      #FF4500 0%,
      #FF0000 50%,
      #CC0000 100%);
  box-shadow: 
    0 0 20px rgba(255, 69, 0, 0.8),
    0 0 40px rgba(255, 0, 0, 0.6),
    inset 0 0 15px rgba(255, 255, 255, 0.5);
  
  &.red-fish-1 { top: 15%; left: 50%; animation-duration: 8s; }
  &.red-fish-2 { top: 70%; left: 20%; animation-duration: 16s; }
}

/* Зеленые рыбки */
.green-fish-1, .green-fish-2 {
  width: 29px;
  height: 15px;
  background: 
    radial-gradient(circle at 70% 50%, 
      #32CD32 0%,
      #228B22 30%,
      #006400 70%,
      #004d00 100%),
    linear-gradient(45deg, 
      #32CD32 0%,
      #228B22 50%,
      #006400 100%);
  box-shadow: 
    0 0 20px rgba(50, 205, 50, 0.8),
    0 0 40px rgba(34, 139, 34, 0.6),
    inset 0 0 15px rgba(255, 255, 255, 0.5);
  
  &.green-fish-1 { top: 45%; left: 15%; animation-duration: 11s; }
  &.green-fish-2 { top: 30%; left: 65%; animation-duration: 15s; }
}

/* Скалярии (ангельские рыбки) */
.angel-fish-1, .angel-fish-2 {
  width: 40px;
  height: 25px;
  background: 
    radial-gradient(circle at 70% 50%, 
      #FFA500 0%,
      #FF8C00 30%,
      #FF4500 70%,
      #FF0000 100%),
    linear-gradient(45deg, 
      #FFA500 0%,
      #FF8C00 50%,
      #FF4500 100%);
  box-shadow: 
    0 0 25px rgba(255, 165, 0, 0.9),
    0 0 50px rgba(255, 140, 0, 0.7),
    inset 0 0 20px rgba(255, 255, 255, 0.6);
  border-radius: 45% 45% 45% 45%;
  
  &.angel-fish-1 { top: 55%; left: 40%; animation-duration: 13s; }
  &.angel-fish-2 { top: 20%; left: 35%; animation-duration: 9s; }
}

/* Пузырьки внутри планет */
.planet-bubble {
  position: absolute;
  background: radial-gradient(circle at 30% 30%, 
    rgba(255, 255, 255, 0.9), 
    rgba(200, 240, 255, 0.4));
  border-radius: 50%;
  z-index: 2;
  box-shadow: 
    inset 0 0 8px rgba(255, 255, 255, 0.8),
    0 0 15px rgba(200, 240, 255, 0.6);
  
  &.bubble-1, &.bubble-2, &.bubble-3, &.bubble-4, &.bubble-5 {
    animation: planetBubbleRise 8s linear infinite;
  }
  
  &.bubble-6, &.bubble-7, &.bubble-8, &.bubble-9, &.bubble-10 {
    animation: planetBubbleRise 10s linear infinite;
  }
  
  &.bubble-1 { width: 6px; height: 6px; left: 30%; bottom: 10%; animation-delay: 0s; }
  &.bubble-2 { width: 8px; height: 8px; left: 60%; bottom: 20%; animation-delay: 2s; }
  &.bubble-3 { width: 5px; height: 5px; left: 40%; bottom: 5%; animation-delay: 4s; }
  &.bubble-4 { width: 7px; height: 7px; left: 70%; bottom: 15%; animation-delay: 1s; }
  &.bubble-5 { width: 4px; height: 4px; left: 20%; bottom: 25%; animation-delay: 3s; }
  &.bubble-6 { width: 6px; height: 6px; left: 35%; bottom: 10%; animation-delay: 0s; }
  &.bubble-7 { width: 9px; height: 9px; left: 65%; bottom: 5%; animation-delay: 2s; }
  &.bubble-8 { width: 5px; height: 5px; left: 45%; bottom: 20%; animation-delay: 4s; }
  &.bubble-9 { width: 7px; height: 7px; left: 75%; bottom: 15%; animation-delay: 1s; }
  &.bubble-10 { width: 4px; height: 4px; left: 25%; bottom: 25%; animation-delay: 3s; }
}

/* Декорации внутри планет */
.planet-decoration {
  position: absolute;
  bottom: 0;
  z-index: 1;
  background: linear-gradient(to top, 
    rgba(0, 200, 100, 0.8) 0%,
    rgba(0, 150, 50, 0.6) 50%,
    transparent 100%);
  
  &.decoration-1 {
    left: 25%;
    width: 10px;
    height: 45px;
    clip-path: polygon(0% 100%, 100% 100%, 85% 0%, 15% 0%);
  }
  
  &.decoration-2 {
    right: 35%;
    width: 8px;
    height: 35px;
    clip-path: polygon(0% 100%, 100% 100%, 75% 0%, 25% 0%);
  }
  
  &.decoration-3 {
    left: 60%;
    width: 12px;
    height: 30px;
    clip-path: polygon(0% 100%, 100% 100%, 90% 0%, 10% 0%);
  }
}

/* НОВЫЕ АНИМАЦИИ ДЛЯ ДЕТАЛЕЙ */
@keyframes finWiggle {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(10deg); }
}

@keyframes tailWiggle {
  0% { transform: rotate(0deg) scaleY(1); }
  100% { transform: rotate(15deg) scaleY(0.9); }
}

@keyframes neonPulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

@keyframes sparkleTwinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.6; }
}

@keyframes glitterShine {
  0%, 100% { opacity: 0.1; transform: rotate(0deg); }
  50% { opacity: 0.4; transform: rotate(5deg); }
}

/* ОБНОВЛЕННАЯ АНИМАЦИЯ ПЛАВАНИЯ РЫБОК С УЧЕТОМ ДЕТАЛЕЙ */
@keyframes planetFishSwim {
  0% {
    transform: 
      translate(0, 0) 
      rotate(0deg) 
      scale(1);
    opacity: 0.9;
    filter: 
      drop-shadow(0 0 10px currentColor)
      drop-shadow(0 0 20px currentColor)
      hue-rotate(0deg);
  }
  25% {
    transform: 
      translate(25px, -15px) 
      rotate(15deg) 
      scale(1.05);
    opacity: 1;
    filter: 
      drop-shadow(0 0 15px currentColor)
      drop-shadow(0 0 30px currentColor)
      hue-rotate(90deg);
  }
  50% {
    transform: 
      translate(50px, 0) 
      rotate(0deg) 
      scale(1);
    opacity: 0.9;
    filter: 
      drop-shadow(0 0 10px currentColor)
      drop-shadow(0 0 20px currentColor)
      hue-rotate(180deg);
  }
  75% {
    transform: 
      translate(25px, 15px) 
      rotate(-15deg) 
      scale(0.95);
    opacity: 1;
    filter: 
      drop-shadow(0 0 15px currentColor)
      drop-shadow(0 0 30px currentColor)
      hue-rotate(270deg);
  }
  100% {
    transform: 
      translate(0, 0) 
      rotate(0deg) 
      scale(1);
    opacity: 0.9;
    filter: 
      drop-shadow(0 0 10px currentColor)
      drop-shadow(0 0 20px currentColor)
      hue-rotate(360deg);
  }
}

@keyframes planetBubbleRise {
  0% {
    transform: translateY(0) scale(0.8);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.4;
  }
  100% {
    transform: translateY(-100px) scale(1.2);
    opacity: 0;
  }
}

@keyframes waterFlow {
  0% {
    transform: rotate(0deg);
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    transform: rotate(360deg);
    opacity: 0.3;
  }
}

@keyframes planetFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(5deg);
  }
  66% {
    transform: translateY(10px) rotate(-5deg);
  }
}

/* Демо-рыбки в текстовом блоке */
.planet-fish-demo {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 30px auto;
  z-index: 20;
  position: relative;
  
  .demo-fish {
    width: 50px;
    height: 25px;
    border-radius: 50% 40% 40% 50%;
    animation: demoFishFloat 3s ease-in-out infinite;
    filter: drop-shadow(0 0 15px currentColor);
    
    &.demo-gold {
      background: linear-gradient(45deg, #FFD700, #FFA500);
      animation-delay: 0s;
    }
    
    &.demo-blue {
      background: linear-gradient(45deg, #00BFFF, #0066CC);
      animation-delay: 0.5s;
    }
    
    &.demo-neon {
      background: linear-gradient(45deg, #00FF00, #00CC00);
      animation-delay: 1s;
    }
    
    &.demo-purple {
      background: linear-gradient(45deg, #DA70D6, #8A2BE2);
      animation-delay: 1.5s;
    }
  }
}

@keyframes demoFishFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
  }
}

.crystal {
  position: absolute;
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg,
    transparent 47%,
    rgba(0, 255, 255, 0.6) 50%,
    transparent 53%);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  z-index: 1;
  filter: drop-shadow(0 0 15px cyan);
  animation: crystalGlow 4s ease-in-out infinite;
  
  &.crystal-1 {
    bottom: 10%;
    left: 5%;
    transform: rotate(45deg);
    animation-delay: 0s;
  }
  
  &.crystal-2 {
    bottom: 20%;
    right: 10%;
    transform: rotate(-30deg);
    animation-delay: 1s;
  }
  
  &.crystal-3 {
    top: 40%;
    left: 20%;
    transform: rotate(60deg);
    animation-delay: 2s;
  }
}

.black-hole {
  position: absolute;
  border-radius: 50%;
  z-index: 1;
  background: radial-gradient(circle,
    transparent 30%,
    rgba(50, 50, 100, 0.6) 50%,
    rgba(30, 30, 70, 0.8) 100%);
  box-shadow: 
    0 0 80px rgba(50, 50, 100, 0.7),
    inset 0 0 40px rgba(30, 30, 70, 0.8);
  animation: vortexSpin 30s linear infinite;
  border: 1px solid rgba(100, 100, 200, 0.3);
  
  &.black-hole-1 {
    width: 60px;
    height: 60px;
    top: 30%;
    left: 10%;
  }
  
  &.black-hole-2 {
    width: 40px;
    height: 40px;
    bottom: 25%;
    right: 20%;
    animation-direction: reverse;
  }
}

// РЫБЫ (основные большие)
.fish {
  position: absolute;
  z-index: 4;
  pointer-events: none;
  filter: drop-shadow(0 0 10px currentColor);
  
  .cosmic-glow {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: radial-gradient(circle at center,
      transparent 40%,
      rgba(255, 255, 255, 0.1) 60%,
      transparent 80%);
    animation: glowPulse 3s ease-in-out infinite;
  }
  
  &.clown-fish {
    top: 25%;
    left: -100px;
    animation: fishSwim 25s linear infinite;
    color: #FF6D00;
    
    .fish-body {
      width: 100px;
      height: 45px;
      background: 
        linear-gradient(45deg, #FF6D00, #FF9100, #FFAB00),
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 10px,
          white 10px,
          white 13px
        );
      background-blend-mode: overlay;
      border-radius: 40% 50% 50% 40%;
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        top: 12px;
        right: 15px;
        width: 12px;
        height: 12px;
        background: white;
        border-radius: 50%;
        box-shadow: 0 0 10px white, 0 0 20px #FF6D00;
      }
      
      &::after {
        content: '';
        position: absolute;
        top: 14px;
        right: 17px;
        width: 6px;
        height: 6px;
        background: #263238;
        border-radius: 50%;
      }
      
      .fin {
        position: absolute;
        
        &.dorsal-fin {
          top: -12px;
          left: 40px;
          width: 20px;
          height: 25px;
          background: linear-gradient(45deg, #FF6D00, #FF9100);
          clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
          animation: finFlap 1.8s ease-in-out infinite 0.2s;
          filter: drop-shadow(0 0 5px #FF6D00);
        }
        
        &.pectoral-fin {
          top: 15px;
          left: 25px;
          width: 15px;
          height: 20px;
          background: linear-gradient(45deg, #FF6D00, #FF9100);
          clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
          animation: finFlap 1.5s ease-in-out infinite 0.5s;
          filter: drop-shadow(0 0 5px #FF6D00);
        }
      }
      
      .tail {
        position: absolute;
        left: -25px;
        top: 12px;
        width: 35px;
        height: 25px;
        background: linear-gradient(45deg, #FF6D00, #FF9100);
        clip-path: polygon(100% 0%, 0% 50%, 100% 100%, 80% 50%);
        animation: finFlap 2s ease-in-out infinite;
        filter: drop-shadow(0 0 5px #FF6D00);
      }
    }
  }
  
  &.neon-fish {
    top: 65%;
    right: -80px;
    animation: fishSwimReverse 30s linear infinite 3s;
    color: #00E5FF;
    
    .fish-body {
      width: 80px;
      height: 30px;
      background: 
        radial-gradient(circle at 70% 50%, #00E5FF, #0091EA),
        linear-gradient(45deg, #0091EA, #00B0FF);
      background-blend-mode: overlay;
      border-radius: 45% 50% 50% 45%;
      position: relative;
      transform: scaleX(-1);
      
      &::before {
        content: '';
        position: absolute;
        top: 8px;
        right: 12px;
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
        box-shadow: 0 0 15px white, 0 0 30px #00E5FF;
      }
      
      &::after {
        content: '';
        position: absolute;
        top: 10px;
        right: 14px;
        width: 5px;
        height: 5px;
        background: #006064;
        border-radius: 50%;
      }
      
      .neon-stripe {
        position: absolute;
        top: 12px;
        right: 25px;
        width: 40px;
        height: 3px;
        background: linear-gradient(90deg, #00E5FF, #18FFFF, #00E5FF);
        border-radius: 2px;
        box-shadow: 0 0 15px #00E5FF, 0 0 30px #00E5FF;
        animation: neonPulse 2s ease-in-out infinite;
      }
      
      .tail {
        position: absolute;
        left: -20px;
        top: 8px;
        width: 25px;
        height: 20px;
        background: linear-gradient(45deg, #0091EA, #00B0FF);
        clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
        animation: finFlap 1.7s ease-in-out infinite 0.3s;
        filter: drop-shadow(0 0 5px #0091EA);
      }
    }
  }
  
  &.gold-fish {
    top: 45%;
    left: -90px;
    animation: fishSwim 35s linear infinite 6s;
    color: #FFD700;
    
    .fish-body {
      width: 90px;
      height: 50px;
      background: 
        radial-gradient(circle at 70% 50%, #FFD740, #FFC400),
        linear-gradient(45deg, #FFAB00, #FFC400);
      background-blend-mode: overlay;
      border-radius: 40% 50% 50% 40%;
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        top: 15px;
        right: 15px;
        width: 12px;
        height: 12px;
        background: white;
        border-radius: 50%;
        box-shadow: 0 0 10px white, 0 0 20px #FFD700;
      }
      
      &::after {
        content: '';
        position: absolute;
        top: 17px;
        right: 17px;
        width: 6px;
        height: 6px;
        background: #5D4037;
        border-radius: 50%;
      }
      
      .veil-tail {
        position: absolute;
        left: -40px;
        top: 5px;
        width: 50px;
        height: 40px;
        background: linear-gradient(45deg, rgba(255, 193, 7, 0.9), rgba(255, 160, 0, 0.7));
        clip-path: polygon(100% 0%, 0% 20%, 20% 50%, 0% 80%, 100% 100%, 80% 50%);
        animation: finFlap 2.5s ease-in-out infinite 0.4s;
        filter: drop-shadow(0 0 5px #FFD700);
      }
      
      .flowing-fin {
        position: absolute;
        bottom: -15px;
        right: 30px;
        width: 25px;
        height: 30px;
        background: linear-gradient(45deg, rgba(255, 193, 7, 0.9), rgba(255, 160, 0, 0.7));
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        animation: finFlap 2s ease-in-out infinite 0.6s;
        filter: drop-shadow(0 0 5px #FFD700);
      }
    }
  }
  
  &.angel-fish {
    top: 75%;
    right: -70px;
    animation: fishSwimReverse 28s linear infinite 4s;
    color: #536DFE;
    
    .fish-body {
      width: 70px;
      height: 60px;
      background: 
        linear-gradient(45deg, #536DFE, #7C4DFF),
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 5px,
          #E1F5FE 5px,
          #E1F5FE 8px
        );
      background-blend-mode: multiply;
      border-radius: 45% 40% 40% 45%;
      position: relative;
      transform: scaleX(-1);
      
      &::before {
        content: '';
        position: absolute;
        top: 20px;
        right: 12px;
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
        box-shadow: 0 0 10px white, 0 0 20px #536DFE;
      }
      
      &::after {
        content: '';
        position: absolute;
        top: 22px;
        right: 14px;
        width: 5px;
        height: 5px;
        background: #311B92;
        border-radius: 50%;
      }
      
      .angel-fin {
        position: absolute;
        top: -20px;
        right: 25px;
        width: 15px;
        height: 40px;
        background: linear-gradient(45deg, #536DFE, #7C4DFF);
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        animation: finFlap 1.6s ease-in-out infinite 0.2s;
        filter: drop-shadow(0 0 5px #536DFE);
      }
      
      .angel-tail {
        position: absolute;
        left: -15px;
        top: 20px;
        width: 30px;
        height: 25px;
        background: linear-gradient(45deg, #536DFE, #7C4DFF);
        clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
        animation: finFlap 1.8s ease-in-out infinite 0.5s;
        filter: drop-shadow(0 0 5px #536DFE);
      }
    }
  }
}

// Косяки маленьких рыб
.fish-shoal {
  position: absolute;
  z-index: 3;
  pointer-events: none;
  
  &.shoal-1 {
    top: 35%;
    left: -100px;
    animation: shoalSwim 40s linear infinite;
    
    .small-fish {
      position: absolute;
      width: 15px;
      height: 7px;
      background: linear-gradient(45deg, #00E5FF, #0091EA);
      border-radius: 50% 40% 40% 50%;
      animation: fishSwimSmall 2s ease-in-out infinite;
      animation-delay: calc(var(--fish-index) * 0.1s);
      opacity: 0.7;
      
      &::after {
        content: '';
        position: absolute;
        left: -5px;
        top: 1px;
        width: 6px;
        height: 4px;
        background: inherit;
        clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
      }
    }
  }
  
  &.shoal-2 {
    bottom: 40%;
    right: -100px;
    animation: shoalSwim 35s linear infinite reverse;
    animation-delay: 10s;
    
    .small-fish {
      position: absolute;
      width: 12px;
      height: 6px;
      background: linear-gradient(45deg, #FFD700, #FFAB00);
      border-radius: 40% 50% 50% 40%;
      animation: fishSwimSmall 1.8s ease-in-out infinite;
      animation-delay: calc(var(--fish-index) * 0.15s);
      opacity: 0.6;
      transform: scaleX(-1);
      
      &::after {
        content: '';
        position: absolute;
        right: -5px;
        top: 1px;
        width: 5px;
        height: 3px;
        background: inherit;
        clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
      }
    }
  }
}

// Космические пузыри
.cosmic-bubble {
  position: absolute;
  background: radial-gradient(circle at 30% 30%, 
    rgba(255, 255, 255, 0.95), 
    rgba(0, 229, 255, 0.4));
  border-radius: 50%;
  z-index: 2;
  cursor: pointer;
  box-shadow: 
    inset 0 0 10px rgba(255, 255, 255, 0.9),
    0 0 20px rgba(0, 229, 255, 0.8);
  transition: transform 0.3s ease, opacity 0.3s ease;
  
  &:hover {
    transform: scale(1.3);
    box-shadow: 
      inset 0 0 15px rgba(255, 255, 255, 1),
      0 0 40px rgba(0, 229, 255, 1);
  }
  
  &.pop {
    animation: bubblePop 0.5s ease-out forwards;
  }
  
  &.bubble-1 { width: 12px; height: 12px; left: 5%; bottom: -60px; animation: cosmicBubbleRise 25s linear infinite 0s, cosmicBubbleSway 15s ease-in-out infinite 0s; }
  &.bubble-2 { width: 18px; height: 18px; left: 15%; bottom: -60px; animation: cosmicBubbleRise 22s linear infinite 2s, cosmicBubbleSway 12s ease-in-out infinite 1s; }
  &.bubble-3 { width: 10px; height: 10px; left: 25%; bottom: -60px; animation: cosmicBubbleRise 28s linear infinite 1s, cosmicBubbleSway 18s ease-in-out infinite 2s; }
  &.bubble-4 { width: 22px; height: 22px; left: 35%; bottom: -60px; animation: cosmicBubbleRise 20s linear infinite 3s, cosmicBubbleSway 10s ease-in-out infinite 3s; }
  &.bubble-5 { width: 16px; height: 16px; left: 45%; bottom: -60px; animation: cosmicBubbleRise 24s linear infinite 1.5s, cosmicBubbleSway 14s ease-in-out infinite 1.5s; }
  &.bubble-6 { width: 14px; height: 14px; left: 55%; bottom: -60px; animation: cosmicBubbleRise 26s linear infinite 0.5s, cosmicBubbleSway 16s ease-in-out infinite 0.5s; }
  &.bubble-7 { width: 20px; height: 20px; left: 65%; bottom: -60px; animation: cosmicBubbleRise 21s linear infinite 2.5s, cosmicBubbleSway 11s ease-in-out infinite 2.5s; }
  &.bubble-8 { width: 15px; height: 15px; left: 75%; bottom: -60px; animation: cosmicBubbleRise 29s linear infinite 1.2s, cosmicBubbleSway 19s ease-in-out infinite 1.2s; }
  &.bubble-9 { width: 17px; height: 17px; left: 85%; bottom: -60px; animation: cosmicBubbleRise 23s linear infinite 3.5s, cosmicBubbleSway 13s ease-in-out infinite 3.5s; }
  &.bubble-10 { width: 13px; height: 13px; left: 95%; bottom: -60px; animation: cosmicBubbleRise 27s linear infinite 0.8s, cosmicBubbleSway 17s ease-in-out infinite 0.8s; }
  &.bubble-11 { width: 15px; height: 15px; left: 10%; bottom: -60px; animation: cosmicBubbleRise 26s linear infinite 4s, cosmicBubbleSway 16s ease-in-out infinite 4s; }
  &.bubble-12 { width: 11px; height: 11px; left: 20%; bottom: -60px; animation: cosmicBubbleRise 30s linear infinite 5s, cosmicBubbleSway 20s ease-in-out infinite 5s; }
  &.bubble-13 { width: 19px; height: 19px; left: 30%; bottom: -60px; animation: cosmicBubbleRise 23s linear infinite 6s, cosmicBubbleSway 13s ease-in-out infinite 6s; }
  &.bubble-14 { width: 14px; height: 14px; left: 40%; bottom: -60px; animation: cosmicBubbleRise 27s linear infinite 7s, cosmicBubbleSway 17s ease-in-out infinite 7s; }
  &.bubble-15 { width: 16px; height: 16px; left: 50%; bottom: -60px; animation: cosmicBubbleRise 25s linear infinite 8s, cosmicBubbleSway 15s ease-in-out infinite 8s; }
}

// Эффекты ряби
.ripple {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, 
    rgba(0, 229, 255, 0.6) 0%,
    rgba(0, 145, 234, 0.3) 30%,
    transparent 70%);
  transform: scale(0);
  pointer-events: none;
  animation: cosmicRipple 2s linear forwards;
  z-index: 3;
  box-shadow: 0 0 50px rgba(0, 229, 255, 0.8);
}

// Контент по центру
.universe-content {
  position: relative;
  z-index: 20; /* Увеличил z-index для контента */
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-wrapper {
  text-align: center;
  max-width: 900px;
  width: 100%;
}

.department__title {
  font-size: clamp(2.8rem, 6vw, 4.8rem);
  font-weight: 800;
  background: linear-gradient(135deg, 
    #ffffff 0%, 
    #ffffff 30%, 
    #ffffff 70%, 
    #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 30px;
  text-shadow: 
    0 0 30px rgba(0, 229, 255, 0.5),
    0 0 60px rgba(0, 145, 234, 0.3);
  animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: linear-gradient(90deg, #00e5ff, #0091ea, #0066cc);
    border-radius: 2px;
    animation: widthGrow 1.2s ease-out 1s both, colorShift 4s ease-in-out infinite 2s;
    box-shadow: 0 0 20px rgba(0, 229, 255, 0.7);
  }
}

.department__description {
  font-size: 1.4rem;
  line-height: 1.7;
  color: #e0f7fa;
  max-width: 800px;
  margin: 40px auto 40px;
  font-weight: 500;
  text-shadow: 
    0 2px 10px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(0, 229, 255, 0.3);
  animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s both;
  background: rgba(0, 50, 100, 0.4);
  backdrop-filter: blur(15px);
  padding: 30px 50px;
  border-radius: 25px;
  border: 1px solid rgba(0, 229, 255, 0.3);
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 0 40px rgba(0, 229, 255, 0.4);
}

.cta-button {
  background: linear-gradient(135deg, #00e5ff, #0091ea);
  color: white;
  border: none;
  padding: 18px 45px;
  font-size: 1.3rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.7s both;
  box-shadow: 
    0 10px 30px rgba(0, 145, 234, 0.4),
    0 0 40px rgba(0, 229, 255, 0.3);
  position: relative;
  overflow: hidden;
  z-index: 25;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 15px 40px rgba(0, 145, 234, 0.6),
      0 0 60px rgba(0, 229, 255, 0.5);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
}

// Остальные анимации
@keyframes spaceFlow {
  0% { background-position: 0 0; }
  100% { background-position: 400px 400px; }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

@keyframes nebulaFloat {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
  33% { transform: translate(50px, -30px) scale(1.1); opacity: 0.3; }
  66% { transform: translate(-30px, 20px) scale(0.9); opacity: 0.25; }
}

@keyframes crystalGlow {
  0%, 100% { opacity: 0.3; filter: drop-shadow(0 0 15px cyan); }
  50% { opacity: 0.7; filter: drop-shadow(0 0 30px cyan); }
}

@keyframes vortexSpin {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}

@keyframes fishSwim {
  0% {
    transform: translateX(-100px) translateY(0) rotateY(0deg);
  }
  25% {
    transform: translateX(25vw) translateY(-30px) rotateY(0deg);
  }
  50% {
    transform: translateX(50vw) translateY(20px) rotateY(0deg);
  }
  75% {
    transform: translateX(75vw) translateY(-10px) rotateY(0deg);
  }
  100% {
    transform: translateX(100vw) translateY(0) rotateY(0deg);
  }
}

@keyframes fishSwimReverse {
  0% {
    transform: translateX(100vw) translateY(0) scaleX(-1);
  }
  25% {
    transform: translateX(75vw) translateY(-30px) scaleX(-1);
  }
  50% {
    transform: translateX(50vw) translateY(20px) scaleX(-1);
  }
  75% {
    transform: translateX(25vw) translateY(-10px) scaleX(-1);
  }
  100% {
    transform: translateX(-100px) translateY(0) scaleX(-1);
  }
}

@keyframes finFlap {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(15deg); }
}

@keyframes neonPulse {
  0%, 100% { opacity: 0.8; box-shadow: 0 0 10px #00E5FF; }
  50% { opacity: 1; box-shadow: 0 0 20px #00E5FF, 0 0 30px #18FFFF; }
}

@keyframes shoalSwim {
  0% { transform: translateX(-100px); }
  100% { transform: translateX(100vw); }
}

@keyframes fishSwimSmall {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(5px, -3px); }
  50% { transform: translate(10px, 0); }
  75% { transform: translate(5px, 3px); }
}

@keyframes cosmicBubbleRise {
  0% {
    transform: translateY(0) scale(0.8);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-150vh) scale(1.2);
    opacity: 0;
  }
}

@keyframes cosmicBubbleSway {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(40px); }
}

@keyframes bubblePop {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(2); opacity: 0; }
}

@keyframes cosmicRipple {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(5); opacity: 0; }
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes widthGrow {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 120px;
    opacity: 1;
  }
}

@keyframes colorShift {
  0%, 100% { background: linear-gradient(90deg, #00e5ff, #0091ea, #0066cc); }
  33% { background: linear-gradient(90deg, #0091ea, #0066cc, #00e5ff); }
  66% { background: linear-gradient(90deg, #0066cc, #00e5ff, #0091ea); }
}

// АДАПТИВНОСТЬ

@media (max-width: 1200px) {
  .universe-content {
    padding: 0 40px;
  }
  
  .nebula-1 {
    width: 300px;
    height: 300px;
  }
  
  .nebula-2 {
    width: 200px;
    height: 200px;
  }
  
  .planet-container {
    &.planet-1 {
      width: 160px;
      height: 160px;
      top: 10%;
      right: 15%;
    }
    
    &.planet-2 {
      width: 120px;
      height: 120px;
      bottom: 20%;
      left: 10%;
    }
  }
  
  .planet-fish {
    width: 30px !important;
    height: 15px !important;
    
    &.angel-fish-1, &.angel-fish-2 {
      width: 35px !important;
      height: 22px !important;
    }
  }
}

@media (max-width: 968px) {
  .aqua-universe {
    min-height: 90vh;
    padding: 15px;
  }
  
  .angel-fish {
    display: none;
  }
  
  .planet-container {
    &.planet-1 {
      width: 140px;
      height: 140px;
      top: 8%;
      right: 10%;
    }
    
    &.planet-2 {
      width: 100px;
      height: 100px;
      bottom: 15%;
      left: 8%;
    }
  }
  
  .planet-fish {
    width: 25px !important;
    height: 13px !important;
    
    &.angel-fish-1, &.angel-fish-2 {
      width: 30px !important;
      height: 18px !important;
    }
  }
  
  .planet-fish-demo {
    gap: 20px;
    
    .demo-fish {
      width: 40px;
      height: 20px;
    }
  }
  
  .crystal-3 {
    display: none;
  }
  
  .department__title {
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    margin-bottom: 20px;
  }
  
  .department__description {
    font-size: 1.2rem;
    line-height: 1.6;
    padding: 25px 35px;
    margin: 30px auto 30px;
  }
  
  .cta-button {
    padding: 16px 40px;
    font-size: 1.2rem;
  }
  
  .cosmic-bubble:nth-child(n+11) {
    display: none;
  }
}

@media (max-width: 768px) {
  .aqua-universe {
    min-height: 85vh;
    padding: 10px;
  }
  
  .universe-content {
    padding: 0 20px;
  }
  
  .department__title {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    margin-bottom: 15px;
    
    &::after {
      width: 80px;
      bottom: -15px;
    }
  }
  
  .department__description {
    font-size: 1.1rem;
    line-height: 1.5;
    padding: 20px 25px;
    margin: 25px auto 25px;
  }
  
  .gold-fish {
    display: none;
  }
  
  .black-hole-2 {
    display: none;
  }
  
  .fish-shoal.shoal-2 {
    display: none;
  }
  
  .planet-container {
    &.planet-1 {
      width: 120px;
      height: 120px;
      top: 5%;
      right: 8%;
    }
    
    &.planet-2 {
      width: 90px;
      height: 90px;
      bottom: 10%;
      left: 5%;
    }
  }
  
  .planet-fish {
    width: 22px !important;
    height: 11px !important;
    
    &.angel-fish-1, &.angel-fish-2 {
      width: 25px !important;
      height: 16px !important;
    }
  }
  
  .planet-fish-demo {
    gap: 15px;
    margin: 20px auto;
    
    .demo-fish {
      width: 35px;
      height: 18px;
    }
  }
  
  .nebula-1 {
    width: 200px;
    height: 200px;
    top: 5%;
    left: 5%;
  }
  
  .nebula-2 {
    width: 150px;
    height: 150px;
    bottom: 10%;
    right: 5%;
  }
  
  .cta-button {
    padding: 14px 35px;
    font-size: 1.1rem;
  }
  
  .cosmic-bubble:nth-child(n+6) {
    display: none;
  }
}

@media (max-width: 480px) {
  .aqua-universe {
    min-height: 80vh;
  }
  
  .universe-content {
    padding: 0 15px;
  }
  
  .department__title {
    font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  }
  
  .department__description {
    font-size: 1rem;
    line-height: 1.4;
    padding: 18px 20px;
    margin: 20px auto 20px;
  }
  
  .neon-fish {
    display: none;
  }
  
  .planet-container {
    &.planet-1,
    &.planet-2 {
      display: none; /* На маленьких экранах скрываем планеты */
    }
  }
  
  .planet-fish-demo {
    gap: 10px;
    margin: 15px auto;
    
    .demo-fish {
      width: 30px;
      height: 15px;
    }
  }
  
  .crystal-1, .crystal-2 {
    width: 40px;
    height: 40px;
  }
  
  .clown-fish .fish-body {
    width: 80px;
    height: 35px;
  }
  
  .cta-button {
    padding: 12px 30px;
    font-size: 1rem;
  }
  
  .cosmic-bubble:nth-child(n+4) {
    display: none;
  }
}

@media (max-width: 360px) {
  .department__title {
    font-size: clamp(1.4rem, 3vw, 1.8rem);
  }
  
  .department__description {
    font-size: 0.95rem;
    padding: 15px;
  }
  
  .fish-shoal.shoal-1 {
    display: none;
  }
  
  .planet-fish-demo {
    display: none;
  }
  
  .cta-button {
    padding: 10px 25px;
    font-size: 0.95rem;
  }
}
</style>