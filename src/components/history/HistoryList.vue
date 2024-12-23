<template>
  <div class="grid gap-4">
    <history-card
      v-for="transaction in transactions"
      :key="transaction.id"
      :transaction="transaction"
    />
    
    <div 
      v-if="transactions.length === 0"
      class="text-center py-8 text-gray-500"
    >
      No transactions yet
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '@/types/token'
import HistoryCard from './HistoryCard.vue'

defineProps<{
  transactions: Transaction[]
}>()
</script>
