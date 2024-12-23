<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-[#F5F6F8]">
    <div class="bg-white rounded-xl p-8 shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-[#4A4A4A] mb-6">Welcome!</h1>
      
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Choose a username
        </label>
        <input
          v-model="username"
          type="text"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter username"
          :disabled="isLoading"
        />
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Choose an avatar
        </label>
        <div class="grid grid-cols-5 gap-2">
          <button
            v-for="emoji in avatarEmojis"
            :key="emoji"
            class="w-12 h-12 rounded-lg flex items-center justify-center text-xl border-2 transition-colors"
            :class="selectedEmoji === emoji ? 'border-primary bg-primary/5' : 'border-gray-200'"
            @click="selectedEmoji = emoji"
            :disabled="isLoading"
          >
            {{ emoji }}
          </button>
        </div>
      </div>

      <div v-if="error" class="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
        {{ error }}
      </div>

      <button
        @click="handleLogin"
        class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Creating account...' : 'Start Playing' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const username = ref('')
const selectedEmoji = ref('😊')
const { isLoading, error, handleSignUp } = useAuth()

const avatarEmojis = ['😊', '🐱', '🐶', '🐼', '🐨', '🦊', '🐯', '🦁', '🐸', '🐙']

const handleLogin = () => handleSignUp(username.value, selectedEmoji.value)
</script>
