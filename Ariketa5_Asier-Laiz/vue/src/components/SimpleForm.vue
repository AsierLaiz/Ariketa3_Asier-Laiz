<template>
  <div class="simple-form">
    <h2>Simple Form</h2>

    <div>
      <label>Izena:</label>
      <input type="text" v-model="name" />
      <p v-if="errors.name" class="error">{{ errors.name }}</p>
    </div>

    <div>
      <label>Abizena:</label>
      <input type="text" v-model="surname" />
      <p v-if="errors.surname" class="error">{{ errors.surname }}</p>
    </div>

    <div>
      <label>Kontaktua:</label>
      <input type="text" v-model="contact" />
      <p v-if="errors.contact" class="error">{{ errors.contact }}</p>
    </div>

    <button @click="submit">Bidali</button>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const surname = ref('')
const contact = ref('')
const successMessage = ref('')

const errors = ref({
  name: '',
  surname: '',
  contact: ''
})

function submit() {
  errors.value = { name: '', surname: '', contact: '' }
  successMessage.value = ''

  let valid = true

  if (!name.value) {
    errors.value.name = 'Izena derrigorrezkoa da'
    valid = false
  }
  if (!surname.value) {
    errors.value.surname = 'Abizena derrigorrezkoa da'
    valid = false
  }
  if (!contact.value) {
    errors.value.contact = 'Kontaktua derrigorrezkoa da'
    valid = false
  }

  if (valid) {
    successMessage.value = 'Datuak zuzen bidalita'
    name.value = ''
    surname.value = ''
    contact.value = ''
  }
}
</script>

<style scoped>
.error { color: red; font-size: 0.9rem; }
.success { color: green; font-weight: bold; }
</style>
