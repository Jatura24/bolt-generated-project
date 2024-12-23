<template>
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
          {{ accuracy }}%
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
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  score: number
  totalQuestions: number
  tokensEarned: number
}>()

const accuracy = computed(() => 
  Math.round((props.score / props.totalQuestions) * 100)
)
</script>
