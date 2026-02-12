import { defineStore } from 'pinia'
import { useUserStore } from './directorStore'

export const usemovieStore = defineStore('movie', {
	state: () => ({
		movies: [],
		attacks: []
	}),
	getters: {
        usermovies: state => state.movies,
	},
	actions: {
		async loadmovies() {
			if (this.movies.length === 0) {
				const response = await fetch('/data/movies.json')
				const data = await response.json()
				this.movies = data
			}
		},
		addmovie(movie) {
			const maxId = this.movies.length ? Math.max(...this.movies.map(r => r.id)) : 0
			const newId = maxId + 1
			const userStore = useUserStore()
			const userId = userStore.currentUser?.id
			this.movies.push({ ...movie, id: newId, idAuthor: userId })
		},
		deletemovie(id) {
			this.movies = this.movies.filter(r => r.id !== id)
		},
		updatemovie(updatedmovie) {
			const index = this.movies.findIndex(r => r.id === updatedmovie.id)
			if (index !== -1) {
				this.movies[index] = { ...this.movies[index], ...updatedmovie }
			}
		}
	}
})