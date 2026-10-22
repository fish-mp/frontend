<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive } from 'vue';

// Previews from the supplied design. No enrolment or course IDs until the API is connected.
const groups = [
  {
    id: 'preschool',
    title: 'Школа для дошколят',
    age: '4–6 лет',
    color: '#2fbf71',
    tint: '#e6f8ee',
    courses: ['Буквы и звуки', 'Весёлая математика', 'Рисуем вместе', 'Английские слова'],
  },
  {
    id: 'school',
    title: 'Школа для школьников',
    age: '7–14 лет',
    color: '#ff8a1f',
    tint: '#fff1e3',
    courses: [
      'Математика-тренажёр',
      'Scratch для начинающих',
      'Английский с нуля',
      'Основы дизайна',
    ],
  },
  {
    id: 'aquarium',
    title: 'Школа аквариумистики',
    age: '6–16 лет',
    color: '#1ea7e1',
    tint: '#e6f6fd',
    courses: ['Первый аквариум', 'Рыбки и их повадки', 'Живые растения', 'Вода и фильтрация'],
  },
];
const tracks = new Map<string, HTMLElement>();
const scrollState = reactive<Record<string, { previous: boolean; next: boolean }>>({});
let observer: ResizeObserver | undefined;

function update(id: string) {
  const track = tracks.get(id);
  if (!track) return;
  scrollState[id] = {
    previous: track.scrollLeft > 2,
    next: track.scrollLeft + track.clientWidth < track.scrollWidth - 2,
  };
}
function scroll(id: string, step: number) {
  const track = tracks.get(id);
  if (!track) return;
  const card = track.firstElementChild as HTMLElement | null;
  track.scrollBy({
    left: step * ((card?.offsetWidth || track.clientWidth) + 24),
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  });
}
onMounted(() => {
  observer = new ResizeObserver(() => groups.forEach((group) => update(group.id)));
  tracks.forEach((track) => observer?.observe(track));
  groups.forEach((group) => update(group.id));
});
onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <section id="popular-courses" class="ds-section ds-popular" aria-labelledby="popular-title">
    <h2 id="popular-title">Популярные курсы</h2>
    <div
      v-for="group in groups"
      :key="group.id"
      class="ds-course-group"
      :style="{ '--course-color': group.color, '--course-tint': group.tint }"
    >
      <div class="ds-course-heading">
        <h3 :id="`courses-${group.id}-title`">{{ group.title }}</h3>
        <div class="ds-course-controls">
          <button
            :aria-label="`${group.title}: предыдущие курсы`"
            :aria-controls="`courses-${group.id}`"
            :disabled="!scrollState[group.id]?.previous"
            @click="scroll(group.id, -1)"
          >
            ←
          </button>
          <button
            :aria-label="`${group.title}: следующие курсы`"
            :aria-controls="`courses-${group.id}`"
            :disabled="!scrollState[group.id]?.next"
            @click="scroll(group.id, 1)"
          >
            →
          </button>
        </div>
      </div>
      <div
        :id="`courses-${group.id}`"
        :ref="
          (element) => {
            if (element) tracks.set(group.id, element as HTMLElement);
          }
        "
        class="ds-course-track"
        :aria-labelledby="`courses-${group.id}-title`"
        tabindex="0"
        @scroll.passive="update(group.id)"
      >
        <article v-for="course in group.courses" :key="course" class="ds-course-card">
          <div class="ds-course-cover" aria-hidden="true">Обложка курса</div>
          <div class="ds-course-info">
            <h4>{{ course }}</h4>
            <p>{{ group.age }} · 12 уроков</p>
            <span class="ds-course-free">Бесплатно</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
