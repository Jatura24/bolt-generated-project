<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
    <div class="bg-white rounded-xl shadow-lg w-[90vw] max-w-3xl max-h-[80vh] flex flex-col">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b">
        <h3 class="text-xl font-semibold text-[#4A4A4A]">Storage</h3>
        <button 
          class="text-gray-400 hover:text-gray-600"
          @click="$emit('close')"
        >
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- Category Tabs -->
      <div class="flex gap-2 overflow-x-auto p-4 border-b">
        <button
          v-for="category in categories"
          :key="category.value"
          class="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors"
          :class="selectedCategory === category.value 
            ? 'bg-primary text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          @click="selectedCategory = category.value"
        >
          {{ category.label }}
        </button>
      </div>

      <!-- Items Grid -->
      <div class="p-6 overflow-y-auto flex-1">
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          <button
            v-for="item in filteredItems"
            :key="item.id"
            class="item-button aspect-square rounded-lg flex flex-col items-center justify-center border-2 p-2 transition-all hover:border-primary/50"
            :class="selectedItem?.id === item.id ? 'border-primary bg-primary/5' : 'border-gray-200'"
            @click="handleSelect(item)"
          >
            <img :src="item.image" :alt="item.name" class="w-20 h-20 object-contain mb-2">
            <span class="text-sm text-center text-gray-600 line-clamp-1">{{ item.name }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ZooItem } from '@/types/zoo'

const props = defineProps<{
  ownedItems: ZooItem[]
  selectedItem: ZooItem | null
}>()

const emit = defineEmits<{
  (e: 'select', item: ZooItem): void
  (e: 'close'): void
}>()

const selectedCategory = ref<string>('all')

const categories = [
  { value: 'all', label: 'All Items' },
  { value: 'moodeng', label: 'Moodengs' },
  { value: 'animal', label: 'Animals' },
  { value: 'decoration', label: 'Decorations' }
]

const filteredItems = computed(() => {
  if (selectedCategory.value === 'all') {
    return props.ownedItems
  }
  return props.ownedItems.filter(item => item.category === selectedCategory.value)
})

const handleSelect = (item: ZooItem) => {
  emit('select', item)
  emit('close')
}
</script>
