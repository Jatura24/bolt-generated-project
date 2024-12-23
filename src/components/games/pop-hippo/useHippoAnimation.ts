import { ref } from 'vue'
import gsap from 'gsap'
import type { HippoState } from '@/types/games'

export function useHippoAnimation() {
  const hippoState = ref<HippoState>('closed')
  
  const animateHippoMouth = () => {
    hippoState.value = 'open'
    setTimeout(() => {
      hippoState.value = 'closed'
    }, 300)
  }
  
  const animateScorePopup = (popupId: string) => {
    return gsap.to(`[data-popup-id="${popupId}"]`, {
      y: -50,
      opacity: 0,
      duration: 1
    })
  }
  
  return {
    hippoState,
    animateHippoMouth,
    animateScorePopup
  }
}
