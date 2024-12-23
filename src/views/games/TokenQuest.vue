<template>
  <div class="p-6">
    <div v-if="!canPlayToday" class="text-center py-12">
      <div class="bg-white rounded-xl p-8 shadow-md">
        <h2 class="text-2xl font-bold text-[#4A4A4A] mb-4">Come Back Tomorrow!</h2>
        <p class="text-gray-600 mb-4">You've already played Token Quest today.</p>
        <p class="text-gray-600">New questions will be available tomorrow!</p>
      </div>
    </div>

    <template v-else>
      <div class="mb-6">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-bold text-[#4A4A4A]">Token Quest</h1>
          <div class="flex items-center gap-4">
            <token-display :amount="tokenStore.balance" variant="compact" />
            <quiz-timer :time-left="timeLeft" />
          </div>
        </div>
        
        <quiz-progress
          :current-round="currentRound"
          :total-rounds="totalRounds"
          :progress="progress"
        />
      </div>

      <div v-if="isLoading" class="text-center py-12">
        <div class="text-gray-600">Loading questions...</div>
      </div>
      
      <transition name="fade" mode="out-in" v-else>
        <quiz-question
          v-if="currentQuestion && !isGameOver"
          :key="currentQuestionIndex"
          :question="currentQuestion"
          :selected-answer="selectedAnswer"
          :is-answer-locked="isAnswerLocked"
          @select="handleAnswer"
        />
        
        <quiz-summary
          v-else-if="isGameOver"
          :score="score"
          :points="points"
          :total-questions="totalRounds"
          :tokens-earned="tokensEarned"
          @play-again="initGame"
        />
      </transition>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTokenStore } from '@/stores/token'
import { useQuizGame } from '@/composables/games/useQuizGame'
import TokenDisplay from '@/components/token/TokenDisplay.vue'
import QuizTimer from '@/components/games/quiz/components/QuizTimer.vue'
import QuizProgress from '@/components/games/quiz/components/QuizProgress.vue'
import QuizQuestion from '@/components/games/quiz/QuizQuestion.vue'
import QuizSummary from '@/components/games/quiz/QuizSummary.vue'

const tokenStore = useTokenStore()
const {
  // State
  timeLeft,
  currentQuestionIndex,
  score,
  points,
  tokensEarned,
  isGameOver,
  selectedAnswer,
  isAnswerLocked,
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
} = useQuizGame()

onMounted(() => {
  if (canPlayToday) {
    initGame()
    startTimer()
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
