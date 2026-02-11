import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ReceiptView from '../views/ReceiptView.vue'
import DetailView from '../views/DetailView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/list', name: 'list', component: ReceiptView },
    { path: '/detail/:id', name: 'detail', component: DetailView, props: true },
    { path: '/about', name: 'about', component: AboutView }
  ]
})

export default router
