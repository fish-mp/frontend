import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import News from '../pages/News.vue'
import Courses from '../pages/Courses.vue'
import Intro from '../pages/Intro.vue'
import Contact from '../pages/Contact.vue'
import NewsPage from '../pages/NewsPage.vue'
import CoursePage from '../pages/CoursePage.vue'
import FishDetail from '../pages/FishDetail.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/fish/:id', name: 'FishDetail', component: FishDetail, props: true },
    { path: '/intro', component: Intro },
    { path: '/news', component: News },
    { path: '/courses', component: Courses },
    { path: '/courses/:id', component: CoursePage },
    { path: '/contact', component: Contact },
    { path: '/news/:id', component: NewsPage },
  ]
})
