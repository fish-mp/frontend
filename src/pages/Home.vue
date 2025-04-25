<template>
  <section class="hero">
    <h1>Аквариумистика — красиво, живо, увлекательно</h1>
    <p>Обучающие онлайн-курсы по созданию и уходу за аквариумом.</p>
    <router-link to="/courses">
      <button>Смотреть курсы</button>
    </router-link>
  </section>

  <section class="map-section">
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
  text-align: center;
  padding: 3rem 1rem;
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

.yandex-map>ymaps>div {
  filter: grayscale(100%);
}
</style>
