const _JSON_parse = JSON.parse.bind(JSON);

JSON.parse = (text: any, reviver?: any) => {
  if (text === undefined) {
    return null;
  }
  return _JSON_parse(text, reviver);
};

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { router } from "./router";
import { currentSite } from './utils/site';
import { applySiteMetadata } from './utils/siteMetadata';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App);

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router);
applySiteMetadata(currentSite);
router.isReady().then(() => app.mount("#app"));
