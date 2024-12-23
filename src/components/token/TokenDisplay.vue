<template>
  <div 
    class="token-display flex items-center"
    :class="[
      variant === 'compact' ? 'gap-2' : 'gap-3',
      variantClasses
    ]"
  >
    <span class="token-icon">🪙</span>
    <div>
      <p v-if="label" class="text-sm opacity-80">{{ label }}</p>
      <p 
        class="token-amount"
        :class="variant === 'compact' ? 'text-base' : 'text-xl font-bold'"
      >
        {{ formattedAmount }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatNumber } from '@/utils/formatters'

const props = withDefaults(defineProps<{
  amount: number
  label?: string
  variant?: 'default' | 'compact' | 'large'
}>(), {
  variant: 'default'
})

const formattedAmount = computed(() => formatNumber(props.amount))

const variantClasses = computed(() => ({
  'default': 'bg-[#8B7355] text-white px-4 py-2 rounded-lg',
  'compact': 'bg-[#8B7355] text-white px-3 py-1 rounded-md',
  'large': 'bg-[#8B7355] text-white px-6 py-3 rounded-xl'
}[props.variant]))
</script>
