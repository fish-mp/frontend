<script setup lang="ts">
import { directions } from '../../data/directions';

const planets = [
  { color: '#9b65ed', detail: '#b98cff', size: 64 },
  { color: '#ffc65a', detail: '#f79522', size: 80 },
  { color: '#9652e6', detail: '#ffb22f', size: 92 },
  { color: '#c85713', detail: '#ed7f22', size: 74 },
  { color: '#f8790b', detail: '#e45a0e', size: 112 },
  { color: '#ffbc35', detail: '#f49324', size: 98 },
  { color: '#9bd4e4', detail: '#ccebf0', size: 100 },
];
</script>

<template>
  <div class="ds-solar-system">
    <div class="ds-solar-sun" aria-hidden="true">
      <svg viewBox="0 0 300 300" width="300" height="300" fill="none">
        <path
          fill="#fff781"
          d="m150 0 22 34 36-22 8 40 42-5-8 42 40 11-25 34 35 24-35 23 22 35-40 8 5 42-42-8-11 40-34-25-24 35-23-35-35 22-8-40-42 5 8-42-40-11 25-34L0 126l35-23-22-35 40-8-5-42 42 8 11-26 26 35Z"
        />
        <circle cx="143" cy="145" r="105" fill="#ffed39" />
        <circle cx="124" cy="126" r="73" fill="#fff45a" />
      </svg>
    </div>
    <svg class="ds-solar-mascot" viewBox="0 0 150 150" width="110" height="110" aria-hidden="true">
      <path d="m80 4 15 44 47 17-39 26-4 48-38-31-46 15 17-45L4 39l48 3Z" fill="#ffb000" />
      <ellipse cx="65" cy="53" rx="10" ry="17" fill="white" transform="rotate(14 65 53)" />
      <ellipse cx="89" cy="60" rx="10" ry="17" fill="white" transform="rotate(14 89 60)" />
      <ellipse cx="67" cy="55" rx="4.5" ry="9" fill="#241044" />
      <ellipse cx="90" cy="62" rx="4.5" ry="9" fill="#241044" />
      <path
        d="M65 89q7 12 15 1"
        fill="none"
        stroke="#241044"
        stroke-width="4"
        stroke-linecap="round"
      />
    </svg>
    <span
      v-for="star in 12"
      :key="star"
      class="ds-solar-star"
      :style="{
        left: `${(star * 37) % 100}%`,
        top: `${(star * 23) % 90}%`,
        animationDelay: `${star * 0.3}s`,
      }"
      aria-hidden="true"
      >✦</span
    >
    <nav class="ds-planets" aria-label="Выбрать школу на планете">
      <router-link
        v-for="(direction, index) in directions"
        :key="direction.id"
        :to="direction.to || { path: '/', hash: `#${direction.id}` }"
        class="ds-planet-link"
        :style="{ '--planet-size': `${planets[index]!.size}px` }"
        :aria-label="`${direction.title}, ${direction.audience}${direction.to ? ' — перейти в школу' : ' — направление готовится к запуску'}`"
      >
        <span class="ds-planet-orbit" aria-hidden="true">
          <svg class="ds-planet-picture" viewBox="0 0 160 160" width="160" height="160">
            <defs>
              <clipPath :id="`school-planet-clip-${direction.id}`">
                <circle cx="80" cy="80" r="53" />
              </clipPath>
              <radialGradient :id="`school-planet-light-${direction.id}`" cx="28%" cy="25%" r="85%">
                <stop stop-color="#fff" stop-opacity=".18" />
                <stop offset=".55" stop-color="#fff" stop-opacity="0" />
                <stop offset="1" stop-color="#251047" stop-opacity=".22" />
              </radialGradient>
            </defs>
            <ellipse
              v-if="index === 5 || index === 6"
              cx="80"
              cy="80"
              rx="74"
              ry="23"
              fill="none"
              :stroke="index === 5 ? '#392056' : '#d4f7ff'"
              stroke-width="4"
              :transform="`rotate(${index === 5 ? -35 : -75} 80 80)`"
            />
            <g :clip-path="`url(#school-planet-clip-${direction.id})`">
              <g class="ds-planet-surface">
                <circle cx="80" cy="80" r="53" :fill="planets[index]!.color" />
                <g :fill="planets[index]!.detail">
                  <template v-if="index === 0">
                    <path d="m40 40 35 8-9 22 28 22-27 40-10-35-25-13Zm58-8 31 19-13 28-20-14Z" />
                    <circle cx="107" cy="111" r="12" />
                  </template>
                  <template v-else-if="index === 1 || index === 2">
                    <path
                      d="m32 42 30-9 17 17 22-7 8 21-25 10-6 30-24 3 3-26-27-13Zm71 43 30-5 12 30-30 23-14-23-17-5Z"
                    />
                    <path d="m90 27 17 3-3 15-16-4Z" />
                  </template>
                  <template v-else-if="index === 3">
                    <path
                      d="M20 46q40-20 95 1l30 16-8 17Q77 51 20 79ZM22 103q37-21 108-3v16q-60-8-105 12Z"
                    />
                  </template>
                  <template v-else-if="index === 4">
                    <path
                      d="M14 47q30-22 68-5t65 3v20q-31 10-67-3T14 66ZM13 87q33-20 69-1t65-5v25q-31 15-68-2T13 112ZM20 126q30-18 66-2t52-4v27H20Z"
                    />
                  </template>
                  <template v-else-if="index === 5">
                    <path
                      d="m10 90 95-95 16 16-95 95Zm15 25 95-95 16 16-95 95Zm20 26 95-95 17 17-95 95Z"
                    />
                  </template>
                  <template v-else>
                    <path
                      d="M34 17q-15 34 7 63t2 64h28q25-40-1-72T66 17Zm54 0q-15 34 7 63t2 64h28q25-40-1-72t-4-55Z"
                    />
                  </template>
                </g>
              </g>
              <circle cx="80" cy="80" r="53" :fill="`url(#school-planet-light-${direction.id})`" />
            </g>
            <path
              v-if="index === 5"
              d="M20 108q-17 25 16 13t67-43q45-38 34-46"
              fill="none"
              stroke="#392056"
              stroke-width="4"
              stroke-linecap="round"
            />
            <path
              v-if="index === 6"
              d="M65 148q19 5 28-33t2-76q-3-29-15-30"
              fill="none"
              stroke="#d4f7ff"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg>
        </span>
        <span class="ds-planet-name">{{ direction.title }}</span>
        <span class="ds-planet-age">{{ direction.audience }}</span>
      </router-link>
    </nav>
    <p class="ds-planets-hint">Листай планеты и выбирай свою школу →</p>
  </div>
</template>
