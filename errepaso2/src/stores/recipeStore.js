import { defineStore } from 'pinia'
import { useUserStore } from './userStore'

export const useRecipeStore = defineStore('recipe', {
	state: () => ({
		recipes: []
	}),
	getters: {
		userRecipes: state => {
			const userStore = useUserStore()
			const userId = userStore.currentUser?.id
			if (!userId) return []
			return state.recipes.filter(r => r.idAuthor === userId)
		}
	},
	actions: {
		async loadRecipes() {
			// Solo carga si el array esta vacio (para no duplicar)
			if (this.recipes.length === 0) {
				const response = await fetch('/data/errezetak.json')
				const data = await response.json()
				this.recipes = data
			}
		},
		addRecipe(recipe) {
			// Genera un ID unico y aniade la receta al array
			const maxId = this.recipes.length ? Math.max(...this.recipes.map(r => r.id)) : 0
			const newId = maxId + 1
			const userStore = useUserStore()
			const userId = userStore.currentUser?.id
			this.recipes.push({ ...recipe, id: newId, idAuthor: userId })
		},
		deleteRecipe(id) {
			this.recipes = this.recipes.filter(r => r.id !== id)
		},
		updateRecipe(updatedRecipe) {
			const index = this.recipes.findIndex(r => r.id === updatedRecipe.id)
			if (index !== -1) {
				this.recipes[index] = { ...this.recipes[index], ...updatedRecipe }
			}
		}
	}
})