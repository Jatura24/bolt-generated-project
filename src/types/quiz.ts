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

export interface QuizResult {
  score: number
  totalQuestions: number
  tokensEarned: number
  accuracy: number
}
