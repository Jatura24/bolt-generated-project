import { ref, onUnmounted } from 'vue'

export function useQuizTimer(onTimeUp: () => void) {
  const timeLeft = ref(60) // 60 seconds per quiz
  let timer: number

  const startTimer = () => {
    timer = window.setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
      } else {
        stopTimer()
        onTimeUp()
      }
    }, 1000)
  }

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer)
    }
  }

  const resetTimer = () => {
    timeLeft.value = 60
    stopTimer()
    startTimer()
  }

  onUnmounted(() => {
    stopTimer()
  })

  return {
    timeLeft,
    startTimer,
    stopTimer,
    resetTimer
  }
}
