import { AQUARIUM_URL, UNIVERSITY_URL, type Site } from './site';

export function applySiteMetadata(site: Site) {
  const aquarium = site === 'aquarium';
  const title = aquarium
    ? 'Школа аквариумистики FishKids | Курсы для детей в Москве'
    : 'Генезис — Университет непрерывного цифрового образования';
  const description = aquarium
    ? 'Учим детей создавать и ухаживать за аквариумом. Очные и онлайн курсы. Узнайте, как правильно запустить первый аквариум.'
    : 'Университет непрерывного цифрового образования «Генезис». Магистратура, аспирантура, ДПО, колледж, цифровая школа и школа аквариумистики. Образование длиною в жизнь.';
  const url = new URL(window.location.pathname, aquarium ? AQUARIUM_URL : UNIVERSITY_URL).href;
  document.title = title;
  const meta = (attribute: 'name' | 'property', key: string, value: string) => {
    let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, key);
      document.head.appendChild(element);
    }
    element.content = value;
  };
  meta('name', 'description', description);
  meta('property', 'og:title', title);
  meta('property', 'og:description', description);
  meta('property', 'og:url', url);
  meta('property', 'og:site_name', aquarium ? 'FishKids' : 'Генезис');
  meta('name', 'twitter:title', title);
  meta('name', 'twitter:description', description);
  meta('name', 'apple-mobile-web-app-title', aquarium ? 'FishKids' : 'Генезис');
  document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', url);
  document.head
    .querySelector<HTMLLinkElement>('link[rel="icon"]')
    ?.setAttribute('href', aquarium ? '/logo.svg' : '/genesis/s1-img.svg');

  if (aquarium && !document.querySelector('script[data-fishkids-metrica]')) {
    // The existing FishKids counter belongs only to the aquarium site.
    const target = window as typeof window & { ym?: (...args: unknown[]) => void };
    const queue: unknown[][] = [];
    target.ym = Object.assign((...args: unknown[]) => queue.push(args), {
      a: queue,
      l: Date.now(),
    });
    const script = document.createElement('script');
    script.async = true;
    script.dataset.fishkidsMetrica = '';
    script.src = 'https://mc.yandex.ru/metrika/tag.js?id=109763488';
    document.head.appendChild(script);
    target.ym(109763488, 'init', {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: 'dataLayer',
      referrer: document.referrer,
      url: location.href,
      accurateTrackBounce: true,
      trackLinks: true,
    });
  }
}
