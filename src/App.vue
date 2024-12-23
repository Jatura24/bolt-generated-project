<template>
  <div class="min-h-screen bg-[#F5F6F8]">
    <router-view v-if="authStore.isInitialized" />
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="text-gray-600">Loading...</div>
    </div>
    <nav-bar v-if="authStore.isAuthenticated" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import NavBar from '@/components/navigation/NavBar.vue'

const authStore = useAuthStore()
</script>
