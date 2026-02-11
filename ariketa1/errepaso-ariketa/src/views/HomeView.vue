<template>
  <div class="home-view">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Erabiltzailea:</label>
          <input 
            id="username"
            v-model="username" 
            type="text" 
            placeholder="Sartu erabiltzailea"
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Pasahitza:</label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            placeholder="Sartu pasahitza"
            class="form-input"
          />
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <button 
          type="submit" 
          :disabled="!isFormValid"
          class="submit-button"
        >
          Bidali
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const error = ref('')

const isFormValid = computed(() => {
  return username.value.trim() !== '' && password.value.trim() !== ''
})

const handleLogin = async () => {
  error.value = ''
  
  try {
    const response = await fetch('/data/erabiltzaileak.json')
    const users = await response.json()
    
    const user = users.find(u => 
      u.izena === username.value && u.pasahitza === password.value
    )
    
    if (user) {
      userStore.login(user)
      router.push('/list')
    } else {
      error.value = 'Erabiltzailea edo pasahitza okerra da'
    }
  } catch (err) {
    error.value = 'Errorea gertatu da'
    console.error('Login error:', err)
  }
}
</script>

<style scoped>
.home-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  padding: 2rem;
}

.login-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
}

.error-message {
  color: red;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #fee;
  border-radius: 4px;
  text-align: center;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover:not(:disabled) {
  background-color: #2980b9;
}

.submit-button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}
</style>
