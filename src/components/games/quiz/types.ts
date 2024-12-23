// Quiz related types
export interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
}

export interface QuizState {
  questions: Question[]
  currentQuestionIndex: number
  score: number
  tokensEarned: number
  isGameOver: boolean
  selectedAnswer: number | null
  isAnswerLocked: boolean
}

export interface QuizActions {
  selectAnswer: (index: number) => void
  nextQuestion: () => void
  resetGame: () => void
  initGame: () => void
}

export interface UseQuizGame extends QuizState, QuizActions {
  currentQuestion: Question | undefined
  currentRound: number
  totalRounds: number
}
