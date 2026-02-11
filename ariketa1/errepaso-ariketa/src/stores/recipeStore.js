import { defineStore } from 'pinia'
import { useUserStore } from './userStore'

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    recipes: []
  }),
  
  getters: {
    userRecipes: (state) => {
      const userStore = useUserStore()
      if (!userStore.currentUser) return []
      return state.recipes.filter(r => r.idAuthor === userStore.currentUser.id)
    },
    
    recipeCount: (state) => {
      const userStore = useUserStore()
      if (!userStore.currentUser) return 0
      return state.recipes.filter(r => r.idAuthor === userStore.currentUser.id).length
    },
    
    getRecipeById: (state) => (id) => {
      return state.recipes.find(r => r.id === parseInt(id))
    }
  },
  
  actions: {
    async loadRecipes() {
      if (this.recipes.length === 0) {
        try {
          const response = await fetch('/data/errezetak.json')
          const data = await response.json()
          this.recipes = data
        } catch (error) {
          console.error('Error loading recipes:', error)
        }
      }
    },
    
    addRecipe(recipe) {
      const userStore = useUserStore()
      const newRecipe = {
        ...recipe,
        idAuthor: userStore.currentUser?.id || 0,
        id: this.recipes.length > 0 ? Math.max(...this.recipes.map(r => r.id)) + 1 : 1
      }
      this.recipes.push(newRecipe)
    },
    
    deleteRecipe(id) {
      const index = this.recipes.findIndex(r => r.id === id)
      if (index !== -1) {
        this.recipes.splice(index, 1)
      }
    },
    
    updateRecipe(id, updatedRecipe) {
      const index = this.recipes.findIndex(r => r.id === id)
      if (index !== -1) {
        this.recipes[index] = { ...this.recipes[index], ...updatedRecipe }
      }
    }
  }
})
