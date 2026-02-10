<template>
  <div class="child">
    <h2>Kaixo, {{ userName }}</h2>

    <p>Mesedez, aukeratu aukera bat:</p>

    <button @click="emitOnartu">Onartu</button>
    <button @click="emitUtzi">Utzi</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  userName: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['onOnartu', 'onUtzi'])

function emitOnartu() {
  emit('onOnartu')
}

function emitUtzi() {
  emit('onUtzi')
}
</script>

<style scoped>
.child {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-top: 1rem;
}
button {
  margin-right: 0.5rem;
}
</style>
