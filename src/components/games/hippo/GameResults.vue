<template>
  <div class="results-screen fixed inset-0 bg-black/50 flex items-center justify-center p-4 sm:p-6">
    <div class="bg-white rounded-xl p-6 sm:p-8 shadow-md max-w-md w-full">
      <div class="mb-6 text-center">
        <div class="text-4xl sm:text-6xl mb-4">{{ rankTier === 'Diamond' ? '🏆' : '🎮' }}</div>
        <h2 class="text-xl sm:text-2xl font-bold text-[#4A4A4A] mb-2">Game Over!</h2>
        <p class="text-gray-600">{{ getRankMessage() }}</p>
      </div>
      
      <div class="stats grid gap-4 mb-8">
        <div class="stat-item bg-gray-50 p-4 rounded-lg">
          <div class="text-sm text-gray-600">Final Score</div>
          <div class="text-xl sm:text-2xl font-bold text-[#4A4A4A]">{{ score }}</div>
        </div>
        
        <div class="stat-item bg-gray-50 p-4 rounded-lg">
          <div class="text-sm text-gray-600">Rank</div>
          <div class="text-xl sm:text-2xl font-bold text-[#4A4A4A]">
            #{{ rank }} (Top {{ rankPercentile }}%)
          </div>
        </div>
        
        <div class="stat-item bg-gray-50 p-4 rounded-lg">
          <div class="text-sm text-gray-600">Tokens Earned</div>
          <div class="text-xl sm:text-2xl font-bold text-[#4A4A4A]">
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
  rank: number
  rankPercentile: number
  rankTier: string
}>()

defineEmits<{
  (e: 'play-again'): void
}>()

const getRankMessage = () => {
  switch (rankTier) {
    case 'Diamond': return 'Amazing! You\'re a Hippo Click master!'
    case 'Platinum': return 'Incredible performance!'
    case 'Gold': return 'Great job! Keep it up!'
    case 'Silver': return 'Well done! You\'re getting better!'
    default: return 'Keep practicing to improve your rank!'
  }
}
</script>
