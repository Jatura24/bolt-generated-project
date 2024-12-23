<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="stat-card bg-white rounded-lg p-4 shadow-md">
      <div class="text-sm text-gray-600">Total Earned</div>
      <div class="text-xl font-bold text-green-600">
        +{{ totalEarned }} 🪙
      </div>
    </div>
    
    <div class="stat-card bg-white rounded-lg p-4 shadow-md">
      <div class="text-sm text-gray-600">Total Spent</div>
      <div class="text-xl font-bold text-red-600">
        -{{ totalSpent }} 🪙
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  totalEarned: number
  totalSpent: number
}>()
</script>
