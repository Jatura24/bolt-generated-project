<template>
  <div class="quiz-timer flex items-center gap-2">
    <div class="timer-icon">⏱️</div>
    <div class="timer-value font-bold" :class="timeClass">
      {{ timeLeft }}s
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  timeLeft: number
}>()

const timeClass = computed(() => {
  if (props.timeLeft <= 10) return 'text-red-600'
  if (props.timeLeft <= 30) return 'text-orange-600'
  return 'text-green-600'
})
</script>
