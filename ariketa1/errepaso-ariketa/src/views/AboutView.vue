<template>
  <div class="about-view">
    <div class="about-container">
      <h2>Erabiltzailearen Informazioa</h2>
      
      <div v-if="currentUser" class="user-info">
        <div class="info-item">
          <strong>ID:</strong>
          <span>{{ currentUser.id }}</span>
        </div>
        
        <div class="info-item">
          <strong>Izena:</strong>
          <span>{{ currentUser.izena }}</span>
        </div>
        
        <div class="info-item">
          <strong>Hiria:</strong>
          <span>{{ currentUser.hiria }}</span>
        </div>
        
        <div class="info-item">
          <strong>Telefonoa:</strong>
          <span>{{ currentUser.telefonoa }}</span>
        </div>
        
        <div class="info-item highlight">
          <strong>Errezetak:</strong>
          <span class="recipe-count">{{ recipeCount }}</span>
        </div>
      </div>
      
      <div v-else class="no-user">
        <p>Ez duzu saioa hasi. Mesedez, hasi saioa lehenik.</p>
        <button @click="goToLogin" class="btn btn-primary">Login-era joan</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { useRecipeStore } from '../stores/recipeStore'

const router = useRouter()
const userStore = useUserStore()
const recipeStore = useRecipeStore()

const currentUser = computed(() => userStore.currentUser)
const recipeCount = computed(() => recipeStore.recipeCount)

const goToLogin = () => {
  router.push('/')
}
</script>

<style scoped>
.about-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.about-container {
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

.user-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #3498db;
}

.info-item strong {
  color: #2c3e50;
  font-size: 1rem;
}

.info-item span {
  color: #34495e;
  font-size: 1rem;
}

.info-item.highlight {
  background-color: #e8f4f8;
  border-left-color: #2ecc71;
}

.recipe-count {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2ecc71;
}

.no-user {
  text-align: center;
  padding: 2rem;
}

.no-user p {
  color: #7f8c8d;
  margin-bottom: 1rem;
  font-size: 1.1rem;
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
</style>
