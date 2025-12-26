<template>
  <v-card 
    elevation="0" 
    class="pa-12"
    style="background-color: #FFFCAD; border-radius: 12px;"
  >
    <h1 class="text-h3 text-center mb-8" style="color: #000000;">Simple Search!</h1>

    <!-- Pokemon Name Search -->
    <div class="mb-6">
      <div class="d-flex align-center justify-center mb-4">
        <span class="text-h6 mr-4" style="color: #000000;">Pokemon Name</span>
        <v-icon>mdi-chevron-down</v-icon>
      </div>
      
      <div class="d-flex align-center justify-center ga-4">
        <span class="text-h6" style="color: #000000;">I'm looking for a...</span>
        <v-text-field
          v-model="pokemonSearch"
          placeholder="Input Pokemon here"
          variant="outlined"
          density="comfortable"
          bg-color="white"
          hide-details
          clearable
          style="max-width: 400px;"
          @keyup.enter="performSearch"
        >
          <template v-slot:append-inner>
            <v-icon>mdi-magnify</v-icon>
          </template>
        </v-text-field>
        
        <v-btn
          style="background-color: #CCF1FF; color: #000000; text-transform: none !important;"
          size="large"
          variant="flat"
          @click="performSearch"
        >
          Search! →
        </v-btn>
      </div>
    </div>

    <!-- First divider and OR -->
    <v-divider class="my-4" thickness="2" color="#000000"></v-divider>
    <div class="text-h5 text-center my-2" style="color: #000000;">OR</div>

    <!-- Pokemon Tier -->
    <div class="mb-6">
      <div class="d-flex align-center justify-center mb-4">
        <span class="text-h6 mr-4" style="color: #000000;">Pokemon Tier</span>
        <v-icon>mdi-chevron-down</v-icon>
      </div>
      <!-- TODO: Add tier selection UI here when tier data is available -->
    </div>

    <!-- Second OR -->
    <v-divider class="my-4" thickness="2" color="#000000"></v-divider>
    <div class="text-h5 text-center my-2" style="color: #000000;">OR</div>

    <!-- Type Matchups -->
    <div class="mb-6">
      <div class="d-flex align-center justify-center mb-4">
        <span class="text-h6 mr-4" style="color: #000000;">Type Matchups</span>
        <v-icon>mdi-chevron-down</v-icon>
      </div>
      <!-- TODO: Add type matchup selection UI here -->
    </div>

    <!-- Third OR -->
    <v-divider class="my-4" thickness="2" color="#000000"></v-divider>
    <div class="text-h5 text-center my-2" style="color: #000000;">OR</div>

    <!-- Advanced Search Button -->
    <div class="text-center mt-6">
      <v-btn
        style="background-color: #ADB0FF; color: #000000; text-transform: none !important;"
        size="x-large"
        variant="flat"
        @click="$emit('switch-to-advanced')"
      >
        Advanced Search!
      </v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const pokemonSearch = ref('')

defineEmits<{
  'switch-to-advanced': []
}>()

const performSearch = () => {
  if (pokemonSearch.value.trim()) {
    router.push(`/search/results?name=${encodeURIComponent(pokemonSearch.value.trim())}`)
  }
}
</script>

<style scoped>
/* Component-specific styles if needed? */
</style>