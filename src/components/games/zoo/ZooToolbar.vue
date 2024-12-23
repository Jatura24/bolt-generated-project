<template>
  <div class="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg p-2">
    <div class="flex gap-4">
      <button
        class="tool-button w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
        :class="editMode ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
        @click="$emit('toggle-edit')"
      >
        <i class="fas fa-edit"></i>
      </button>
      
      <button
        class="tool-button w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200"
        @click="$emit('toggle-storage')"
      >
        <i class="fas fa-box"></i>
      </button>
      
      <button
        class="tool-button w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200"
        @click="$emit('toggle-shop')"
      >
        <i class="fas fa-store"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  editMode: boolean
}>()

defineEmits<{
  (e: 'toggle-edit'): void
  (e: 'toggle-storage'): void
  (e: 'toggle-shop'): void
}>()
</script>
