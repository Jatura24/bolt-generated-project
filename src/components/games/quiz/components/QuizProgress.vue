<template>
  <div class="quiz-progress">
    <div class="progress-bar bg-gray-200 rounded-full h-2 mb-2">
      <div 
        class="bg-primary h-full rounded-full transition-all duration-300"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
    <div class="text-sm text-gray-600">
      Question {{ currentRound }} of {{ totalRounds }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentRound: number
  totalRounds: number
  progress: number
}>()
</script>
