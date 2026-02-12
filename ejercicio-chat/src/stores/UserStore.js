import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null
  }),
  
  getters: {
    isLoggedIn: (state) => state.currentUser !== null,
    userName: (state) => state.currentUser?.username || 'Entrenador Invitado'
  },
  
  actions: {
    login(user) {
      this.currentUser = user
    },
    
    logout() {
      this.currentUser = null
    }
  }
})
