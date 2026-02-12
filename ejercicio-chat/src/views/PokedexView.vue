<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePokemonStore } from '../stores/pokemonStore'

const pokemonStore = usePokemonStore()
const router = useRouter()

const newName = ref('')
const newType = ref('')
const newImage = ref('')

onMounted(async () => {
	await pokemonStore.loadPokemons()
})

const addNewPokemon = () => {
	if (newName.value.trim() && newType.value.trim()) {
		pokemonStore.addPokemon({
			name: newName.value,
			type: newType.value,
			image: newImage.value || 'default.png'
		})
		newName.value = ''
		newType.value = ''
		newImage.value = ''
	}
}

const filterType = ref('')
const filteredPokemons = computed(() => {
	const pokemons = pokemonStore.pokemons
	if (!filterType.value) return pokemons
	return pokemons.filter(pokemon => pokemon.type === filterType.value)
})

const typeOptions = computed(() => {
	const types = pokemonStore.pokemons.map(pokemon => pokemon.type).filter(Boolean)
	return [...new Set(types)]
})

const viewPokemon = id => {
	router.push(`/pokemon/${id}`)
}

const deletePokemon = id => {
	pokemonStore.deletePokemon(id)
}
</script>

<template>
<div class="pokedex-container">
	<div class="add-form">
		<h2>➕ Gehitu Pokemon Berria</h2>
		<div class="form-row">
			<div class="form-group">
				<label>Izena:</label>
				<input v-model="newName" type="text" placeholder="Pokemon izena" class="form-input" />
			</div>
			<div class="form-group">
				<label>Mota:</label>
				<input v-model="newType" type="text" placeholder="Pokemon mota" class="form-input" />
			</div>
			<div class="form-group">
				<label>Irudia:</label>
				<input v-model="newImage" type="text" placeholder="imagen.png" class="form-input" />
			</div>
		</div>
		<button @click="addNewPokemon" class="add-btn">Gehitu</button>
	</div>

	<div class="filter-section">
		<label>Filtratu mota:</label>
		<select v-model='filterType' class="filter-select">
			<option value=''>Guztiak</option>
			<option v-for='type in typeOptions' :key='type' :value='type'>{{ type }}</option>
		</select>
	</div>

	<div class="pokemon-grid">
		<div v-for='pokemon in filteredPokemons' :key='pokemon.id' class="pokemon-card">
			<div class="pokemon-image">
				<img :src="`/images/${pokemon.name}.png`" :alt="pokemon.name">
			</div>
			<div class="pokemon-info">
				<h3>{{ pokemon.name }}</h3>
				<span class="type-badge">{{ pokemon.type }}</span>
			</div>
			<div class="pokemon-actions">
				<button @click='viewPokemon(pokemon.id)' class="view-btn">👁️ Ikusi</button>
				<button @click='deletePokemon(pokemon.id)' class="delete-btn">🗑️ Ezabatu</button>
			</div>
		</div>
	</div>
</div>
</template>

<style scoped>
.pokedex-container {
	min-height: calc(100vh - 60px);
	padding: 2rem 1rem;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.add-form {
	background: white;
	padding: 2rem;
	border-radius: 15px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	margin-bottom: 2rem;
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
}

.add-form h2 {
	color: #333;
	margin-top: 0;
	margin-bottom: 1.5rem;
}

.form-row {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 1rem;
	margin-bottom: 1rem;
}

.form-group label {
	display: block;
	margin-bottom: 0.5rem;
	color: #333;
	font-weight: bold;
	font-size: 0.9rem;
}

.form-input {
	width: 100%;
	padding: 0.6rem;
	border: 2px solid #e0e0e0;
	border-radius: 8px;
	font-size: 0.95rem;
	box-sizing: border-box;
	transition: border-color 0.3s;
}

.form-input:focus {
	outline: none;
	border-color: #667eea;
}

.add-btn {
	width: 100%;
	padding: 0.75rem;
	background: linear-gradient(135deg, #27AE60 0%, #2ECC71 100%);
	color: white;
	border: none;
	border-radius: 8px;
	font-size: 1rem;
	font-weight: bold;
	cursor: pointer;
	transition: transform 0.2s;
}

.add-btn:hover {
	transform: translateY(-2px);
}

.filter-section {
	background: white;
	padding: 1rem 2rem;
	border-radius: 15px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	margin-bottom: 2rem;
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	align-items: center;
	gap: 1rem;
}

.filter-section label {
	font-weight: bold;
	color: #333;
}

.filter-select {
	padding: 0.5rem 1rem;
	border: 2px solid #e0e0e0;
	border-radius: 8px;
	font-size: 1rem;
	cursor: pointer;
	min-width: 150px;
}

.pokemon-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 1.5rem;
	max-width: 1200px;
	margin: 0 auto;
}

.pokemon-card {
	background: white;
	border-radius: 15px;
	overflow: hidden;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	transition: transform 0.3s, box-shadow 0.3s;
}

.pokemon-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.pokemon-image {
	background: linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%);
	padding: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 180px;
}

.pokemon-image img {
	max-width: 120px;
	max-height: 120px;
	object-fit: contain;
}

.pokemon-info {
	padding: 1.5rem;
	text-align: center;
}

.pokemon-info h3 {
	margin: 0 0 0.5rem 0;
	color: #333;
	font-size: 1.3rem;
}

.type-badge {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
	padding: 0.3rem 1rem;
	border-radius: 15px;
	font-size: 0.85rem;
	font-weight: bold;
}

.pokemon-actions {
	display: flex;
	gap: 0.5rem;
	padding: 0 1rem 1rem 1rem;
}

.view-btn, .delete-btn {
	flex: 1;
	padding: 0.6rem;
	border: none;
	border-radius: 8px;
	font-size: 0.9rem;
	font-weight: bold;
	cursor: pointer;
	transition: transform 0.2s;
}

.view-btn {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
}

.delete-btn {
	background: linear-gradient(135deg, #E74C3C 0%, #C0392B 100%);
	color: white;
}

.view-btn:hover, .delete-btn:hover {
	transform: scale(1.05);
}
</style>