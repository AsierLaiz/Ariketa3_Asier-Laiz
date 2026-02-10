<template>
  <div class="counter-logger">
    <h2>Counter Logger</h2>

    <label>
      Step:
      <input type="number" v-model.number="step" />
    </label>

    <p>Count: {{ count }}</p>

    <button @click="increment">Gehitu</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const step = ref(1)
const count = ref(0)

function increment() {
  const oldValue = count.value
  count.value += step.value
  console.log(`Aurrekoa: ${oldValue}, Berria: ${count.value}`)
}
</script>
