import { ref } from 'vue'
import type { NavItem } from './types'

export function useNavigation() {
  const navigationItems = ref<NavItem[]>([
    { icon: 'home', label: 'Home', route: '/' },
    { icon: 'zoo', label: 'My Zoo', route: '/zoo' },
    { icon: 'history', label: 'History', route: '/history' },
    { icon: 'trophy', label: 'Ranking', route: '/leaderboard' }
  ])

  return {
    navigationItems
  }
}
