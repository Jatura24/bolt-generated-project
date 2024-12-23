<template>
  <div class="summary-result bg-white rounded-xl p-6 shadow-md">
    <div class="text-center mb-8">
      <div class="text-6xl mb-4">
        {{ getEmoji(score, totalQuestions) }}
      </div>
      <h2 class="text-2xl font-bold text-[#4A4A4A] mb-2">Quiz Complete!</h2>
      <p class="text-gray-600">{{ getFeedback(score, totalQuestions) }}</p>
    </div>

    <!-- Score Details -->
    <div class="grid gap-4 mb-8">
      <div class="stat-item bg-gray-50 p-4 rounded-lg">
        <div class="flex justify-between items-center">
          <span class="text-gray-600">Correct Answers</span>
          <span class="text-xl font-bold text-[#4A4A4A]">
            {{ score }}/{{ totalQuestions }}
          </span>
        </div>
        <div class="mt-2 bg-gray-200 rounded-full h-2">
          <div 
            class="bg-primary h-full rounded-full transition-all duration-1000"
            :style="{ width: `${(score / totalQuestions) * 100}%` }"
          ></div>
        </div>
      </div>

      <div class="stat-item bg-gray-50 p-4 rounded-lg">
        <div class="flex justify-between items-center">
          <span class="text-gray-600">Accuracy</span>
          <span class="text-xl font-bold text-[#4A4A4A]">
            {{ Math.round((score / totalQuestions) * 100) }}%
          </span>
        </div>
      </div>

      <div class="stat-item bg-gray-50 p-4 rounded-lg">
        <div class="flex justify-between items-center">
          <span class="text-gray-600">Tokens Earned</span>
          <span class="text-xl font-bold text-[#4A4A4A] flex items-center">
            <span class="mr-2">🪙</span>{{ tokensEarned }}
          </span>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
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
const props = defineProps<{
  score: number
  totalQuestions: number
  tokensEarned: number
}>()

defineEmits<{
  (e: 'play-again'): void
}>()

const getEmoji = (score: number, total: number) => {
  const percentage = (score / total) * 100
  if (percentage === 100) return '🏆'
  if (percentage >= 80) return '🌟'
  if (percentage >= 60) return '😊'
  if (percentage >= 40) return '🤔'
  return '💪'
}

const getFeedback = (score: number, total: number) => {
  const percentage = (score / total) * 100
  if (percentage === 100) return 'Perfect! You\'re a quiz master!'
  if (percentage >= 80) return 'Great job! Almost perfect!'
  if (percentage >= 60) return 'Well done! Keep practicing!'
  if (percentage >= 40) return 'Good effort! You can do better!'
  return 'Keep trying! Practice makes perfect!'
}
</script>
