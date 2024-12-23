import type { NavItem } from './types'

export const NAV_ICONS = {
  home: 'fas fa-home',
  zoo: 'fas fa-paw',
  history: 'fas fa-history',
  trophy: 'fas fa-trophy'
} as const

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'home', icon: 'home', label: 'Home', route: '/' },
  { id: 'zoo', icon: 'zoo', label: 'My Zoo', route: '/zoo' },
  { id: 'history', icon: 'history', label: 'History', route: '/history' },
  { id: 'trophy', icon: 'trophy', label: 'Ranking', route: '/leaderboard' }
]
