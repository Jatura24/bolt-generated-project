export type NavIcon = 'home' | 'zoo' | 'history' | 'trophy'

export interface NavItem {
  id: NavIcon
  icon: NavIcon
  label: string
  route: string
}

export interface NavButtonProps {
  item: NavItem
  active: boolean
}
