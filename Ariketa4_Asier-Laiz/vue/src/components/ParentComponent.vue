<template>
  <div>
    <h1>Ongietorri!</h1>
    <input v-model="inputText" placeholder="Sartu zure testua" />

    <ChildComponent 
      :userName="inputText" 
      @onAccept="incrementAccept" 
      @onCancel="incrementCancel" 
    />

    <p>Onartu sakatu da: {{ acceptCount }} aldiz</p>
    <p>Utzi sakatu da: {{ cancelCount }} aldiz</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const inputText = ref('');

const acceptCount = ref(0);
const cancelCount = ref(0);

function incrementAccept() {
  acceptCount.value++;
}

function incrementCancel() {
  cancelCount.value++;
}
</script>
