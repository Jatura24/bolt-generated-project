import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { RouteLocationNormalized } from 'vue-router'

// Import route configurations
import { gameRoutes } from './routes/games'
import { mainRoutes } from './routes/main'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...mainRoutes,
    ...gameRoutes
  ]
})

// Auth guard helper
async function checkAuth(to: RouteLocationNormalized) {
  const authStore = useAuthStore()
  
  if (!authStore.isInitialized) {
    await authStore.initialize()
  }

  const isAuthRoute = to.matched.some(record => record.meta.requiresAuth)
  const isGuestRoute = to.matched.some(record => record.meta.requiresGuest)

  if (isAuthRoute && !authStore.isAuthenticated) {
    return '/login'
  }
  
  if (isGuestRoute && authStore.isAuthenticated) {
    return '/'
  }

  return true
}

router.beforeEach(async (to) => {
  return await checkAuth(to)
})

export default router
