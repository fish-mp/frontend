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
import "leaflet/dist/leaflet.css";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App);

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(createPinia());
app.use(pinia)
app.use(router);
app.mount("#app");
