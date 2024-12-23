<template>
  <div class="p-6 bg-[#F5F6F8]">
    <user-profile
      :username="authStore.profile?.username || ''"
      :tokens="tokenStore.balance"
      :avatar="authStore.profile?.avatar_emoji || '😊'"
    />
    
    <progress-card
      :rank="zooRanking.rank"
      :votes="zooRanking.votes"
      :rank-percentile="zooRanking.rankPercentile"
      :rank-tier="zooRanking.rankTier"
    />

    <!-- Challenge Section -->
    <div class="mb-6 flex justify-between items-center">
      <h2 class="text-2xl font-bold text-[#2D2424]">Challenge</h2>
      <button class="text-[#E6B17E] font-medium flex items-center gap-1">
        See More
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <challenge-card
        v-for="challenge in challenges"
        :key="challenge.title"
        v-bind="challenge"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTokenStore } from '@/stores/token'
import { useAuthStore } from '@/stores/auth'
import { useZooRanking } from '@/composables/useZooRanking'
import UserProfile from '@/components/home/UserProfile.vue'
import ProgressCard from '@/components/home/ProgressCard.vue'
import ChallengeCard from '@/components/home/ChallengeCard.vue'

const tokenStore = useTokenStore()
const authStore = useAuthStore()
const zooRanking = useZooRanking()

const challenges = [
  {
    title: 'Token Quest',
    description: 'Test your knowledge and earn tokens!',
    reward: '10 per correct answer',
    image: '/assets/rabbit-exercise.png',
    route: '/quiz',
    backgroundColor: '#FFE5B4'
  },
  {
    title: 'Hippo Click',
    description: 'Click fast, earn more!',
    reward: '1 per 5 clicks',
    image: '/assets/hippo-closed.png',
    route: '/pop-moodeng',
    backgroundColor: '#D4E6B5'
  },
  {
    title: 'Build Zoo',
    description: 'Build your dream zoo!',
    reward: 'Earn from visitors',
    image: '/assets/croc-exercise.png',
    route: '/zoo',
    backgroundColor: '#FFE0E0'
  },
  {
    title: 'Vote Zoo',
    description: 'Vote for other zoos and earn rewards!',
    reward: '5 tokens per vote',
    image: '/assets/moodeng.png',
    route: '/vote',
    backgroundColor: '#E0F0FF'
  }
]
</script>
