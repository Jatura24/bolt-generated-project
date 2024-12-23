import { computed } from 'vue'

export function useQuizPoints() {
  const calculatePoints = (score: number, timeLeft: number) => {
    const basePoints = score * 100 // Base points per correct answer
    const timeBonus = Math.floor(timeLeft * 2) // 2 points per second left
    return basePoints + timeBonus
  }

  return {
    calculatePoints
  }
}
