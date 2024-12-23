import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'
import { storeItems } from '@/types/zoo'
import type { ZooItem, PlacedItem } from '@/types/zoo'

export function useZooState() {
  const authStore = useAuthStore()
  const selectedItem = ref<ZooItem | null>(null)
  const placedItems = ref<PlacedItem[]>([])
  const ownedItems = ref<ZooItem[]>([])
  const zooId = ref<string>('')
  const zooName = ref<string>('')
  const isNameSet = ref(false)
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  const selectItem = (item: ZooItem | null) => {
    selectedItem.value = item
  }

  const addOwnedItem = (item: ZooItem) => {
    if (!ownedItems.value.find(owned => owned.id === item.id)) {
      ownedItems.value.push(item)
    }
  }

  const placeItem = (item: PlacedItem) => {
    placedItems.value.push(item)
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

  const loadZoo = async () => {
    if (!authStore.user) return

    try {
      const { data: zooData, error: zooError } = await supabase
        .from('zoos')
        .select('id, name, name_set')
        .eq('user_id', authStore.user.id)
        .single()

      if (zooError) throw zooError

      zooId.value = zooData.id
      zooName.value = zooData.name
      isNameSet.value = zooData.name_set

      // Load owned items
      const { data: ownedItemsData, error: ownedError } = await supabase
        .from('owned_items')
        .select('item_type')
        .eq('user_id', authStore.user.id)

      if (ownedError) throw ownedError

      ownedItems.value = ownedItemsData
        .map(item => storeItems.find(si => si.id === item.item_type))
        .filter((item): item is ZooItem => item !== undefined)

      // Load placed items
      const { data: items, error: itemsError } = await supabase
        .from('zoo_items')
        .select('*')
        .eq('user_id', authStore.user.id)

      if (itemsError) throw itemsError

      placedItems.value = items.map(item => ({
        ...storeItems.find(si => si.id === item.item_type)!,
        id: item.id,
        x: item.x,
        y: item.y,
        rotation: item.rotation
      }))
    } catch (err) {
      console.error('Error loading zoo:', err)
      error.value = 'Failed to load zoo'
    } finally {
      isLoading.value = false
    }
  }

  return {
    selectedItem,
    placedItems,
    ownedItems,
    zooId,
    zooName,
    isNameSet,
    isLoading,
    error,
    selectItem,
    addOwnedItem,
    placeItem,
    moveItem,
    removeItem,
    loadZoo
  }
}
