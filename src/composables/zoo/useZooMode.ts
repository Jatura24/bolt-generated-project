import { ref } from 'vue'

export function useZooMode() {
  const editMode = ref(false)
  const showShop = ref(false)
  const showStorage = ref(false)

  const toggleEditMode = () => {
    editMode.value = !editMode.value
  }

  const toggleShop = () => {
    showShop.value = !showShop.value
  }

  const toggleStorage = () => {
    showStorage.value = !showStorage.value
  }

  return {
    editMode,
    showShop,
    showStorage,
    toggleEditMode,
    toggleShop,
    toggleStorage
  }
}
