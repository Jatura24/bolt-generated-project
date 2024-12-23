<template>
  <div class="bg-white rounded-xl p-4 shadow-md mb-4">
    <div class="flex items-center justify-between mb-4">
      <div class="flex-1">
        <input
          v-if="!isNameSet"
          v-model="localZooName"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter zoo name"
          @change="updateName"
        />
        <div v-else class="flex items-center gap-2">
          <h2 class="text-lg font-semibold">{{ zooName }}</h2>
          <span class="text-xs text-gray-500">(ID: {{ zooId }})</span>
        </div>
      </div>
      <div class="flex gap-2 ml-4">
        <button
          class="px-4 py-2 rounded-lg transition-colors"
          :class="isPreviewMode ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
          @click="$emit('toggle-preview')"
        >
          <i class="fas fa-eye"></i>
        </button>
      </div>
    </div>
    
    <p v-if="!isNameSet" class="text-sm text-gray-500">
      Choose your zoo name carefully! You can only set it once.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  zooName: string
  zooId: string
  isNameSet: boolean
  isPreviewMode: boolean
}>()

const emit = defineEmits<{
  (e: 'update:zoo-name', name: string): void
  (e: 'toggle-preview'): void
}>()

const localZooName = ref(props.zooName)

const updateName = () => {
  if (!props.isNameSet) {
    emit('update:zoo-name', localZooName.value)
  }
}

watch(() => props.zooName, (newName) => {
  localZooName.value = newName
})
</script>
