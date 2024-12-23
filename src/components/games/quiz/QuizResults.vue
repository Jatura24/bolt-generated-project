<template>
  <div class="results-screen text-center">
    <div class="bg-white rounded-xl p-8 shadow-md">
      <div class="mb-6">
        <div class="text-6xl mb-4">🎉</div>
        <h2 class="text-2xl font-bold text-[#4A4A4A] mb-2">Quiz Complete!</h2>
        <p class="text-gray-600">Great job on completing the quiz!</p>
      </div>
      
      <div class="stats grid gap-4 mb-8">
        <div class="stat-item bg-gray-50 p-4 rounded-lg">
          <div class="text-sm text-gray-600">Score</div>
          <div class="text-2xl font-bold text-[#4A4A4A]">{{ score }}/{{ totalQuestions }}</div>
        </div>
        
        <div class="stat-item bg-gray-50 p-4 rounded-lg">
          <div class="text-sm text-gray-600">Tokens Earned</div>
          <div class="text-2xl font-bold text-[#4A4A4A]">
            <span class="mr-2">🪙</span>{{ totalTokensEarned }}
          </div>
        </div>
      </div>
      
      <button
        @click="$emit('play-again')"
        class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        Play Again
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  score: number
  totalTokensEarned: number
  totalQuestions?: number
}>()

defineEmits<{
  (e: 'play-again'): void
}>()
</script>
