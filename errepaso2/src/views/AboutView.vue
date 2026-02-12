<script setup>

import { computed } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRecipeStore } from '../stores/recipeStore'
const userStore = useUserStore()
const recipeStore = useRecipeStore()
const currentUser = computed(() => userStore.currentUser)
const recipeCount = computed(() => recipeStore.recipeCount)
</script>

<template>
  <div v-if="currentUser">
    <p><b>Izena:</b> {{ currentUser.izena }}</p>
    <p><b>Hiria:</b> {{ currentUser.hiria }}</p>
    <p><b>Telefonoa:</b> {{ currentUser.telefonoa }}</p>
    <p><b>Errezetak:</b> {{ recipeCount }}</p>
  </div>
  <div v-else>
    <p>Ez duzu saioa hasi. Mesedez, hasi saioa lehenik.</p>
  </div>
</template>