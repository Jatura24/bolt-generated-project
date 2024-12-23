<template>
  <div class="flex-1">
    <div class="flex items-center justify-between">
      <h3 class="font-medium text-[#4A4A4A]">{{ game }}</h3>
      <span 
        class="font-bold"
        :class="type === 'earn' ? 'text-green-600' : 'text-red-600'"
      >
        {{ type === 'earn' ? '+' : '-' }}{{ amount }} 🪙
      </span>
    </div>
    <p class="text-sm text-gray-600 mt-1">
      {{ formattedDate }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TransactionType } from '@/types/token'
import { formatDate } from '@/utils/formatters'

const props = defineProps<{
  game: string
  amount: number
  type: TransactionType
  timestamp: Date
}>()

const formattedDate = computed(() => formatDate(props.timestamp))
</script>
