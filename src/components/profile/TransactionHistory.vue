<template>
  <div class="bg-white rounded-xl p-6 shadow-md">
    <h2 class="text-lg font-semibold text-[#4A4A4A] mb-4">Transaction History</h2>
    
    <div class="grid gap-4">
      <div 
        v-for="transaction in transactions" 
        :key="transaction.id"
        class="transaction-item flex items-center justify-between p-4 rounded-lg"
        :class="transaction.type === 'earn' ? 'bg-green-50' : 'bg-red-50'"
      >
        <div class="flex items-center gap-4">
          <div 
            class="transaction-icon w-10 h-10 rounded-full flex items-center justify-center"
            :class="transaction.type === 'earn' ? 'bg-green-100' : 'bg-red-100'"
          >
            {{ transaction.type === 'earn' ? '↑' : '↓' }}
          </div>
          
          <div>
            <div class="font-medium text-[#4A4A4A]">
              {{ transaction.type === 'earn' ? 'Earned from' : 'Spent on' }} {{ transaction.game }}
            </div>
            <div class="text-sm text-gray-600">
              {{ formatDate(transaction.timestamp) }}
            </div>
          </div>
        </div>
        
        <div 
          class="transaction-amount font-medium"
          :class="transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'"
        >
          {{ transaction.type === 'earn' ? '+' : '-' }}{{ transaction.amount }} 🪙
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '@/utils/formatters'
import type { Transaction } from '@/types/token'

defineProps<{
  transactions: Transaction[]
}>()
</script>
