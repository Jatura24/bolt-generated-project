```vue
<template>
  <div class="mb-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-[#4A4A4A]">Hippo Click!</h1>
      <token-display :amount="tokens" variant="compact" />
    </div>
    
    <div class="grid grid-cols-2 gap-4">
      <div class="stat-card bg-white rounded-lg p-4 shadow-md">
        <div class="text-sm text-gray-600">Time Left</div>
        <div class="text-2xl font-bold text-[#4A4A4A]">{{ timeLeft }}s</div>
      </div>
      
      <div class="stat-card bg-white rounded-lg p-4 shadow-md">
        <div class="text-sm text-gray-600">Score</div>
        <div class="text-2xl font-bold text-[#4A4A4A]">{{ score }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TokenDisplay from '@/components/token/TokenDisplay.vue'

defineProps<{
  timeLeft: number
  score: number
  tokens: number
}>()
</script>
```
