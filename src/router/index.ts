import { createRouter, createWebHistory } from "vue-router";
import { currentSite } from "../utils/site";

const CardDetail = () => import("../pages/CardDetail.vue");
const News = () => import("../pages/News.vue");
const Courses = () => import("../pages/Courses.vue");
const CourseDetail = () => import("../pages/CourseDetail.vue");
const FishDetail = () => import("../pages/FishDetail.vue");
const NotFound = () => import("../pages/NotFound.vue");

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/verify-email', name: 'VerifyEmail', component: () => import('../pages/VerifyEmail.vue') },
    {
      path: "/", name: "Home",
      component: currentSite === 'aquarium'
        ? () => import('../pages/Home.vue')
        : () => import('../pages/UniversityHome.vue'),
      meta: { university: currentSite === 'university' },
    },
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
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) return { el: to.hash, top: to.meta.university ? 104 : 32 };
    return { left: 0, top: 0 };
  },
});
try {
  router.afterEach((to) => {
    try {
      if ((window as any).ym && typeof (window as any).ym === "function") {
        (window as any).ym(109763488, "hit", (to as any).fullPath || window.location.href);
      }
    } catch (e) {}
  });
} catch (e) {}
