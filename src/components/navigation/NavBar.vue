<template>
  <nav class="fixed bottom-0 w-full bg-white rounded-t-3xl p-4 shadow-lg">
    <div class="flex justify-around items-center">
      <nav-button
        v-for="item in NAVIGATION_ITEMS"
        :key="item.id"
        :item="item"
        :active="currentRoute === item.route"
        @click="navigate(item.route)"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NavButton from './NavButton.vue'
import { NAVIGATION_ITEMS } from './constants'

const router = useRouter()
const route = useRoute()

const currentRoute = computed(() => route.path)

const navigate = (route: string) => {
  router.push(route)
}
</script>
