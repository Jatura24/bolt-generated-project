<template>
  <div class="results-screen fixed inset-0 bg-black/50 flex items-center justify-center p-6">
    <div class="bg-white rounded-xl p-8 shadow-md max-w-md w-full">
      <div class="mb-6">
        <div class="text-6xl mb-4">🎮</div>
        <h2 class="text-2xl font-bold text-[#4A4A4A] mb-2">Game Over!</h2>
        <p class="text-gray-600">Great job popping those Moodengs!</p>
      </div>
      
      <div class="stats grid gap-4 mb-8">
        <div class="stat-item bg-gray-50 p-4 rounded-lg">
          <div class="text-sm text-gray-600">Final Score</div>
          <div class="text-2xl font-bold text-[#4A4A4A]">{{ score }}</div>
        </div>
        
        <div class="stat-item bg-gray-50 p-4 rounded-lg">
          <div class="text-sm text-gray-600">Tokens Earned</div>
          <div class="text-2xl font-bold text-[#4A4A4A]">
            <span class="mr-2">🪙</span>{{ tokensEarned }}
          </div>
        </div>
      </div>
      
      <button
        @click="$emit('play-again')"
        class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors w-full"
      >
        Play Again
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  score: number
  tokensEarned: number
}>()

defineEmits<{
  (e: 'play-again'): void
}>()
</script>
