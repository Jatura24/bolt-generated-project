<template>
  <div 
    ref="gameContainer" 
    class="game-canvas relative bg-[#E6F4F1] rounded-xl overflow-hidden cursor-pointer"
    @click="handleClick"
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
        class="w-24 h-24 transition-transform duration-300"
        :class="hippoState === 'open' ? 'scale-110' : 'scale-100'"
      >
    </div>

    <!-- Score Popups -->
    <transition-group name="score-popup">
      <div
        v-for="popup in scorePopups"
        :key="popup.id"
        :data-popup-id="popup.id"
        class="score-popup absolute text-2xl font-bold text-yellow-500"
        :style="{
          left: `${popup.x}%`,
          top: `${popup.y}%`,
          transform: 'translate(-50%, -50%)'
        }"
      >
        +1
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import gsap from 'gsap'

const emit = defineEmits<{
  (e: 'score'): void
}>()

const gameContainer = ref<HTMLElement>()
const position = ref({ x: 50, y: 50 })
const hippoState = ref<'open' | 'closed'>('closed')
const scorePopups = ref<Array<{ id: string; x: number; y: number }>>([])

// Move hippo randomly
const { pause: stopMovement, resume: startMovement } = useIntervalFn(() => {
  position.value = {
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10
  }
}, 2000)

// Handle click
const handleClick = (event: MouseEvent) => {
  if (!gameContainer.value) return
  
  const rect = gameContainer.value.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100
  
  // Animate hippo mouth
  hippoState.value = 'open'
  setTimeout(() => {
    hippoState.value = 'closed'
  }, 300)
  
  // Show score popup
  const popupId = crypto.randomUUID()
  scorePopups.value.push({ id: popupId, x, y })
  
  // Animate score popup
  gsap.to(`[data-popup-id="${popupId}"]`, {
    y: -50,
    opacity: 0,
    duration: 1,
    onComplete: () => {
      scorePopups.value = scorePopups.value.filter(popup => popup.id !== popupId)
    }
  })
  
  emit('score')
}

onMounted(() => {
  startMovement()
})

onUnmounted(() => {
  stopMovement()
})
</script>

<style scoped>
.game-canvas {
  aspect-ratio: 16/9;
  max-width: 800px;
  margin: 0 auto;
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
