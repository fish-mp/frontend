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

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
