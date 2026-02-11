<template>
  <div class="detail-view">
    <div v-if="recipe" class="detail-container">
      <h2>{{ isEditing ? 'Errezeta Editatu' : 'Errezetaren Xehetasunak' }}</h2>
      
      <div class="detail-content">
        <!-- Modo lectura -->
        <div v-if="!isEditing">
          <div class="detail-item">
            <strong>ID:</strong> {{ recipe.id }}
          </div>
          <div class="detail-item">
            <strong>Izena:</strong> {{ recipe.izena }}
          </div>
          <div class="detail-item">
            <strong>Mota:</strong> {{ recipe.mota }}
          </div>
          <div class="detail-item">
            <strong>Zailtasuna:</strong> {{ recipe.zailtasuna }}
          </div>
          <div class="detail-item">
            <strong>Denbora:</strong> {{ recipe.denbora }} minutu
          </div>
          
          <div class="detail-item">
            <strong>Osagaiak:</strong>
            <ul>
              <li v-for="(osagaia, index) in recipe.osagaiak" :key="index">
                {{ osagaia }}
              </li>
            </ul>
          </div>
          
          <div class="detail-item">
            <strong>Prozedimendua:</strong>
            <ol>
              <li v-for="(pauso, index) in recipe.prozedura" :key="index">
                {{ pauso }}
              </li>
            </ol>
          </div>
        </div>
        
        <!-- Modo edición -->
        <div v-else class="edit-form">
          <div class="form-group">
            <label>Izena:</label>
            <input v-model="editedRecipe.izena" type="text" />
          </div>
          
          <div class="form-group">
            <label>Mota:</label>
            <select v-model="editedRecipe.mota">
              <option value="lehenego platerra">Lehenego platerra</option>
              <option value="bigarren platerra">Bigarren platerra</option>
              <option value="postrea">Postrea</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Zailtasuna:</label>
            <select v-model="editedRecipe.zailtasuna">
              <option value="erreza">Erreza</option>
              <option value="normala">Normala</option>
              <option value="zaila">Zaila</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Denbora (minutuak):</label>
            <input v-model.number="editedRecipe.denbora" type="number" min="1" />
          </div>
          
          <div class="form-group">
            <label>Osagaiak (bat lerro bakoitzeko):</label>
            <textarea 
              v-model="osagaiakText" 
              rows="5"
              placeholder="Osagai bat lerro bakoitzeko"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label>Prozedimendua (pauso bat lerro bakoitzeko):</label>
            <textarea 
              v-model="prozeduraText" 
              rows="5"
              placeholder="Pauso bat lerro bakoitzeko"
            ></textarea>
          </div>
        </div>
      </div>
      
      <div class="buttons">
        <button v-if="!isEditing" @click="goBack" class="btn btn-secondary">
          Itzuli
        </button>
        <button v-if="!isEditing" @click="startEditing" class="btn btn-primary">
          Editatu
        </button>
        <button v-if="isEditing" @click="saveChanges" class="btn btn-success">
          Gorde
        </button>
      </div>
    </div>
    
    <div v-else class="not-found">
      <p>Errezeta ez da aurkitu</p>
      <button @click="goBack" class="btn btn-secondary">Itzuli</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRecipeStore } from '../stores/recipeStore'

const route = useRoute()
const router = useRouter()
const recipeStore = useRecipeStore()

const isEditing = ref(false)
const editedRecipe = ref(null)
const osagaiakText = ref('')
const prozeduraText = ref('')

const recipe = computed(() => {
  return recipeStore.getRecipeById(route.params.id)
})

onMounted(async () => {
  await recipeStore.loadRecipes()
})

const startEditing = () => {
  isEditing.value = true
  editedRecipe.value = { ...recipe.value }
  osagaiakText.value = recipe.value.osagaiak.join('\n')
  prozeduraText.value = recipe.value.prozedura.join('\n')
}

const saveChanges = () => {
  // Convertir los textos en arrays
  editedRecipe.value.osagaiak = osagaiakText.value
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '')
  
  editedRecipe.value.prozedura = prozeduraText.value
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '')
  
  recipeStore.updateRecipe(recipe.value.id, editedRecipe.value)
  isEditing.value = false
}

const goBack = () => {
  router.push('/list')
}
</script>

<style scoped>
.detail-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.detail-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h2 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.detail-content {
  margin-bottom: 2rem;
}

.detail-item {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ecf0f1;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item strong {
  color: #2c3e50;
  display: block;
  margin-bottom: 0.5rem;
}

ul, ol {
  margin-left: 1.5rem;
  margin-top: 0.5rem;
}

li {
  margin-bottom: 0.5rem;
  color: #34495e;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

input, select, textarea {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #3498db;
}

.buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
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

.btn-success {
  background-color: #2ecc71;
  color: white;
}

.not-found {
  text-align: center;
  padding: 3rem;
}

.not-found p {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 1rem;
}
</style>
