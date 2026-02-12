import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import MoviesView from '../views/MoviesView.vue'
import MovieDetailView from '../views/MovieDetailView.vue'
import ProfileView from '../views/ProfileView.vue'


const router = createRouter({
  history: createWebHistory(),
    routes: [
    { path: '/', name: 'login', component: LoginView },
    { path: '/movies', name: 'list', component: MoviesView },
    { path: '/movie/:id', name: 'detail', component: MovieDetailView, props: true },
    { path: '/profile', name: 'about', component: ProfileView }
  ]


  })

  export default router
