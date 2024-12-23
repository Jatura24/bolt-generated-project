<template>
  <div class="p-6">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-[#4A4A4A] mb-4">Leaderboard</h1>
      <div class="flex gap-4">
        <button 
          v-for="tab in tabs"
          :key="tab.id"
          class="px-4 py-2 rounded-lg font-medium transition-colors"
          :class="selectedTab === tab.id 
            ? 'bg-primary text-white' 
            : 'bg-white text-gray-600 hover:bg-gray-50'"
          @click="selectedTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>
    </header>

    <leaderboard-list
      :entries="filteredEntries"
      :current-user-rank="currentUserRank"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLeaderboardStore } from '@/stores/leaderboard'
import LeaderboardList from '@/components/leaderboard/LeaderboardList.vue'

const leaderboardStore = useLeaderboardStore()
const selectedTab = ref('all-time')

const tabs = [
  { id: 'all-time', name: 'All Time' },
  { id: 'weekly', name: 'This Week' },
  { id: 'daily', name: 'Today' }
]

const filteredEntries = computed(() => 
  leaderboardStore.getLeaderboardEntries(selectedTab.value)
)

const currentUserRank = computed(() => 
  leaderboardStore.getCurrentUserRank(selectedTab.value)
)
</script>
