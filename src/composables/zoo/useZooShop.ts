import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { useTokenStore } from '@/stores/token'
import type { ZooItem } from '@/types/zoo'

export function useZooShop() {
  const tokenStore = useTokenStore()
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const purchaseItem = async (item: ZooItem): Promise<boolean> => {
    if (tokenStore.balance < item.cost) {
      error.value = 'Insufficient tokens'
      return false
    }

    isLoading.value = true
    error.value = null

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // First try to insert the owned item
      const { error: insertError } = await supabase
        .from('owned_items')
        .insert({
          item_type: item.id,
          user_id: user.id
        })

      if (insertError) {
        if (insertError.code === '23505') { // Unique violation
          error.value = 'You already own this item'
          return false
        }
        throw insertError
      }

      // If successful, spend the tokens
      const success = await tokenStore.spendTokens(item.cost, 'Zoo Shop')
      if (!success) {
        // Rollback the purchase if token spending fails
        await supabase
          .from('owned_items')
          .delete()
          .match({ 
            item_type: item.id,
            user_id: user.id
          })
        
        error.value = 'Failed to complete purchase'
        return false
      }

      return true
    } catch (err) {
      console.error('Purchase error:', err)
      error.value = 'Failed to complete purchase'
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    purchaseItem,
    isLoading,
    error
  }
}
