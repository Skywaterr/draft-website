<template>
  <v-app>
    <AppNavbar />
    
    <v-main style="background-color: #FFDEDE;">
      <v-container fluid class="py-8">
        <!-- ROW 1: Headers -->
        <v-row dense class="mb-0">
          <v-col cols="4" class="pb-1">
            <div class="roster-header" v-if="comparisonMode === 'Type Matchups'">Roster</div>
            <div class="roster-header" v-else>Your Roster</div>
          </v-col>
          <v-col cols="4" class="pb-1">
            <h1 class="text-h3 text-center" style="color: #000000;">Compare...</h1>
          </v-col>
          <v-col cols="4" class="pb-1">
            <div class="roster-header" v-if="comparisonMode !== 'Type Matchups'">Opponent Roster</div>
          </v-col>
        </v-row>
        
        <!-- ROW 2: Buttons + Mode Selector -->
        <v-row dense class="mb-0" style="margin-top: -8px;">
          <v-col cols="4" class="py-1">
            <div class="d-flex">
              <v-btn variant="flat" class="roster-button" style="margin-right: -32px;" @click="loadRoster('left')">
                Load a roster!
              </v-btn>
              <v-btn variant="flat" class="roster-button" @click="saveRoster('left')">
                Save this roster!
              </v-btn>
            </div>
          </v-col>
          <v-col cols="4" class="py-1">
            <div class="d-flex justify-center">
              <div style="width: calc(100% - 10px);">
                <v-select
                  v-model="comparisonMode"
                  :items="['Speed', 'Other Base Stats', 'Type Matchups']"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  bg-color="white"
                ></v-select>
              </div>
            </div>
          </v-col>
          <v-col cols="4" class="py-1">
            <div class="d-flex ga-0" v-if="comparisonMode !== 'Type Matchups'">
              <v-btn variant="flat" class="roster-button" style="margin-right: -32px;" @click="loadRoster('right')">
                Load a roster!
              </v-btn>
              <v-btn variant="flat" class="roster-button" @click="saveRoster('right')">
                Save this roster!
              </v-btn>
            </div>
          </v-col>
        </v-row>
        
        <!-- ROW 3: Clear buttons -->
        <v-row dense class="mb-1" style="margin-top: -21px;">
          <v-col cols="4" class="pt-1 pb-2 d-flex justify-center">
            <v-btn variant="flat" class="roster-button-half" @click="clearRosters">
              Clear Saved Rosters
            </v-btn>
          </v-col>
          <v-col cols="4" class="pt-1 pb-2"></v-col>
          <v-col cols="4" class="pt-1 pb-2 d-flex justify-center">
            <v-btn variant="flat" class="roster-button-half" @click="clearRosters" v-if="comparisonMode !== 'Type Matchups'">
              Clear Saved Rosters
            </v-btn>
          </v-col>
        </v-row>
        
        <!-- Component -->
        <SpeedCompare 
          v-if="comparisonMode === 'Speed'"
          :left-roster="leftRoster"
          :right-roster="rightRoster"
          :all-pokemon="allPokemon"
          @add-pokemon="addPokemonToRoster"
          @remove-pokemon="removePokemon"
        />
        
        <BaseStatsCompare 
          v-else-if="comparisonMode === 'Other Base Stats'"
          :left-roster="leftRoster"
          :right-roster="rightRoster"
          :all-pokemon="allPokemon"
          @add-pokemon="addPokemonToRoster"
          @remove-pokemon="removePokemon"
        />
        
        <TypeMatchupsCompare 
          v-else
          :roster="leftRoster"
          :all-pokemon="allPokemon"
          @add-pokemon="addPokemonToLeft"
          @remove-pokemon="removePokemonFromLeft"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import AppNavbar from '@/components/AppNavbar.vue'
import SpeedCompare from '@/views/compare/SpeedCompare.vue'
import BaseStatsCompare from '@/views/compare/BaseStatsCompare.vue'
import TypeMatchupsCompare from '@/views/compare/TypeMatchupsCompare.vue'

// Pokemon data from backend WIP
const allPokemon = ref<any[]>([])

// Load from localStorage or default to 'Speed'
const comparisonMode = ref(localStorage.getItem('comparisonMode') || 'Speed')
const leftRoster = ref<any[]>(Array(12).fill(null))
const rightRoster = ref<any[]>(Array(12).fill(null))

// Fetch all Pokemon names from backend on mount
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/names')
    if (!response.ok) throw new Error('Failed to fetch Pokemon')
    const data = await response.json()
    
    // data = [{ Name: "pikachu", Pokemon: "Pikachu" }, ...]
    allPokemon.value = data
    console.log(`✅ Loaded ${data.length} Pokemon`)
  } catch (err) {
    console.error('❌ Failed to load Pokemon:', err)
  }
})

// Save to localStorage whenever mode changes
watch(comparisonMode, (newMode) => {
  localStorage.setItem('comparisonMode', newMode)
})

// Add Pokemon to roster (called from child components)
const addPokemonToRoster = async (payload: { side: 'left' | 'right', pokemonName: string }) => {
  const roster = payload.side === 'left' ? leftRoster : rightRoster
  
  // Check if roster is full
  const emptyIndex = roster.value.findIndex(slot => slot === null)
  if (emptyIndex === -1) {
    alert(`${payload.side === 'left' ? 'Left' : 'Right'} roster is full!`)
    return
  }
  
  // Fetch full Pokemon data from backend
  try {
    const response = await fetch(`http://localhost:3000/pokemon?name=${encodeURIComponent(payload.pokemonName)}`)
    if (!response.ok) throw new Error('Failed to fetch Pokemon stats')
    const data = await response.json()
    
    if (data.length > 0) {
      const fullPokemon = data[0]
      roster.value[emptyIndex] = fullPokemon
      console.log(`✅ Added ${fullPokemon.Pokemon} to ${payload.side} roster`, fullPokemon)
    }
  } catch (err) {
    console.error('❌ Failed to fetch Pokemon stats:', err)
    alert('Failed to add Pokemon. Please try again.')
  }
}

function removePokemon(payload: { side: 'left' | 'right', index: number }) {
  const roster = payload.side === 'left' ? leftRoster : rightRoster
  roster.value[payload.index] = null
}

function saveRoster(side: 'left' | 'right') {
  const roster = side === 'left' ? leftRoster.value : rightRoster.value
  const name = prompt(`Name for ${side} roster:`)
  if (!name) return
  
  const saved = JSON.parse(localStorage.getItem('savedRosters') || '{}')
  saved[name] = roster
  localStorage.setItem('savedRosters', JSON.stringify(saved))
  alert(`Saved "${name}"!`)
}

function loadRoster(side: 'left' | 'right') {
  const saved = JSON.parse(localStorage.getItem('savedRosters') || '{}')
  const names = Object.keys(saved)
  
  if (names.length === 0) {
    alert('No saved rosters!')
    return
  }
  
  const name = prompt(`Available rosters:\n${names.join('\n')}\n\nEnter name to load:`)
  if (!name || !saved[name]) return
  
  if (side === 'left') {
    leftRoster.value = saved[name]
  } else {
    rightRoster.value = saved[name]
  }
}

function clearRosters() {
  if (confirm('Delete all saved rosters?')) {
    localStorage.removeItem('savedRosters')
    alert('Cleared!')
  }
}

function addPokemonToLeft(pokemonName: string) {
  addPokemonToRoster({ side: 'left', pokemonName })
}

function removePokemonFromLeft(index: number) {
  removePokemon({ side: 'left', index })
}
</script>

<style scoped>
.roster-header {
  background-color: #D9D9D9;
  color: #000000;
  text-align: center;
  padding: 6px;
  font-size: 1.9rem;
  font-weight: normal;
  border-radius: 2px;
  width: 50%;
  margin: 0 auto;
}

.roster-button {
  background-color: #D9D9D9 !important;
  color: #000000 !important;
  text-transform: none !important;
  width: 45%;
  flex: none;
  font-size: 1rem !important;
  padding: 6px 12px !important;
  border: 1px solid #000000 !important;
  border-radius: 0 !important;
  margin: 0 auto;
}

.roster-button-half {
  background-color: #D9D9D9 !important;
  color: #000000 !important;
  text-transform: none !important;
  width: 50%;
  font-size: 1rem !important;
  padding: 6px 12px !important;
  border: 1px solid #000000 !important;
  border-radius: 0 !important;
  width: 40%;
}
</style>