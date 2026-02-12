<script setup>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useRecipeStore } from '../stores/recipeStore'

const route = useRoute()
const recipeStore = useRecipeStore()

const recipe = computed(() => {
  const id = parseInt(route.params.id)
  return recipeStore.recipes.find(r => r.id === id)
})

const isEditing = ref(false)
const editedRecipe = ref(null)

const startEditing = () => {
  editedRecipe.value = { ...recipe.value }
  isEditing.value = true
}

const saveChanges = () => {
  if (editedRecipe.value) {
    recipeStore.updateRecipe(editedRecipe.value)
  }
  isEditing.value = false
}
</script>

<template>
  <div v-if="recipe">
    <div v-if="!isEditing">
      <p>{{ recipe.izena }}</p>
      <button @click="startEditing">Editatu</button>
    </div>
    <div v-else>
      <input v-model="editedRecipe.izena" />
      <button @click="saveChanges">Gorde</button>
    </div>
  </div>
</template>