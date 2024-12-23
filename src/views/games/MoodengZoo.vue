<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-[#4A4A4A]">Moodeng Zoo</h1>
      <token-display :amount="tokenStore.balance" variant="compact" />
    </div>

    <!-- Zoo Settings -->
    <zoo-settings
      :zoo-name="zooSettings.zooName"
      :is-preview-mode="zooSettings.isPreviewMode"
      @update:zoo-name="zooSettings.updateZooName"
      @toggle-preview="zooSettings.togglePreviewMode"
    />

    <!-- Zoo Canvas -->
    <zoo-canvas
      :placed-items="placedItems"
      :selected-item="selectedItem"
      :edit-mode="editMode"
      @place-item="handlePlaceItem"
      @remove-item="handleRemoveItem"
      @move-item="handleMoveItem"
    />

    <!-- Toolbar -->
    <zoo-toolbar
      :edit-mode="editMode"
      @toggle-edit="toggleEditMode"
      @toggle-storage="toggleStorage"
      @toggle-shop="toggleShop"
    />

    <!-- Modals -->
    <shop-modal
      v-if="showShop"
      :selected-item="selectedItem"
      @close="toggleShop"
      @select="handleSelectItem"
      @purchase="handlePurchase"
    />

    <storage-modal
      v-if="showStorage"
      :owned-items="ownedItems"
      :selected-item="selectedItem"
      @close="toggleStorage"
      @select="handleSelectItem"
    />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useTokenStore } from '@/stores/token'
import { useZooStore } from '@/stores/zoo'
import { useZooMode } from '@/composables/zoo/useZooMode'
import { useZooState } from '@/composables/zoo/useZooState'
import { useZooShop } from '@/composables/zoo/useZooShop'
import { useZooSettings } from '@/composables/zoo/useZooSettings'

import TokenDisplay from '@/components/token/TokenDisplay.vue'
import ZooCanvas from '@/components/games/zoo/ZooCanvas.vue'
import ZooToolbar from '@/components/games/zoo/ZooToolbar.vue'
import ZooSettings from '@/components/games/zoo/ZooSettings.vue'
import ShopModal from '@/components/games/zoo/ShopModal.vue'
import StorageModal from '@/components/games/zoo/StorageModal.vue'

const tokenStore = useTokenStore()
const zooStore = useZooStore()
const { editMode, showShop, showStorage, toggleEditMode, toggleShop, toggleStorage } = useZooMode()
const { purchaseItem } = useZooShop()
const zooSettings = useZooSettings()

const {
  selectedItem,
  placedItems,
  ownedItems,
  selectItem,
  addOwnedItem,
  placeItem,
  moveItem,
  removeItem
} = useZooState()

// Event Handlers
const handleSelectItem = (item: ZooItem) => {
  selectItem(item)
}

const handlePlaceItem = (item: PlacedItem) => {
  placeItem(item)
}

const handleRemoveItem = (itemId: string) => {
  removeItem(itemId)
}

const handleMoveItem = (itemId: string, position: { x: number, y: number }) => {
  moveItem(itemId, position)
}

const handlePurchase = (item: ZooItem) => {
  purchaseItem(item, (purchasedItem) => {
    addOwnedItem(purchasedItem)
    selectItem(purchasedItem)
    toggleShop()
  })
}

// Watch for changes and save to store
watch(() => placedItems.value, (items) => {
  zooStore.saveZoo([...items])
}, { deep: true })
</script>
