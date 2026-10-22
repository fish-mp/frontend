import { createRouter, createWebHistory } from "vue-router";
import CardDetail from "../pages/CardDetail.vue";
import News from "../pages/News.vue";
import Courses from "../pages/Courses.vue";
import CourseDetail from "../pages/CourseDetail.vue";
import FishDetail from "../pages/FishDetail.vue";
import NotFound from "../pages/NotFound.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "DigitalSchool", component: () => import('../pages/DigitalSchool.vue'), meta: { portal: true, title: 'Цифровая школа — учись, исследуй, открывай новое' } },
    { path: "/aquarium", name: "Home", component: () => import('../pages/Home.vue'), meta: { title: 'Школа аквариумистики — АкваВселенная' } },
    {
      path: "/card/:id",
      name: "CardDetail",
      component: CardDetail,
      props: (route) => ({ id: Number(route.params.id) }),
    },
    {
      path: "/news",
      name: "News",
      component: () => import('../pages/SchoolJournal.vue'),
      meta: { portal: true, title: 'Новости — Цифровая школа' },
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
      component: () => import('../pages/SchoolShop.vue'),
      meta: { portal: true, title: 'Магазин — Цифровая школа' },
    },
    { path: '/aquarium/shop', name: 'AquariumShop', component: () => import('../pages/shop.vue') },
    
    {
      path: "/events",
      name: "Events",
      component: () => import('../pages/SchoolJournal.vue'),
      meta: { portal: true, title: 'Мероприятия — Цифровая школа' },
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
      component: () => import('../pages/SchoolArticle.vue'),
      meta: { portal: true, title: 'Новости — Цифровая школа' },
    },
    { path: '/events/:id', name: 'SchoolEventDetail', component: () => import('../pages/SchoolArticle.vue'), meta: { portal: true, title: 'Мероприятие — Цифровая школа' } },
    { path: '/aquarium/news', name: 'AquariumNews', component: News },
    { path: '/aquarium/events', name: 'AquariumEvents', component: () => import('../pages/Events.vue') },
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
    {
      path: "/beginner-guide",
      name: "BeginnerGuide",
      component: () => import("../pages/BeginnerGuide.vue"),
    },
    {
      path: '/order-success',
      name: 'OrderSuccess',
      component: () => import('../pages/OrderSuccess.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../pages/CartView.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../pages/CheckoutView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../pages/ProfileView.vue'),
    },
    
    {
  path: "/shop/:id",
  name: "ProductDetail",
  component: () => import("../pages/ProductDetail.vue"),
  props: (route) => ({ id: Number(route.params.id) }),
}
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (_to.hash) {
      return { el: _to.hash, top: _to.meta.portal ? (window.innerWidth <= 1024 ? 110 : 160) : 24, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' };
    }
    return { left: 0, top: 0 };
  },
});
try {
  router.afterEach((to) => {
    document.title = typeof to.meta.title === 'string' ? to.meta.title : 'Школа аквариумистики — АкваВселенная';
    try {
      if ((window as any).ym && typeof (window as any).ym === "function") {
        (window as any).ym(109763488, "hit", (to as any).fullPath || window.location.href);
      }
    } catch (e) {}
  });
} catch (e) {}
