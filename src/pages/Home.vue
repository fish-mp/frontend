<template>
  <section class="aqua-universe" @click="createRipple" ref="aquaSection">
    <!-- Космический фон -->
    <div class="cosmic-background"></div>
    
    <!-- Звезды -->
    <div class="stars"></div>
    
    <!-- Туманности -->
    <div class="nebula nebula-1"></div>
    <div class="nebula nebula-2"></div>
    
    <!-- Планеты -->
    <div class="planet planet-1"></div>
    <div class="planet planet-2"></div>
    
    <!-- Космические рыбы -->
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
      v-for="i in 20" 
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
  background: 
    radial-gradient(ellipse at 50% 30%, 
      #000428 0%,
      #001233 30%,
      #002855 60%,
      #000428 100%),
    radial-gradient(circle at 20% 20%, 
      rgba(0, 100, 200, 0.2) 0%,
      transparent 60%),
    radial-gradient(circle at 80% 60%, 
      rgba(100, 0, 200, 0.15) 0%,
      transparent 60%),
    radial-gradient(circle at 40% 70%, 
      rgba(255, 255, 255, 0.1) 0%,
      transparent 40%);
  
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

  // Убрал фиксированную высоту, теперь контент по центру
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
  filter: blur(50px);
  opacity: 0.3;
  
  &.nebula-1 {
    width: 400px;
    height: 400px;
    top: 10%;
    left: 10%;
    background: radial-gradient(circle, #0099ff, #0066cc, transparent 70%);
    animation: nebulaFloat 60s ease-in-out infinite;
  }
  
  &.nebula-2 {
    width: 300px;
    height: 300px;
    bottom: 20%;
    right: 15%;
    background: radial-gradient(circle, #9900ff, #6600cc, transparent 70%);
    animation: nebulaFloat 80s ease-in-out infinite reverse;
  }
}

.planet {
  position: absolute;
  border-radius: 50%;
  z-index: 1;
  pointer-events: none;
  box-shadow: 
    inset 0 0 30px rgba(255, 255, 255, 0.3),
    0 0 50px currentColor;
  
  &.planet-1 {
    width: 120px;
    height: 120px;
    top: 15%;
    right: 20%;
    background: radial-gradient(circle at 40% 40%, #ff9900, #ff6600, #cc3300);
    animation: planetRotate 40s linear infinite;
  }
  
  &.planet-2 {
    width: 80px;
    height: 80px;
    bottom: 30%;
    left: 15%;
    background: radial-gradient(circle at 60% 30%, #00ccff, #0099cc, #006699);
    animation: planetRotate 60s linear infinite reverse;
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
    rgba(0, 0, 0, 0.8) 50%,
    black 100%);
  box-shadow: 
    0 0 80px rgba(0, 0, 0, 0.9),
    inset 0 0 40px rgba(0, 0, 0, 0.95);
  animation: vortexSpin 30s linear infinite;
  
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

// РЫБЫ
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

// Косяки маленьких рыб (уменьшил количество для мобилок)
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

// Космические пузыри (уменьшил количество)
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
  
  // 20 космических пузырей (вместо 30)
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
  z-index: 10;
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
  margin: 60px auto 40px;
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
  z-index: 5;
  
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

// Анимации
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

@keyframes planetRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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

// АДАПТИВНОСТЬ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ

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
}

@media (max-width: 968px) {
  .aqua-universe {
    min-height: 90vh;
    padding: 15px;
  }
  
  .angel-fish {
    display: none;
  }
  
  .planet-2 {
    display: none;
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
    margin: 40px auto 30px;
  }
  
  .cta-button {
    padding: 16px 40px;
    font-size: 1.2rem;
  }
  
  // Уменьшаем количество пузырей на планшетах
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
    margin: 30px auto 25px;
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
  
  .planet-1 {
    width: 80px;
    height: 80px;
    top: 5%;
    right: 10%;
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
  
  // Еще меньше пузырей на мобилках
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
    margin: 25px auto 20px;
  }
  
  .neon-fish {
    display: none;
  }
  
  .planet-1 {
    width: 60px;
    height: 60px;
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
  
  // Минимум пузырей на маленьких экранах
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
  
  .cta-button {
    padding: 10px 25px;
    font-size: 0.95rem;
  }
}
</style>