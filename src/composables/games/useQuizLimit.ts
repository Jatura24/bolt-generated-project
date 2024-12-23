import { ref } from 'vue'

export function useQuizLimit() {
  const lastPlayedDate = ref(localStorage.getItem('lastQuizDate'))
  
  const canPlay = () => {
    if (!lastPlayedDate.value) return true
    
    const today = new Date().toDateString()
    return lastPlayedDate.value !== today
  }
  
  const markAsPlayed = () => {
    const today = new Date().toDateString()
    lastPlayedDate.value = today
    localStorage.setItem('lastQuizDate', today)
  }
  
  return {
    canPlay,
    markAsPlayed
  }
}
