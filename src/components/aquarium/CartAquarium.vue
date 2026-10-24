<template>
  <section class="aquarium" aria-label="Аквариум с рыбками из корзины">
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
import { identifyFish, isFishCategory, type AquariumGroup } from './species'

const props = defineProps<{ items: CartItemResponse[] }>()
const canvas = ref<HTMLCanvasElement>()
const viewport = ref<HTMLDivElement>()
const paused = ref(false)
const details = ref<Record<string, { category?: { name: string; parent_name?: string }; main_image?: { image: string }; images?: { image: string }[] }>>({})
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
paused.value = reducedMotion.matches
let scene: ReturnType<typeof createAquariumScene> | undefined
let frame = 0
let lastFrame = 0
let visible = true
let resizeObserver: ResizeObserver | undefined
let intersectionObserver: IntersectionObserver | undefined

const groups = computed<AquariumGroup[]>(() => props.items.flatMap((item) => {
  const product = item.product
  const quantity = Math.max(0, Math.floor(Number(item.quantity) || 0))
  if (!quantity) return []
  const detail = details.value[product.id]
  const category = product.category || detail?.category
  const categoryName = [category?.name, category?.parent_name, product.category_name].filter(Boolean).join(' ')
  // Explicit non-fish categories take precedence over words in product names.
  if (categoryName && !isFishCategory(categoryName)) return []
  const appearance = identifyFish(product.name)
  const image = product.main_image?.image || product.image || detail?.main_image?.image || detail?.images?.[0]?.image
  if (!appearance && !isFishCategory(categoryName)) return []
  return [{ id: product.id, name: product.name, quantity, image,
    appearance: appearance || { kind: image ? 'photo' : 'fish', color: '#b8ccc2', accent: '#92bcaa', size: 59, speed: 0.5, zone: 0.5 },
  }]
}))
const total = computed(() => groups.value.reduce((sum, group) => sum + group.quantity, 0))
const description = computed(() => groups.value.length
  ? `Аквариум с растениями. ${groups.value.map(group => `${group.name}: ${group.quantity} шт.`).join(', ')}`
  : 'Аквариум с растениями и камнями. Добавьте рыбок в корзину, чтобы заселить его.')

function fishWord(count: number) {
  if (count % 100 >= 11 && count % 100 <= 14) return 'рыбок'
  return count % 10 === 1 ? 'рыбка' : count % 10 >= 2 && count % 10 <= 4 ? 'рыбки' : 'рыбок'
}

// The cart API doesn't include categories. Resolve only unfamiliar names without
// touching the shared catalog store or generating one request per individual fish.
watch(() => props.items.map(item => item.product), async (products, _, cleanup) => {
  const controller = new AbortController()
  cleanup(() => controller.abort())
  await Promise.allSettled(products.filter(product => !identifyFish(product.name) && !product.category && !product.category_name && !details.value[product.id]).map(async (product) => {
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
.aquarium__viewport { position: relative; height: clamp(340px, 37vw, 490px); margin: 0 12px; overflow: hidden; border-radius: 16px; background: #0c2c31; isolation: isolate; }
.aquarium canvas { display: block; width: 100%; height: 100%; }
.aquarium__footer { display: flex; align-items: center; gap: 25px; padding: 25px 34px; }
.aquarium__population { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
.aquarium__population > strong { font-size: 32px; color: #2c5140; font-weight: 400; letter-spacing: -2px; }
.aquarium__population > span { font-size: 12px; color: #385544; }
.aquarium__population small { display: block; font-size: 9px; color: #8b9b90; margin-top: 5px; }
@media (max-width: 600px) {
  .aquarium { padding-top: 7px; margin-top: 30px; border-radius: 20px; }
  .aquarium__viewport { margin: 0 7px; height: 370px; border-radius: 12px; }
  .aquarium__footer { padding: 20px 18px; flex-wrap: wrap; gap: 16px; }
}
</style>
