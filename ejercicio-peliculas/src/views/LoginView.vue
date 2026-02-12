<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent='handleLogin'>

      <input 
        type="text" 
        placeholder="Usuario"
        v-model="username"
      />

      <input 
        type="password" 
        placeholder="Contraseña"
        v-model="password"
      />

      <button 
        :disabled='!isFormValid'
      >
        Entrar
      </button>

      <p v-if="error" class="error">
        Usuario o contraseña incorrectos
      </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/directorStore'

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
  console.log('Intentando login con usuario:', username.value)
  try {
    const response = await fetch('/data/directors.json')
    console.log('Respuesta del fetch:', response.status)
    const users = await response.json()
    console.log('Usuarios cargados:', users)
    const user = users.find(u => u.username === username.value && u.password === password.value)
    console.log('Usuario encontrado:', user)
    if (user) {
      console.log('Login exitoso para:', user.username)
      userStore.login(user)
      router.push('/movies')
    } else {
      console.log('Credenciales incorrectas')
      error.value = 'Erabiltzailea edo pasahitza okerra da'
    }
  } catch (err) {
    console.error('Error durante el login:', err)
    error.value = 'Error en la conexión'
  }
}
</script>


<style>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1e2f, #2c3e50);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 15px;
  width: 350px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  text-align: center;
}

.login-card h2 {
  margin-bottom: 20px;
}

.login-card input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.login-card button {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #2c3e50;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.login-card button:hover {
  background: #1abc9c;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>