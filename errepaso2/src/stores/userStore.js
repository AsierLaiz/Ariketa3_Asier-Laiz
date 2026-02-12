import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
// state: los DATOS que guardamos
state: () => ({
currentUser: null // null = no hay usuario logueado
}),
// getters: datos CALCULADOS a partir del state (como propiedades)
getters: {
isLoggedIn: (state) => state.currentUser !== null,
userName: (state) => state.currentUser?.izena || 'gonbidatua'
},
// actions: FUNCIONES que modifican el state
actions: {
login(user) { this.currentUser = user },
logout() { this.currentUser = null }
}
})
