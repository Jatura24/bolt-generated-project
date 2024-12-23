<template>
  <div class="p-6">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-[#4A4A4A] mb-2">Activity History</h1>
      <p class="text-gray-600">Track your token earnings and spending</p>
    </header>
    
    <transaction-summary 
      :total-earned="getTotalByType('earn')"
      :total-spent="getTotalByType('spend')"
      class="mb-6"
    />
    
    <history-list :transactions="transactions" />
  </div>
</template>

<script setup lang="ts">
import { useTransactionHistory } from '@/composables/useTransactionHistory'
import HistoryList from '@/components/history/HistoryList.vue'
import TransactionSummary from '@/components/history/TransactionSummary.vue'

const { 
  transactions,
  getTotalByType
} = useTransactionHistory()
</script>
