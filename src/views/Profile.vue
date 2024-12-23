<template>
  <div class="p-6">
    <profile-header 
      :username="profile.username"
      :avatar="profile.avatar"
      :total-tokens="tokenStore.balance"
    />
    
    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <stats-card :stats="userStats" />
      <achievements-card :achievements="achievements" />
    </div>
    
    <transaction-history :transactions="tokenStore.transactions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTokenStore } from '@/stores/token'
import { useProfileStore } from '@/stores/profile'
import ProfileHeader from '@/components/profile/ProfileHeader.vue'
import StatsCard from '@/components/profile/StatsCard.vue'
import AchievementsCard from '@/components/profile/AchievementsCard.vue'
import TransactionHistory from '@/components/profile/TransactionHistory.vue'

const tokenStore = useTokenStore()
const profileStore = useProfileStore()

const profile = computed(() => profileStore.profile)
const userStats = computed(() => profileStore.stats)
const achievements = computed(() => profileStore.achievements)
</script>
