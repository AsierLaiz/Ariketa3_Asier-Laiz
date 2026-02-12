<template>
  <div class="detail-container">
    <div class="detail-card" v-if="movie">
      
      <img 
        :src="`/images/${movie.image}`" 
        :alt="movie.title"
      />

      <!-- Modo lectura -->
      <div v-if="!isEditing">
        <h2>{{ movie.title }}</h2>
        <p><strong>Género:</strong> {{ movie.genre }}</p>
        <p><strong>Año:</strong> {{ movie.year }}</p>

        <button @click="goBack">
          Volver
        </button>

        <button @click="startEditing">
          Editar
        </button>
      </div>

      <!-- Modo edición -->
      <div v-else>
        <input v-model="editedmovie.title" />
        <input v-model="editedmovie.genre" />
        <input type="number" v-model="editedmovie.year" />
        <input v-model="editedmovie.image" />

        <button @click="saveChanges">
          Guardar
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { usemovieStore } from '../stores/movieStore'

const route = useRoute()
const router = useRouter()
const movieStore = usemovieStore()

onMounted(async () => {
  await movieStore.loadmovies()
  await movieStore.loadAttacks()
})

const movie = computed(() => {
  const id = parseInt(route.params.id)
  return movieStore.movies.find(movieItem => movieItem.id === id)
})



const isEditing = ref(false)
const editedmovie = ref(null)

const startEditing = () => {
  editedmovie.value = { ...movie.value }
  isEditing.value = true
}

const goBack = () => {
  router.push('/movies')
}
const saveChanges = () => {
  if (editedmovie.value) {
    movieStore.updatemovie(editedmovie.value)
    isEditing.value = false
  }
}

</script>



<style>
.detail-container {
  padding: 40px;
  background: #ecf0f1;
  min-height: 100vh;
}

.detail-card {
  max-width: 600px;
  margin: auto;
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  text-align: center;
}

.detail-card img {
  width: 100%;
  border-radius: 12px;
  margin-bottom: 20px;
}

.detail-card button {
  margin: 10px;
  padding: 8px 15px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.detail-card button:first-of-type {
  background: #2ecc71;
  color: white;
}

.detail-card button:last-of-type {
  background: #3498db;
  color: white;
}
</style>