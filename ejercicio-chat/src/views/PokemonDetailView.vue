<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { usePokemonStore } from '../stores/pokemonStore'

const route = useRoute()
const pokemonStore = usePokemonStore()

onMounted(async () => {
  await pokemonStore.loadPokemons()
  await pokemonStore.loadAttacks()
})

const pokemon = computed(() => {
  const id = parseInt(route.params.id)
  return pokemonStore.pokemons.find(pokemonItem => pokemonItem.id === id)
})

const pokemonAttacks = computed(() => {
  if (!pokemon.value) return []
  return pokemonStore.getPokemonAttacks(pokemon.value.id)
})

const isEditing = ref(false)
const editedPokemon = ref(null)

const startEditing = () => {
  editedPokemon.value = { ...pokemon.value }
  isEditing.value = true
}

const saveChanges = () => {
  if (editedPokemon.value) {
    pokemonStore.updatePokemon(editedPokemon.value)
  }
  isEditing.value = false
}
</script>

<template>
  <div class='detail-container'>
    <div v-if="pokemon" class='detail-card'>
      <div v-if="!isEditing" class='view-mode'>
        <div class='pokemon-header'>
          <h1>{{ pokemon.name }}</h1>
          <span class='type-badge'>{{ pokemon.type }}</span>
        </div>
        <div class='pokemon-details'>
          <div class='attacks-section'>
            <h2>⚡ Ataques</h2>
            <ul v-if="pokemonAttacks.length > 0" class='attacks-list'>
              <li v-for="attack in pokemonAttacks" :key="attack" class='attack-item'>{{ attack }}</li>
            </ul>
            <p v-else class='no-attacks'>Ataquerik ez</p>
          </div>
        </div>
        <button class='edit-btn' @click="startEditing">✏️ Editatu</button>
      </div>
      <div v-else class='edit-mode'>
        <h1>Editatu {{ pokemon.name }}</h1>
        <div class='form-group'>
          <label>Izena:</label>
          <input v-model="editedPokemon.name" class='form-input' />
        </div>
        <div class='form-group'>
          <label>Mota:</label>
          <input v-model="editedPokemon.type" class='form-input' />
        </div>
        <div class='button-group'>
          <button class='save-btn' @click="saveChanges">💾 Gorde</button>
          <button class='cancel-btn' @click="isEditing = false">❌ Utzi</button>
        </div>
      </div>
    </div>
    <div v-else class='not-found'>
      <p>❌ Pokemon ez aurkitu</p>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  min-height: calc(100vh - 60px);
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
  overflow: hidden;
}

.pokemon-header {
  background: linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%);
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pokemon-header h1 {
  margin: 0;
  color: white;
  font-size: 2rem;
}

.type-badge {
  background: rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
}

.pokemon-details {
  padding: 2rem;
}

.attacks-section h2 {
  color: #333;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.attacks-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.attack-item {
  background: #f5f5f5;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-left: 4px solid #667eea;
  border-radius: 5px;
  color: #333;
}

.no-attacks {
  color: #999;
  font-style: italic;
}

.edit-btn {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.edit-btn:hover {
  transform: translateY(-2px);
}

.edit-mode {
  padding: 2rem;
}

.edit-mode h1 {
  color: #333;
  margin-top: 0;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: bold;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.save-btn, .cancel-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.save-btn {
  background: linear-gradient(135deg, #27AE60 0%, #2ECC71 100%);
  color: white;
}

.cancel-btn {
  background: linear-gradient(135deg, #E74C3C 0%, #C0392B 100%);
  color: white;
}

.save-btn:hover, .cancel-btn:hover {
  transform: translateY(-2px);
}

.not-found {
  background: white;
  padding: 3rem 2rem;
  border-radius: 15px;
  text-align: center;
  color: #e74c3c;
  font-size: 1.1rem;
  max-width: 600px;
}
</style>