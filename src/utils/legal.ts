import { ref } from 'vue'
export interface ConsentValue { accepted: boolean; version: string; sha256: string }
export interface LegalDocument {
  slug: string; title: string; version: string; status: string; sha256: string
  sections: { title: string; paragraphs: string[] }[]
  operator: { name: string; legal_address: string; inn?: string; ogrn?: string; contact_email: string }
}
interface LegalConfig { ready: boolean; documents: LegalDocument[]; consent_purposes: string[]; contact_email: string }
export const legalState = ref<{ loading: boolean; error: string; config: LegalConfig }>({
  loading: true, error: '', config: { ready: false, documents: [], consent_purposes: [], contact_email: '' },
})
export const cookieSettingsOpen = ref(false)
export const cookieChoice = ref<{ sha256: string; analytics: boolean } | null>(null)
let pending: Promise<void> | null = null
let analyticsStarted = false
const COUNTER = 109763488
const STORAGE_KEY = 'fishkids-cookie-choice'

export function loadLegal(): Promise<void> {
  if (pending) return pending
  pending = (async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/legal/documents/' + (import.meta.env.DEV ? '?preview=1' : ''), { credentials: 'omit' })
      if (!response.ok) throw new Error('Условия обработки данных временно недоступны.')
      const data = await response.json()
      legalState.value.config = { ready: data.ready === true, documents: Array.isArray(data.documents) ? data.documents : [],
        consent_purposes: Array.isArray(data.consent_purposes) ? data.consent_purposes : [], contact_email: data.contact_email || '' }
      try {
        const choice = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
        const policy = legalState.value.config.documents.find(d => d.slug === 'cookies-policy')
        if (choice && choice.sha256 === policy?.sha256 && typeof choice.analytics === 'boolean') cookieChoice.value = choice
      } catch { /* Missing preferences mean no optional analytics. */ }
      if (cookieChoice.value?.analytics && legalState.value.config.ready) startAnalytics()
    } catch (error) { legalState.value.error = error instanceof Error ? error.message : 'Не удалось загрузить документы.' }
    finally { legalState.value.loading = false }
  })()
  return pending
}

export async function validateLegalConsent(purpose: string, value?: ConsentValue) {
  await loadLegal()
  if (legalState.value.error) throw new Error(legalState.value.error)
  const c = legalState.value.config
  if (!c.ready || !c.consent_purposes.includes(purpose)) return
  const d = c.documents.find(d => d.slug === 'personal-data-consent')
  if (!d || value?.accepted !== true || value.version !== d.version || value.sha256 !== d.sha256)
    throw new Error('Подтвердите отдельное согласие на обработку персональных данных.')
}

function startAnalytics() {
  if (analyticsStarted || !legalState.value.config.ready || !cookieChoice.value?.analytics) return
  analyticsStarted = true
  const w = window as any
  w.ym = w.ym || function (...args: unknown[]) { (w.ym.a = w.ym.a || []).push(args) }
  w.ym.l = Date.now()
  const script = document.createElement('script')
  script.src = 'https://mc.yandex.ru/metrika/tag.js'; script.async = true; document.head.appendChild(script)
  // Do not record forms, query strings, fragments or referrer URLs.
  w.ym(COUNTER, 'init', { webvisor: false, clickmap: false, trackLinks: false, accurateTrackBounce: true,
    url: location.origin + location.pathname, referrer: '' })
}
export function trackPublicPage(path: string) {
  if (!analyticsStarted || !cookieChoice.value?.analytics) return
  const pathname = path.split(/[?#]/)[0]
  if (/^\/(profile|checkout|order-success|verify-email)(\/|$)/.test(pathname)) return
  ;(window as any).ym?.(COUNTER, 'hit', location.origin + pathname, { referer: '' })
}
export function chooseAnalytics(analytics: boolean) {
  const policy = legalState.value.config.documents.find(d => d.slug === 'cookies-policy')
  if (!legalState.value.config.ready || !policy) return
  cookieChoice.value = { sha256: policy.sha256, analytics }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cookieChoice.value)); cookieSettingsOpen.value = false
  if (analytics) startAnalytics()
  else if (analyticsStarted) {
    for (const name of ['_ym_uid','_ym_d','_ym_isad','_ym_visorc'])
      for (const domain of ['',location.hostname,'.'+location.hostname,'.'+location.hostname.split('.').slice(-2).join('.')])
        document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain='+domain : '')
    for (const key of Object.keys(localStorage)) if (key.startsWith('_ym')) localStorage.removeItem(key)
    // A reload stops handlers and timers of a tracker already loaded.
    location.reload()
  }
}
