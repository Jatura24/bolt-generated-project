<template>
  <button 
    class="nav-button flex flex-col items-center gap-2"
    :class="{ 'text-primary': active }"
    @click="$emit('click')"
  >
    <div 
      class="w-14 h-14 rounded-full flex items-center justify-center shadow-sm transition-colors"
      :class="active ? 'bg-primary/10' : 'bg-white'"
    >
      <i 
        :class="[NAV_ICONS[item.icon], active ? 'text-primary' : 'text-[#2D2424]']" 
        class="text-xl"
      ></i>
    </div>
    <span class="text-sm">{{ item.label }}</span>
  </button>
</template>

<script setup lang="ts">
import { NAV_ICONS } from './constants'
import type { NavButtonProps } from './types'

defineProps<NavButtonProps>()
defineEmits<{
  (e: 'click'): void
}>()
</script>
