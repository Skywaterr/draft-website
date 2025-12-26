<template>
  <v-card 
    elevation="0" 
    class="pa-12"
    style="background-color: #D9D9D9; border-radius: 12px;"
  >
    <div class="d-flex align-items-start ga-8">
      <div style="flex: 1;">
        <p class="text-h5 mb-6" style="color: #000000; text-align: left; line-height: 1.5;">
          Still need help finding the right pokemon? Find out which one is best for you by messaging Big Pikachu™ at (346)-467-0505
        </p>
        
        <v-btn
          style="background-color: #ADB0FF; color: #000000; text-transform: none !important;"
          size="large"
          variant="flat"
          @click="$emit('switch-to-advanced')"
        >
          ← Back to Advanced Search
        </v-btn>
      </div>

      <v-img 
        :src="gigaPikachuImage"
        max-width="400"
        style="border-radius: 8px; flex-shrink: 0;"
      ></v-img>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineEmits<{
  'switch-to-advanced': []
}>()

// Placeholder image for GIGA ADVANCED
const gigaPikachuImage = ref('https://placehold.co/400x400/FFD700/000000?text=Big+Pikachu')
</script>

<style scoped>
/* Component-specific styles if needed? */
</style>