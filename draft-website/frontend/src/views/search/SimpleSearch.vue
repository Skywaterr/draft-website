<template>
  <v-card 
    elevation="0" 
    class="pa-12"
    style="background-color: #FFFCAD; border-radius: 12px;"
  >
    <h1 class="text-h3 text-center mb-8" style="color: #000000;">Simple Search!</h1>

    <!-- Pokemon Name Search Accordion -->
    <v-expansion-panels 
      v-model="openPanel"
      class="mb-4"
      style="background-color: transparent;"
    >
      <v-expansion-panel 
        value="name"
        style="background-color: #FFFCAD;"
        elevation="0"
      >
        <v-expansion-panel-title 
          style="background-color: #FFFCAD;"
          hide-actions
        >
          <div class="d-flex align-center justify-center" style="width: 100%;">
            <span class="text-h6 mr-2" style="color: #000000;">Pokemon Name</span>
            <v-icon size="x-large">mdi-chevron-down</v-icon>
          </div>
        </v-expansion-panel-title>
        
        <v-expansion-panel-text style="background-color: #FFFCAD;">
          <div class="d-flex align-center justify-center ga-4 mt-4">
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
              @keyup.enter="searchByName"
            >
              <template v-slot:append-inner>
                <v-icon>mdi-magnify</v-icon>
              </template>
            </v-text-field>
            
            <v-btn
              style="background-color: #CCF1FF; color: #000000; text-transform: none !important;"
              size="large"
              variant="flat"
              @click="searchByName"
            >
              Search! →
            </v-btn>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- First divider and OR -->
    <v-divider class="my-4" thickness="2" color="#000000"></v-divider>
    <div class="text-h5 text-center my-2" style="color: #000000;">OR</div>

    <!-- Pokemon Tier Accordion -->
    <v-expansion-panels 
      v-model="openPanel"
      class="mb-4"
      style="background-color: transparent;"
    >
      <v-expansion-panel 
        value="tier"
        style="background-color: #FFFCAD;"
        elevation="0"
      >
        <v-expansion-panel-title 
          style="background-color: #FFFCAD;"
          hide-actions
        >
          <div class="d-flex align-center justify-center" style="width: 100%;">
            <span class="text-h6 mr-7" style="color: #000000;">Pokemon Tier</span>
            <v-icon size="x-large">mdi-chevron-down</v-icon>
          </div>
        </v-expansion-panel-title>
        
        <v-expansion-panel-text style="background-color: #FFFCAD;">
          <div class="d-flex align-center justify-center ga-4 mt-4">
            <span class="text-h6" style="color: #000000;">I want a pokemon in the</span>
            <v-select
              v-model="selectedTier"
              :items="tiers"
              variant="outlined"
              density="comfortable"
              bg-color="white"
              hide-details
              style="max-width: 200px;"
            ></v-select>
            <span class="text-h6" style="color: #000000;">tier.</span>
          </div>
          
          <div class="text-center mt-4">
            <v-btn
              style="background-color: #CCF1FF; color: #000000; text-transform: none !important;"
              size="large"
              variant="flat"
              @click="searchByTier"
            >
              Search! →
            </v-btn>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- Second OR -->
    <v-divider class="my-4" thickness="2" color="#000000"></v-divider>
    <div class="text-h5 text-center my-2" style="color: #000000;">OR</div>

    <!-- Type Matchups Accordion -->
    <v-expansion-panels 
      v-model="openPanel"
      class="mb-4"
      style="background-color: transparent;"
    >
      <v-expansion-panel 
        value="type"
        style="background-color: #FFFCAD;"
        elevation="0"
      >
        <v-expansion-panel-title 
          style="background-color: #FFFCAD;"
          hide-actions
        >
          <div class="d-flex align-center justify-center" style="width: 100%;">
            <span class="text-h6 mr-4" style="color: #000000;">Type Matchups</span>
            <v-icon size="x-large">mdi-chevron-down</v-icon>
          </div>
        </v-expansion-panel-title>
        
        <v-expansion-panel-text style="background-color: #FFFCAD;">
          <div class="d-flex align-center justify-center ga-4 mt-4">
            <span class="text-h6" style="color: #000000;">I want a good matchup against</span>
            <v-select
              v-model="selectedType1"
              :items="types"
              variant="outlined"
              density="comfortable"
              bg-color="white"
              hide-details
              style="max-width: 150px;"
            ></v-select>
            <v-select
              v-model="selectedType2"
              :items="types"
              variant="outlined"
              density="comfortable"
              bg-color="white"
              hide-details
              style="max-width: 150px;"
            ></v-select>
            <span class="text-h6" style="color: #000000;">type</span>
          </div>
          
          <div class="text-center mt-4">
            <v-btn
              style="background-color: #CCF1FF; color: #000000; text-transform: none !important;"
              size="large"
              variant="flat"
              @click="searchByType"
            >
              Search! →
            </v-btn>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

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
const selectedTier = ref('')
const selectedType1 = ref('')
const selectedType2 = ref('')
const openPanel = ref<string | undefined>('name')
const tiers = ['S', 'A', 'B', 'C', 'D', 'F']
const types = [
  'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice',
  'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
  'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
]

defineEmits<{
  'switch-to-advanced': []
}>()

const searchByName = () => {
  if (pokemonSearch.value.trim()) {
    router.push(`/search/results?name=${encodeURIComponent(pokemonSearch.value.trim())}`)
  } else {
    router.push('/search/results')
  }
}

const searchByTier = () => {
  if (selectedTier.value) {
    router.push(`/search/results?tier=${encodeURIComponent(selectedTier.value)}`)
  }
}

const searchByType = () => {
  const params = new URLSearchParams()
  if (selectedType1.value) params.append('type1', selectedType1.value)
  if (selectedType2.value) params.append('type2', selectedType2.value)
  
  if (params.toString()) {
    router.push(`/search/results?${params.toString()}`)
  }
}
</script>

<style scoped>
/* Removed default expansion panel borders and shadows */
:deep(.v-expansion-panel) {
  background-color: #FFFCAD !important;
}

:deep(.v-expansion-panel-title) {
  background-color: #FFFCAD !important;
}

:deep(.v-expansion-panel-text__wrapper) {
  background-color: #FFFCAD !important;
}
</style>