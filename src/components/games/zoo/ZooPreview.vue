<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
    <div class="bg-white rounded-xl p-6 max-w-2xl w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">{{ zooName }}</h2>
        <button 
          class="text-gray-400 hover:text-gray-600"
          @click="$emit('close')"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <zoo-canvas
        :placed-items="placedItems"
        :selected-item="null"
        :edit-mode="false"
      />

      <div class="mt-4 flex justify-between items-center">
        <div class="text-gray-600">
          <span class="font-medium">{{ votes }}</span> votes
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PlacedItem } from '@/types/zoo'
import ZooCanvas from './ZooCanvas.vue'

defineProps<{
  zooName: string
  placedItems: PlacedItem[]
  votes: number
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>
