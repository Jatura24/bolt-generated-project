<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
    <div class="bg-white rounded-xl p-6 max-w-md w-full">
      <h3 class="text-xl font-bold mb-4">Confirm Purchase</h3>
      
      <div class="flex items-center gap-4 mb-6">
        <img 
          :src="item.image" 
          :alt="item.name"
          class="w-16 h-16 object-contain"
        >
        <div>
          <p class="font-medium">{{ item.name }}</p>
          <p class="text-gray-600">
            <span class="mr-1">🪙</span>{{ item.cost }}
          </p>
        </div>
      </div>

      <div class="text-gray-600 mb-6">
        <p>Your balance after purchase:</p>
        <p class="text-lg font-medium">
          🪙 {{ currentBalance - item.cost }}
        </p>
      </div>

      <div class="flex gap-4">
        <button
          class="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          @click="$emit('cancel')"
        >
          Cancel
        </button>
        <button
          class="flex-1 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
          @click="$emit('confirm')"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Purchasing...' : 'Confirm' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ZooItem } from '@/types/zoo'

defineProps<{
  item: ZooItem
  currentBalance: number
  isLoading: boolean
}>()

defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>
