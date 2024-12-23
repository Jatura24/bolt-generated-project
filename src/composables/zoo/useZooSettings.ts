import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

export function useZooSettings() {
  const authStore = useAuthStore()
  const zooName = ref(localStorage.getItem('zooName') || `${authStore.profile?.username}'s Zoo`)
  const isPreviewMode = ref(false)

  const updateZooName = (name: string) => {
    zooName.value = name
    localStorage.setItem('zooName', name)
  }

  const togglePreviewMode = () => {
    isPreviewMode.value = !isPreviewMode.value
  }

  return {
    zooName,
    isPreviewMode,
    updateZooName,
    togglePreviewMode
  }
}
