```vue
<template>
  <div 
    ref="canvasRef"
    class="zoo-canvas relative aspect-video bg-[#E6F4F1] rounded-xl shadow-md overflow-hidden"
    @click="handleCanvasClick"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Grid Background -->
    <div 
      class="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none transition-opacity"
      :class="editMode ? 'opacity-50' : 'opacity-0'"
    >
      <div 
        v-for="i in 144" 
        :key="i"
        class="border border-gray-300/50"
      ></div>
    </div>
    
    <!-- Placed Items -->
    <TransitionGroup name="fade">
      <div
        v-for="item in placedItems"
        :key="item.id"
        class="absolute transition-all duration-300"
        :class="{ 
          'cursor-move': editMode,
          'hover:scale-110': editMode
        }"
        :style="{
          left: `${item.x}%`,
          top: `${item.y}%`,
          transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
          zIndex: draggingItemId === item.id ? 10 : 1
        }"
        @mousedown.prevent="startDragging(item)"
        @click.stop="handleItemClick(item)"
      >
        <img 
          :src="item.image" 
          :alt="item.name"
          class="w-16 h-16 object-contain transition-transform"
          :class="[
            editMode ? 'filter brightness-90' : '',
            draggingItemId === item.id ? 'scale-125' : ''
          ]"
          draggable="false"
        >
        <!-- Remove Button (only visible in edit mode) -->
        <button
          v-if="editMode && !draggingItemId"
          class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
          @click.stop="emit('remove-item', item.id)"
        >
          <i class="fas fa-times text-sm"></i>
        </button>
      </div>
    </TransitionGroup>

    <!-- Preview Item -->
    <div
      v-if="selectedItem && !draggingItemId && editMode"
      class="absolute pointer-events-none opacity-50"
      :style="{
        left: `${previewPosition.x}%`,
        top: `${previewPosition.y}%`,
        transform: 'translate(-50%, -50%)'
      }"
    >
      <img 
        :src="selectedItem.image" 
        :alt="selectedItem.name"
        class="w-16 h-16 object-contain"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { ZooItem, PlacedItem } from '@/types/zoo'

const props = defineProps<{
  placedItems: PlacedItem[]
  selectedItem: ZooItem | null
  editMode: boolean
}>()

const emit = defineEmits<{
  (e: 'place-item', item: PlacedItem): void
  (e: 'remove-item', itemId: string): void
  (e: 'move-item', itemId: string, position: { x: number, y: number }): void
}>()

const canvasRef = ref<HTMLElement>()
const draggingItemId = ref<string | null>(null)
const previewPosition = reactive({ x: 0, y: 0 })

const getCanvasPosition = (event: MouseEvent) => {
  if (!canvasRef.value) return null
  
  const rect = canvasRef.value.getBoundingClientRect()
  return {
    x: ((event.clientX - rect.left) / rect.width) * 100,
    y: ((event.clientY - rect.top) / rect.height) * 100
  }
}

const handleCanvasClick = (event: MouseEvent) => {
  if (!props.editMode || !props.selectedItem || draggingItemId.value) return

  const position = getCanvasPosition(event)
  if (!position) return

  emit('place-item', {
    id: crypto.randomUUID(),
    ...props.selectedItem,
    x: position.x,
    y: position.y,
    rotation: Math.random() * 30 - 15
  })
}

const startDragging = (item: PlacedItem) => {
  if (!props.editMode) return
  draggingItemId.value = item.id
  window.addEventListener('mouseup', stopDragging)
  window.addEventListener('mousemove', handleGlobalMouseMove)
}

const stopDragging = () => {
  draggingItemId.value = null
  window.removeEventListener('mouseup', stopDragging)
  window.removeEventListener('mousemove', handleGlobalMouseMove)
}

const handleGlobalMouseMove = (event: MouseEvent) => {
  if (!draggingItemId.value) return
  
  const position = getCanvasPosition(event)
  if (position) {
    emit('move-item', draggingItemId.value, position)
  }
}

const handleMouseMove = (event: MouseEvent) => {
  const position = getCanvasPosition(event)
  if (!position) return

  previewPosition.x = position.x
  previewPosition.y = position.y
}

const handleMouseLeave = () => {
  if (draggingItemId.value) {
    stopDragging()
  }
}

const handleItemClick = (item: PlacedItem) => {
  if (props.editMode && !draggingItemId.value) {
    emit('remove-item', item.id)
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
```
