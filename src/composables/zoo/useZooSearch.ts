import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import type { ZooData } from '@/types/zoo'

export function useZooSearch() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const hasSearched = ref(false)

  const searchZoo = async (zooId: string): Promise<ZooData | null> => {
    if (!zooId.trim()) {
      error.value = 'Please enter a Zoo ID'
      return null
    }

    isLoading.value = true
    error.value = null
    
    try {
      // First get the zoo details
      const { data: zooData, error: zooError } = await supabase
        .from('zoos')
        .select(`
          id,
          name,
          votes,
          profiles:user_id (
            id,
            username,
            avatar_emoji
          )
        `)
        .eq('id', zooId)
        .single()

      if (zooError) throw zooError
      if (!zooData) {
        error.value = 'No zoo found with this ID'
        return null
      }

      // Then get the zoo items
      const { data: items, error: itemsError } = await supabase
        .from('zoo_items')
        .select('*')
        .eq('user_id', zooData.profiles.id)

      if (itemsError) throw itemsError

      hasSearched.value = true

      return {
        id: zooData.id,
        name: zooData.name,
        owner: {
          id: zooData.profiles.id,
          username: zooData.profiles.username,
          avatar: zooData.profiles.avatar_emoji
        },
        votes: zooData.votes,
        items: items || []
      }
    } catch (err) {
      console.error('Error searching zoo:', err)
      error.value = 'Failed to search zoo'
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    hasSearched,
    searchZoo
  }
}
