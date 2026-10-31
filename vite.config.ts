import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      vue(),
      {
        name: 'site-html-metadata',
        transformIndexHtml(html) {
          if (env.VITE_SITE !== 'aquarium') return html;
          // A dedicated FishKids build keeps its metadata available to non-JS crawlers.
          const title = 'Школа аквариумистики FishKids | Курсы для детей в Москве';
          const description =
            'Учим детей создавать и ухаживать за аквариумом. Очные и онлайн курсы. Узнайте, как правильно запустить первый аквариум.';
          return html
            .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
            .replace(
              /(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*/g,
              `$1${description}`
            )
            .replace(
              /(<meta (?:name|property)="(?:og:title|twitter:title)" content=")[^"]*/g,
              `$1${title}`
            )
            .replace(
              /(<meta (?:name|property)="(?:og:site_name|apple-mobile-web-app-title)" content=")[^"]*/g,
              '$1FishKids'
            )
            .replace(/https:\/\/inco-edu.ru\//g, 'https://fishkids.ru/')
            .replace('/genesis/s1-img.svg', '/logo.svg')
            .replace('</head>', '    <link rel="manifest" href="/site.webmanifest" />\n  </head>');
        },
      },
    ],
  };
});
