<template>
  <section class="beginner-guide">
    <div class="guide-bg"></div>
    <div class="guide__wrapper">
      <h1 class="guide__title">Руководство для начинающих</h1>
      <p class="guide__subtitle">Всё, что нужно знать, чтобы создать идеальный подводный мир</p>

      <div class="guide__grid">
        <div v-for="article in articles" :key="article.id" class="guide-card">
          <div class="guide-card__icon" :style="{ backgroundColor: article.bgColor }">
            <span class="guide-card__emoji">{{ article.emoji }}</span>
          </div>
          <div class="guide-card__content">
            <h3 class="guide-card__title">{{ article.title }}</h3>
            <p class="guide-card__description">{{ article.description }}</p>
            <button class="guide-card__btn" @click="openModal(article)">Подробнее</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно -->
    <div v-if="modalOpen" class="modal" @click.self="closeModal">
      <div class="modal__content">
        <button class="modal__close" @click="closeModal">×</button>
        <div class="modal__icon" :style="{ backgroundColor: selectedArticle?.bgColor }">
          <span>{{ selectedArticle?.emoji }}</span>
        </div>
        <h2>{{ selectedArticle?.title }}</h2>
        <div class="modal__body" v-html="selectedArticle?.fullText"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Article {
  id: number
  title: string
  description: string
  fullText: string
  emoji: string
  bgColor: string
}

const articles: Article[] = [
  {
    id: 1,
    title: 'Как выбрать аквариум',
    description: 'Размер, форма, материал – на что обратить внимание при выборе первого аквариума.',
    emoji: '🐟',
    bgColor: '#173DED',
    fullText: `
      <p><strong>Выбор аквариума – первый и самый важный шаг.</strong></p>
      <h3>Размер</h3>
      <p>Для начинающих лучше всего подойдёт аквариум от <strong>50 до 100 литров</strong>. В маленьких ёмкостях сложнее поддерживать стабильный биобаланс.</p>
      <h3>Форма и материал</h3>
      <ul>
        <li><strong>Прямоугольные</strong> – самые практичные.</li>
        <li><strong>Панорамные</strong> – красиво, но дороже.</li>
        <li><strong>Стекло</strong> – не царапается, оргстекло – легче, но царапается.</li>
      </ul>
      <h3>Оснащение</h3>
      <p>Желательно наличие крышки, светодиодной подсветки и технологических отверстий.</p>
    `,
  },
  {
    id: 2,
    title: 'Какие рыбки подходят для маленьких аквариумов (до 50 л)',
    description: 'Неоны, гуппи, данио – кого поселить в компактный аквариум.',
    emoji: '🐠',
    bgColor: '#FF8C00',
    fullText: `
      <ul>
        <li><strong>Гуппи</strong> – яркие, активные, живородящие.</li>
        <li><strong>Неоны</strong> – стайные, мирные, красиво смотрятся.</li>
        <li><strong>Данио-рерио</strong> – выносливые, плавают в верхних слоях.</li>
        <li><strong>Коридорасы</strong> – донные сомики, очищают грунт.</li>
      </ul>
      <p>Формула: 1 литр воды на 1 см длины рыбы (с учётом взрослых размеров).</p>
    `,
  },
  {
    id: 3,
    title: 'Совместимость рыб: кто с кем уживается',
    description: 'Хищники и мирные рыбы, территориальные виды – как избежать конфликтов.',
    emoji: '🐡',
    bgColor: '#00BFA6',
    fullText: `
      <ul>
        <li>Нельзя селить вместе крупных хищников и мелких рыбок.</li>
        <li>Территориальные рыбы (цихлиды, петушки) требуют много пространства.</li>
        <li>Мирные стайные рыбы отлично уживаются с донными сомами.</li>
        <li>Петухов-самцов вместе держать нельзя.</li>
      </ul>
    `,
  },
  {
    id: 4,
    title: 'Оборудование для аквариума: что обязательно',
    description: 'Фильтр, обогреватель, освещение – минимальный набор.',
    emoji: '🔧',
    bgColor: '#607D8B',
    fullText: `
      <ul>
        <li><strong>Фильтр</strong> – внутренний или внешний.</li>
        <li><strong>Обогреватель</strong> – 1 Вт на 1 литр воды.</li>
        <li><strong>Термометр</strong> – спиртовой или цифровой.</li>
        <li><strong>Освещение</strong> – светодиодные лампы, 8–10 часов в день.</li>
        <li><strong>Грунт и декор</strong> – предварительно прокипятить.</li>
      </ul>
    `,
  },
  {
    id: 5,
    title: 'Запуск аквариума: пошаговая инструкция',
    description: 'От мытья грунта до запуска рыб – как избежать "новоаквариумного синдрома".',
    emoji: '🚀',
    bgColor: '#4CAF50',
    fullText: `
      <ol>
        <li>Промыть грунт, установить декор и оборудование.</li>
        <li>Залить отстоянную воду (2–3 дня) или с кондиционером.</li>
        <li>Запустить фильтр, обогреватель, компрессор.</li>
        <li>Высадить растения.</li>
        <li>Внести бактериальный стартер (по желанию).</li>
        <li>Выждать 2–3 недели без рыб.</li>
        <li>Подсаживать рыб постепенно.</li>
      </ol>
    `,
  },
  {
    id: 6,
    title: 'Уход за растениями: стрижка, удобрения, освещение',
    description: 'Как содержать живые растения, чтобы они росли красиво и не зарастали.',
    emoji: '🌿',
    bgColor: '#8BC34A',
    fullText: `
      <ul>
        <li><strong>Освещение:</strong> 8–10 часов в день.</li>
        <li><strong>Стрижка:</strong> быстрорастущие растения – раз в 2 недели.</li>
        <li><strong>Удобрения:</strong> жидкие – для листьев, таблетки под корни.</li>
        <li><strong>CO2:</strong> помогает при плохом росте.</li>
      </ul>
    `,
  },
]

const modalOpen = ref(false)
const selectedArticle = ref<Article | null>(null)

const openModal = (article: Article) => {
  selectedArticle.value = article
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  selectedArticle.value = null
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

@mixin glass-effect {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.05);
}
.guide__grid {
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

@mixin smooth-transition {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.beginner-guide {
  background: $soft-white;
  padding: 100px 2rem 80px;
  min-height: 100vh;
  position: relative;

  .guide-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(23, 61, 237, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(23, 61, 237, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }

  &__wrapper {
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  &__title {
    font-size: 3rem;
    font-weight: 800;
    background: $blue-gradient;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    margin-bottom: 1rem;
  }

  &__subtitle {
    font-size: 1.3rem;
    color: $text-medium;
    text-align: center;
    margin-bottom: 3rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 2rem;
  }
}

.guide-card {
  @include glass-effect;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.9);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }

  &__icon {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 24px auto 0 auto;
    background: $primary-blue;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  &__emoji {
    font-size: 2.4rem;
    line-height: 1;
  }

  &__content {
    padding: 1.5rem 1.8rem 2rem;
    text-align: center;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 0.75rem;
  }

  &__description {
    font-size: 1rem;
    line-height: 1.5;
    color: $text-medium;
    margin-bottom: 1.5rem;
  }

  &__btn {
    background: $blue-gradient;
    border: none;
    color: white;
    padding: 0.7rem 1.8rem;
    border-radius: 40px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 12px rgba(23, 61, 237, 0.4);
    }
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;

  &__content {
    @include glass-effect;
    background: white;
    border-radius: 32px;
    max-width: 700px;
    width: 100%;
    max-height: 85vh;
    overflow-y: auto;
    padding: 2rem;
    position: relative;
    text-align: center;
  }

  &__icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: -2rem auto 1rem auto;
    font-size: 2.8rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  &__close {
    position: absolute;
    top: 1rem;
    right: 1.2rem;
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    color: $text-light;
    transition: color 0.2s;

    &:hover {
      color: $primary-blue;
    }
  }

  &__body {
    margin-top: 1.5rem;
    color: $text-medium;
    line-height: 1.5;
    text-align: left;

    h3 {
      margin: 1rem 0 0.5rem;
      color: $text-dark;
    }

    ul, ol {
      padding-left: 1.2rem;
      margin: 0.75rem 0;
    }
  }
}

@media (max-width: 768px) {
  .beginner-guide {
    padding: 80px 1rem 60px;

    &__title {
      font-size: 2rem;
    }
    &__subtitle {
      font-size: 1rem;
    }
    &__grid {
      gap: 1.5rem;
    }
  }

  .guide-card__icon {
    width: 60px;
    height: 60px;
    margin-top: 20px;
  }
  .guide-card__emoji {
    font-size: 2rem;
  }
  .guide-card__title {
    font-size: 1.3rem;
  }
}
</style>