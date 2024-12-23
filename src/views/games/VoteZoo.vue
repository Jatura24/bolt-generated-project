<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-[#4A4A4A]">Vote Zoo</h1>
      <token-display :amount="tokenStore.balance" variant="compact" />
    </div>

    <!-- Search -->
    <div class="mb-6">
      <div class="bg-white rounded-xl p-4 shadow-md">
        <div class="flex gap-2">
          <input
            v-model="zooId"
            type="text"
            placeholder="Enter Zoo ID"
            class="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            @click="searchZoo"
            class="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Searching...' : 'Search' }}
          </button>
        </div>
        <p v-if="error" class="mt-2 text-red-500 text-sm">{{ error }}</p>
      </div>
    </div>

    <!-- Zoo Preview -->
    <div v-if="currentZoo" class="mb-20">
      <div class="bg-white rounded-xl p-4 shadow-md mb-4">
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
              {{ currentZoo.owner.avatar }}
            </div>
            <div>
              <h2 class="text-lg font-semibold">{{ currentZoo.name }}</h2>
              <p class="text-sm text-gray-600">by {{ currentZoo.owner.username }}</p>
            </div>
          </div>
        </div>
        
        <zoo-canvas
          :placed-items="currentZoo.items"
          :selected-item="null"
          :edit-mode="false"
        />
      </div>

      <!-- Vote Button -->
      <div class="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg p-4">
        <button
          v-if="canVoteForZoo"
          @click="handleVote"
          class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          :disabled="isVoting"
        >
          {{ isVoting ? 'Voting...' : 'Vote for this Zoo (🪙 5)' }}
        </button>
        <span v-else class="text-gray-500">
          You've already voted for this zoo today
        </span>
      </div>
    </div>

    <!-- No Results -->
    <div v-else-if="hasSearched" class="text-center py-12">
      <div class="text-gray-600">No zoo found with this ID</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTokenStore } from '@/stores/token'
import { useZooVoting } from '@/composables/zoo/useZooVoting'
import { useZooSearch } from '@/composables/zoo/useZooSearch'
import TokenDisplay from '@/components/token/TokenDisplay.vue'
import ZooCanvas from '@/components/games/zoo/ZooCanvas.vue'
import type { ZooData } from '@/types/zoo'

const tokenStore = useTokenStore()
const { canVote, voteForZoo } = useZooVoting()
const { isLoading, error, hasSearched, searchZoo } = useZooSearch()

const zooId = ref('')
const currentZoo = ref<ZooData | null>(null)
const isVoting = ref(false)

const canVoteForZoo = computed(() => 
  currentZoo.value && canVote(currentZoo.value.id)
)

const handleSearch = async () => {
  const result = await searchZoo(zooId.value)
  if (result) {
    currentZoo.value = result
  } else {
    currentZoo.value = null
  }
}

const handleVote = async () => {
  if (!currentZoo.value || !canVoteForZoo.value) return
  
  isVoting.value = true
  try {
    const success = await voteForZoo(currentZoo.value.id)
    if (success) {
      // Refresh zoo data after voting
      const updated = await searchZoo(currentZoo.value.id)
      if (updated) {
        currentZoo.value = updated
      }
    }
  } finally {
    isVoting.value = false
  }
}
</script>
