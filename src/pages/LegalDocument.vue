<template>
  <main class="legal-document">
    <p v-if="legalState.loading" role="status">Загружаем документ…</p>
    <article v-else-if="document">
      <p v-if="!legalState.config.ready" class="draft" role="status">Черновик для заполнения. Не является действующим документом.</p>
      <h1>{{ document.title }}</h1><p class="version">Редакция: {{ document.version }}</p>
      <dl><dt>Оператор</dt><dd>{{ document.operator.name }}</dd><dt>Адрес</dt><dd>{{ document.operator.legal_address }}</dd>
        <template v-if="document.operator.inn"><dt>ИНН</dt><dd>{{ document.operator.inn }}</dd></template>
        <template v-if="document.operator.ogrn"><dt>ОГРН / ОГРНИП</dt><dd>{{ document.operator.ogrn }}</dd></template>
      </dl>
      <section v-for="(section, index) in document.sections" :key="index">
        <h2>{{ index + 1 }}. {{ section.title }}</h2><p v-for="(paragraph, i) in section.paragraphs" :key="i">{{ paragraph }}</p>
      </section>
      <p v-if="legalState.config.contact_email">По вопросам персональных данных:
        <a :href="'mailto:' + legalState.config.contact_email">{{ legalState.config.contact_email }}</a></p>
    </article>
    <section v-else><h1>Документ временно недоступен</h1><p>Свяжитесь с администрацией сайта, если вам нужна дополнительная информация.</p></section>
    <router-link to="/">На главную</router-link>
  </main>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { legalState, loadLegal } from '../utils/legal'
const route = useRoute()
const document = computed(() => legalState.value.config.documents.find(d => d.slug === route.params.slug))
onMounted(loadLegal)
</script>
<style scoped>
.legal-document { max-width: 900px; margin: 140px auto 64px; padding: 0 24px; color: #142745; overflow-wrap: anywhere; line-height: 1.8; }
h1 { font-size: clamp(26px,5vw,38px); line-height: 1.25; } h2 { font-size: 22px; margin-top: 32px; }
dt { font-weight: 600; } dd { margin: 0 0 12px; } a { color: #173ded; } .version { color: #65758e; }
.draft { padding: 16px; background: #fff4d6; border-radius: 12px; }
</style>
