<template>
  <div v-if="required" class="privacy-consent">
    <label><input type="checkbox" :checked="accepted" required @change="change" />
      <span>Даю <router-link to="/legal/personal-data-consent" target="_blank">согласие на обработку персональных данных</router-link>.</span>
    </label>
    <router-link to="/legal/privacy-policy" target="_blank">Политика обработки персональных данных</router-link>
  </div>
  <p v-else-if="legalState.error" role="alert" class="privacy-error">{{ legalState.error }}</p>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { legalState, loadLegal, type ConsentValue } from '../utils/legal'
const props = defineProps<{ purpose: string; modelValue?: ConsentValue }>()
const emit = defineEmits<{ 'update:modelValue': [value: ConsentValue | undefined] }>()
const document = computed(() => legalState.value.config.documents.find(d => d.slug === 'personal-data-consent'))
const required = computed(() => legalState.value.config.ready && legalState.value.config.consent_purposes.includes(props.purpose))
const accepted = computed(() => props.modelValue?.accepted === true && props.modelValue.sha256 === document.value?.sha256)
function change(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).checked && document.value
    ? { accepted: true, version: document.value.version, sha256: document.value.sha256 } : undefined)
}
onMounted(() => {
  emit('update:modelValue', undefined)
  void loadLegal()
})
</script>
<style scoped>
.privacy-consent { margin: 16px 0; font-size: 13px; line-height: 1.6; color: #516078; }
label { display: flex; gap: 10px; align-items: flex-start; } input { flex: none; width: 18px; height: 18px; margin-top: 3px; accent-color: #173ded; }
a { color: #173ded; text-decoration: underline; } .privacy-consent > a { display: inline-block; margin: 6px 0 0 28px; }
.privacy-error { color: #b42332; font-size: 13px; }
</style>
