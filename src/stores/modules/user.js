import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoServer } from '@/api/user'

export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')

    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    const user = ref({})
    const getUser = async () => {
      const { data } = await userGetInfoServer()
      user.value = data.data
    }
    const setUser = (newUser) => {
      user.value = newUser
    }
    return {
      token,
      user,
      setToken,
      setUser,
      removeToken,
      getUser
    }
  },
  {
    persist: true
  }
)
