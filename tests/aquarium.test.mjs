import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'

const source = await readFile(new URL('../src/components/aquarium/species.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } })
const { identifyFish, isFishCategory, buildAquariumGroups, getCompatibilityRisk } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
const catalog = JSON.parse(await readFile(new URL('./fixtures/aquarium-catalog.json', import.meta.url), 'utf8'))

test('every fish in the production catalog has its own animated illustration', () => {
  const fish = catalog.filter(product => product.isFish)
  assert.equal(fish.length, 29)
  const appearances = fish.map(product => {
    const appearance = identifyFish(product.name)
    assert.ok(appearance, `Missing illustration: ${product.name}`)
    assert.notEqual(appearance.kind, 'photo', product.name)
    assert.ok(appearance.speed > 0 && appearance.zone > 0 && appearance.zone < 1, product.name)
    return JSON.stringify(appearance)
  })
  assert.equal(new Set(appearances).size, fish.length, 'Catalog species have distinct visual or swimming profiles')
})

test('aquariums, food and decorations do not become fish', () => {
  for (const product of catalog.filter(product => !product.isFish)) assert.equal(identifyFish(product.name), undefined)
  for (const name of ['Корм для сомов', 'Декор Гуппи', 'Фигурка петушка', 'Сушёный сом']) assert.equal(identifyFish(name), undefined)
  assert.equal(isFishCategory('Корма для рыб'), false)
  assert.equal(isFishCategory('Аквариумы и ёмкости'), false)
  assert.equal(isFishCategory('Лабиринтовые Рыбки'), true)
  assert.equal(isFishCategory('Живородящие'), true)
  assert.equal(isFishCategory('Сомы и Вьюновые'), true)
})

test('species-specific features survive color names and Latin aliases', () => {
  assert.equal(identifyFish('Неон красный').redLength, 0.67)
  assert.equal(identifyFish('Неон голубой').accent, '#32e6ec')
  assert.equal(identifyFish('Меченосец').tail, 'sword')
  assert.equal(identifyFish('Corydoras panda').pattern, 'panda')
  assert.equal(identifyFish('Макропод').tail, 'veil')
  assert.equal(identifyFish('Сом стеклянный').kind, 'glass')
  assert.equal(identifyFish('Гурами жемчужный').pattern, 'pearl')
  assert.equal(identifyFish('Гурами мраморный').pattern, 'marble')
  assert.equal(identifyFish('Птеригоплихт').sail, true)
})

function cartItem(name, temperament, quantity = 1, category = 'Рыбки') {
  return { id: 1, product: { id: name, name, price: 100, fish_temperament: temperament, category: { name: category } }, quantity }
}

const risks = items => getCompatibilityRisk(buildAquariumGroups(items))

test('a predator warns with any other fish, independent of cart order', () => {
  const predator = cartItem('Скалярия', 'predatory')
  const peaceful = cartItem('Гуппи', 'peaceful')
  assert.deepEqual(risks([predator, peaceful]).map(fish => fish.name), ['Скалярия'])
  assert.deepEqual(risks([peaceful, predator]).map(fish => fish.name), ['Скалярия'])
  assert.deepEqual(risks([peaceful, cartItem('Неон', 'peaceful')]), [])
  assert.deepEqual(risks([]), [])
})

test('quantities of the same species count; removing fish clears the warning', () => {
  assert.equal(risks([cartItem('Скалярия', 'predatory', 2)]).length, 1)
  assert.deepEqual(risks([cartItem('Скалярия', 'predatory', 1)]), [])
  assert.deepEqual(risks([cartItem('Скалярия', 'predatory', 0), cartItem('Гуппи', 'peaceful')]), [])
  assert.deepEqual(risks([cartItem('Гуппи', 'peaceful', 10)]), [])
  assert.deepEqual(risks([cartItem('Скалярия', 'predatory'), cartItem('Гуппи', 'peaceful', 0)]), [])
})

test('aggressive fish also warn, and multiple risky species are listed once each', () => {
  const fish = risks([cartItem('Петушок', 'aggressive', 2), cartItem('Скалярия', 'predatory', 3)])
  assert.deepEqual(fish.map(group => group.name), ['Петушок', 'Скалярия'])
})

test('food, equipment and decorations do not trigger a warning with a lone predator', () => {
  const items = [cartItem('Скалярия', 'predatory'),
    cartItem('Корм для рыб', '', 10, 'Корма для рыб'),
    cartItem('Аквариум', '', 2, 'Аквариумы и ёмкости'),
    cartItem('Скалярия', '', 3, 'Декорации')]
  assert.equal(buildAquariumGroups(items).length, 1)
  assert.deepEqual(risks(items), [])
})

test('database metadata supports new fish without an illustration or a name rule', () => {
  const predator = cartItem('Новый вид', 'predatory', 1, 'Необычные виды')
  predator.product.category.parent_name = 'Рыбки'
  assert.equal(risks([predator, cartItem('Гуппи', 'peaceful')]).length, 1)
  // Explicit peaceful metadata overrides older cached detail data.
  const peaceful = cartItem('Скалярия', 'peaceful')
  const groups = buildAquariumGroups([peaceful, cartItem('Гуппи', 'peaceful')], {
    Скалярия: { fish_temperament: 'predatory' },
  })
  assert.deepEqual(getCompatibilityRisk(groups), [])
})

test('older carts resolve temperament through product details', () => {
  const item = cartItem('Скалярия', undefined, 2)
  assert.deepEqual(risks([item]), [])
  const groups = buildAquariumGroups([item], { Скалярия: { fish_temperament: 'predatory' } })
  assert.equal(getCompatibilityRisk(groups).length, 1)
})
