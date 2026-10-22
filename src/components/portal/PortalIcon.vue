<script setup lang="ts">
withDefaults(defineProps<{ name: string; size?: number }>(), { size: 24 });
const paths: Record<string, string> = {
  home: 'M3 10 12 3l9 7v11h-6v-7H9v7H3Z',
  book: 'M12 5C8 2 4 3 2 4v15c3-2 7-2 10 0 3-2 7-2 10 0V4c-3-1-7-2-10 1Zm0 0v14',
  star: 'm12 2 3 6.2 6.8 1-4.9 4.8 1.2 6.8-6.1-3.2-6.1 3.2 1.2-6.8-4.9-4.8 6.8-1Z',
  graduation: 'm2 8 10-5 10 5-10 5Zm4 3v6c4 3 8 3 12 0v-6M22 8v9',
  sparkles: 'm12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5ZM20 2v4m-2-2h4',
  fish: 'M3 12c4-8 11-8 16 0-5 8-12 8-16 0Zm16 0 3-5v10Zm-6-3h.01M8 6l3-3 3 3M8 18l3 3 3-3',
  planet: 'M19 7a8 8 0 1 1-14 0 8 8 0 0 1 14 0ZM5 9C-4 15 5 21 16 13S23 1 17 5',
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  news: 'M5 3h14v18H5Zm4 5h6m-6 4h6m-6 4h6',
  calendar: 'M4 5h16v16H4Zm0 5h16M8 2v6m8-6v6M8 14h2m4 0h2m-8 4h2',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'm6 6 12 12M6 18 18 6',
};
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="paths[name] || paths.star" />
  </svg>
</template>
