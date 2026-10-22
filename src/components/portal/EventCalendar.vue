<script setup lang="ts">
import { computed, ref } from 'vue';
const props = defineProps<{
  modelValue: string;
  events: { date: string; color: string; title: string }[];
}>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
const today = new Date();
const cursor = ref(new Date(today.getFullYear(), today.getMonth(), 1));
const monthLabel = computed(() =>
  cursor.value.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }).replace(' г.', '')
);
function dateKey(value: Date) {
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
}
const todayKey = dateKey(today);
const weeks = computed(() => {
  const year = cursor.value.getFullYear(),
    month = cursor.value.getMonth();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: Math.ceil((count + offset) / 7) * 7 }, (_, index) => {
    const day = index - offset + 1;
    if (day < 1 || day > count) return null;
    const date = new Date(year, month, day),
      key = dateKey(date);
    return {
      day,
      key,
      label: date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
      event: props.events.find((event) => event.date.slice(0, 10) === key),
    };
  });
  return Array.from({ length: cells.length / 7 }, (_, index) =>
    cells.slice(index * 7, index * 7 + 7)
  );
});
function move(step: number) {
  cursor.value = new Date(cursor.value.getFullYear(), cursor.value.getMonth() + step, 1);
}
</script>
<template>
  <section class="ds-event-calendar" aria-label="Календарь мероприятий">
    <div class="ds-calendar-heading">
      <h2 aria-live="polite">{{ monthLabel }}</h2>
      <div>
        <button aria-label="Предыдущий месяц" @click="move(-1)">‹</button
        ><button aria-label="Следующий месяц" @click="move(1)">›</button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="day in ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']" :key="day" scope="col">
            {{ day }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) in weeks" :key="index">
          <td v-for="(day, column) in week" :key="column">
            <button
              v-if="day"
              :class="{
                'is-today': day.key === todayKey,
                'has-event': day.event,
                'is-selected': modelValue === day.key,
              }"
              :style="day.event ? { '--event-color': day.event.color } : undefined"
              :aria-label="day.label + (day.event ? ` — ${day.event.title}` : '')"
              :aria-pressed="modelValue === day.key"
              :aria-current="day.key === todayKey ? 'date' : undefined"
              @click="emit('update:modelValue', modelValue === day.key ? '' : day.key)"
            >
              {{ day.day }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button v-if="modelValue" class="ds-calendar-reset" @click="emit('update:modelValue', '')">
      Все даты ×
    </button>
  </section>
</template>
