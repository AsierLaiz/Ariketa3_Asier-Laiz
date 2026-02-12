import { defineStore } from 'pinia'
import { useUserStore } from './UserStore'

export const usePokemonStore = defineStore('pokemon', {
	state: () => ({
		pokemons: [],
		attacks: []
	}),
	getters: {
        userPokemons: state => state.pokemons,
		getPokemonAttacks: (state) => (pokemonId) => {
			const attackEntry = state.attacks.find(a => a.pokemonId === pokemonId)
			return attackEntry ? attackEntry.attacks : []
		}
	},
	actions: {
		async loadPokemons() {
			if (this.pokemons.length === 0) {
				const response = await fetch('/data/pokemons.json')
				const data = await response.json()
				this.pokemons = data
			}
		},
		async loadAttacks() {
			if (this.attacks.length === 0) {
				const response = await fetch('/data/attacks.json')
				const data = await response.json()
				this.attacks = data
			}
		},
		addPokemon(pokemon) {
			const maxId = this.pokemons.length ? Math.max(...this.pokemons.map(r => r.id)) : 0
			const newId = maxId + 1
			const userStore = useUserStore()
			const userId = userStore.currentUser?.id
			this.pokemons.push({ ...pokemon, id: newId, idAuthor: userId })
		},
		deletePokemon(id) {
			this.pokemons = this.pokemons.filter(r => r.id !== id)
		},
		updatePokemon(updatedPokemon) {
			const index = this.pokemons.findIndex(r => r.id === updatedPokemon.id)
			if (index !== -1) {
				this.pokemons[index] = { ...this.pokemons[index], ...updatedPokemon }
			}
		}
	}
})