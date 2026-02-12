<template>
  <div class="profile-container">
    <div class="profile-card" v-if="director">
      
      <h2>{{ director.username }}</h2>
      <p><strong>País:</strong> {{ director.country }}</p>
      <p><strong>Películas creadas:</strong> {{ movieCount }}</p>

      <button @click="logout">
        Cerrar sesión
      </button>

    </div>

    <div v-else class="profile-card">
      <h2>No has iniciado sesión</h2>
    </div>
  </div>
</template>


<script setup>

import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/directorStore'
import { usemovieStore } from '../stores/movieStore'

const router = useRouter()
const userStore = useUserStore()
const movieStore = usemovieStore()

onMounted(async () => {
  await movieStore.loadmovies()
})

const director = computed(() => userStore.currentDirector)
const movieCount = computed(() => {
  const directorId = userStore.currentDirector?.id
  return movieStore.movies.filter(movie => movie.directorId === directorId).length
})

const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>
<style>
.profile-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #34495e, #2c3e50);
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-card {
  background: white;
  padding: 40px;
  border-radius: 15px;
  width: 350px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

.profile-card h2 {
  margin-bottom: 15px;
}

.profile-card p {
  margin: 10px 0;
}
</style>