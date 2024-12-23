<template>
  <div class="history-card bg-white rounded-xl p-4 shadow-md">
    <div class="flex items-center gap-4">
      <transaction-icon :type="transaction.type" />
      <transaction-details 
        :game="transaction.game"
        :amount="transaction.amount"
        :type="transaction.type"
        :timestamp="transaction.timestamp"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '@/types/token'
import TransactionIcon from './TransactionIcon.vue'
import TransactionDetails from './TransactionDetails.vue'

defineProps<{
  transaction: Transaction
}>()
</script>
