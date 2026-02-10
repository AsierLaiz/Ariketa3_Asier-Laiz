<template>
<h2>Age classifier</h2>

<label >
    Adina:
    <input type="number" v-model.number="age" />
</label>

<p>Idatzitako adina: {{ age }}</p>
<p>Sailkapena: {{ classification }}</p>


</template>

<script setup>
import { ref, computed, watch } from 'vue'
const age = ref(0)

const classification = computed(() => {
    if (age.value < 18) return 'Adingabekoa'
    if (age.value < 65) return 'Heldua'
    return 'Nagusia'
})

watch(age, (newVal, oldVal) => {
    console.log(`Adina aldatu da: ${oldVal} -> ${newVal}`)
})
</script>