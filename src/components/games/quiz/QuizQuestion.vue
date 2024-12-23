<template>
  <div class="quiz-question">
    <div class="bg-white rounded-xl p-6 mb-6 shadow-md">
      <h2 class="text-xl font-semibold mb-4 text-[#4A4A4A]">
        {{ question.text }}
      </h2>
      <div class="grid gap-4">
        <button
          v-for="(option, index) in question.options"
          :key="`${question.id}-${index}`"
          class="option-button w-full text-left p-4 rounded-lg border-2 transition-all duration-200"
          :class="getOptionClass(index)"
          @click="() => onSelect(index)"
          :disabled="isAnswerLocked"
        >
          {{ option }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Question } from './types'

const props = defineProps<{
  question: Question
  selectedAnswer: number | null
  isAnswerLocked: boolean
}>()

const emit = defineEmits<{
  (e: 'select', index: number): void
}>()

const onSelect = (index: number) => {
  if (!props.isAnswerLocked) {
    emit('select', index)
  }
}

const getOptionClass = computed(() => (index: number) => {
  if (!props.isAnswerLocked) {
    return 'border-gray-200 hover:border-primary hover:bg-primary/5'
  }
  
  if (index === props.question.correctAnswer) {
    return 'border-green-500 bg-green-50'
  }
  
  if (index === props.selectedAnswer) {
    return index === props.question.correctAnswer
      ? 'border-green-500 bg-green-50'
      : 'border-red-500 bg-red-50'
  }
  
  return 'border-gray-200 opacity-50'
})
</script>

<style scoped>
.option-button:disabled {
  cursor: default;
}
</style>
