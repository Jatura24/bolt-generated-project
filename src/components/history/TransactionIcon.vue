<template>
  <div 
    class="w-12 h-12 rounded-lg flex items-center justify-center"
    :class="type === 'earn' ? 'bg-green-100' : 'bg-red-100'"
  >
    <i 
      class="text-xl"
      :class="[
        type === 'earn' ? 'text-green-600' : 'text-red-600',
        type === 'earn' ? 'fas fa-plus' : 'fas fa-minus'
      ]"
    ></i>
  </div>
</template>

<script setup lang="ts">
import type { TransactionType } from '@/types/token'

defineProps<{
  type: TransactionType
}>()
</script>
