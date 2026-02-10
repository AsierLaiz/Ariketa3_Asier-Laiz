<template>
  <div>
    <h2>Ongi etorri</h2>
      <input v-model="inputText" placeholder="Sartu zure testua" />
    
    <ChildComponent
    :userName="inputText"
    @onOnartu="incrementAccept"
    @onUtzi="incrementCancel"
    />

    <p>Onartu sakatu da: {{ acceptCount }}</p>
    <p>Utzi sakatu da: {{ cancelCount }}</p>

  </div>
</template>
<script setup>
import { ref} from 'vue';
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


