import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'

const source = await readFile(new URL('../src/components/aquarium/species.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } })
const { identifyFish, isFishCategory } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
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
