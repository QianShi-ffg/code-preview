import { defineStore, createPinia } from 'pinia';

interface userInfo {
  id?: string | number | undefined;
  userName?: string | undefined
}
interface State {
  userInfo: userInfo;
}

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      userInfo: {}
    }
  },
  getters: {
    getUserInfo: (state): userInfo => {
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