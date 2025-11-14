<template>
  <section class="staff">
    <span id="bg-circle-4"></span>
    <div class="staff__wrapper">
      <div class="staff__header">
        <h2 class="staff__title">Где живут наши герои</h2>
      </div>
      <section class="map-section">
        <div v-if="!mapError" ref="mapContainer" class="map"></div>
        <div v-else class="map-error">Ошибка загрузки карты</div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { fishData } from '../data/fishData'

const mapContainer = ref<HTMLDivElement | null>(null)
const router = useRouter()
const mapError = ref(false)
let map: any = null

// Функция для ожидания загрузки Яндекс Карт
const waitForYmaps = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if ((window as any).ymaps) {
      resolve((window as any).ymaps)
      return
    }

    let attempts = 0
    const maxAttempts = 50 // 5 секунд максимум

    const checkYmaps = setInterval(() => {
      attempts++
      if ((window as any).ymaps) {
        clearInterval(checkYmaps)
        resolve((window as any).ymaps)
      } else if (attempts >= maxAttempts) {
        clearInterval(checkYmaps)
        reject(new Error('Yandex Maps failed to load'))
      }
    }, 100)
  })
}

onMounted(async () => {
  if (!mapContainer.value) return

  try {
    // Ждем загрузки Яндекс Карт
    const ymaps = await waitForYmaps()

    ymaps.ready(() => {
      map = new ymaps.Map(mapContainer.value!, {
        center: [55.751244, 37.618423],
        zoom: 5,
        controls: [],
      }, {
        suppressMapOpenBlock: true,
      })

      const HintLayout = ymaps.templateLayoutFactory.createClass(
        `<div class="custom-hint">
                    $[properties.hintContent]
                </div>`
      )

      mapContainer.value!.classList.add('yandex-map')

      fishData.forEach(fish => {
        const placemark = new ymaps.Placemark(
          [fish.lat, fish.lng],
          {
            hintContent: fish.name,
            balloonContent: `
                            <div class="balloon-content">
                                <h3>${fish.name}</h3>
                                <p>${fish.description}</p>
                                <button id="btn-${fish.id}" class="balloon-button">Подробнее</button>
                            </div>
                        `,
          },
          {
            hintLayout: HintLayout,
            preset: 'islands#icon',
            iconColor: '#0077aa',
          }
        )
        map.geoObjects.add(placemark)
      })

      // Обработчик кликов по кнопкам в балунах
      map.events.add('balloonopen', (e: any) => {
        const balloon = e.get('balloon')
        const balloonElement = balloon.getElement()

        balloonElement.addEventListener('click', (event: MouseEvent) => {
          const target = event.target as HTMLElement
          if (target.tagName === 'BUTTON' && target.id.startsWith('btn-')) {
            const fishId = target.id.replace('btn-', '')
            router.push({ name: 'FishDetail', params: { id: fishId } })
          }
        })
      })
    })
  } catch (error) {
    console.error('Failed to load Yandex Maps:', error)
    mapError.value = true
  }
})

onUnmounted(() => {
  if (map) {
    map.destroy()
  }
})
</script>

<style lang="scss" scoped>
@use '../assets/scss/map.scss';

.map-error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  background: #f5f5f5;
  color: #666;
  border-radius: 8px;
}
</style>
