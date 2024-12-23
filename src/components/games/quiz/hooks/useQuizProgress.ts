import { computed } from 'vue'
import type { QuizState } from '../types'

export function useQuizProgress(state: QuizState) {
  const currentRound = computed(() => state.currentQuestionIndex + 1)
  const totalRounds = computed(() => state.questions.length)
  const progress = computed(() => (currentRound.value / totalRounds.value) * 100)

  return {
    currentRound,
    totalRounds,
    progress
  }
}
