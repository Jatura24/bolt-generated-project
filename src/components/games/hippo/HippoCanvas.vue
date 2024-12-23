<template>
  <div 
    ref="canvasRef"
    class="game-canvas relative bg-[#E6F4F1] rounded-xl overflow-hidden cursor-pointer"
    :class="{ 'aspect-[4/3] sm:aspect-video': true }"
    @click="handleCanvasClick"
  >
    <!-- Hippo Character -->
    <div 
      class="hippo absolute transition-all duration-300"
      :style="{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }"
    >
      <img 
        :src="hippoState === 'open' ? '/assets/hippo-open.png' : '/assets/hippo-closed.png'"
        :alt="hippoState === 'open' ? 'Hippo Open' : 'Hippo Closed'"
        class="w-16 h-16 sm:w-24 sm:h-24 transition-transform duration-300"
        :class="hippoState === 'open' ? 'scale-110' : 'scale-100'"
        draggable="false"
      >
    </div>

    <!-- Score Popups -->
    <transition-group name="score-popup">
      <div
        v-for="popup in scorePopups"
        :key="popup.id"
        class="score-popup absolute text-xl sm:text-2xl font-bold"
        :class="popup.hit ? 'text-green-500' : 'text-red-500'"
        :style="{
          left: `${popup.x}%`,
          top: `${popup.y}%`,
          transform: 'translate(-50%, -50%)'
        }"
      >
        {{ popup.hit ? '+1' : 'Miss!' }}
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Position } from '@/types/games'

const props = defineProps<{
  position: Position
  hippoState: 'open' | 'closed'
}>()

const emit = defineEmits<{
  (e: 'click', position: Position): void
}>()

const canvasRef = ref<HTMLElement>()
const scorePopups = ref<Array<{ id: string; x: number; y: number; hit: boolean }>>([])

const handleCanvasClick = (event: MouseEvent) => {
  if (!canvasRef.value) return
  
  const rect = canvasRef.value.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100
  
  const hit = isClickOnHippo(x, y, props.position.x, props.position.y)
  
  // Show score popup
  const popupId = crypto.randomUUID()
  scorePopups.value.push({ id: popupId, x, y, hit })
  
  // Remove popup after animation
  setTimeout(() => {
    scorePopups.value = scorePopups.value.filter(popup => popup.id !== popupId)
  }, 1000)
  
  if (hit) {
    emit('click', { x, y })
  }
}

const isClickOnHippo = (clickX: number, clickY: number, hippoX: number, hippoY: number): boolean => {
  const hitboxSize = 20
  const dx = Math.abs(clickX - hippoX)
  const dy = Math.abs(clickY - hippoY)
  return dx <= hitboxSize / 2 && dy <= hitboxSize / 2
}
</script>

<style scoped>
.game-canvas {
  max-width: 100%;
  margin: 0 auto;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

@media (min-width: 640px) {
  .game-canvas {
    max-width: 800px;
  }
}

.score-popup-enter-active,
.score-popup-leave-active {
  transition: all 0.5s ease;
}

.score-popup-enter-from,
.score-popup-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
