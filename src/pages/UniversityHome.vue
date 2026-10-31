<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import GenesisAction from '../components/genesis/GenesisAction.vue';
import { discoveries, institutes, news, programs, universes } from '../data/genesis';
import { AQUARIUM_URL } from '../utils/site';
import '../assets/css/genesis.css';

const page = ref<HTMLElement>();
const dialog = ref<HTMLDialogElement>();
const dialogKind = ref<'menu' | 'search' | 'info'>('menu');
const dialogTitle = ref('');
const dialogText = ref('');
const query = ref('');
const highContrast = ref(false);
let observer: IntersectionObserver | undefined;

const searchItems: Array<{ title: string; id: string; aliases?: string }> = [
  ...programs.map((p) => ({
    title: p.title.replace(/\n/g, ' '),
    id: p.id,
    aliases: p.id === 'dpo' ? 'ДПО' : '',
  })),
  { title: 'Колледж', id: 'college' },
  { title: 'Институты университета', id: 'institutes' },
  ...discoveries.map((d) => ({ title: d.title, id: d.id })),
  { title: 'Новости университета', id: 'university-news' },
  { title: 'Контакты университета', id: 'contacts' },
];
const searchResults = computed(() => {
  const value = query.value.trim().toLocaleLowerCase('ru');
  return searchItems.filter((item) =>
    `${item.title} ${item.aliases || ''}`.toLocaleLowerCase('ru').includes(value)
  );
});

async function openDialog(kind: 'menu' | 'search' | 'info', title = '', text = '') {
  dialogKind.value = kind;
  dialogTitle.value = title;
  dialogText.value = text;
  query.value = '';
  await nextTick();
  dialog.value?.showModal();
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

function tiltGalaxy(event: PointerEvent) {
  if (
    event.pointerType !== 'mouse' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
    return;
  const target = event.currentTarget as HTMLElement;
  const bounds = target.getBoundingClientRect();
  target.style.setProperty(
    '--tilt-x',
    `${(0.5 - (event.clientY - bounds.top) / bounds.height) * 12}deg`
  );
  target.style.setProperty(
    '--tilt-y',
    `${((event.clientX - bounds.left) / bounds.width - 0.5) * 14}deg`
  );
}

function resetGalaxy(event: PointerEvent) {
  const target = event.currentTarget as HTMLElement;
  target.style.removeProperty('--tilt-x');
  target.style.removeProperty('--tilt-y');
}

function toggleContrast() {
  highContrast.value = !highContrast.value;
  try {
    localStorage.setItem('genesis-contrast', String(highContrast.value));
  } catch {
    /* Storage may be disabled. */
  }
}

onMounted(() => {
  try {
    highContrast.value = localStorage.getItem('genesis-contrast') === 'true';
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
  closeDialog();
});
</script>

<template>
  <div ref="page" class="genesis" :class="{ 'genesis--contrast': highContrast }">
    <a class="g-skip" href="#university-main">Перейти к содержимому</a>

    <div class="g-shell g-top">
      <header class="g-header" aria-label="Шапка университета">
        <div class="g-header__brand">
          <button
            class="g-icon-button g-menu-button"
            type="button"
            aria-label="Открыть меню университета"
            aria-haspopup="dialog"
            @click="openDialog('menu')"
          >
            <img src="/genesis/s1-imgMenu.svg" width="24" height="24" alt="" />
          </button>
          <a class="g-brand" href="#" aria-label="Генезис — главная">
            <img src="/genesis/s1-img.svg" width="48" height="48" alt="" />
            <span>ГЕНЕЗИС</span>
          </a>
        </div>
        <nav class="g-header__nav" aria-label="Основная навигация">
          <a href="#admissions">Поступающим</a>
          <a href="#student-life">Обучающимся</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <div class="g-header__tools">
          <button
            class="g-icon-button"
            type="button"
            aria-label="Поиск по сайту"
            aria-haspopup="dialog"
            @click="openDialog('search')"
          >
            <img src="/genesis/s1-imgSearch.svg" width="24" height="24" alt="" />
          </button>
          <button
            class="g-icon-button g-contrast-button"
            type="button"
            aria-label="Повышенная контрастность"
            :aria-pressed="highContrast"
            @click="toggleContrast"
          >
            <img src="/genesis/s1-imgEye.svg" width="24" height="24" alt="" />
          </button>
          <span class="g-language" aria-label="Язык сайта: русский"
            >RU <img src="/genesis/s1-imgChevron.svg" width="16" height="16" alt=""
          /></span>
          <GenesisAction
            class="g-login"
            tone="outline"
            :icon="'/genesis/s1-imgArrow1.svg'"
            @click="
              openDialog(
                'info',
                'Личный кабинет',
                'Вход и регистрация в университете скоро станут доступны.'
              )
            "
            >Вход / Регистрация</GenesisAction
          >
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
              <p class="g-eyebrow">ОБРАЗОВАНИЕ ДЛИНОЮ В ЖИЗНЬ</p>
              <h1 id="university-title">
                Университет непрерывного<br class="g-desktop-break" />
                цифрового образования <strong>«Генезис»</strong>
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
                  <p class="g-eyebrow">ИНСТИТУТ / {{ institute.number }}</p>
                  <h2>{{ institute.title }}</h2>
                </div>
                <span class="g-inline-link"
                  >Об институте <img src="/genesis/s1-img2.svg" width="18" height="18" alt=""
                /></span>
              </a>
            </div>
            <div class="g-intro__actions">
              <GenesisAction href="#admissions" tone="pink">Поступить</GenesisAction>
              <GenesisAction href="#directions" tone="text" icon="/genesis/s1-imgDiag.svg"
                >Выбрать направление</GenesisAction
              >
            </div>
          </div>

          <div class="g-universes">
            <p class="g-eyebrow">ВСЕЛЕННАЯ ВАШИХ ВОЗМОЖНОСТЕЙ</p>
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
                    ? 'Открыть школу аквариумистики'
                    : 'Направление готовится к открытию'
                "
                class="g-galaxy"
                :data-universe="universe.id"
                @pointermove="tiltGalaxy"
                @pointerleave="resetGalaxy"
              >
                <span class="g-galaxy__space"
                  ><img
                    class="g-galaxy__image"
                    :src="universe.image"
                    width="194"
                    height="194"
                    alt=""
                    fetchpriority="high"
                /></span>
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
          <p class="g-eyebrow">ОБРАЗОВАТЕЛЬНЫЕ НАПРАВЛЕНИЯ</p>
          <h2 id="directions-title">Ваша следующая ступень</h2>
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
                  <dt>Программы</dt>
                  <dd>—</dd>
                </div>
                <div>
                  <dt>Формат</dt>
                  <dd>Уточняется</dd>
                </div>
                <div>
                  <dt>Ближайший набор</dt>
                  <dd>Даты уточняются</dd>
                </div>
              </dl>
              <div v-else class="g-school-facts">
                <p>Программы: — · Формат уточняется</p>
                <p>Ближайший набор: даты уточняются</p>
              </div>
              <GenesisAction
                :href="program.id === 'aquarium' ? AQUARIUM_URL : undefined"
                :unavailable="program.id !== 'aquarium'"
                :tone="['plum', 'purple'].includes(program.theme) ? 'pink' : 'dark'"
                :icon="
                  ['plum', 'purple'].includes(program.theme)
                    ? '/genesis/s2-imgArrow1.svg'
                    : '/genesis/s2-imgArrow.svg'
                "
                >Подробнее</GenesisAction
              >
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
              <p class="g-eyebrow">ОБРАЗОВАТЕЛЬНОЕ НАПРАВЛЕНИЕ</p>
              <h3 id="college-title">Колледж</h3>
              <p>Экономическое направление</p>
            </div>
            <GenesisAction tone="outline" unavailable>Подробнее</GenesisAction>
          </article>
        </div>

        <div id="institutes" class="g-institutes" tabindex="-1">
          <div class="g-institutes__heading g-reveal">
            <p class="g-eyebrow">СТРУКТУРА УНИВЕРСИТЕТА</p>
            <h2>Два института — общие возможности</h2>
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
                <p class="g-eyebrow">ИНСТИТУТ / {{ institute.number }}</p>
                <h3>{{ institute.title }}</h3>
                <p>{{ institute.description }}</p>
              </div>
              <div class="g-institute__nav">
                <div class="g-institute__links">
                  <GenesisAction tone="text" icon="/genesis/s2-img3.svg" unavailable
                    >Кафедры</GenesisAction
                  ><GenesisAction tone="text" icon="/genesis/s2-img3.svg" unavailable
                    >Лаборатории и центры</GenesisAction
                  >
                </div>
                <GenesisAction
                  tone="outline"
                  @click="
                    openDialog(
                      'info',
                      `Институт ${institute.title.replace(/\n/g, ' ')}`,
                      institute.description.replace(/\n/g, ' ')
                    )
                  "
                  >Об институте</GenesisAction
                >
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
            <p class="g-eyebrow">ПОЛЕЗНЫЕ РАЗДЕЛЫ</p>
            <h2 id="discover-title">Откройте «Генезис»</h2>
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
                <h3>{{ item.title }}</h3>
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
                unavailable
                >Подробнее</GenesisAction
              >
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
            <p class="g-eyebrow">НОВОСТИ И СОБЫТИЯ</p>
            <h2 id="news-title">В орбите университета</h2>
          </div>
          <GenesisAction href="#news-cards" tone="text" icon="/genesis/s4-imgDiag.svg"
            >Все новости</GenesisAction
          >
        </div>
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
              <p class="g-eyebrow">{{ item.category }} / ДАТА УТОЧНЯЕТСЯ</p>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <GenesisAction
                tone="text"
                icon="/genesis/s4-imgDiag.svg"
                @click="
                  openDialog(
                    'info',
                    item.title,
                    `${item.description} Материал готовится к публикации.`
                  )
                "
                >Читать</GenesisAction
              >
            </div>
          </article>
        </div>
      </section>

      <section class="g-shell g-cta-shell" aria-labelledby="next-step-title">
        <div class="g-cta g-reveal">
          <div>
            <h2 id="next-step-title">Ваш следующий шаг<br />начинается здесь.</h2>
            <p>Выберите направление и откройте свою вселенную знаний.</p>
          </div>
          <GenesisAction href="#admissions" icon="/genesis/s5-imgArrow.svg"
            >Поступить</GenesisAction
          >
        </div>
      </section>
    </main>

    <footer id="contacts" class="g-footer" tabindex="-1">
      <div class="g-shell">
        <div class="g-footer__grid">
          <div class="g-footer__about">
            <a href="#" class="g-brand"
              ><img src="/genesis/s6-img.svg" width="48" height="48" alt="" loading="lazy" /><span
                >ГЕНЕЗИС</span
              ></a
            >
            <p>АНО «Университет непрерывного<br />цифрового образования „Генезис“»</p>
            <p>Образование длиною в жизнь.</p>
          </div>
          <nav class="g-footer__column" aria-label="Образование">
            <h2>Образование</h2>
            <template v-for="universe in universes" :key="universe.id"
              ><a v-if="universe.id === 'aquarium'" :href="AQUARIUM_URL">{{ universe.name }}</a
              ><span v-else>{{ universe.name }}</span></template
            ><a href="#institutes">Институты</a>
          </nav>
          <nav class="g-footer__column" aria-label="Университет">
            <h2>Университет</h2>
            <a href="#admissions">Поступающим</a><a href="#student-life">Обучающимся</a
            ><a href="#science">Наука</a><a href="#student-life">Студенческая жизнь</a
            ><a href="#university-news">Новости</a>
          </nav>
          <div class="g-footer__column">
            <h2>Связаться с нами</h2>
            <button
              type="button"
              @click="
                openDialog(
                  'info',
                  'Контакты университета',
                  'Контактная информация университета будет опубликована здесь.'
                )
              "
            >
              Контакты университета</button
            ><button
              type="button"
              @click="
                openDialog('info', 'Обратная связь', 'Сервис обратной связи скоро станет доступен.')
              "
            >
              Обратная связь</button
            ><button
              type="button"
              @click="
                openDialog(
                  'info',
                  'Личный кабинет',
                  'Вход и регистрация в университете скоро станут доступны.'
                )
              "
            >
              Личный кабинет
            </button>
          </div>
        </div>
        <div class="g-footer__legal">
          <p>© 2026 «Генезис»</p>
          <button
            type="button"
            @click="
              openDialog(
                'info',
                'Сведения об образовательной организации',
                'АНО «Университет непрерывного цифрового образования „Генезис“». Сведения и документы готовятся к публикации.'
              )
            "
          >
            Сведения об образовательной организации</button
          ><button type="button" aria-disabled="true" title="Документ готовится к публикации">
            Политика конфиденциальности
          </button>
        </div>
      </div>
    </footer>

    <dialog
      ref="dialog"
      class="g-dialog"
      :class="{ 'g-dialog--menu': dialogKind === 'menu' }"
      aria-labelledby="genesis-dialog-title"
      @keydown.esc.capture.stop.prevent="closeDialog"
      @click="$event.target === $event.currentTarget && closeDialog()"
    >
      <div class="g-dialog__inner">
        <button
          class="g-dialog__close g-icon-button"
          type="button"
          aria-label="Закрыть окно"
          @click="closeDialog"
        >
          ×
        </button>
        <template v-if="dialogKind === 'menu'">
          <p class="g-eyebrow">УНИВЕРСИТЕТ «ГЕНЕЗИС»</p>
          <h2 id="genesis-dialog-title">Ваша вселенная знаний</h2>
          <nav class="g-dialog__menu" aria-label="Меню университета">
            <button
              v-for="item in [
                { id: 'directions', title: 'Образование' },
                { id: 'institutes', title: 'Институты' },
                { id: 'admissions', title: 'Поступающим' },
                { id: 'student-life', title: 'Обучающимся' },
                { id: 'science', title: 'Наука' },
                { id: 'university-news', title: 'Новости' },
                { id: 'contacts', title: 'Контакты' },
              ]"
              :key="item.id"
              type="button"
              @click="jumpTo(item.id)"
            >
              {{ item.title }}<span aria-hidden="true">↗</span>
            </button>
          </nav>
          <a class="g-dialog__fish" :href="AQUARIUM_URL"
            >Школа аквариумистики <span aria-hidden="true">↗</span></a
          >
        </template>
        <template v-else-if="dialogKind === 'search'">
          <p class="g-eyebrow">НАЙДИТЕ СВОЮ ТРАЕКТОРИЮ</p>
          <h2 id="genesis-dialog-title">Поиск по университету</h2>
          <label for="genesis-search" class="g-sr-only">Название направления или раздела</label
          ><input
            id="genesis-search"
            v-model="query"
            class="g-search-input"
            type="search"
            placeholder="Направление или раздел"
            autofocus
            autocomplete="off"
          />
          <p class="g-search-count" role="status">
            {{
              searchResults.length
                ? `Найдено разделов: ${searchResults.length}`
                : 'Ничего не найдено. Попробуйте другое название.'
            }}
          </p>
          <ul class="g-search-results">
            <li v-for="item in searchResults" :key="item.id">
              <button type="button" @click="jumpTo(item.id)">
                {{ item.title }}<span aria-hidden="true">↗</span>
              </button>
            </li>
          </ul>
        </template>
        <template v-else
          ><p class="g-eyebrow">УНИВЕРСИТЕТ «ГЕНЕЗИС»</p>
          <h2 id="genesis-dialog-title">{{ dialogTitle }}</h2>
          <p class="g-dialog__text">{{ dialogText }}</p>
          <GenesisAction tone="pink" @click="closeDialog">Понятно</GenesisAction></template
        >
      </div>
    </dialog>
  </div>
</template>
