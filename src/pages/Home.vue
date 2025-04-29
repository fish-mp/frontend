<template>
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-content">
      <h1>Аквариумистика — красиво, живо, увлекательно</h1>
      <p>Обучающие онлайн-курсы по созданию и уходу за аквариумом.</p>
      <router-link to="/courses">
        <button class="btn btn--primary">Смотреть курсы</button>
      </router-link>
    </div>
  </section>

  <section class="features">
    <div class="feature-card">
      <img src="https://img.icons8.com/ios-filled/100/00aaff/fish.png" />
      <h3>Практические уроки</h3>
      <p>Реальные кейсы по запуску аквариума шаг за шагом.</p>
    </div>
    <div class="feature-card">
      <img src="https://img.icons8.com/ios-filled/100/00aaff/coral.png" />
      <h3>Мастерство акваскейпинга</h3>
      <p>Уроки от профи по дизайну подводного ландшафта.</p>
    </div>
    <div class="feature-card">
      <img src="https://img.icons8.com/ios-filled/100/00aaff/coral.png" />
      <h3>Забота о кораллах</h3>
      <p>Все о солевых аквариумах и жизни рифов.</p>
    </div>
    <div class="feature-card">
      <img src="https://img.icons8.com/ios-filled/100/00aaff/bacteria.png" />
      <h3>Химия воды</h3>
      <p>Контроль параметров pH, GH, KH и дозировка удобрений.</p>
    </div>
  </section>

  <section class="map-section">
    <h2 class="map-title">Где живут наши герои</h2>
    <div ref="mapContainer" class="map"></div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fishData } from '../data/fishData'

const mapContainer = ref<HTMLDivElement | null>(null)
const router = useRouter()

onMounted(() => {
  if (!mapContainer.value) return

  const ymaps = (window as any).ymaps
  ymaps.ready(() => {
    const map = new ymaps.Map(mapContainer.value, {
      center: [55.751244, 37.618423],
      zoom: 5,
      controls: [],
    }, {
      suppressMapOpenBlock: true,
    })

    mapContainer.value.classList.add('yandex-map')

    fishData.forEach(fish => {
      const placemark = new ymaps.Placemark(
        [fish.lat, fish.lng],
        {
          hintContent: fish.name,
          balloonContent: `
            <div style="max-width:200px">
              <h3>${fish.name}</h3>
              <button id="btn-${fish.id}" style="
                margin-top:8px;
                padding:6px 12px;
                background:#0077aa;
                color:#fff;
                border:none;
                border-radius:4px;
                cursor:pointer;
              ">Подробнее</button>
            </div>
          `,
        },
        {
          preset: 'islands#icon',
          iconColor: '#0077aa',
        }
      )
      map.geoObjects.add(placemark)
    });

    mapContainer.value.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON' && target.id.startsWith('btn-')) {
        const fishId = target.id.replace('btn-', '')
        router.push({ name: 'FishDetail', params: { id: fishId } })
      }
    })
  })
})
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  color: #fff;
  text-align: center;
  padding: 4rem;
  margin-bottom: 1rem;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://www.petshop.ru/upload/medialibrary/83d/83d4980402475fe776e5063f56b47514.jpg');
  background-size: cover;
  background-repeat: repeat-x;
  background-position: 0 50%;
  background-color: #001f3f;
  filter: brightness(0.6) blur(1px);
  z-index: 0;
  animation: wave 10s linear infinite;
}

@keyframes wave {
  from {
    background-position-x: 0;
  }

  to {
    background-position-x: -200px;
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin: 0 auto;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 1rem;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.feature-card {
  background: #f5faff;
  border-radius: 12px;
  padding: 2rem 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card img {
  width: 60px;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin-bottom: 0.5rem;
  color: #0077aa;
}


h1 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}

button {
  background-color: #0077aa;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background-color: #005577;
}

.map-section {
  padding: 2rem 1rem;
}

.map {
  width: 100%;
  height: 500px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.map-title {
  text-align: center;
  margin-bottom: 1rem;
}

.yandex-map>ymaps>div {
  filter: grayscale(100%);
}
</style>
