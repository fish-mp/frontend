<script setup lang="ts">
withDefaults(
  defineProps<{
    href?: string;
    tone?: 'pink' | 'dark' | 'outline' | 'text';
    unavailable?: boolean;
    icon?: string;
  }>(),
  { tone: 'dark', unavailable: false }
);

const emit = defineEmits<{ click: [event: MouseEvent] }>();
function activate(event: MouseEvent, unavailable: boolean) {
  if (unavailable) {
    event.preventDefault();
    return;
  }
  emit('click', event);
}
</script>

<template>
  <component
    :is="href && !unavailable ? 'a' : 'button'"
    :href="unavailable ? undefined : href"
    :type="href && !unavailable ? undefined : 'button'"
    class="g-action"
    :class="`g-action--${tone}`"
    :aria-disabled="unavailable || undefined"
    :title="unavailable ? 'Раздел готовится к открытию' : undefined"
    @click="activate($event, unavailable)"
  >
    <span><slot /></span>
    <img
      :src="icon || (tone === 'pink' ? '/genesis/s1-imgArrow.svg' : '/genesis/s2-imgArrow.svg')"
      alt=""
      :width="tone === 'text' ? 18 : 22"
      :height="tone === 'text' ? 18 : 22"
      aria-hidden="true"
    />
  </component>
</template>
