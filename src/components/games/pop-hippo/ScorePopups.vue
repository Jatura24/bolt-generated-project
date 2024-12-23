<template>
  <transition-group name="score-popup">
    <div
      v-for="popup in popups"
      :key="popup.id"
      :data-popup-id="popup.id"
      class="score-popup absolute text-2xl font-bold text-yellow-500"
      :style="{
        left: `${popup.x}%`,
        top: `${popup.y}%`,
        transform: 'translate(-50%, -50%)'
      }"
    >
      +{{ popup.points }}
    </div>
  </transition-group>
</template>

<script setup lang="ts">
import type { ScorePopup } from '@/types/games'

defineProps<{
  popups: ScorePopup[]
}>()
</script>
