<template>
  <section class="aquarium" aria-label="Аквариум с рыбками из корзины">
    <div class="aquarium__announcements" role="status" aria-live="polite" aria-atomic="true">
      <div v-if="riskyFish.length" class="aquarium__warning">
        <svg class="aquarium__warning-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M10.3 4.4 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
          <path d="M12 9v5m0 3v.1" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <div>
          <strong>Проверьте совместимость рыб</strong>
          <p>В корзине есть хищные или агрессивные рыбы: {{ riskyFish.map(fish => fish.name).join(', ') }}.
            Они могут навредить другим обитателям аквариума. Перед совместным заселением уточните совместимость у специалиста.</p>
        </div>
      </div>
    </div>
    <div ref="viewport" class="aquarium__viewport">
      <canvas ref="canvas" role="img" :aria-label="description"></canvas>
    </div>

    <footer class="aquarium__footer">
      <div class="aquarium__population" aria-live="polite" aria-atomic="true">
        <strong>{{ total }}</strong><span>{{ fishWord(total) }}<small>в вашем аквариуме</small></span>
      </div>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { CartItemResponse } from '../../stores/cart'
import { createAquariumScene } from './scene'
import { buildAquariumGroups, getCompatibilityRisk, identifyFish, type AquariumProductDetails } from './species'

const props = defineProps<{ items: CartItemResponse[] }>()
const canvas = ref<HTMLCanvasElement>()
const viewport = ref<HTMLDivElement>()
const paused = ref(false)
const details = ref<Record<string, AquariumProductDetails>>({})
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
paused.value = reducedMotion.matches
let scene: ReturnType<typeof createAquariumScene> | undefined
let frame = 0
let lastFrame = 0
let visible = true
let resizeObserver: ResizeObserver | undefined
let intersectionObserver: IntersectionObserver | undefined

const groups = computed(() => buildAquariumGroups(props.items, details.value))
const total = computed(() => groups.value.reduce((sum, group) => sum + group.quantity, 0))
const riskyFish = computed(() => getCompatibilityRisk(groups.value))
const description = computed(() => groups.value.length
  ? `Аквариум с растениями. ${groups.value.map(group => `${group.name}: ${group.quantity} шт.`).join(', ')}`
  : 'Аквариум с растениями и камнями. Добавьте рыбок в корзину, чтобы заселить его.')

function fishWord(count: number) {
  if (count % 100 >= 11 && count % 100 <= 14) return 'рыбок'
  return count % 10 === 1 ? 'рыбка' : count % 10 >= 2 && count % 10 <= 4 ? 'рыбки' : 'рыбок'
}

// Older API responses may omit catalog metadata. Fetch it once per product.
watch(() => props.items.map(item => item.product), async (products, _, cleanup) => {
  const controller = new AbortController()
  cleanup(() => controller.abort())
  await Promise.allSettled(products.filter(product => !details.value[product.id] && (
    product.fish_temperament === undefined || (!identifyFish(product.name) && !product.category && !product.category_name)
  )).map(async (product) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL?.trim()}/api/products/${encodeURIComponent(product.id)}/`, { signal: controller.signal, credentials: 'include' })
      if (response.ok) details.value[product.id] = await response.json()
    } catch { /* The cart remains usable if extra catalog data is unavailable. */ }
  }))
}, { immediate: true })

watch(groups, (value) => {
  scene?.sync(value)
  scene?.draw(0)
})

function animate(now: number) {
  const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.05) : 0
  lastFrame = now
  scene?.draw(dt)
  frame = requestAnimationFrame(animate)
}
function updatePlayback() {
  cancelAnimationFrame(frame)
  lastFrame = 0
  if (!paused.value && visible && !document.hidden) frame = requestAnimationFrame(animate)
}
function motionChanged() { paused.value = reducedMotion.matches }
watch(paused, updatePlayback)
onMounted(() => {
  if (!canvas.value || !viewport.value) return
  scene = createAquariumScene(canvas.value)
  scene.sync(groups.value)
  resizeObserver = new ResizeObserver(([entry]) => {
    if (!entry) return
    scene?.resize(entry.contentRect.width, entry.contentRect.height)
    scene?.draw(0)
  })
  resizeObserver.observe(viewport.value)
  intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? false
    updatePlayback()
  })
  intersectionObserver.observe(viewport.value)
  document.addEventListener('visibilitychange', updatePlayback)
  reducedMotion.addEventListener('change', motionChanged)
  updatePlayback()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  document.removeEventListener('visibilitychange', updatePlayback)
  reducedMotion.removeEventListener('change', motionChanged)
})
</script>

<style scoped>
.aquarium { padding-top: 12px; margin-top: 48px; border: 1px solid #e0e8e4; border-radius: 26px; background: #fff; overflow: hidden; box-shadow: 0 16px 50px #163e3210; }
.aquarium__warning { display: flex; align-items: flex-start; gap: 12px; margin: 0 12px 12px; padding: 18px 20px; border: 1px solid #edcf8d; border-radius: 16px; background: #fff8e8; color: #785012; overflow-wrap: anywhere; }
.aquarium__warning-icon { width: 24px; height: 24px; flex-shrink: 0; }
.aquarium__warning strong { display: block; font-size: 16px; line-height: 1.5; }
.aquarium__warning p { margin: 6px 0 0; font-size: 14px; line-height: 1.6; }
.aquarium__viewport { position: relative; height: clamp(340px, 37vw, 490px); margin: 0 12px; overflow: hidden; border-radius: 16px; background: #0c2c31; isolation: isolate; }
.aquarium canvas { display: block; width: 100%; height: 100%; }
.aquarium__footer { display: flex; align-items: center; gap: 25px; padding: 25px 34px; }
.aquarium__population { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
.aquarium__population > strong { font-size: 32px; color: #2c5140; font-weight: 400; letter-spacing: -2px; }
.aquarium__population > span { font-size: 12px; color: #385544; }
.aquarium__population small { display: block; font-size: 9px; color: #8b9b90; margin-top: 5px; }
@media (max-width: 600px) {
  .aquarium { padding-top: 7px; margin-top: 30px; border-radius: 20px; }
  .aquarium__warning { margin: 0 7px 7px; padding: 14px; gap: 10px; border-radius: 12px; }
  .aquarium__viewport { margin: 0 7px; height: 370px; border-radius: 12px; }
  .aquarium__footer { padding: 20px 18px; flex-wrap: wrap; gap: 16px; }
}
</style>
