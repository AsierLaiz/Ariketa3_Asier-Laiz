<template>
  <div class='login-container'>
    <div class='login-box'>
      <h1>Saioa hasi</h1>
      <p class='subtitle'>Bienvenido a Pokédex</p>
      <form @submit.prevent='handleLogin'>
        <div class='form-group'>
          <label for='username'>Erabiltzailea</label>
          <input
            id='username'
            v-model='username'
            type='text'
            placeholder='Sartu erabiltzailea'
            class='form-input'
          />
        </div>
        <div class='form-group'>
          <label for='password'>Pasahitza</label>
          <input
            id='password'
            v-model='password'
            type='password'
            placeholder='Sartu pasahitza'
            class='form-input'
          />
        </div>
        <p v-if='error' class='error-message'>{{ error }}</p>
        <button type='submit' :disabled='!isFormValid' class='login-btn'>Bidali</button>
      </form>
      <p class='hint'>Saiatu ash / pikachu</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/UserStore'

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
  const response = await fetch('/data/trainers.json')
  const users = await response.json()
  const user = users.find(u => u.username === username.value && u.password === password.value)
  if (user) {
    userStore.login(user)
    router.push('/pokedex')
  } else {
    error.value = 'Erabiltzailea edo pasahitza okerra da'
  }
}
</script>

<style scoped>
.login-container {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}

.login-box {
  background: white;
  padding: 3rem 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
}

.login-box h1 {
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: bold;
  font-size: 0.95rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.error-message {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.login-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.hint {
  text-align: center;
  color: #999;
  font-size: 0.85rem;
  margin-top: 1.5rem;
}
</style>