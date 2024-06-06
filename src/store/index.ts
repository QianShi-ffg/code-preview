import { defineStore, createPinia } from 'pinia';
export const useUserStore = defineStore('user', {
  state: ()=> {
    return {
      userInfo: {}
    }
  },
  getters: {
    getUserInfo: (state) => {
      return state.userInfo
    },
  },
  actions: {
    setUserInfo(userInfo: any){
      this.userInfo = userInfo
    }
  },
  persist: true,
})

export const store = createPinia()