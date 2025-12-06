<template>
  <section class="department">
    <div class="department__wrapper">
      <span id="bg-circle-1"></span>
      <span id="bg-circle-2"></span>
      <h1 class="department__title">Магазин</h1>
      <p class="department__description">
        В разработке
      </p>
    </div>
  </section>

  <section class="shop-section">
    <span id="bg-circle-5"></span>
    <div class="shop-section__wrapper">
      <div class="shop-coming-soon">
        <div class="shop-coming-soon__icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#173DED" stroke-width="1.5">
            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C16.4696 17 15.9609 17.2107 15.5858 17.5858C15.2107 17.9609 15 18.4696 15 19C15 19.5304 15.2107 20.0391 15.5858 20.4142C15.9609 20.7893 16.4696 21 17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 18.0391 18.4142 17.5858C17.9609 17.2107 17.5304 17 17 17ZM9 19C9 19.5304 8.78929 20.0391 8.41421 20.4142C8.03914 20.7893 7.53043 21 7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19C5 18.4696 5.21071 17.9609 5.58579 17.5858C5.96086 17.2107 6.46957 17 7 17C7.53043 17 8.03914 17.2107 8.41421 17.5858C8.78929 17.9609 9 18.4696 9 19Z"/>
          </svg>
          <div class="shop-coming-soon__icon-glow"></div>
        </div>
        
        <h2 class="shop-coming-soon__title">Скоро открытие!</h2>
        <p class="shop-coming-soon__description">
          Магазин в разработке. Следите за обновлениями!
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Страница магазина
</script>

<style lang="scss" scoped>
// Переменные (совместимые с хедером)
$pure-white: #ffffff;
$soft-white: #fafbfc;
$light-grey: #f0f4f8;
$primary-blue: #173DED;
$blue-gradient: linear-gradient(135deg, #173DED 0%, #4d7cfe 50%, #8ba9ff 100%);
$text-dark: #1a1a1a;
$text-medium: #5d6d87;
$text-light: #8a9bb8;
$accent-glow: rgba(23, 61, 237, 0.15);

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

// Секция department (герой)
.department {
  position: relative;
  padding: 120px 2rem 80px;
  background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
  overflow: hidden;
  
  &__wrapper {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    text-align: center;
  }
  
  &__title {
    font-size: calc(3.5rem + 1.5vw);
    font-weight: 700;
    background: $blue-gradient;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1.5rem;
    line-height: 1.1;
    font-family: 'Inter', 'SF Pro Display', system-ui, sans-serif;
    animation: titleSlideUp 0.8s ease-out;
  }
  
  &__description {
    font-size: 1.25rem;
    color: $text-medium;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
    font-weight: 400;
    animation: fadeInUp 0.8s ease-out 0.2s both;
  }
}

// Анимации
@keyframes titleSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.05);
  }
}

// Фоновые круги
#bg-circle-1,
#bg-circle-2,
#bg-circle-5 {
  position: absolute;
  border-radius: 50%;
  background: $blue-gradient;
  opacity: 0.1;
  filter: blur(40px);
  animation: float 6s ease-in-out infinite;
}

#bg-circle-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
  animation-delay: 0s;
}

#bg-circle-2 {
  width: 200px;
  height: 200px;
  bottom: -100px;
  right: 10%;
  animation-delay: 2s;
}

#bg-circle-5 {
  width: 250px;
  height: 250px;
  top: 50%;
  left: -125px;
  animation-delay: 1s;
}

// Основная секция магазина
.shop-section {
  position: relative;
  padding: 80px 2rem;
  background: $soft-white;
  min-height: 60vh;
  
  &__wrapper {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }
}

// Блок "Скоро открытие"
.shop-coming-soon {
  @include glass-effect;
  border-radius: 24px;
  padding: 3rem;
  text-align: center;
  animation: fadeInUp 0.8s ease-out;
  
  &__icon {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(23, 61, 237, 0.08);
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
    
    svg {
      position: relative;
      z-index: 2;
    }
  }
  
  &__icon-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $blue-gradient;
    border-radius: 50%;
    filter: blur(15px);
    opacity: 0.4;
    z-index: 1;
  }
  
  &__title {
    font-size: 2rem;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 1rem;
    font-family: 'Inter', sans-serif;
  }
  
  &__description {
    font-size: 1.1rem;
    color: $text-medium;
    line-height: 1.6;
  }
}

// Адаптивность
@media (max-width: 1024px) {
  .department {
    padding: 100px 1.5rem 60px;
    
    &__title {
      font-size: calc(2.5rem + 1.5vw);
    }
  }
  
  .shop-section {
    padding: 60px 1.5rem;
  }
  
  .shop-coming-soon {
    padding: 2.5rem;
  }
}

@media (max-width: 768px) {
  .department {
    padding: 80px 1rem 40px;
    
    &__title {
      font-size: calc(2rem + 1.5vw);
    }
    
    &__description {
      font-size: 1.1rem;
    }
  }
  
  .shop-section {
    padding: 40px 1rem;
  }
  
  .shop-coming-soon {
    padding: 2rem;
    
    &__title {
      font-size: 1.75rem;
    }
    
    &__description {
      font-size: 1rem;
    }
  }
}

@media (max-width: 480px) {
  .department {
    padding: 60px 0.75rem 30px;
    
    &__title {
      font-size: calc(1.5rem + 1.5vw);
    }
  }
  
  .shop-section {
    padding: 30px 0.75rem;
  }
  
  .shop-coming-soon {
    padding: 1.5rem;
    
    &__icon {
      width: 100px;
      height: 100px;
      margin-bottom: 1.5rem;
      
      svg {
        width: 60px;
        height: 60px;
      }
    }
    
    &__title {
      font-size: 1.5rem;
    }
  }
  
  #bg-circle-1,
  #bg-circle-2,
  #bg-circle-5 {
    display: none;
  }
}

// Дополнительные декоративные элементы
.department::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(23, 61, 237, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(77, 124, 254, 0.05) 0%, transparent 50%);
  pointer-events: none;
}
</style>