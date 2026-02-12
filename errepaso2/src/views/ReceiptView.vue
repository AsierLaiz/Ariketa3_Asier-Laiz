<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRecipeStore } from '../stores/recipeStore'

const recipeStore = useRecipeStore()
const router = useRouter()

onMounted(async () => {
	// recipeStore comprueba si ya hay datos para no duplicar
	await recipeStore.loadRecipes()
})

const filterMota = ref('') // '' significa 'mostrar todas'
const filteredRecipes = computed(() => {
	const recipes = recipeStore.userRecipes // recetas del usuario activo
	if (!filterMota.value) return recipes // sin filtro -> todas
	return recipes.filter(r => r.mota === filterMota.value)
})

const viewRecipe = id => {
	router.push(`/details/${id}`)
}

const deleteRecipe = id => {
	recipeStore.deleteRecipe(id)
}
</script>

<template>
<select v-model='filterMota'>
	<option value=''>Guztiak</option>
	<option value='lehenego platerra'>Lehenego platerra</option>
</select>

<table>
	<tbody>
		<tr v-for='recipe in filteredRecipes' :key='recipe.id'>
			<td>{{ recipe.izena }}</td>
			<td>{{ recipe.mota }}</td>
			<td>{{ recipe.zailtasuna }}</td>
			<td>
				<button @click='viewRecipe(recipe.id)'>Ikusi</button>
				<button @click='deleteRecipe(recipe.id)'>Ezabatu</button>
			</td>
		</tr>
	</tbody>
</table>
</template>