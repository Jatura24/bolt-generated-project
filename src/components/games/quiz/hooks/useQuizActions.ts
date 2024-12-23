import { computed } from 'vue'
import { useTokenStore } from '@/stores/token'
import type { QuizState } from '../types'

export function useQuizActions(state: QuizState) {
  const tokenStore = useTokenStore()

  const handleCorrectAnswer = () => {
    state.score++
    const tokens = 10
    state.tokensEarned += tokens
    tokenStore.earnTokens(tokens, 'Token Quest')
  }

  const selectAnswer = (index: number) => {
    if (state.isAnswerLocked) return

    state.selectedAnswer = index
    state.isAnswerLocked = true

    const isCorrect = index === currentQuestion.value?.correctAnswer
    if (isCorrect) {
      handleCorrectAnswer()
    }

    setTimeout(() => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        nextQuestion()
      } else {
        state.isGameOver = true
      }
    }, 1500)
  }

  const nextQuestion = () => {
    state.currentQuestionIndex++
    state.selectedAnswer = null
    state.isAnswerLocked = false
  }

  const currentQuestion = computed(() => 
    state.questions[state.currentQuestionIndex]
  )

  return {
    selectAnswer,
    nextQuestion,
    currentQuestion
  }
}
