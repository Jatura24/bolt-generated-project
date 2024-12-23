import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { useTokenStore } from '@/stores/token'
import type { ZooData } from '@/types/zoo'

export function useZooVoting() {
  const tokenStore = useTokenStore()
  const isVoting = ref(false)
  const error = ref<string | null>(null)

  const canVote = async (zooId: string): Promise<boolean> => {
    if (!zooId) return false

    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user) return false

      const today = new Date().toISOString().split('T')[0]
      
      const { count } = await supabase
        .from('zoo_votes')
        .select('id', { count: 'exact' })
        .eq('voter_id', user.user.id)
        .eq('zoo_id', zooId)
        .gte('voted_at', today)
        .single()

      return !count
    } catch (err) {
      console.error('Error checking vote status:', err)
      return false
    }
  }

  const voteForZoo = async (zooId: string): Promise<boolean> => {
    if (!zooId || isVoting.value) return false
    
    isVoting.value = true
    error.value = null

    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Insert vote
      const { error: voteError } = await supabase
        .from('zoo_votes')
        .insert({
          zoo_id: zooId,
          voter_id: user.user.id
        })

      if (voteError) throw voteError

      // Award tokens for voting
      await tokenStore.earnTokens(5, 'Vote Zoo')
      
      return true
    } catch (err) {
      console.error('Error voting:', err)
      error.value = 'Failed to vote'
      return false
    } finally {
      isVoting.value = false
    }
  }

  return {
    isVoting,
    error,
    canVote,
    voteForZoo
  }
}
