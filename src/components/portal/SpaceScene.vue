<script setup lang="ts">
const assets = import.meta.glob('../../assets/digital-school/img*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;
const layers = [
  ['img', -300, -300, 2450, 1540, 0],
  ['img1', 63, 283, 351, 351, 18],
  ['img2', 1510, 250, 300, 300, 0],
  ['img3', 1545, 285, 230, 230, 0],
  ['img4', 1590, 340, 56, 56, 0],
  ['img5', 1665, 420, 70, 70, 0],
  ['img6', 1620, 450, 30, 30, 0],
  ['img7', 364, 179, 72, 72, 0],
  ['img8', 386, 201, 18, 18, 0],
  ['img9', 1450, 140, 60, 60, 0],
  ['img10', 168, 758, 64, 64, 0],
  ['img11', 186, 750, 60, 60, 0],
  ['img12', -300, 0, 2800, 1740, 0],
  ['img20', 999, 978, 42, 40, 0],
  ['img21', 103, 862, 34, 33, 0],
] as const;
</script>

<template>
  <div class="ds-space" aria-hidden="true">
    <svg
      class="ds-space-canvas"
      viewBox="0 0 1920 1240"
      width="1920"
      height="1240"
      preserveAspectRatio="xMidYMid slice"
    >
      <image
        v-for="(layer, index) in layers"
        :key="index"
        :href="assets[`../../assets/digital-school/${layer[0]}.svg`]"
        :x="layer[1]"
        :y="layer[2]"
        :width="layer[3]"
        :height="layer[4]"
        :transform="`rotate(${layer[5]} ${layer[1] + layer[3] / 2} ${layer[2] + layer[4] / 2})`"
      />
      <g transform="translate(1111.25 985)">
        <g
          v-for="(book, index) in [
            { x: 0, y: 140, width: 312.5, fill: '#8a2be2' },
            { x: 20, y: 80, width: 287.5, fill: '#c77dff' },
            { x: 7.5, y: 20, width: 300, fill: '#5b21b6' },
          ]"
          :key="index"
          :transform="`translate(${book.x} ${book.y})`"
        >
          <rect :width="book.width" height="57.5" rx="15" :fill="book.fill" />
          <rect :x="book.width - 20" y="9" width="15" height="40" rx="4" fill="#f3e8ff" />
          <rect x="27.5" y="23" width="87.5" height="10" rx="5" fill="#ffffff99" />
        </g>
      </g>
      <g transform="translate(920 840) rotate(-12 85 34)">
        <rect width="170" height="68" rx="12" fill="#c77dff" />
        <rect x="156" y="6" width="10" height="56" rx="4" fill="#f3e8ff" />
        <rect x="18" y="30" width="68" height="8" rx="4" fill="#ffffff99" />
      </g>
      <g transform="translate(1320 775) rotate(14 75 30)">
        <rect width="150" height="60" rx="12" fill="#8a2be2" />
        <rect x="136" y="6" width="10" height="48" rx="4" fill="#f3e8ff" />
        <rect x="18" y="26" width="60" height="8" rx="4" fill="#ffffff99" />
      </g>
    </svg>
  </div>
</template>
