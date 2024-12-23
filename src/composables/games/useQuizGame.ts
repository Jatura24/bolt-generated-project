import { ref, computed } from 'vue'
import { useTokenStore } from '@/stores/token'
import { fetchQuestions } from '@/services/questionService'
import { useQuizPoints } from './useQuizPoints'
import { useQuizLimit } from './useQuizLimit'
import type { Question } from '@/types/quiz'

export function useQuizGame() {
  const tokenStore = useTokenStore()
  const { calculatePoints } = useQuizPoints()
  const { canPlay, markAsPlayed } = useQuizLimit()
  
  const questions = ref<Question[]>([])
  const currentQuestionIndex = ref(0)
  const score = ref(0)
  const points = ref(0)
  const tokensEarned = ref(0)
  const isGameOver = ref(false)
  const selectedAnswer = ref<number | null>(null)
  const isAnswerLocked = ref(false)
  const timeLeft = ref(60)
  const isLoading = ref(true)
  const canPlayToday = ref(canPlay())

  const currentQuestion = computed(() => 
    questions.value[currentQuestionIndex.value]
  )

  const currentRound = computed(() => currentQuestionIndex.value + 1)
  const totalRounds = computed(() => questions.value.length)
  const progress = computed(() => 
    (currentRound.value / totalRounds.value) * 100
  )

  const handleAnswer = async (index: number) => {
    if (isAnswerLocked.value) return

    selectedAnswer.value = index
    isAnswerLocked.value = true

    const isCorrect = index === currentQuestion.value?.correctAnswer
    if (isCorrect) {
      score.value++
    }

    setTimeout(() => {
      if (currentQuestionIndex.value < questions.value.length - 1) {
        nextQuestion()
      } else {
        endGame()
      }
    }, 1500)
  }

  const nextQuestion = () => {
    currentQuestionIndex.value++
    selectedAnswer.value = null
    isAnswerLocked.value = false
  }

  const endGame = async () => {
    isGameOver.value = true
    points.value = calculatePoints(score.value, timeLeft.value)
    
    // Convert points to tokens (1 token per 100 points)
    const tokens = Math.floor(points.value / 100)
    tokensEarned.value = tokens
    
    if (tokens > 0) {
      await tokenStore.earnTokens(tokens, 'Token Quest')
    }
    
    markAsPlayed()
  }

  const initGame = async () => {
    if (!canPlayToday.value) return

    isLoading.value = true
    try {
      questions.value = await fetchQuestions(5)
      currentQuestionIndex.value = 0
      score.value = 0
      points.value = 0
      tokensEarned.value = 0
      isGameOver.value = false
      selectedAnswer.value = null
      isAnswerLocked.value = false
      timeLeft.value = 60
    } catch (error) {
      console.error('Error initializing quiz:', error)
    } finally {
      isLoading.value = false
    }
  }

  // Timer countdown
  const startTimer = () => {
    const timer = setInterval(() => {
      if (timeLeft.value > 0 && !isGameOver.value) {
        timeLeft.value--
      } else if (!isGameOver.value) {
        endGame()
        clearInterval(timer)
      }
    }, 1000)
  }

  return {
    // State
    questions,
    currentQuestionIndex,
    score,
    points,
    tokensEarned,
    isGameOver,
    selectedAnswer,
    isAnswerLocked,
    timeLeft,
    isLoading,
    canPlayToday,
    
    // Computed
    currentQuestion,
    currentRound,
    totalRounds,
    progress,
    
    // Actions
    handleAnswer,
    initGame,
    startTimer
  }
}
