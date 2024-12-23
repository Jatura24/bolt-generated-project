<template>
  <div class="summary-result bg-white rounded-xl p-6 shadow-md">
    <div class="text-center mb-8">
      <div class="text-6xl mb-4">{{ resultEmoji }}</div>
      <h2 class="text-2xl font-bold text-[#4A4A4A] mb-2">Quiz Complete!</h2>
      <p class="text-gray-600">{{ resultFeedback }}</p>
    </div>

    <quiz-stats 
      :score="score"
      :total-questions="totalQuestions"
      :tokens-earned="tokensEarned"
    />

    <div class="grid gap-4">
      <button
        @click="$emit('play-again')"
        class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors w-full"
      >
        Play Again
      </button>
      <router-link
        to="/"
        class="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors w-full text-center"
      >
        Back to Home
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import QuizStats from '@/components/games/quiz/components/QuizStats.vue'
import { getResultEmoji, getResultFeedback } from '@/utils/quizUtils'

const props = defineProps<{
  score: number
  totalQuestions: number
  tokensEarned: number
}>()

defineEmits<{
  (e: 'play-again'): void
}>()

const resultEmoji = computed(() => 
  getResultEmoji(props.score, props.totalQuestions)
)

const resultFeedback = computed(() => 
  getResultFeedback(props.score, props.totalQuestions)
)
</script>
