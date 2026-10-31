<script setup lang="ts">
import { computed } from 'vue';
import masters from '../../assets/genesis/galaxies/masters.svg?raw';
import postgraduate from '../../assets/genesis/galaxies/postgraduate.svg?raw';
import dpo from '../../assets/genesis/galaxies/dpo.svg?raw';
import college from '../../assets/genesis/galaxies/college.svg?raw';
import digitalSchool from '../../assets/genesis/galaxies/digital-school.svg?raw';
import aquarium from '../../assets/genesis/galaxies/aquarium.svg?raw';

const props = defineProps<{ variant: string }>();
const galaxies: Record<string, { vector: string; period: string }> = {
  masters: { vector: masters, period: '24s' },
  postgraduate: { vector: postgraduate, period: '28s' },
  dpo: { vector: dpo, period: '25s' },
  college: { vector: college, period: '26s' },
  'digital-school': { vector: digitalSchool, period: '30s' },
  aquarium: { vector: aquarium, period: '27s' },
};
const galaxy = computed(() => galaxies[props.variant] || galaxies.masters!);
</script>

<template>
  <!-- Only trusted, bundled SVGs: internal layers need to share the hover/focus state. -->
  <span
    class="g-galaxy__art"
    :style="{ '--galaxy-period': galaxy.period }"
    aria-hidden="true"
    v-html="galaxy.vector"
  />
</template>
