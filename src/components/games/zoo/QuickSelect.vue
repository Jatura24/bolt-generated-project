<template>
  <div class="quick-select fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg p-2">
    <div class="flex gap-2 overflow-x-auto max-w-[300px]">
      <button
        v-for="item in ownedItems"
        :key="item.id"
        class="item-button w-12 h-12 rounded-lg flex items-center justify-center border-2 transition-all"
        :class="selectedItem?.id === item.id ? 'border-primary bg-primary/5' : 'border-gray-200'"
        @click="$emit('select', item)"
      >
        <img :src="item.image" :alt="item.name" class="w-8 h-8 object-contain">
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ZooItem } from '@/types/zoo'

defineProps<{
  ownedItems: ZooItem[]
  selectedItem: ZooItem | null
}>()

defineEmits<{
  (e: 'select', item: ZooItem): void
}>()
</script>
