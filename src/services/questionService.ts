import { supabase } from '@/lib/supabase'
import type { Question } from '@/types/quiz'

export async function fetchQuestions(count: number = 5): Promise<Question[]> {
  try {
    // Using proper Postgres random ordering syntax
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .limit(count)
      .order('created_at', { ascending: false }) // Order by created_at first
      .limit(100) // Get a pool of questions
    
    if (error) throw error
    
    // Manually shuffle and limit the results
    const shuffled = data
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
    
    return shuffled.map(q => ({
      id: q.id,
      text: q.text,
      options: q.options,
      correctAnswer: q.correct_answer
    }))
  } catch (error) {
    console.error('Error fetching questions:', error)
    return []
  }
}
