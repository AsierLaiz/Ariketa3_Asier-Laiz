<template>
    <div>
        <h2>Login Form</h2>
        <label>Erabiltzailea:</label>
        <input type="text" v-model="user" />
        <label>Pasahitza:</label>
        <input type="password" v-model="password" />
        <br />
        <button :disabled="!canSubmit">Sartu</button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const user = ref('')
const password = ref('')
const canSubmit = computed(() => {
    return user.value !== '' && password.value !== ''
})
</script>