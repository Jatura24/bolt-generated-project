<template>
  <div class="bg-white rounded-xl p-4 shadow-md">
    <h2 class="text-lg font-semibold text-[#4A4A4A] mb-4">Store</h2>
    
    <div class="grid gap-4">
      <div 
        v-for="item in items" 
        :key="item.id"
        class="store-item p-3 rounded-lg border-2 transition-all cursor-pointer"
        :class="{
          'border-primary bg-primary/5': selectedItem?.id === item.id,
          'border-gray-200 hover:border-gray-300': selectedItem?.id !== item.id
        }"
        @click="selectStoreItem(item)"
      >
        <div class="flex items-center gap-3">
          <img :src="item.image" :alt="item.name" class="w-12 h-12 object-contain">
          <div class="flex-1">
            <h3 class="font-medium text-[#4A4A4A]">{{ item.name }}</h3>
            <div class="flex items-center text-sm text-gray-600">
              <span class="mr-1">🪙</span>
              {{ item.cost }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ZooItem } from '@/types/zoo'

const props = defineProps<{
  items: ZooItem[]
  selectedItem: ZooItem | null
}>()

const emit = defineEmits<{
  (e: 'select-item', item: ZooItem): void
  (e: 'purchase-item', item: ZooItem): void
}>()

const selectStoreItem = (item: ZooItem) => {
  if (props.selectedItem?.id === item.id) {
    emit('purchase-item', item)
  } else {
    emit('select-item', item)
  }
}
</script>
