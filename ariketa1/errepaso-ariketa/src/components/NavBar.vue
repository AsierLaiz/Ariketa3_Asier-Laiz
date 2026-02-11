<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/list" class="nav-link">Errezetak</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
      <span class="user-name">{{ userName }}</span>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const userName = computed(() => userStore.userName)
</script>

<style scoped>
.navbar {
  background-color: #2c3e50;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #34495e;
}

.nav-link.router-link-active {
  background-color: #3498db;
}

.user-name {
  margin-left: auto;
  color: #ecf0f1;
  font-weight: bold;
  padding: 0.5rem 1rem;
  background-color: #34495e;
  border-radius: 4px;
}
</style>
