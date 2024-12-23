import { ref, computed } from 'vue'
import { useTokenStore } from '@/stores/token'
import { getRandomQuestions } from '@/utils/quizUtils'
import { calculateTokenReward } from '@/utils/tokenUtils'
import type { Question, QuizState } from '@/types/quiz'

export function useQuizGame() {
  const tokenStore = useTokenStore()
  const state = ref<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    tokensEarned: 0,
    isGameOver: false,
    selectedAnswer: null,
    isAnswerLocked: false
  })

  const currentQuestion = computed(() => 
    state.value.questions[state.value.currentQuestionIndex]
  )
  
  const currentRound = computed(() => 
    state.value.currentQuestionIndex + 1
  )
  
  const totalRounds = computed(() => 
    state.value.questions.length
  )

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      state.value.score++
      const tokens = calculateTokenReward(10) // Base reward of 10 tokens
      state.value.tokensEarned += tokens
      tokenStore.earnTokens(tokens, 'Token Quest')
    }
  }

  const selectAnswer = (index: number) => {
    if (state.value.isAnswerLocked) return

    state.value.selectedAnswer = index
    state.value.isAnswerLocked = true

    const isCorrect = index === currentQuestion.value?.correctAnswer
    handleAnswer(isCorrect)

    setTimeout(() => {
      if (state.value.currentQuestionIndex < state.value.questions.length - 1) {
        nextQuestion()
      } else {
        state.value.isGameOver = true
      }
    }, 1500)
  }

  const nextQuestion = () => {
    state.value.currentQuestionIndex++
    state.value.selectedAnswer = null
    state.value.isAnswerLocked = false
  }

  const resetGame = () => {
    state.value = {
      questions: getRandomQuestions(5),
      currentQuestionIndex: 0,
      score: 0,
      tokensEarned: 0,
      isGameOver: false,
      selectedAnswer: null,
      isAnswerLocked: false
    }
  }

  return {
    // State
    ...state.value,
    
    // Computed
    currentQuestion,
    currentRound,
    totalRounds,
    
    // Actions
    selectAnswer,
    resetGame,
    initGame: resetGame
  }
}
