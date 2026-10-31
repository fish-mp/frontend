<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, provide } from 'vue';
import GenesisAction from '../components/genesis/GenesisAction.vue';
import GenesisGalaxy from '../components/genesis/GenesisGalaxy.vue';
import {
  universityContacts as sourceUniversityContacts,
  discoveries as sourceDiscoveries,
  feedbackEmail,
  institutes as sourceInstitutes,
  news as sourceNews,
  programs as sourcePrograms,
  universes as sourceUniverses,
} from '../data/genesis';
import { AQUARIUM_URL } from '../utils/site';
import '../assets/css/genesis.css';
import { english } from '../data/genesis.en';

const page = ref<HTMLElement>();
const dialog = ref<HTMLDialogElement>();
type DialogKind = 'menu' | 'search' | 'info' | 'coming-soon' | 'aquarium';
const dialogKind = ref<DialogKind>('menu');
const dialogTitle = ref('');
const dialogText = ref('');
const query = ref('');
const language = ref<'ru' | 'en'>('ru');
function t(text: string): string {
  return language.value === 'en' ? english[text.trim().replace(/\s+/g, ' ')] || text : text;
}
function localize<T>(value: T): T {
  if (typeof value === 'string') return t(value) as T;
  if (Array.isArray(value)) return value.map(localize) as T;
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, localize(item)])
    ) as T;
  return value;
}
const universes = computed(() => localize(sourceUniverses));
const programs = computed(() => localize(sourcePrograms));
const institutes = computed(() => localize(sourceInstitutes));
const discoveries = computed(() => localize(sourceDiscoveries));
const news = computed(() => localize(sourceNews));
const universityContacts = computed(() => localize(sourceUniversityContacts));
provide('genesis-translate', t);
const originalTitle = document.title;
const originalLang = document.documentElement.lang;
function toggleLanguage() {
  language.value = language.value === 'ru' ? 'en' : 'ru';
  try {
    localStorage.setItem('genesis-language', language.value);
  } catch {
    /* Storage may be disabled. */
  }
}
watch(language, (value) => {
  document.documentElement.lang = value;
  document.title =
    value === 'en' ? 'Genesis — University of Continuing Digital Education' : originalTitle;
});
const compactHeader = ref(false);
const isDocumentVisible = ref(true);
let observer: IntersectionObserver | undefined;
let motionObserver: IntersectionObserver | undefined;
const feedbackHref = computed(
  () =>
    `mailto:${feedbackEmail}?subject=${encodeURIComponent(language.value === 'en' ? 'Enquiry to Genesis University' : 'Обращение в университет «Генезис»')}`
);

function updateHeader() {
  compactHeader.value = window.scrollY > 80;
}
function updateDocumentVisibility() {
  isDocumentVisible.value = !document.hidden;
}

const searchItems = computed<Array<{ title: string; id: string; aliases?: string }>>(() => [
  ...programs.value.map((p) => ({
    title: p.title.replace(/\n/g, ' '),
    id: p.id,
    aliases: p.id === 'dpo' ? 'ДПО' : '',
  })),
  { title: t('Колледж'), id: 'college' },
  { title: t('Институты университета'), id: 'institutes' },
  ...discoveries.value.map((d) => ({ title: d.title, id: d.id })),
  { title: t('Новости университета'), id: 'university-news' },
  { title: t('Контакты университета'), id: 'contacts' },
]);
const searchResults = computed(() => {
  const value = query.value.trim().toLocaleLowerCase('ru');
  return searchItems.value.filter((item) =>
    `${item.title} ${item.aliases || ''}`.toLocaleLowerCase('ru').includes(value)
  );
});

async function openDialog(kind: DialogKind, title = '', text = '') {
  dialogKind.value = kind;
  dialogTitle.value = title;
  dialogText.value = text;
  query.value = '';
  await nextTick();
  dialog.value?.showModal();
}

function openDetails(title: string, aquarium = false) {
  return openDialog(
    aquarium ? 'aquarium' : 'coming-soon',
    title.replace(/\n/g, ' '),
    aquarium
      ? 'Откройте удивительный мир под водой: познакомьтесь с обитателями аквариумов, найдите интересные курсы и создайте свой аквамир вместе со школой аквариумистики.'
      : 'Мы уже готовим этот раздел. Совсем скоро здесь появятся подробная информация и полезные материалы. Загляните к нам чуть позже — будем рады продолжить знакомство!'
  );
}

function closeDialog() {
  dialog.value?.close();
}

async function jumpTo(id: string) {
  closeDialog();
  await nextTick();
  const target = document.getElementById(id);
  target?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    block: 'start',
  });
  target?.focus({ preventScroll: true });
}

onMounted(() => {
  updateHeader();
  updateDocumentVisibility();
  window.addEventListener('scroll', updateHeader, { passive: true });
  document.addEventListener('visibilitychange', updateDocumentVisibility);
  const galaxies = page.value?.querySelectorAll('.g-galaxy') || [];
  if ('IntersectionObserver' in window) {
    motionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.target.classList.toggle('g-galaxy--visible', entry.isIntersecting)
        );
      },
      { threshold: 0 }
    );
    galaxies.forEach((galaxy) => motionObserver?.observe(galaxy));
  } else {
    galaxies.forEach((galaxy) => galaxy.classList.add('g-galaxy--visible'));
  }
  try {
    language.value = localStorage.getItem('genesis-language') === 'en' ? 'en' : 'ru';
  } catch {
    /* Use the default theme. */
  }
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  )
    return;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('g-is-visible');
          observer?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  page.value?.querySelectorAll('.g-reveal').forEach((element) => observer?.observe(element));
  page.value?.classList.add('g-motion-ready');
});

onBeforeUnmount(() => {
  observer?.disconnect();
  motionObserver?.disconnect();
  window.removeEventListener('scroll', updateHeader);
  document.removeEventListener('visibilitychange', updateDocumentVisibility);
  closeDialog();
  document.documentElement.lang = originalLang;
  document.title = originalTitle;
});
</script>

<template>
  <div ref="page" class="genesis" :class="{ 'genesis--inactive': !isDocumentVisible }">
    <a class="g-skip" href="#university-main"> {{ t('Перейти к содержимому') }} </a>

    <div class="g-shell g-top" :class="{ 'g-top--compact': compactHeader }">
      <header class="g-header" :aria-label="t('Шапка университета')">
        <div class="g-header__brand">
          <button
            class="g-icon-button g-menu-button"
            type="button"
            :aria-label="t('Открыть меню университета')"
            aria-haspopup="dialog"
            @click="openDialog('menu')"
          >
            <img src="/genesis/s1-imgMenu.svg" width="24" height="24" alt="" />
          </button>
          <a class="g-brand" href="#" :aria-label="t('Генезис — главная')">
            <img src="/genesis/s1-img.svg" width="48" height="48" alt="" />
            <span> {{ t('ГЕНЕЗИС') }} </span>
          </a>
        </div>
        <nav class="g-header__nav" :aria-label="t('Основная навигация')">
          <a href="#admissions"> {{ t('Поступающим') }} </a>
          <a href="#student-life"> {{ t('Обучающимся') }} </a>
          <a href="#contacts"> {{ t('Контакты') }} </a>
        </nav>
        <div class="g-header__tools">
          <button
            class="g-icon-button"
            type="button"
            :aria-label="t('Поиск по сайту')"
            aria-haspopup="dialog"
            @click="openDialog('search')"
          >
            <img src="/genesis/s1-imgSearch.svg" width="24" height="24" alt="" />
          </button>
          <button
            class="g-language"
            type="button"
            :aria-label="language === 'ru' ? 'Switch to English' : t('Переключить на русский')"
            @click="toggleLanguage"
          >
            {{ language.toUpperCase() }} <span aria-hidden="true">↔</span>
          </button>
          <GenesisAction
            class="g-login"
            tone="outline"
            :icon="'/genesis/s1-imgArrow1.svg'"
            @click="
              openDialog(
                'info',
                t('Личный кабинет'),
                t('Вход и регистрация в университете скоро станут доступны.')
              )
            "
          >
            {{ t('Вход / Регистрация') }}
          </GenesisAction>
        </div>
      </header>
    </div>

    <main id="university-main" tabindex="-1">
      <section class="g-shell g-hero-shell" aria-labelledby="university-title">
        <div class="g-hero">
          <img
            class="g-hero__orbit"
            src="/genesis/s1-img1.svg"
            width="870"
            height="760"
            alt=""
            aria-hidden="true"
          />
          <div class="g-intro">
            <div class="g-intro__heading">
              <p class="g-eyebrow">{{ t('ОБРАЗОВАНИЕ ДЛИНОЮ В ЖИЗНЬ') }}</p>
              <h1 id="university-title">
                {{ t('Университет непрерывного') }} <br class="g-desktop-break" />
                {{ t('цифрового образования') }} <strong> {{ t('«Генезис»') }} </strong>
              </h1>
            </div>
            <div class="g-quick-institutes">
              <a
                v-for="institute in institutes"
                :key="institute.number"
                :href="`#institute-${institute.number}`"
                class="g-quick-institute"
              >
                <div>
                  <p class="g-eyebrow">{{ t('ИНСТИТУТ /') }} {{ institute.number }}</p>
                  <h2>{{ institute.title }}</h2>
                </div>
                <span class="g-inline-link">
                  {{ t('Об институте') }}
                  <img src="/genesis/s1-img2.svg" width="18" height="18" alt=""
                /></span>
              </a>
            </div>
            <div class="g-intro__actions">
              <GenesisAction href="#admissions" tone="pink"> {{ t('Поступить') }} </GenesisAction>
              <GenesisAction href="#directions" tone="text" icon="/genesis/s1-imgDiag.svg">
                {{ t('Выбрать направление') }}
              </GenesisAction>
            </div>
          </div>

          <div class="g-universes">
            <p class="g-eyebrow">{{ t('ВСЕЛЕННАЯ ВАШИХ ВОЗМОЖНОСТЕЙ') }}</p>
            <div class="g-universes__grid">
              <component
                :is="universe.id === 'aquarium' ? 'a' : 'button'"
                v-for="universe in universes"
                :key="universe.id"
                :href="universe.id === 'aquarium' ? AQUARIUM_URL : undefined"
                :type="universe.id === 'aquarium' ? undefined : 'button'"
                :aria-disabled="universe.id !== 'aquarium' || undefined"
                :title="
                  universe.id === 'aquarium'
                    ? t('Открыть школу аквариумистики')
                    : t('Направление готовится к открытию')
                "
                class="g-galaxy"
                :data-universe="universe.id"
              >
                <span class="g-galaxy__space"><GenesisGalaxy :variant="universe.id" /></span>
                <span class="g-galaxy__name">{{ universe.name }}</span>
              </component>
            </div>
          </div>
          <img
            class="g-hero__star g-hero__star--1"
            src="/genesis/s1-img9.svg"
            width="10"
            height="10"
            alt=""
          />
          <img
            class="g-hero__star g-hero__star--2"
            src="/genesis/s1-img10.svg"
            width="12"
            height="12"
            alt=""
          />
          <img
            class="g-hero__star g-hero__star--3"
            src="/genesis/s1-img11.svg"
            width="8"
            height="8"
            alt=""
          />
          <img
            class="g-hero__star g-hero__star--4"
            src="/genesis/s1-img11.svg"
            width="8"
            height="8"
            alt=""
          />
          <img
            class="g-hero__star g-hero__star--5"
            src="/genesis/s1-img10.svg"
            width="12"
            height="12"
            alt=""
          />
          <img
            class="g-hero__star g-hero__star--6"
            src="/genesis/s1-img12.svg"
            width="7"
            height="7"
            alt=""
          />
        </div>
      </section>

      <section
        id="directions"
        class="g-shell g-directions"
        aria-labelledby="directions-title"
        tabindex="-1"
      >
        <div class="g-section-heading g-reveal">
          <p class="g-eyebrow">{{ t('ОБРАЗОВАТЕЛЬНЫЕ НАПРАВЛЕНИЯ') }}</p>
          <h2 id="directions-title">{{ t('Ваша следующая ступень') }}</h2>
        </div>
        <div class="g-program-grid">
          <article
            v-for="program in programs"
            :id="program.id"
            :key="program.id"
            class="g-program-card g-reveal"
            :class="[`g-program-card--${program.id}`, `g-theme-${program.theme}`]"
            tabindex="-1"
            :aria-labelledby="`${program.id}-title`"
          >
            <div class="g-program-card__intro">
              <p v-if="program.label" class="g-eyebrow">{{ program.label }}</p>
              <h3 :id="`${program.id}-title`">{{ program.title }}</h3>
              <p class="g-program-card__description">{{ program.description }}</p>
            </div>
            <img
              v-if="program.image"
              class="g-program-card__galaxy"
              :src="program.image"
              width="260"
              height="260"
              alt=""
              loading="lazy"
            />
            <div class="g-program-card__bottom">
              <dl v-if="program.label" class="g-program-facts">
                <div>
                  <dt>{{ t('Программы') }}</dt>
                  <dd>—</dd>
                </div>
                <div>
                  <dt>{{ t('Формат') }}</dt>
                  <dd>{{ t('Уточняется') }}</dd>
                </div>
                <div>
                  <dt>{{ t('Ближайший набор') }}</dt>
                  <dd>{{ t('Даты уточняются') }}</dd>
                </div>
              </dl>
              <div v-else class="g-school-facts">
                <p>{{ t('Программы: — · Формат уточняется') }}</p>
                <p>{{ t('Ближайший набор: даты уточняются') }}</p>
              </div>
              <GenesisAction
                aria-haspopup="dialog"
                @click="openDetails(program.title, program.id === 'aquarium')"
                :tone="['plum', 'purple'].includes(program.theme) ? 'pink' : 'dark'"
                :icon="
                  ['plum', 'purple'].includes(program.theme)
                    ? '/genesis/s2-imgArrow1.svg'
                    : '/genesis/s2-imgArrow.svg'
                "
              >
                {{ t('Подробнее') }}
              </GenesisAction>
            </div>
          </article>

          <article
            id="college"
            class="g-college g-reveal"
            tabindex="-1"
            aria-labelledby="college-title"
          >
            <img src="/genesis/s2-img2.svg" width="160" height="160" alt="" loading="lazy" />
            <div>
              <p class="g-eyebrow">{{ t('ОБРАЗОВАТЕЛЬНОЕ НАПРАВЛЕНИЕ') }}</p>
              <h3 id="college-title">{{ t('Колледж') }}</h3>
              <p>{{ t('Экономическое направление') }}</p>
            </div>
            <GenesisAction tone="outline" aria-haspopup="dialog" @click="openDetails(t('Колледж'))">
              {{ t('Подробнее') }}
            </GenesisAction>
          </article>
        </div>

        <div id="institutes" class="g-institutes" tabindex="-1">
          <div class="g-institutes__heading g-reveal">
            <p class="g-eyebrow">{{ t('СТРУКТУРА УНИВЕРСИТЕТА') }}</p>
            <h2>{{ t('Два института — общие возможности') }}</h2>
          </div>
          <div class="g-institutes__grid">
            <article
              v-for="institute in institutes"
              :id="`institute-${institute.number}`"
              :key="institute.number"
              class="g-institute g-reveal"
              :class="{ 'g-theme-plum': institute.number === '02' }"
              tabindex="-1"
            >
              <div class="g-institute__intro">
                <p class="g-eyebrow">{{ t('ИНСТИТУТ /') }} {{ institute.number }}</p>
                <h3>{{ institute.title }}</h3>
                <p>{{ institute.description }}</p>
              </div>
              <div class="g-institute__nav">
                <div class="g-institute__links">
                  <GenesisAction tone="text" icon="/genesis/s2-img3.svg" unavailable>
                    {{ t('Кафедры') }} </GenesisAction
                  ><GenesisAction tone="text" icon="/genesis/s2-img3.svg" unavailable>
                    {{ t('Лаборатории и центры') }}
                  </GenesisAction>
                </div>
                <GenesisAction
                  tone="outline"
                  @click="
                    openDialog(
                      'info',
                      `${t('Институт')} ${institute.title.replace(/\n/g, ' ')}`,
                      institute.description.replace(/\n/g, ' ')
                    )
                  "
                >
                  {{ t('Об институте') }}
                </GenesisAction>
              </div>
              <img
                class="g-institute__galaxy"
                src="/genesis/s2-img4.svg"
                width="340"
                height="340"
                alt=""
                loading="lazy"
              />
            </article>
          </div>
        </div>
      </section>

      <section class="g-discover" aria-labelledby="discover-title">
        <div class="g-shell">
          <div class="g-section-heading g-reveal">
            <p class="g-eyebrow">{{ t('ПОЛЕЗНЫЕ РАЗДЕЛЫ') }}</p>
            <h2 id="discover-title">{{ t('Откройте «Генезис»') }}</h2>
          </div>
          <div class="g-discover__grid">
            <article
              v-for="item in discoveries"
              :id="item.id"
              :key="item.id"
              class="g-discovery g-reveal"
              :class="`g-theme-${item.theme}`"
              tabindex="-1"
            >
              <img
                class="g-discovery__illustration"
                :src="item.image"
                width="260"
                height="260"
                alt=""
                loading="lazy"
              />
              <div class="g-discovery__heading">
                <h3>{{ t(item.title) }}</h3>
                <p>{{ item.description }}</p>
              </div>
              <div class="g-discovery__links">
                <GenesisAction
                  v-for="link in item.links"
                  :key="link"
                  tone="text"
                  :icon="
                    item.theme === 'plum' ? '/genesis/s3-imgDiag1.svg' : '/genesis/s3-imgDiag.svg'
                  "
                  unavailable
                  >{{ link }}</GenesisAction
                >
              </div>
              <GenesisAction
                :tone="item.theme === 'plum' ? 'pink' : 'dark'"
                :icon="
                  item.theme === 'plum' ? '/genesis/s3-imgArrow1.svg' : '/genesis/s3-imgArrow.svg'
                "
                aria-haspopup="dialog"
                @click="openDetails(item.title)"
              >
                {{ t('Подробнее') }}
              </GenesisAction>
            </article>
          </div>
        </div>
      </section>

      <section
        id="university-news"
        class="g-shell g-news"
        aria-labelledby="news-title"
        tabindex="-1"
      >
        <div class="g-news__heading g-reveal">
          <div class="g-section-heading">
            <p class="g-eyebrow">{{ t('НОВОСТИ И АНОНСЫ') }}</p>
            <h2 id="news-title">{{ t('В орбите университета') }}</h2>
          </div>
          <GenesisAction href="#news-cards" tone="text" icon="/genesis/s4-imgDiag.svg">
            {{ t('Все анонсы') }}
          </GenesisAction>
        </div>
        <p class="g-news__intro">
          {{
            t(
              'Знакомство с университетом, образовательные траектории и научные открытия — темы наших будущих публикаций.'
            )
          }}
        </p>
        <div id="news-cards" class="g-news__grid">
          <article v-for="item in news" :key="item.title" class="g-news-card g-reveal">
            <div class="g-news-card__cover" :class="`g-theme-${item.theme}`">
              <p>{{ item.cover }}</p>
              <img
                class="g-news-card__galaxy"
                :src="item.image"
                width="240"
                height="240"
                alt=""
                loading="lazy"
              /><img
                class="g-news-card__star"
                src="/genesis/s4-img1.svg"
                width="19"
                height="19"
                alt=""
                loading="lazy"
              />
            </div>
            <div class="g-news-card__body">
              <div class="g-news-card__meta">
                <span class="g-announcement-badge"> {{ t('Анонс') }} </span>
                <p class="g-eyebrow">{{ item.category }}</p>
              </div>
              <h3>{{ t(item.title) }}</h3>
              <p>{{ item.description }}</p>
              <GenesisAction
                tone="text"
                icon="/genesis/s4-imgDiag.svg"
                @click="
                  openDialog(
                    'info',
                    item.title,
                    `${item.description} ${t('Материал готовится к публикации.')}`
                  )
                "
              >
                {{ t('Об анонсе') }}
              </GenesisAction>
            </div>
          </article>
        </div>
      </section>

      <section class="g-shell g-cta-shell" aria-labelledby="next-step-title">
        <div class="g-cta g-reveal">
          <div>
            <h2 id="next-step-title">
              {{ t('Ваш следующий шаг') }} <br />
              {{ t('начинается здесь.') }}
            </h2>
            <p>{{ t('Выберите направление и откройте свою вселенную знаний.') }}</p>
          </div>
          <GenesisAction href="#admissions" icon="/genesis/s5-imgArrow.svg">
            {{ t('Поступить') }}
          </GenesisAction>
        </div>
      </section>
    </main>

    <footer class="g-footer">
      <div class="g-shell">
        <div class="g-footer__grid">
          <div class="g-footer__about">
            <a href="#" class="g-brand"
              ><img src="/genesis/s6-img.svg" width="48" height="48" alt="" loading="lazy" /><span>
                {{ t('ГЕНЕЗИС') }}
              </span></a
            >
            <p>{{ t('АНО «Университет непрерывного цифрового образования „Генезис“»') }}</p>
            <p>{{ t('Образование длиною в жизнь.') }}</p>
          </div>
          <nav class="g-footer__column" :aria-label="t('Образование')">
            <h2>{{ t('Образование') }}</h2>
            <template v-for="universe in universes" :key="universe.id"
              ><a v-if="universe.id === 'aquarium'" :href="AQUARIUM_URL">{{ universe.name }}</a
              ><span v-else>{{ universe.name }}</span></template
            ><a href="#institutes"> {{ t('Институты') }} </a>
          </nav>
          <nav class="g-footer__column" :aria-label="t('Университет')">
            <h2>{{ t('Университет') }}</h2>
            <a href="#admissions"> {{ t('Поступающим') }} </a
            ><a href="#student-life"> {{ t('Обучающимся') }} </a
            ><a href="#science"> {{ t('Наука') }} </a
            ><a href="#student-life"> {{ t('Студенческая жизнь') }} </a
            ><a href="#university-news"> {{ t('Новости') }} </a>
            <button
              type="button"
              @click="
                openDialog(
                  'info',
                  t('Личный кабинет'),
                  t('Вход и регистрация в университете скоро станут доступны.')
                )
              "
            >
              {{ t('Личный кабинет') }}
            </button>
          </nav>
          <div id="contacts" class="g-footer__column g-footer__contacts" tabindex="-1">
            <h2>{{ t('Обратная связь') }}</h2>
            <a class="g-footer__email" :href="feedbackHref">{{ feedbackEmail }}</a>
            <a :href="universityContacts.phoneHref">{{ universityContacts.phone }}</a>
            <p>{{ universityContacts.hours }}</p>
            <p class="g-footer__contact-note">{{ t('По вопросам поступления и работы сайта') }}</p>
          </div>
        </div>
        <div class="g-footer__legal">
          <p>{{ t('© 2026 «Генезис»') }}</p>
          <button
            type="button"
            @click="
              openDialog(
                'info',
                t('Сведения об образовательной организации'),
                t(
                  'АНО «Университет непрерывного цифрового образования „Генезис“». Сведения и документы готовятся к публикации.'
                )
              )
            "
          >
            {{ t('Сведения об образовательной организации') }}</button
          ><button type="button" aria-disabled="true" :title="t('Документ готовится к публикации')">
            {{ t('Политика конфиденциальности') }}
          </button>
        </div>
      </div>
    </footer>

    <dialog
      ref="dialog"
      class="g-dialog"
      :class="{
        'g-dialog--menu': dialogKind === 'menu',
        'g-dialog--details': dialogKind === 'coming-soon' || dialogKind === 'aquarium',
      }"
      aria-labelledby="genesis-dialog-title"
      @keydown.esc.capture.stop.prevent="closeDialog"
      @click="$event.target === $event.currentTarget && closeDialog()"
    >
      <div class="g-dialog__inner">
        <button
          class="g-dialog__close g-icon-button"
          type="button"
          :aria-label="t('Закрыть окно')"
          @click="closeDialog"
        >
          ×
        </button>
        <template v-if="dialogKind === 'menu'">
          <p class="g-eyebrow">{{ t('УНИВЕРСИТЕТ «ГЕНЕЗИС»') }}</p>
          <h2 id="genesis-dialog-title">{{ t('Ваша вселенная знаний') }}</h2>
          <nav class="g-dialog__menu" :aria-label="t('Меню университета')">
            <button
              v-for="item in [
                { id: 'directions', title: t('Образование') },
                { id: 'institutes', title: t('Институты') },
                { id: 'admissions', title: t('Поступающим') },
                { id: 'student-life', title: t('Обучающимся') },
                { id: 'science', title: t('Наука') },
                { id: 'university-news', title: t('Новости') },
                { id: 'contacts', title: t('Контакты') },
              ]"
              :key="item.id"
              type="button"
              @click="jumpTo(item.id)"
            >
              {{ t(item.title) }}<span aria-hidden="true">↗</span>
            </button>
          </nav>
          <a class="g-dialog__fish" :href="AQUARIUM_URL">
            {{ t('Школа аквариумистики') }} <span aria-hidden="true">↗</span></a
          >
        </template>
        <template v-else-if="dialogKind === 'search'">
          <p class="g-eyebrow">{{ t('НАЙДИТЕ СВОЮ ТРАЕКТОРИЮ') }}</p>
          <h2 id="genesis-dialog-title">{{ t('Поиск по университету') }}</h2>
          <label for="genesis-search" class="g-sr-only">
            {{ t('Название направления или раздела') }} </label
          ><input
            id="genesis-search"
            v-model="query"
            class="g-search-input"
            type="search"
            :placeholder="t('Направление или раздел')"
            autofocus
            autocomplete="off"
          />
          <p class="g-search-count" role="status">
            {{
              searchResults.length
                ? `${t('Найдено разделов:')} ${searchResults.length}`
                : t('Ничего не найдено. Попробуйте другое название.')
            }}
          </p>
          <ul class="g-search-results">
            <li v-for="item in searchResults" :key="item.id">
              <button type="button" @click="jumpTo(item.id)">
                {{ t(item.title) }}<span aria-hidden="true">↗</span>
              </button>
            </li>
          </ul>
        </template>
        <template v-else-if="dialogKind === 'coming-soon' || dialogKind === 'aquarium'">
          <div class="g-coming-mark">
            <img src="/genesis/s1-img.svg" width="64" height="64" alt="" />
          </div>
          <p class="g-eyebrow">
            {{
              dialogKind === 'aquarium' ? t('ВАША ВСЕЛЕННАЯ УЖЕ ОТКРЫТА') : t('СКОРО В «ГЕНЕЗИСЕ»')
            }}
          </p>
          <h2 id="genesis-dialog-title">{{ t(dialogTitle) }}</h2>
          <p class="g-dialog__text">{{ t(dialogText) }}</p>
          <div class="g-coming-actions">
            <GenesisAction v-if="dialogKind === 'aquarium'" :href="AQUARIUM_URL" tone="pink">
              {{ t('Открыть школу') }}
            </GenesisAction>
            <GenesisAction v-else tone="pink" @click="closeDialog">
              {{ t('Буду ждать') }}
            </GenesisAction>
          </div>
          <p class="g-coming-note">
            {{ t('Образование длиною в жизнь. Новые возможности — впереди.') }}
          </p>
        </template>
        <template v-else
          ><p class="g-eyebrow">{{ t('УНИВЕРСИТЕТ «ГЕНЕЗИС»') }}</p>
          <h2 id="genesis-dialog-title">{{ t(dialogTitle) }}</h2>
          <p class="g-dialog__text">{{ t(dialogText) }}</p>
          <GenesisAction tone="pink" @click="closeDialog">
            {{ t('Понятно') }}
          </GenesisAction></template
        >
      </div>
    </dialog>
  </div>
</template>
