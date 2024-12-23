import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from './auth'
import type { Transaction } from '../types/token'

export const useTokenStore = defineStore('token', () => {
  const authStore = useAuthStore()
  const balance = ref(0)
  const transactions = ref<Transaction[]>([])

  const currentBalance = computed(() => balance.value)
  const recentTransactions = computed(() => [...transactions.value].reverse().slice(0, 10))

  const loadBalance = async () => {
    if (!authStore.user) return

    const { data, error } = await supabase
      .from('tokens')
      .select('balance')
      .eq('user_id', authStore.user.id)
      .single()

    if (error) {
      console.error('Error loading balance:', error)
      return
    }

    balance.value = data.balance
  }

  const loadTransactions = async () => {
    if (!authStore.user) return

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', authStore.user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading transactions:', error)
      return
    }

    transactions.value = data
  }

  const earnTokens = async (amount: number, game: string) => {
    if (!authStore.user) return

    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: authStore.user.id,
        amount,
        type: 'earn',
        game
      })

    if (transactionError) {
      console.error('Error creating transaction:', transactionError)
      return
    }

    const { error: updateError } = await supabase
      .from('tokens')
      .update({ balance: balance.value + amount })
      .eq('user_id', authStore.user.id)

    if (updateError) {
      console.error('Error updating balance:', updateError)
      return
    }

    balance.value += amount
    await loadTransactions()
  }

  const spendTokens = async (amount: number, game: string): Promise<boolean> => {
    if (!authStore.user || balance.value < amount) return false

    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: authStore.user.id,
        amount,
        type: 'spend',
        game
      })

    if (transactionError) {
      console.error('Error creating transaction:', transactionError)
      return false
    }

    const { error: updateError } = await supabase
      .from('tokens')
      .update({ balance: balance.value - amount })
      .eq('user_id', authStore.user.id)

    if (updateError) {
      console.error('Error updating balance:', updateError)
      return false
    }

    balance.value -= amount
    await loadTransactions()
    return true
  }

  // Initialize store
  loadBalance()
  loadTransactions()

  return {
    balance: currentBalance,
    transactions,
    recentTransactions,
    earnTokens,
    spendTokens,
    loadBalance,
    loadTransactions
  }
})
