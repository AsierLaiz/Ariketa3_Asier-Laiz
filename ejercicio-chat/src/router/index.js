import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import PokedexView from '../views/PokedexView.vue'
import PokemonDetailView from '../views/PokemonDetailView.vue'
import ProfileView from '../views/ProfileView.vue'


const router = createRouter({
  history: createWebHistory(),
    routes: [
    { path: '/', name: 'login', component: LoginView },
    { path: '/pokedex', name: 'list', component: PokedexView },
    { path: '/pokemon/:id', name: 'detail', component: PokemonDetailView, props: true },
    { path: '/profile', name: 'about', component: ProfileView }
  ]


  })

  export default router
