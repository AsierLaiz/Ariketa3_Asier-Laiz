
<template>
  <div style="max-width: 400px; margin: 2rem auto;">
    <h1>Saioa hasi</h1>
    <input v-model='username' type='text' placeholder='Erabiltzailea' />
    <input v-model='password' type='password' placeholder='Pasahitza' />
    <p v-if='error' style='color:red'>{{ error }}</p>
    <button @click='handleLogin' :disabled='!isFormValid'>Bidali</button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
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
  const response = await fetch('/data/erabiltzaileak.json')
  const users = await response.json()
  const user = users.find(u => u.izena === username.value && u.pasahitza === password.value)
  if (user) {
    userStore.login(user)
    router.push('/list')
  } else {
    error.value = 'Erabiltzailea edo pasahitza okerra da'
  }
}
</script>