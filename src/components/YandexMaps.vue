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
            `<div class="custom-hint">
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

<style lang="scss" scoped>
@import '../assets/scss/map.scss';
</style>