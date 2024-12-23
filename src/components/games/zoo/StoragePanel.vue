<template>
  <div class="storage-panel fixed right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-xl shadow-lg p-4 w-64">
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-[#4A4A4A] mb-2">Storage</h3>
      
      <!-- Category Tabs -->
      <div class="flex gap-2 overflow-x-auto mb-4">
        <button
          v-for="category in categories"
          :key="category.value"
          class="px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors"
          :class="selectedCategory === category.value 
            ? 'bg-primary text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          @click="selectedCategory = category.value"
        >
          {{ category.label }}
        </button>
      </div>
    </div>

    <!-- Items Grid -->
    <div class="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto p-2">
      <button
        v-for="item in filteredItems"
        :key="item.id"
        class="item-button aspect-square rounded-lg flex items-center justify-center border-2 transition-all hover:border-primary/50"
        :class="selectedItem?.id === item.id ? 'border-primary bg-primary/5' : 'border-gray-200'"
        @click="$emit('select', item)"
      >
        <img :src="item.image" :alt="item.name" class="w-10 h-10 object-contain">
      </button>
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

defineEmits<{
  (e: 'select', item: ZooItem): void
}>()

const selectedCategory = ref<string>('all')

const categories = [
  { value: 'all', label: 'All' },
  { value: 'moodeng', label: 'Moodengs' },
  { value: 'animal', label: 'Animals' },
  { value: 'decoration', label: 'Decor' }
]

const filteredItems = computed(() => {
  const items = props.ownedItems
  if (selectedCategory.value === 'all') {
    return items
  }
  return items.filter(item => item.category === selectedCategory.value)
})
</script>

<style scoped>
.storage-panel {
  max-height: 80vh;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}
</style>
