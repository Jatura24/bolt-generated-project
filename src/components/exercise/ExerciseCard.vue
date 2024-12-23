```vue
<template>
  <div 
    class="exercise-card rounded-2xl p-4 relative overflow-hidden"
    :style="{ backgroundColor: background }"
  >
    <!-- Number Badge -->
    <div 
      v-if="number"
      class="absolute top-4 right-4 bg-[#8B4513] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"
    >
      {{ number }}
    </div>

    <div class="mb-8">
      <h3 class="text-lg font-bold text-[#2D2424] mb-1">{{ title }}</h3>
      <p class="text-sm text-[#2D2424]/80">{{ description }}</p>
    </div>

    <div class="flex justify-between items-end">
      <button class="bg-[#2D2424] text-white px-4 py-2 rounded-lg text-sm font-medium">
        Let's Go
      </button>
      <img 
        :src="image" 
        :alt="title"
        class="h-24 object-contain"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  image: string
  background: string
  number?: string
}>()
</script>
```
