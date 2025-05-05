import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import CardDetail from "../pages/CardDetail.vue";
import News from "../pages/News.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    {
      path: "/card/:id",
      name: "CardDetail",
      component: CardDetail,
      props: (route) => ({ id: Number(route.params.id) }),
    },
    {
      path: "/news",
      name: "News",
      component: News,
    },
  ],
});
