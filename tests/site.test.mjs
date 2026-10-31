import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createServer } from 'vite';

let server, resolveSite;
before(async () => {
  server = await createServer({
    configFile: false,
    server: { middlewareMode: true },
    optimizeDeps: { noDiscovery: true },
  });
  ({ resolveSite } = await server.ssrLoadModule('/src/utils/site.ts'));
});
after(async () => {
  await server?.close();
});

test('FishKids root, www and nested hosts retain the aquarium homepage', () => {
  for (const host of ['fishkids.ru', 'www.fishkids.ru', 'school.fishkids.ru', 'FISHKIDS.RU.']) {
    assert.equal(resolveSite(host), 'aquarium', host);
  }
});

test('university, future university subdomains and local preview use Genesis', () => {
  for (const host of [
    'inco-edu.ru',
    'www.inco-edu.ru',
    'college.inco-edu.ru',
    'localhost',
    '127.0.0.1',
  ]) {
    assert.equal(resolveSite(host), 'university', host);
  }
});

test('unrelated hosts cannot accidentally become FishKids through a substring', () => {
  for (const host of ['notfishkids.ru', 'fishkids.ru.example.com', 'fishkids-ru.example.com']) {
    assert.equal(resolveSite(host), 'university', host);
  }
});

test('explicit deployment or preview mode works without changing DNS', () => {
  assert.equal(resolveSite('localhost', 'aquarium'), 'aquarium');
  assert.equal(resolveSite('localhost', 'university'), 'university');
  assert.equal(resolveSite('localhost', ''), 'university');
  assert.equal(resolveSite('fishkids.ru', 'unknown'), 'aquarium');
});
