<script setup>
import SimpleForm from './components/SimpleForm.vue'
import LoginForm from './components/LoginForm.vue'
import MovieForm from './components/MovieForm.vue'
</script>

<template>
  <div class="app">
    <h1>Formulario Ariketak</h1>

    <section>
      <h2>1. Simple Form</h2>
      <SimpleForm />
    </section>

    <hr />

    <section>
      <h2>2. Login Form</h2>
      <LoginForm />
    </section>

    <hr />

    <section>
      <h2>3. Movie Form</h2>
      <MovieForm />
    </section>
  </div>
</template>

<style scoped>
.app {
  max-width: 800px;
  margin: 2rem auto;
  font-family: Arial, sans-serif;
}

section {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #ddd;
  border-radius: 10px;
}

hr {
  margin: 2rem 0;
}
</style>
