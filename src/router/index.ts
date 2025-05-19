import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import CardDetail from "../pages/CardDetail.vue";
import News from "../pages/News.vue";
import Courses from "../pages/Courses.vue";
import CourseDetail from "../pages/CourseDetail.vue";

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
    {
      path: "/courses",
      name: "Courses",
      component: Courses,
    },
    {
      path: "/courses/:id",
      name: "CourseDetail",
      component: CourseDetail,
      props: (route) => ({ id: Number(route.params.id) }),
    },
    {
      path: "/aquaristics",
      name: "Aquaristics",
      component: () => import("../pages/Aquaristics.vue"),
    },
        {
      path: "/department",
      name: "Department",
      component: () => import("../pages/Department.vue"),
    },
  ],
});
