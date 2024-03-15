import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('big-count', () => {
  const count = ref(100)
  const addCount = () => {
    count.value++
  }
  return {
    count,
    addCount
  }
})
