<template>
  <div class="receipt-view">
    <h2>Erabiltzailearen Errezetak</h2>
    
    <!-- Formulario para añadir receta -->
    <div class="form-container">
      <h3>Errezeta Berria</h3>
      <form @submit.prevent="addRecipe">
        <div class="form-row">
          <div class="form-group">
            <label>Izena:</label>
            <input v-model="newRecipe.izena" type="text" required />
          </div>
          
          <div class="form-group">
            <label>Mota:</label>
            <select v-model="newRecipe.mota" required>
              <option value="">Aukeratu...</option>
              <option value="lehenego platerra">Lehenego platerra</option>
              <option value="bigarren platerra">Bigarren platerra</option>
              <option value="postrea">Postrea</option>
            </select>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>Zailtasuna:</label>
            <select v-model="newRecipe.zailtasuna" required>
              <option value="">Aukeratu...</option>
              <option value="erreza">Erreza</option>
              <option value="normala">Normala</option>
              <option value="zaila">Zaila</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Denbora (minutuak):</label>
            <input v-model.number="newRecipe.denbora" type="number" min="1" required />
          </div>
        </div>
        
        <div class="form-buttons">
          <button type="submit" class="btn btn-primary">Gorde</button>
          <button type="button" @click="clearForm" class="btn btn-secondary">Garbitu</button>
        </div>
      </form>
    </div>
    
    <!-- Filtro por tipo -->
    <div class="filter-container">
      <label>Filtratu mota:</label>
      <select v-model="filterMota">
        <option value="">Guztiak</option>
        <option value="lehenego platerra">Lehenego platerra</option>
        <option value="bigarren platerra">Bigarren platerra</option>
        <option value="postrea">Postrea</option>
      </select>
    </div>
    
    <!-- Tabla de recetas -->
    <div class="table-container">
      <table v-if="filteredRecipes.length > 0">
        <thead>
          <tr>
            <th>Izena</th>
            <th>Mota</th>
            <th>Zailtasuna</th>
            <th>Ekintzak</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipe in filteredRecipes" :key="recipe.id">
            <td>{{ recipe.izena }}</td>
            <td>{{ recipe.mota }}</td>
            <td>{{ recipe.zailtasuna }}</td>
            <td class="actions">
              <button @click="viewRecipe(recipe.id)" class="btn btn-view">Ikusi</button>
              <button @click="deleteRecipe(recipe.id)" class="btn btn-delete">Ezabatu</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="no-recipes">Ez dago errezetarik</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRecipeStore } from '../stores/recipeStore'

const router = useRouter()
const recipeStore = useRecipeStore()

const filterMota = ref('')

const newRecipe = ref({
  izena: '',
  mota: '',
  zailtasuna: '',
  denbora: null,
  osagaiak: [],
  prozedura: []
})

onMounted(async () => {
  await recipeStore.loadRecipes()
})

const filteredRecipes = computed(() => {
  const recipes = recipeStore.userRecipes
  if (!filterMota.value) {
    return recipes
  }
  return recipes.filter(r => r.mota === filterMota.value)
})

const addRecipe = () => {
  recipeStore.addRecipe(newRecipe.value)
  clearForm()
}

const clearForm = () => {
  newRecipe.value = {
    izena: '',
    mota: '',
    zailtasuna: '',
    denbora: null,
    osagaiak: [],
    prozedura: []
  }
}

const viewRecipe = (id) => {
  router.push(`/details/${id}`)
}

const deleteRecipe = (id) => {
  if (confirm('Ziur zaude errezeta hau ezabatu nahi duzula?')) {
    recipeStore.deleteRecipe(id)
  }
}
</script>

<style scoped>
.receipt-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h2 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

h3 {
  color: #34495e;
  margin-bottom: 1rem;
}

.form-container {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

input, select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus, select:focus {
  outline: none;
  border-color: #3498db;
}

.form-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.filter-container {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-container select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.table-container {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #2c3e50;
  color: white;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tbody tr:hover {
  background-color: #f8f9fa;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: opacity 0.3s;
}

.btn:hover {
  opacity: 0.8;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-view {
  background-color: #2ecc71;
  color: white;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.no-recipes {
  text-align: center;
  color: #7f8c8d;
  padding: 2rem;
}
</style>
