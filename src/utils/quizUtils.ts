import type { Question } from '@/types/quiz'

const questionBank: Question[] = [
  {
    id: '1',
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    id: '2',
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  // ... other questions
]

export function getRandomQuestions(count: number): Question[] {
  return [...questionBank]
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
}

export function getResultEmoji(score: number, total: number): string {
  const percentage = (score / total) * 100
  if (percentage === 100) return '🏆'
  if (percentage >= 80) return '🌟'
  if (percentage >= 60) return '😊'
  if (percentage >= 40) return '🤔'
  return '💪'
}

export function getResultFeedback(score: number, total: number): string {
  const percentage = (score / total) * 100
  if (percentage === 100) return 'Perfect! You\'re a quiz master!'
  if (percentage >= 80) return 'Great job! Almost perfect!'
  if (percentage >= 60) return 'Well done! Keep practicing!'
  if (percentage >= 40) return 'Good effort! You can do better!'
  return 'Keep trying! Practice makes perfect!'
}
