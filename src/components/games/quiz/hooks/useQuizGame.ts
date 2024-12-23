import { ref } from 'vue'
import { useQuizState } from './useQuizState'
import { useQuizActions } from './useQuizActions'
import { useQuizProgress } from './useQuizProgress'
import { useQuizRewards } from './useQuizRewards'
import { useQuizTimer } from './useQuizTimer'
import { getRandomQuestions } from '@/utils/quizUtils'

export function useQuizGame() {
  const { state, resetState } = useQuizState()
  const { selectAnswer, currentQuestion } = useQuizActions(state)
  const { currentRound, totalRounds, progress } = useQuizProgress(state)
  const { calculateReward, awardTokens } = useQuizRewards()
  const { timeLeft, startTimer, stopTimer, resetTimer } = useQuizTimer(() => {
    state.isGameOver = true
  })

  const initGame = () => {
    resetState()
    state.questions = getRandomQuestions(5)
    resetTimer()
    startTimer()
  }

  const resetGame = () => {
    initGame()
  }

  return {
    // State
    ...state,
    timeLeft,
    
    // Computed
    currentQuestion,
    currentRound,
    totalRounds,
    progress,
    
    // Actions
    selectAnswer,
    resetGame,
    initGame
  }
}
