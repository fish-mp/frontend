import type { AquariumGroup } from './species'

interface Swimmer {
  key: string
  group: AquariumGroup
  x: number
  y: number
  direction: number
  phase: number
  depth: number
  turn: number
}

const TAU = Math.PI * 2
const seed = (text: string) => {
  let hash = 2166136261
  for (const char of text) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619)
  // Avalanche the hash so adjacent individuals don't get almost identical
  // positions, phases and plant heights.
  hash = Math.imul(hash ^ (hash >>> 16), 0x85ebca6b)
  hash = Math.imul(hash ^ (hash >>> 13), 0xc2b2ae35)
  hash ^= hash >>> 16
  return (hash >>> 0) / 4294967296
}

export function createAquariumScene(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  let width = 1000
  let height = 440
  let swimmers: Swimmer[] = []
  let time = 0
  const images = new Map<string, HTMLImageElement>()

  function resize(w: number, h: number) {
    width = w
    height = h
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function sync(groups: AquariumGroup[]) {
    const previous = new Map(swimmers.map((fish) => [fish.key, fish]))
    swimmers = groups.flatMap((group) => {
      if (group.appearance.kind === 'photo' && group.image && !images.has(group.image)) {
        const img = new Image()
        img.onload = () => draw(0)
        img.src = group.image
        images.set(group.image, img)
      }
      return Array.from({ length: group.quantity }, (_, index) => {
        const key = `${group.id}:${index}`
        const old = previous.get(key)
        if (old) return { ...old, group }
        const phase = seed(key) * TAU
        return {
          key, group, x: 0.12 + seed(`${key}:x`) * 0.76,
          y: group.appearance.zone, direction: seed(`${key}:d`) > 0.5 ? 1 : -1,
          phase, depth: 0.76 + seed(`${key}:z`) * 0.3, turn: 1,
        }
      })
    })
  }

  function ellipse(x: number, y: number, rx: number, ry: number, fill: string) {
    ctx.beginPath()
    ctx.ellipse(x, y, rx, ry, 0, 0, TAU)
    ctx.fillStyle = fill
    ctx.fill()
  }

  function path(points: number[], fill: string | CanvasGradient, stroke?: string) {
    ctx.beginPath()
    ctx.moveTo(points[0]!, points[1]!)
    for (let i = 2; i < points.length; i += 2) ctx.lineTo(points[i]!, points[i + 1]!)
    ctx.closePath()
    ctx.fillStyle = fill
    ctx.fill()
    if (stroke) { ctx.strokeStyle = stroke; ctx.stroke() }
  }

  function plant(x: number, base: number, tall: number, leaves: number, phase: number, front = false) {
    ctx.save()
    ctx.translate(x, base)
    const sway = Math.sin(time * 0.6 + phase) * 9
    ctx.strokeStyle = front ? '#397b57' : '#24594c'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(-7, -tall * 0.4, sway, -tall * 0.8, sway * 1.7, -tall)
    ctx.stroke()
    for (let i = 1; i <= leaves; i++) {
      const fraction = i / (leaves + 1)
      const y = -tall * fraction
      const stem = sway * fraction * fraction
      const length = (1 - fraction * 0.55) * tall * 0.3
      for (const side of [-1, 1]) {
        const tip = stem + side * length + Math.sin(time * 0.75 + phase + i) * 3
        const gradient = ctx.createLinearGradient(stem, y, tip, y - length * 0.5)
        gradient.addColorStop(0, front ? '#34794d' : '#205343')
        gradient.addColorStop(1, front ? '#83b962' : '#4b9270')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.moveTo(stem, y)
        ctx.quadraticCurveTo(tip * 0.7, y - length, tip, y - length * 0.62)
        ctx.quadraticCurveTo(tip * 0.9, y + length * 0.12, stem, y)
        ctx.fill()
      }
    }
    ctx.restore()
  }

  function rock(x: number, y: number, size: number, phase: number) {
    ctx.save()
    ctx.translate(x, y)
    const gradient = ctx.createLinearGradient(-size, -size, size, size * 0.2)
    gradient.addColorStop(0, '#84958c')
    gradient.addColorStop(0.45, '#475c56')
    gradient.addColorStop(1, '#233d38')
    path([-size, 0, -size * 0.82, -size * 0.55, -size * 0.3, -size * (0.9 + phase * 0.2), size * 0.3, -size * 0.86, size * 0.8, -size * 0.35, size, 0], gradient)
    path([-size * 0.3, -size * 0.94, size * 0.3, -size * 0.86, size * 0.03, -size * 0.4, -size * 0.65, -size * 0.3], '#ffffff0c')
    ellipse(-size * 0.36, -size * 0.68, size * 0.35, size * 0.08, '#608354')
    ctx.restore()
  }

  function drawFish(fish: Swimmer) {
    const a = fish.group.appearance
    const size = a.size * fish.depth * Math.min(1.2, Math.max(0.72, width / 900))
    const round = a.kind === 'round' || a.kind === 'angel'
    const bodyHeight = round ? 0.32 : a.kind === 'slender' || a.kind === 'glass' ? 0.115 : 0.21
    const beat = Math.sin(time * (a.speed * 8 + 3) + fish.phase)
    ctx.save()
    ctx.translate(fish.x * width, fish.y * height)
    ctx.scale(size * fish.direction * fish.turn, size)
    ctx.rotate(Math.sin(time * 0.6 + fish.phase) * 0.035)
    ctx.globalAlpha = 0.88 + (fish.depth - 0.76) * 0.3

    if (a.kind === 'photo') {
      const img = fish.group.image && images.get(fish.group.image)
      if (img && img.complete && img.naturalWidth) {
        ctx.save()
        ctx.beginPath()
        ctx.ellipse(0, 0, 0.48, 0.33, 0, 0, TAU)
        ctx.clip()
        const ratio = img.naturalWidth / img.naturalHeight
        const w = Math.max(0.96, 0.66 * ratio)
        const h = w / ratio
        ctx.drawImage(img, -w / 2, -h / 2, w, h)
        ctx.restore()
        ctx.restore()
        return
      }
    }

    // The tail and pectoral fins move independently of the body.
    ctx.save()
    ctx.translate(-0.34, 0)
    ctx.scale(0.9 + beat * 0.12, 1)
    const fan = a.kind === 'fancy' ? 0.39 : round ? 0.28 : 0.2
    ctx.globalAlpha *= a.kind === 'glass' ? 0.3 : 0.75
    path([0.04, 0, -0.4, -fan, -0.34 + beat * 0.04, 0, -0.4, fan], a.fins || a.accent)
    if (a.tail === 'sword') path([-0.12, 0.09, -0.8, 0.25, -0.36, 0.13], a.accent)
    if (a.tail === 'veil') {
      path([0, 0, -0.68, -0.32, -0.39, -0.05, -0.45, 0.08, -0.66, 0.32], a.fins || a.accent)
    }
    ctx.lineWidth = 0.006
    ctx.strokeStyle = '#e8fff857'
    for (let i = -3; i <= 3; i++) {
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-0.37, fan * i / 3); ctx.stroke()
    }
    ctx.restore()

    ctx.save()
    ctx.globalAlpha *= 0.5
    path([-0.22, -bodyHeight * 0.5, -0.05, -bodyHeight * (a.kind === 'angel' || a.sail ? 2.7 : 1.9), 0.22, -bodyHeight * 0.5], a.fins || a.accent)
    path([-0.2, bodyHeight * 0.6, -0.1, bodyHeight * (a.kind === 'angel' ? 2.3 : 1.6), 0.26, bodyHeight * 0.6], a.fins || a.accent)
    ctx.restore()

    const body = ctx.createLinearGradient(0, -bodyHeight, 0, bodyHeight)
    body.addColorStop(0, a.kind === 'glass' ? '#dbfff74a' : a.accent)
    body.addColorStop(0.45, a.kind === 'glass' ? '#c8f7ed22' : a.color)
    body.addColorStop(0.75, a.kind === 'glass' ? '#c8f7ed0a' : a.color)
    body.addColorStop(1, a.kind === 'glass' ? '#e6fff835' : '#dfedcd')
    ctx.beginPath()
    ctx.moveTo(-0.39, 0)
    ctx.bezierCurveTo(-0.16, -bodyHeight * 1.15, 0.21, -bodyHeight * 1.25, 0.44, -0.015)
    ctx.bezierCurveTo(0.46, bodyHeight * 0.35, 0.1, bodyHeight * 1.3, -0.15, bodyHeight * 0.65)
    ctx.closePath()
    ctx.fillStyle = body; ctx.fill()
    ctx.strokeStyle = a.kind === 'glass' ? '#d6fff899' : '#e3fff02b'
    ctx.lineWidth = 0.008; ctx.stroke()

    ctx.save()
    ctx.clip()
    if (a.pattern === 'stripe') {
      ctx.strokeStyle = a.accent; ctx.globalAlpha *= 0.65; ctx.lineWidth = 0.045
      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        if (a.kind === 'slender') {
          ctx.moveTo(-0.36, (i - 1.5) * 0.045); ctx.lineTo(0.38, (i - 1.5) * 0.045)
        } else {
          ctx.moveTo(-0.24 + i * 0.14, -0.4); ctx.lineTo(-0.32 + i * 0.14, 0.4)
        }
        ctx.stroke()
      }
    }
    if (a.pattern === 'neon') {
      ctx.fillStyle = '#ea4d58'; ctx.fillRect(-0.36, 0.02, a.redLength || 0.34, 0.1)
      ctx.shadowColor = '#1bedf5'; ctx.shadowBlur = 7
      ctx.fillStyle = a.accent; ctx.fillRect(-0.33, -0.025, 0.69, 0.035)
    }
    if (a.pattern === 'spots') {
      for (let i = 0; i < 19; i++) ellipse(-0.3 + seed(`${i}:x`) * 0.63, (seed(`${i}:y`) - 0.5) * bodyHeight * 1.6, 0.014, 0.018, a.accent)
    }
    if (a.pattern === 'horizontal' || a.pattern === 'auratus' || a.pattern === 'pearl') {
      ctx.strokeStyle = a.accent; ctx.lineWidth = 0.026
      for (const y of a.pattern === 'auratus' ? [-0.08, 0.05] : [0]) {
        ctx.beginPath(); ctx.moveTo(-0.38, y); ctx.lineTo(0.38, y); ctx.stroke()
      }
    }
    if (a.pattern === 'wedge') path([-0.34, 0, 0.05, -bodyHeight * 0.9, 0.02, bodyHeight * 0.9], a.accent)
    if (a.pattern === 'panda') {
      path([0.22, -0.3, 0.32, -0.3, 0.4, 0.3, 0.25, 0.3], a.accent)
      ellipse(-0.29, 0, 0.065, bodyHeight, a.accent)
    }
    if (a.pattern === 'serpae') ellipse(0.15, -0.035, 0.038, 0.075, a.accent)
    if (a.pattern === 'rio') {
      const red = ctx.createLinearGradient(-0.3, 0, 0.2, 0)
      red.addColorStop(0, '#d65349'); red.addColorStop(1, '#d6534900')
      ctx.fillStyle = red; ctx.fillRect(-0.4, -bodyHeight, 0.7, bodyHeight * 2)
    }
    if (a.pattern === 'firemouth') ellipse(0.27, bodyHeight * 0.7, 0.2, bodyHeight * 0.65, a.accent)
    if (a.pattern === 'pearl' || a.pattern === 'marble') {
      for (let i = 0; i < (a.pattern === 'pearl' ? 60 : 12); i++) {
        const pearl = a.pattern === 'pearl'
        ellipse(-0.35 + seed(`pattern:${i}:x`) * 0.75,
          (seed(`pattern:${i}:y`) - 0.5) * bodyHeight * 2,
          pearl ? 0.008 : 0.025 + seed(`size:${i}`) * 0.035,
          pearl ? 0.01 : 0.03 + seed(`size:${i}`) * 0.06,
          pearl ? '#f2e9d9' : a.accent)
      }
    }
    if (a.kind === 'glass') {
      ctx.strokeStyle = '#e7f8ddac'; ctx.lineWidth = 0.009
      ctx.beginPath(); ctx.moveTo(-0.34, 0); ctx.lineTo(0.28, 0); ctx.stroke()
      for (let i = 0; i < 14; i++) {
        const x = -0.3 + i * 0.037
        ctx.beginPath(); ctx.moveTo(x - 0.025, -0.065); ctx.lineTo(x, 0); ctx.lineTo(x - 0.025, 0.065); ctx.stroke()
      }
      ellipse(0.27, 0.02, 0.075, 0.06, '#bec6a76b')
    }
    ctx.restore()
    ctx.shadowBlur = 0
    ctx.save()
    ctx.globalAlpha *= 0.5
    path([0.12, 0.02, -0.04, 0.1 + beat * 0.035, 0.04, 0.025], '#e3f5df')
    ctx.restore()
    ellipse(0.315, -0.04, 0.031, 0.035, '#e5ddaa')
    ellipse(0.322, -0.04, 0.019, 0.025, '#10272c')
    ellipse(0.328, -0.05, 0.006, 0.008, '#ffffff')
    ctx.strokeStyle = '#e0f6dc83'; ctx.lineWidth = 0.008
    if (a.kind === 'glass' || a.kind === 'catfish') {
      for (const side of [-1, 1]) {
        ctx.beginPath(); ctx.moveTo(0.4, 0.025)
        ctx.quadraticCurveTo(0.63, 0.06 * side, 0.62, (0.16 + beat * 0.02) * side); ctx.stroke()
      }
    }
    if (a.kind === 'angel' || a.feelers) {
      for (const offset of [0, 0.06]) {
        ctx.beginPath(); ctx.moveTo(0.15 + offset, bodyHeight * 0.7)
        ctx.quadraticCurveTo(0.11 + offset, 0.58, -0.08 + offset + beat * 0.035, a.kind === 'angel' ? 0.74 : 0.56); ctx.stroke()
      }
    }
    ctx.restore()
  }

  function draw(dt: number) {
    time += dt
    ctx.clearRect(0, 0, width, height)
    const water = ctx.createLinearGradient(0, 0, width * 0.5, height)
    water.addColorStop(0, '#153f40'); water.addColorStop(0.5, '#0c2c31'); water.addColorStop(1, '#061c24')
    ctx.fillStyle = water; ctx.fillRect(0, 0, width, height)
    const glow = ctx.createRadialGradient(width * 0.45, -height * 0.15, 0, width * 0.45, 0, width * 0.7)
    glow.addColorStop(0, '#a7e6bf30'); glow.addColorStop(1, '#78d8c000')
    ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height)
    for (let i = 0; i < 6; i++) {
      const x = width * (0.06 + i * 0.19) + Math.sin(time * 0.12 + i) * 18
      const ray = ctx.createLinearGradient(x, 0, x + 60, height)
      ray.addColorStop(0, '#ceffe60c'); ray.addColorStop(1, '#ceffe600')
      path([x, 0, x + 20, 0, x + 180, height, x + 60, height], ray)
    }
    // Root positions are fixed: only leaves bend in the current.
    for (let i = 0; i < 22; i++) {
      const side = i < 13
      const x = side ? width * (0.015 + i * 0.018) : width * (0.78 + (i - 13) * 0.027)
      plant(x, height * 0.92, height * (0.25 + seed(`plant:${i}`) * 0.42), 7, i * 1.8)
    }
    const sand = ctx.createLinearGradient(0, height * 0.87, 0, height)
    sand.addColorStop(0, '#8d9171'); sand.addColorStop(0.2, '#686d53'); sand.addColorStop(1, '#34483f')
    ctx.beginPath(); ctx.moveTo(0, height * 0.86)
    ctx.bezierCurveTo(width * 0.3, height * 0.98, width * 0.65, height * 0.83, width, height * 0.9)
    ctx.lineTo(width, height); ctx.lineTo(0, height); ctx.fillStyle = sand; ctx.fill()
    for (let i = 0; i < 480; i++) {
      ellipse(seed(`sandx${i}`) * width, height * (0.93 + seed(`sandy${i}`) * 0.07), 0.5 + seed(`s${i}`), 0.5, i % 2 ? '#c0b68a55' : '#182c2860')
    }
    rock(width * 0.22, height * 0.95, height * 0.18, 0.2)
    rock(width * 0.31, height * 0.96, height * 0.105, 0.7)
    rock(width * 0.83, height * 0.95, height * 0.12, 0.5)
    for (const fish of swimmers) {
      const a = fish.group.appearance
      fish.x += fish.direction * dt * a.speed * (12 + fish.depth * 7) / width
      const margin = Math.min(0.16, a.size * 0.75 / width)
      if (fish.x > 1 - margin && fish.direction === 1) fish.direction = -1
      if (fish.x < margin && fish.direction === -1) fish.direction = 1
      const nearWall = Math.min(fish.x - margin, 1 - margin - fish.x)
      fish.turn = Math.min(1, 0.22 + Math.max(0, nearWall) * width / 24)
      fish.y = Math.max(0.15, Math.min(0.83, a.zone + Math.sin(time * 0.24 + fish.phase) * 0.075 + (seed(fish.key) - 0.5) * 0.16))
      drawFish(fish)
    }
    for (let i = 0; i < 9; i++) plant(width * (0.04 + i * 0.021), height * 1.02, height * (0.15 + seed(`front:${i}`) * 0.15), 5, i, true)
    for (let i = 0; i < 26; i++) {
      const x = width * seed(`particle:${i}`) + Math.sin(time * 0.18 + i) * 12
      const y = ((seed(`py:${i}`) * height - time * (3 + seed(`${i}`) * 6)) % height + height) % height
      ellipse(x, y, 0.7, 0.7, '#d7ffec40')
    }
    for (let i = 0; i < 13; i++) {
      const y = height * (1 - ((time * 0.075 + i / 13) % 1))
      const x = width * 0.91 + Math.sin(time + i * 3) * 7
      ctx.beginPath(); ctx.arc(x, y, 1.4 + seed(`bubble:${i}`) * 2.5, 0, TAU)
      ctx.strokeStyle = '#c7fff13d'; ctx.lineWidth = 0.7; ctx.stroke()
    }
    ctx.fillStyle = '#ceffeb33'; ctx.fillRect(0, 9 + Math.sin(time * 0.7), width, 1)
    const glass = ctx.createLinearGradient(0, 0, width, 0)
    glass.addColorStop(0, '#dcfff912'); glass.addColorStop(0.025, '#dcfff900')
    glass.addColorStop(0.97, '#dcfff900'); glass.addColorStop(1, '#dcfff91a')
    ctx.fillStyle = glass; ctx.fillRect(0, 0, width, height)
  }

  return { resize, sync, draw }
}
