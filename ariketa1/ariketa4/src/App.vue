<script setup>
import AgeClassifier from './components/AgeClassifier.vue'
import CounterLogger from './components/CounterLogger.vue'
import UserLoader from './components/UserLoader.vue'
</script>

<template>
  <div class="app">
    <hr />

    <section>
      <h2>2. Age Classifier</h2>
      <AgeClassifier />
    </section>

    
    <hr />
    <section>
      <h2>3. Counter Logger</h2>
      <CounterLogger />
    </section>

    <hr />
     <section>
      <h2>4. User Loader</h2>
      <UserLoader />
    </section>

  </div>
</template>

<style scoped>
.app {
  max-width: 700px;
  margin: 2rem auto;
  font-family: Arial, sans-serif;
}

section {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

hr {
  margin: 2rem 0;
}
</style>
