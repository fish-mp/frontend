<template>
    <section class="staff">
        <span id="bg-circle-4"></span>
        <div class="staff__wrapper">
            <div class="staff__header">
                <h2 class="staff__title">Где живут наши герои</h2>
            </div>
            <section class="map-section">
                <div ref="mapContainer" class="map"></div>
            </section>
        </div>
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
        const map = new ymaps.Map(mapContainer.value!, {
            center: [55.751244, 37.618423],
            zoom: 5,
            controls: [],
        }, {
            suppressMapOpenBlock: true,
        })

        const HintLayout = ymaps.templateLayoutFactory.createClass(
            `<div style="color: #e60000; font-size: 16px; font-weight: bold;">
                $[properties.hintContent]
            </div>`
        );

        mapContainer.value!.classList.add('yandex-map')

        fishData.forEach(fish => {
            const placemark = new ymaps.Placemark(
                [fish.lat, fish.lng],
                {
                    hintContent: fish.name,
                    balloonContent: `
            <div style="max-width:200px; color: black;">
              <h3 style="color: black; font-size: 16px;">${fish.name}</h3>
              <p style="margin: 12px 0; font-size:14px; color: black;">${fish.description}</p>
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
                    hintLayout: HintLayout,
                    preset: 'islands#icon',
                    iconColor: '#0077aa',
                }
            )
            map.geoObjects.add(placemark)
        })

        mapContainer.value!.addEventListener('click', (e: MouseEvent) => {
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
.map-section {
    padding: 2rem 1rem;
}

.map-title {
    text-align: center;
    margin-bottom: 1rem;
}

.map {
    width: 100%;
    height: 500px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.yandex-map,
.yandex-map>ymaps>div {
    filter: grayscale(60%);
}

.yandex-map [class*="hint__content"] {
    color: #e60000 !important;
}
</style>
