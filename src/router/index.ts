import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import CardDetail from "../pages/CardDetail.vue";
import News from "../pages/News.vue";
import Courses from "../pages/Courses.vue";
import CourseDetail from "../pages/CourseDetail.vue";
import FishDetail from "../pages/FishDetail.vue";
import NotFound from "../pages/NotFound.vue";

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
      {
      path: "/shop",
      name: "shop",
      component: () => import("../pages/shop.vue"),
    },
    
    {
      path: "/events",
      name: "Events",
      component: () => import("../pages/Events.vue"),
    },
    {
      path: "/fish/:id",
      name: "FishDetail",
      component: FishDetail,
      props: (route) => ({ id: Number(route.params.id) }),
    },
    {
      path: "/event/:id",
      name: "EventDetail",
      component: () => import("../pages/EventDetail.vue"),
    },
    {
      path: "/news/:id",
      name: "NewsDetail",
      component: () => import("../pages/NewsDetail.vue"),
    },
       {
      path: '/my-courses',
      name: 'MyCourses',
      component: () => import('../pages/MyCourses.vue'), // Новый маршрут
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});
