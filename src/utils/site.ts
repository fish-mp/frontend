export type Site = 'university' | 'aquarium';

export const UNIVERSITY_URL = 'https://inco-edu.ru';
export const AQUARIUM_URL = 'https://fishkids.ru';

/** Keep the two homepages independent when the same build serves both domains. */
export function resolveSite(hostname: string, override?: string): Site {
  if (override === 'university' || override === 'aquarium') return override;
  const host = hostname.toLowerCase().replace(/\.$/, '');
  return host === 'fishkids.ru' || host.endsWith('.fishkids.ru') || host === 'fishkids.localhost'
    ? 'aquarium'
    : 'university';
}

export const currentSite = resolveSite(
  typeof window === 'undefined' ? 'localhost' : window.location.hostname,
  import.meta.env.VITE_SITE
);
