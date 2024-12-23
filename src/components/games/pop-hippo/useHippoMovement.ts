import { ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import type { Position } from '@/types/games'

export function useHippoMovement() {
  const position = ref<Position>({ x: 50, y: 50 })
  
  const moveToRandomPosition = () => {
    position.value = {
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10
    }
  }
  
  const { pause, resume } = useIntervalFn(moveToRandomPosition, 2000)
  
  return {
    position,
    moveToRandomPosition,
    startMovement: resume,
    stopMovement: pause
  }
}
