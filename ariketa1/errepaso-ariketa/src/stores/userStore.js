import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null
  }),
  
  getters: {
    isLoggedIn: (state) => state.currentUser !== null,
    userName: (state) => state.currentUser?.izena || 'gonbidatua'
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
