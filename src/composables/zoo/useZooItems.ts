import { ref } from 'vue'
import { useTokenStore } from '@/stores/token'
import type { ZooItem, PlacedItem } from '@/types/zoo'

export function useZooItems() {
  const tokenStore = useTokenStore()
  const ownedItems = ref<ZooItem[]>([])
  const selectedItem = ref<ZooItem | null>(null)
  const placedItems = ref<PlacedItem[]>([])

  const purchaseItem = (item: ZooItem) => {
    if (tokenStore.balance >= item.cost) {
      tokenStore.spendTokens(item.cost, 'Moodeng Zoo')
      ownedItems.value.push(item)
      return true
    }
    return false
  }

  const placeItem = (item: PlacedItem) => {
    placedItems.value.push(item)
    selectedItem.value = null
  }

  const moveItem = (itemId: string, position: { x: number, y: number }) => {
    const item = placedItems.value.find(item => item.id === itemId)
    if (item) {
      item.x = position.x
      item.y = position.y
    }
  }

  const removeItem = (itemId: string) => {
    placedItems.value = placedItems.value.filter(item => item.id !== itemId)
  }

  return {
    ownedItems,
    selectedItem,
    placedItems,
    purchaseItem,
    placeItem,
    moveItem,
    removeItem
  }
}
