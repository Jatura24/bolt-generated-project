<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
    <div class="bg-white rounded-xl p-6 max-w-md w-full">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-[#4A4A4A]">Shop</h2>
        <button 
          class="text-gray-400 hover:text-gray-600"
          @click="$emit('close')"
        >
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- Category Tabs -->
      <div class="flex gap-2 mb-4 overflow-x-auto">
        <button
          v-for="category in categories"
          :key="category.value"
          class="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors"
          :class="selectedCategory === category.value 
            ? 'bg-primary text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          @click="selectedCategory = category.value"
        >
          {{ category.label }}
        </button>
      </div>
      
      <div class="grid gap-4 max-h-[60vh] overflow-y-auto">
        <div 
          v-for="item in filteredItems" 
          :key="item.id"
          class="store-item p-4 rounded-lg border-2 transition-all cursor-pointer"
          :class="{
            'border-primary bg-primary/5': selectedItem?.id === item.id,
            'border-gray-200 hover:border-gray-300': selectedItem?.id !== item.id
          }"
          @click="selectItem(item)"
        >
          <div class="flex items-center gap-4">
            <img :src="item.image" :alt="item.name" class="w-16 h-16 object-contain">
            <div class="flex-1">
              <h3 class="font-medium text-[#4A4A4A] mb-1">{{ item.name }}</h3>
              <div class="flex items-center text-sm text-gray-600">
                <span class="mr-1">🪙</span>
                {{ item.cost }}
              </div>
            </div>
            <button 
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="canAfford(item) 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'"
              @click.stop="handlePurchase(item)"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Purchase Confirmation Modal -->
    <purchase-confirm-modal
      v-if="showConfirm"
      :item="itemToPurchase!"
      :current-balance="tokenStore.balance"
      :is-loading="isLoading"
      @confirm="confirmPurchase"
      @cancel="cancelPurchase"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTokenStore } from '@/stores/token'
import { useZooShop } from '@/composables/zoo/useZooShop'
import { storeItems } from '@/types/zoo'
import type { ZooItem } from '@/types/zoo'
import PurchaseConfirmModal from './PurchaseConfirmModal.vue'

const props = defineProps<{
  selectedItem: ZooItem | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', item: ZooItem): void
  (e: 'purchase', item: ZooItem): void
}>()

const tokenStore = useTokenStore()
const { purchaseItem, isLoading } = useZooShop()
const selectedCategory = ref<string>('all')
const showConfirm = ref(false)
const itemToPurchase = ref<ZooItem | null>(null)

const categories = [
  { value: 'all', label: 'All Items' },
  { value: 'moodeng', label: 'Moodengs' },
  { value: 'animal', label: 'Animals' },
  { value: 'decoration', label: 'Decorations' }
]

const filteredItems = computed(() => {
  if (selectedCategory.value === 'all') {
    return storeItems
  }
  return storeItems.filter(item => item.category === selectedCategory.value)
})

const canAfford = (item: ZooItem) => tokenStore.balance >= item.cost

const selectItem = (item: ZooItem) => {
  emit('select', item)
}

const handlePurchase = (item: ZooItem) => {
  if (!canAfford(item)) return
  itemToPurchase.value = item
  showConfirm.value = true
}

const confirmPurchase = async () => {
  if (!itemToPurchase.value) return
  
  const success = await purchaseItem(itemToPurchase.value)
  if (success) {
    emit('purchase', itemToPurchase.value)
    showConfirm.value = false
    itemToPurchase.value = null
  }
}

const cancelPurchase = () => {
  showConfirm.value = false
  itemToPurchase.value = null
}
</script>
