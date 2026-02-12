<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/userStore'
const userStore = useUserStore()
const userName = computed(() => userStore.userName)
</script>

<template>
<nav style="display: flex; gap: 1rem; padding: 1rem; background: #f0f0f0; border-bottom: 1px solid #ccc; margin-bottom: 2rem;">
  <RouterLink to='/'>Home</RouterLink>
  <RouterLink to='/list'>Errezetak</RouterLink>
  <RouterLink to='/about'>About</RouterLink>
  <span style="margin-left: auto;">{{ userName }}</span>
</nav>
</template>