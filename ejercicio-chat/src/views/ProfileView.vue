<script setup>

import { computed, onMounted } from 'vue'
import { useUserStore } from '../stores/UserStore'
import { usePokemonStore } from '../stores/pokemonStore'

const userStore = useUserStore()
const pokemonStore = usePokemonStore()

onMounted(async () => {
  await pokemonStore.loadPokemons()
})

const currentUser = computed(() => userStore.currentUser)
const pokemonCount = computed(() => pokemonStore.userPokemons.length)
</script>

<template>
  <div class='profile-container'>
    <div v-if="currentUser" class='profile-card'>
      <div class='profile-header'>
        <h1>Nire Profila</h1>
      </div>
      <div class='profile-info'>
        <div class='info-item'>
          <span class='label'>👤 Izena:</span>
          <span class='value'>{{ currentUser.username }}</span>
        </div>
        <div class='info-item'>
          <span class='label'>🌍 Regionoa:</span>
          <span class='value'>{{ currentUser.region }}</span>
        </div>
        <div class='info-item'>
          <span class='label'>🔴 Pokemonak:</span>
          <span class='value badge'>{{ pokemonCount }}</span>
        </div>
      </div>
    </div>
    <div v-else class='no-login'>
      <p>❌ Ez duzu saioa hasi. Mesedez, hasi saioa lehenik.</p>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  min-height: calc(100vh - 60px);
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  overflow: hidden;
}

.profile-header {
  background: linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%);
  padding: 2rem;
  text-align: center;
}

.profile-header h1 {
  color: white;
  margin: 0;
  font-size: 2rem;
}

.profile-info {
  padding: 2rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  font-size: 1.1rem;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: bold;
  color: #333;
}

.value {
  color: #666;
}

.badge {
  background: linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
}

.no-login {
  background: white;
  padding: 3rem 2rem;
  border-radius: 15px;
  text-align: center;
  color: #e74c3c;
  font-size: 1.1rem;
  max-width: 500px;
}
</style>