<template>
<div class="user-loader">

    <h2>User Loader</h2>
    <label>
    User ID:
    <input type="text" v-model="userId" />
    </label>
    <p>{{ statusMessage }}</p>
</div>
</template>
<script setup>
import {ref, watch} from 'vue'
const userId = ref('')
const statusMessage = ref('')
watch(userId, (newId) => {
    if (!newId) {
        statusMessage.value = ''
        return
    }
    statusMessage.value = `${newId} erabiltzailearen datuak kargatzen...`
    setTimeout(() => {
        statusMessage.value = `${newId} erabiltzailearen datuak kargatuta`
    }, 2000)
})
</script>