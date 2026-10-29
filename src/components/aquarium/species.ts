import type { CartItemResponse } from '../../stores/cart'

export interface FishAppearance {
  kind: 'glass' | 'catfish' | 'slender' | 'round' | 'angel' | 'fancy' | 'fish' | 'photo'
  color: string
  accent: string
  size: number
  speed: number
  zone: number
  pattern?: 'stripe' | 'neon' | 'spots' | 'horizontal' | 'wedge' | 'panda' | 'marble' | 'pearl' | 'serpae' | 'firemouth' | 'auratus' | 'rio'
  fins?: string
  tail?: 'sword' | 'veil'
  feelers?: boolean
  sail?: boolean
  redLength?: number
}

// Ordered from specific species to families. Product IDs remain the identity;
// names select only the illustration, never the number of inhabitants.
const species: [RegExp, FishAppearance][] = [
  [/барбус.*вишн|puntius titteya/i, { kind: 'slender', color: '#cf5350', accent: '#702d35', fins: '#dc6960', size: 42, speed: 0.9, zone: 0.49, pattern: 'horizontal' }],
  [/барбус.*суматр|puntigrus tetrazona/i, { kind: 'fish', color: '#e0b568', accent: '#293b38', fins: '#e77549', size: 50, speed: 1.15, zone: 0.43, pattern: 'stripe' }],
  [/кардинал|tanichthys/i, { kind: 'slender', color: '#bfc9b1', accent: '#f5e3aa', fins: '#cd655d', size: 38, speed: 0.95, zone: 0.27, pattern: 'horizontal' }],
  [/неон.*красн|paracheirodon axelrodi/i, { kind: 'slender', color: '#72a5b1', accent: '#32e6ec', size: 42, speed: 1.05, zone: 0.43, pattern: 'neon', redLength: 0.67 }],
  [/тетра.*фон.*рио|hyphessobrycon flammeus/i, { kind: 'fish', color: '#c6d2c2', accent: '#d65349', fins: '#d65349', size: 41, speed: 0.9, zone: 0.5, pattern: 'rio' }],
  [/минор|серпас|hyphessobrycon eques/i, { kind: 'fish', color: '#d96d49', accent: '#3c3430', fins: '#d55744', size: 44, speed: 0.9, zone: 0.51, pattern: 'serpae' }],
  [/расбор|trigonostigma/i, { kind: 'slender', color: '#dba286', accent: '#273d43', fins: '#d8886e', size: 41, speed: 1, zone: 0.38, pattern: 'wedge' }],
  [/гурами.*жемчуж|trichogaster leeri|trichopodus leerii/i, { kind: 'fish', color: '#c8b7a3', accent: '#48524a', fins: '#cd9e82', size: 66, speed: 0.43, zone: 0.32, pattern: 'pearl', feelers: true }],
  [/гурами.*мрамор|trichopodus trichopterus/i, { kind: 'fish', color: '#8ab9bf', accent: '#395c68', size: 67, speed: 0.45, zone: 0.35, pattern: 'marble', feelers: true }],
  [/лялиус|trichogaster lalius/i, { kind: 'fish', color: '#dc886c', accent: '#59b4cb', size: 49, speed: 0.48, zone: 0.29, pattern: 'stripe', feelers: true }],
  [/макропод|macropodus/i, { kind: 'fish', color: '#d48c63', accent: '#589daa', fins: '#b96966', size: 62, speed: 0.62, zone: 0.3, pattern: 'stripe', tail: 'veil', feelers: true }],
  [/апистограмм.*какаду|apistogramma cacatuoides/i, { kind: 'fish', color: '#d6b76b', accent: '#415963', fins: '#df7851', size: 56, speed: 0.57, zone: 0.7, pattern: 'horizontal', sail: true }],
  [/цихлазом.*меек|thorichthys meeki/i, { kind: 'fish', color: '#a3b9b4', accent: '#d45c50', fins: '#739e9d', size: 72, speed: 0.6, zone: 0.62, pattern: 'firemouth' }],
  [/меланохромис.*ауратус|melanochromis auratus/i, { kind: 'fish', color: '#dec064', accent: '#303c42', fins: '#bba35b', size: 65, speed: 0.72, zone: 0.6, pattern: 'auratus' }],
  [/коридорас.*панда|corydoras panda/i, { kind: 'catfish', color: '#dfd9bd', accent: '#35413e', fins: '#b9b9a1', size: 46, speed: 0.43, zone: 0.81, pattern: 'panda' }],
  [/птеригоплихт|pterygoplichthys/i, { kind: 'catfish', color: '#61513b', accent: '#c4a875', size: 83, speed: 0.3, zone: 0.83, pattern: 'spots', sail: true }],
  [/боци.*клоун|chromobotia macracanthus/i, { kind: 'fish', color: '#e9a358', accent: '#303a37', fins: '#d77546', size: 66, speed: 0.78, zone: 0.74, pattern: 'stripe' }],
  [/стеклян.*сом|сом.*стеклян|kryptopterus|glass catfish/i, { kind: 'glass', color: '#c9f4ef', accent: '#e3f6ec', size: 66, speed: 0.65, zone: 0.48 }],
  [/коридорас|corydoras/i, { kind: 'catfish', color: '#baa98a', accent: '#463d31', size: 49, speed: 0.45, zone: 0.82, pattern: 'spots' }],
  [/анциструс|плекостомус|птеригоплихт|ancistrus|pleco/i, { kind: 'catfish', color: '#766c4b', accent: '#d2b77b', size: 68, speed: 0.35, zone: 0.85, pattern: 'spots' }],
  [/сом|synodontis|pangasius/i, { kind: 'catfish', color: '#92aaa9', accent: '#344f57', size: 70, speed: 0.55, zone: 0.72 }],
  [/неон|paracheirodon|neon tetra/i, { kind: 'slender', color: '#709fac', accent: '#32e6ec', size: 40, speed: 1.05, zone: 0.46, pattern: 'neon', redLength: 0.34 }],
  [/скаляр|pterophyllum|angelfish/i, { kind: 'angel', color: '#c8d9d5', accent: '#354b4e', size: 66, speed: 0.45, zone: 0.45, pattern: 'stripe' }],
  [/дискус|symphysodon|discus/i, { kind: 'round', color: '#e99b64', accent: '#57c4c4', size: 70, speed: 0.4, zone: 0.57, pattern: 'stripe' }],
  [/петуш|betta/i, { kind: 'fancy', color: '#5a9dd5', accent: '#c85b89', size: 59, speed: 0.4, zone: 0.32 }],
  [/гуппи|guppy|guppies|poecilia reticulata/i, { kind: 'fancy', color: '#d9b97c', accent: '#f38b56', size: 43, speed: 0.75, zone: 0.3, pattern: 'spots' }],
  [/золот[а-яё]* рыб|телескоп|вуалехвост|оранда|комета|carassius|goldfish/i, { kind: 'round', color: '#edb34f', accent: '#f47832', size: 68, speed: 0.55, zone: 0.5 }],
  [/данио|danio/i, { kind: 'slender', color: '#becfc6', accent: '#304e70', size: 43, speed: 1.35, zone: 0.25, pattern: 'stripe' }],
  [/барбус|puntius|barbus/i, { kind: 'fish', color: '#d7b37c', accent: '#293f3d', size: 49, speed: 1.1, zone: 0.48, pattern: 'stripe' }],
  [/меченос|xiphophorus hellerii/i, { kind: 'slender', color: '#ef9461', accent: '#b74a32', size: 58, speed: 0.85, zone: 0.4, tail: 'sword' }],
  [/моллин|molly|mollies/i, { kind: 'fish', color: '#485859', accent: '#a4c0b4', size: 53, speed: 0.7, zone: 0.45 }],
  [/пецили|platy|xiphophorus/i, { kind: 'fish', color: '#efa368', accent: '#c14e36', size: 46, speed: 0.7, zone: 0.4 }],
  [/гурами|лялиус|trichogaster|gourami/i, { kind: 'fish', color: '#7fbfc3', accent: '#d57c53', size: 65, speed: 0.45, zone: 0.3, pattern: 'stripe' }],
  [/тернеци|gymnocorymbus/i, { kind: 'round', color: '#b4c5c1', accent: '#3d5257', size: 49, speed: 0.8, zone: 0.5, pattern: 'stripe' }],
  [/расбор|rasbora/i, { kind: 'slender', color: '#d6a783', accent: '#283e47', size: 40, speed: 1, zone: 0.38 }],
  [/тетро?а|тетра|tetra|hyphessobrycon/i, { kind: 'slender', color: '#c0d5cb', accent: '#d56d54', size: 42, speed: 0.95, zone: 0.48 }],
  [/боци|botia|loach|вьюн/i, { kind: 'slender', color: '#dbad63', accent: '#354341', size: 63, speed: 0.7, zone: 0.78, pattern: 'stripe' }],
  [/апистограмм|рамирези|ramirezi/i, { kind: 'fish', color: '#e6bc60', accent: '#68cdd9', size: 51, speed: 0.65, zone: 0.67, pattern: 'spots' }],
  [/цихлид|цихлазом|акар|астронотус|попугай|cichlid|аулонокар|меланохромис|лабидохромис|псевдотрофеус|хромис/i, { kind: 'fish', color: '#7eafd0', accent: '#263f6a', size: 72, speed: 0.65, zone: 0.55, pattern: 'stripe' }],
  [/радужниц|melanotaenia/i, { kind: 'fish', color: '#79c9d4', accent: '#e6aa57', size: 61, speed: 0.9, zone: 0.4 }],
]

export function identifyFish(name: string): FishAppearance | undefined {
  if (/корм|декор|фигурк|игруш|грунт|препарат|удобрени|заморож|сушен|сушён|консерв|филе/i.test(name)) return
  const found = species.find(([pattern]) => pattern.test(name))?.[1]
  if (!found) return
  const appearance = { ...found }
  if (/альбинос|белый|белая/i.test(name)) appearance.color = '#eee4ce'
  // Neon species retain their blue light band and red underside.
  else if (appearance.pattern === 'neon') return appearance
  else if (/красн/i.test(name) && appearance.kind !== 'glass') appearance.color = '#e87d69'
  else if (/желт|жёлт/i.test(name)) appearance.color = '#e8cb62'
  else if (/синий|синяя|голуб/i.test(name)) appearance.color = '#6baed6'
  else if (/черн|чёрн/i.test(name)) appearance.color = '#394b50'
  return appearance
}

export interface AquariumGroup {
  id: string
  name: string
  quantity: number
  appearance: FishAppearance
  image?: string
  temperament?: 'peaceful' | 'predatory' | 'aggressive' | ''
}

export type AquariumProductDetails = Pick<CartItemResponse['product'], 'category' | 'fish_temperament' | 'main_image'> & {
  images?: { image: string }[]
}

export function buildAquariumGroups(items: CartItemResponse[], details: Record<string, AquariumProductDetails> = {}): AquariumGroup[] {
  return items.flatMap(({ product, quantity: itemQuantity }) => {
    const quantity = Math.max(0, Math.floor(Number(itemQuantity) || 0))
    if (!quantity) return []
    const detail = details[product.id]
    const category = product.category || detail?.category
    const categoryName = [category?.name, category?.parent_name, product.category_name].filter(Boolean).join(' ')
    // Explicit non-fish categories take precedence over words in product names.
    if (categoryName && !isFishCategory(categoryName)) return []
    const appearance = identifyFish(product.name)
    const temperament = product.fish_temperament ?? detail?.fish_temperament
    const image = product.main_image?.image || product.image || detail?.main_image?.image || detail?.images?.[0]?.image
    if (!appearance && !isFishCategory(categoryName) && !temperament) return []
    return [{ id: product.id, name: product.name, quantity, image, temperament,
      appearance: appearance || { kind: image ? 'photo' : 'fish', color: '#b8ccc2', accent: '#92bcaa', size: 59, speed: 0.5, zone: 0.5 },
    }]
  })
}

export function getCompatibilityRisk(groups: AquariumGroup[]): AquariumGroup[] {
  const inhabitants = groups.filter(group => group.quantity > 0)
  const total = inhabitants.reduce((sum, group) => sum + group.quantity, 0)
  if (total < 2) return []
  return inhabitants.filter(group => group.temperament === 'predatory' || group.temperament === 'aggressive')
}

export function isFishCategory(category: string) {
  return /рыб|fish|живородящ|карповы|харацинов|лабиринтов|цихлид|сомы|вьюнов/i.test(category) && !/корм|оборуд|декор|растен/i.test(category)
}
