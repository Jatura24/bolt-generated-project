import { ref } from 'vue'
import type { QuizState } from '../types'

export function useQuizState() {
  const state = ref<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    tokensEarned: 0,
    isGameOver: false,
    selectedAnswer: null,
    isAnswerLocked: false
  })

  const resetState = () => {
    state.value = {
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      tokensEarned: 0,
      isGameOver: false,
      selectedAnswer: null,
      isAnswerLocked: false
    }
  }

  return {
    state,
    resetState
  }
}
