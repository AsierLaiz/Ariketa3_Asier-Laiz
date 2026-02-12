<template>
  <div class="movies-container">
    <h1>Mis Películas</h1>

    <!-- Filtro por género -->
    <select v-model="selectedGenre">
      <option value="">Todos los géneros</option>
      <option 
        v-for="genre in genreOptions" 
        :key="genre" 
        :value="genre"
      >
        {{ genre }}
      </option>
    </select>

    <!-- Formulario añadir película -->
    <div class="add-movie-form">
      <h3>Añadir nueva película</h3>

      <input 
        Genero="text" 
        placeholder="Título"
        v-model="newMovie.title"
      />

      <input 
        Genero="text" 
        placeholder="Género"
        v-model="newMovie.genre"
      />

      <input 
        Genero="number" 
        placeholder="Año"
        v-model="newMovie.year"
      />

      <input 
        Genero="text" 
        placeholder="Nombre imagen (ej: matrix.jpg)"
        v-model="newMovie.image"
      />

      <button @click="addMovie">
        Añadir
      </button>
    </div>

    <!-- Mensaje si no hay películas -->
    <p v-if="filteredMovies.length === 0">
      No tienes películas registradas.
    </p>

    <!-- Grid películas -->
    <div class="movie-grid">
      <div 
        class="movie-card"
        v-for="movie in filteredMovies"
        :key="movie.id"
      >
        <img 
          :src="`/images/${movie.image}`" 
          :alt="movie.title"
        />

        <h3>{{ movie.title }}</h3>
        <p><strong>Género:</strong> {{ movie.genre }}</p>
        <p><strong>Año:</strong> {{ movie.year }}</p>

        <button @click="viewMovie(movie.id)">
          Ver
        </button>

        <button @click="deleteMovie(movie.id)">
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usemovieStore } from '../stores/movieStore'
import { useUserStore } from '../stores/directorStore'

const moviestore = usemovieStore()
const userStore = useUserStore()
const router = useRouter()

const newMovie = ref({
	title: '',
	genre: '',
	year: '',
	image: ''
})
const selectedGenre = ref('')

onMounted(async () => {
	await moviestore.loadmovies()
})

const addMovie = () => {
	if (newMovie.value.title.trim() && newMovie.value.genre.trim() && newMovie.value.year.trim()) {
		const directorId = userStore.currentDirector?.id
		moviestore.addmovie({
			title: newMovie.value.title,
			genre: newMovie.value.genre,
			year: newMovie.value.year,
			image: newMovie.value.image || 'default.png',
			directorId: directorId
		})
		newMovie.value = {
			title: '',
			genre: '',
			year: '',
			image: ''
		}
	}
}

const filteredMovies = computed(() => {
	// Filtrar por director logueado
	const directorId = userStore.currentDirector?.id
	const moviesByDirector = moviestore.movies.filter(movie => movie.directorId === directorId)
	
	// Luego filtrar por género si está seleccionado
	if (!selectedGenre.value) return moviesByDirector
	return moviesByDirector.filter(movie => movie.genre === selectedGenre.value)
})

const genreOptions = computed(() => {
	// Solo mostrar géneros de las películas del director
	const directorId = userStore.currentDirector?.id
	const moviesByDirector = moviestore.movies.filter(movie => movie.directorId === directorId)
	const genres = moviesByDirector.map(movie => movie.genre).filter(Boolean)
	return [...new Set(genres)]
})

const viewMovie = id => {
	router.push(`/movie/${id}`)
}

const deleteMovie = id => {
	moviestore.deletemovie(id)
}


</script>


<style>
.movies-container {
  padding: 40px;
  background: #f4f6f9;
  min-height: 100vh;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.movie-card {
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: 0.3s;
}

.movie-card:hover {
  transform: translateY(-5px);
}

.movie-card img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
}

.movie-card button {
  margin-right: 5px;
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.movie-card button:first-of-type {
  background: #3498db;
  color: white;
}

.movie-card button:last-of-type {
  background: #e74c3c;
  color: white;
}
</style>