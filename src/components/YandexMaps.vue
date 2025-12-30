<template>
  <section class="staff">
    <span id="bg-circle-4"></span>
    <div class="staff__wrapper">
      <div class="staff__header">
        <h2 class="staff__title">Где живут наши герои</h2>
      </div>
      <section class="map-section">
        <!-- Плейсхолдер пока карта не загружена -->
        <div v-if="!isMapLoaded && !mapError" class="map-placeholder">
          <div class="map-placeholder__content">
            <div class="map-placeholder__spinner"></div>
            <p class="map-placeholder__text">Загружаем карту...</p>
            <button 
              v-if="!isIntersecting && !loadingTriggered"
              class="map-placeholder__button"
              @click="loadMapManually"
            >
              Показать карту
            </button>
          </div>
        </div>
        
        <!-- Контейнер для карты -->
        <div 
          v-if="!mapError" 
          ref="mapContainer" 
          class="map" 
          :class="{ 'map--loaded': isMapLoaded }"
        ></div>
        
        <!-- Сообщение об ошибке -->
        <div v-else class="map-error">
          <p>Не удалось загрузить карту</p>
          <button class="map-error__retry" @click="retryLoadMap">
            Попробовать снова
          </button>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { fishData } from '../data/fishData'

const mapContainer = ref<HTMLDivElement | null>(null)
const router = useRouter()
const mapError = ref(false)
const isMapLoaded = ref(false)
const isIntersecting = ref(false)
const loadingTriggered = ref(false)
let map: any = null
let observer: IntersectionObserver | null = null
let ymapsScript: HTMLScriptElement | null = null

// API ключ из переменных окружения
const YMAPS_API_KEY = import.meta.env.VITE_YMAPS_API_KEY

// Функция для динамической загрузки скрипта Яндекс Карт
const loadYmapsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Если скрипт уже загружается или загружен
    if (document.querySelector('script[src*="api-maps.yandex.ru"]')) {
      // Ждем когда ymaps станет доступен
      const checkYmaps = setInterval(() => {
        if ((window as any).ymaps) {
          clearInterval(checkYmaps)
          resolve()
        }
      }, 100)
      return
    }

    // Создаем и добавляем скрипт
    ymapsScript = document.createElement('script')
    ymapsScript.src = `https://api-maps.yandex.ru/2.1/?apikey=${YMAPS_API_KEY}&lang=ru_RU`
    ymapsScript.async = true
    ymapsScript.defer = true
    
    ymapsScript.onload = () => {
      setTimeout(() => resolve(), 100) // Даем время на инициализацию
    }
    
    ymapsScript.onerror = () => {
      reject(new Error('Не удалось загрузить Яндекс Карты'))
    }
    
    document.head.appendChild(ymapsScript)
  })
}

// Функция для ручной загрузки карты
const loadMapManually = () => {
  loadingTriggered.value = true
  initializeMap()
}

// Функция для повторной попытки загрузки
const retryLoadMap = () => {
  mapError.value = false
  isMapLoaded.value = false
  initializeMap()
}

// Функция инициализации карты
const initializeMap = async () => {
  if (!mapContainer.value || isMapLoaded.value) return

  try {
    // Загружаем скрипт Яндекс Карт
    await loadYmapsScript()
    
    // Ждем когда API будет готово
    await new Promise((resolve, reject) => {
      const checkYmaps = () => {
        if ((window as any).ymaps) {
          (window as any).ymaps.ready(() => {
            resolve(true)
          })
        } else {
          setTimeout(checkYmaps, 50)
        }
      }
      checkYmaps()
      
      // Таймаут на загрузку
      setTimeout(() => reject(new Error('Таймаут загрузки Яндекс Карт')), 10000)
    })

    // Инициализируем карту
    const ymaps = (window as any).ymaps
    
    map = new ymaps.Map(mapContainer.value, {
      center: [55.751244, 37.618423],
      zoom: 5,
      controls: ['zoomControl', 'typeSelector', 'fullscreenControl'],
    }, {
      suppressMapOpenBlock: true,
      yandexMapDisablePoiInteractivity: true,
    })

    // Оптимизация: уменьшаем детализацию для мобильных устройств
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      map.behaviors.disable('scrollZoom')
      map.setZoom(4)
    }

    // Создаем кастомный layout для хинтов
    const HintLayout = ymaps.templateLayoutFactory.createClass(
      `<div class="custom-hint">$[properties.hintContent]</div>`
    )

    // Добавляем метки для каждой рыбки
    fishData.forEach(fish => {
      const placemark = new ymaps.Placemark(
        [fish.lat, fish.lng],
        {
          hintContent: fish.name,
          balloonContent: `
            <div class="balloon-content">
              <h3>${fish.name}</h3>
              <p>${fish.description.substring(0, 100)}...</p>
              <button id="btn-${fish.id}" class="balloon-button">Подробнее</button>
            </div>
          `,
        },
        {
          hintLayout: HintLayout,
          preset: 'islands#blueFishIcon', // Используем иконку рыбы
          iconColor: '#0077aa',
          hasBalloon: true,
          openBalloonOnClick: true,
        }
      )
      map.geoObjects.add(placemark)
    })

    // Обработчик кликов по кнопкам в балунах
    map.events.add('balloonopen', (e: any) => {
      const balloon = e.get('balloon')
      const balloonElement = balloon.getElement()

      const clickHandler = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (target.tagName === 'BUTTON' && target.id.startsWith('btn-')) {
          const fishId = target.id.replace('btn-', '')
          router.push({ name: 'FishDetail', params: { id: fishId } })
        }
      }

      // Удаляем старый обработчик и добавляем новый
      balloonElement.removeEventListener('click', clickHandler)
      balloonElement.addEventListener('click', clickHandler)
    })

    // Устанавливаем флаг загрузки
    isMapLoaded.value = true
    mapContainer.value.classList.add('yandex-map')

    // Оптимизация: загружаем тайлы только когда карта в области видимости
    map.events.add('idle', () => {
      if (isIntersecting.value) {
        map.container.enterFullscreen()
      }
    })

  } catch (error) {
    console.error('Failed to load Yandex Maps:', error)
    mapError.value = true
    isMapLoaded.value = false
  }
}

// Создаем Intersection Observer для ленивой загрузки
const setupIntersectionObserver = () => {
  if (!mapContainer.value || !('IntersectionObserver' in window)) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isIntersecting.value = entry.isIntersecting
        
        if (entry.isIntersecting && !isMapLoaded.value && !loadingTriggered.value) {
          // Загружаем карту когда она появляется в viewport
          initializeMap()
          if (observer) {
            observer.disconnect()
          }
        }
      })
    },
    {
      root: null,
      rootMargin: '200px', // Начинаем загрузку за 200px до появления в viewport
      threshold: 0.1, // 10% видимости
    }
  )

  observer.observe(mapContainer.value!)
}

onMounted(() => {
  setupIntersectionObserver()
  
  // Загрузка по таймеру на случай если IntersectionObserver не сработал
  const timeoutId = setTimeout(() => {
    if (!isMapLoaded.value && !loadingTriggered.value && !mapError.value) {
      initializeMap()
    }
  }, 3000)

  // Очистка таймера при размонтировании
  onBeforeUnmount(() => {
    clearTimeout(timeoutId)
  })
})

onUnmounted(() => {
  // Отключаем observer
  if (observer) {
    observer.disconnect()
  }
  
  // Уничтожаем карту
  if (map) {
    map.destroy()
  }
  
  // Удаляем скрипт если больше нет карт на странице
  const mapScripts = document.querySelectorAll('script[src*="api-maps.yandex.ru"]')
  if (mapScripts.length <= 1 && ymapsScript) {
    ymapsScript.remove()
  }
})
</script>

<style lang="scss" scoped>
@use '../assets/scss/map.scss';



</style>