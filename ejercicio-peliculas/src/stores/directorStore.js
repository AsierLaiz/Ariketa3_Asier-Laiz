import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentDirector: null
  }),
  
  getters: {
    isLoggedIn: (state) => state.currentDirector !== null,
    userName: (state) => state.currentDirector?.username || 'Director Invitado'
  },
  
  actions: {
    login(user) {
      this.currentDirector = user
    },
    
    logout() {
      this.currentDirector = null
    }
  }
})
