<template>
  <div 
    class="hippo-container absolute transition-all duration-300"
    :style="{
      left: `${position.x}%`,
      top: `${position.y}%`,
      transform: 'translate(-50%, -50%)'
    }"
  >
    <img 
      :src="state === 'open' ? '/assets/hippo-open.png' : '/assets/hippo-closed.png'"
      :alt="state === 'open' ? 'Hippo Open' : 'Hippo Closed'"
      class="w-24 h-24 transition-transform duration-300"
      :class="state === 'open' ? 'scale-110' : 'scale-100'"
    >
  </div>
</template>

<script setup lang="ts">
import type { HippoState, Position } from '@/types/games'

defineProps<{
  position: Position
  state: HippoState
}>()
</script>
