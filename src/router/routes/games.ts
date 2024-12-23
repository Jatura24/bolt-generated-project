import type { RouteRecordRaw } from 'vue-router'

export const gameRoutes: RouteRecordRaw[] = [
  {
    path: '/quiz',
    name: 'quiz',
    component: () => import('@/views/games/TokenQuest.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pop-moodeng',
    name: 'pop-moodeng',
    component: () => import('@/views/games/PopMoodeng.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/zoo',
    name: 'zoo',
    component: () => import('@/views/games/MoodengZoo.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/vote',
    name: 'vote',
    component: () => import('@/views/games/VoteZoo.vue'),
    meta: { requiresAuth: true }
  }
]
