<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ kind: 'news' | 'events' | 'shop' }>();
const content = computed(
  () =>
    ({
      news: { title: 'Новости', subtitle: 'Всё самое важное о жизни Цифровой школы и наших школ' },
      events: {
        title: 'Мероприятия',
        subtitle: 'Открытые уроки, мастер-классы и праздники для всей семьи',
      },
      shop: { title: 'Магазин', subtitle: 'Школьная символика, канцелярия и подарки для учеников' },
    })[props.kind]
);
const assets = import.meta.glob('../../assets/digital-school/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;
function asset(name: string) {
  return assets[`../../assets/digital-school/${name}.svg`];
}
const stars = [
  { x: 885, y: 45, size: 26 },
  { x: 1088, y: 228, size: 20 },
  { x: 750, y: 240, size: 16 },
  { x: 1237, y: 37, size: 22 },
  { x: 1716, y: 236, size: 24 },
  { x: 1689, y: 49, size: 18 },
  { x: 631, y: 61, size: 14 },
];
</script>

<template>
  <section
    class="ds-designed-banner"
    :class="`ds-designed-banner--${kind}`"
    :aria-label="content.title"
  >
    <div class="ds-designed-banner-decor" aria-hidden="true">
      <img :src="asset('banner-0')" class="ds-banner-orb ds-banner-orb--right" alt="" />
      <img :src="asset('banner-1')" class="ds-banner-orb ds-banner-orb--left" alt="" />
      <img
        v-for="(star, index) in stars"
        :key="index"
        :src="asset(`banner-${index + 2}`)"
        class="ds-banner-star"
        :style="{ left: `${star.x / 18}%`, top: `${star.y / 3}%`, width: `${star.size / 18}%` }"
        alt=""
      />
    </div>
    <div class="ds-designed-banner-copy">
      <h1>{{ content.title }}</h1>
      <p>{{ content.subtitle }}</p>
    </div>
    <div class="ds-banner-art" aria-hidden="true">
      <template v-if="kind === 'news'"
        ><div class="ds-newspaper-back" />
        <div class="ds-newspaper"><i /><b /><b /><b /></div
      ></template>
      <template v-else-if="kind === 'events'"
        ><div class="ds-calendar-art">
          <div class="ds-calendar-art-head" />
          <i class="ds-calendar-ring ds-calendar-ring--first" /><i
            class="ds-calendar-ring ds-calendar-ring--second"
          />
          <div class="ds-calendar-art-dots">
            <img
              v-for="day in 8"
              :key="day"
              :src="asset(day === 7 ? 'calendar-active' : 'calendar-dot')"
              alt=""
            />
          </div></div
      ></template>
      <template v-else
        ><img :src="asset('shop-handle')" class="ds-bag-handle" alt="" />
        <div class="ds-bag-body">
          <img :src="asset('shop-star')" class="ds-bag-star" alt="" /><img
            :src="asset('shop-detail')"
            class="ds-bag-detail"
            alt=""
          /></div
      ></template>
    </div>
  </section>
</template>
