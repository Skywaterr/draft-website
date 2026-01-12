<template>
  <!-- ROW 4: Input -->
  <v-row class="mb-1" style="margin-top: -15px;">
    <v-col cols="4">
      <v-autocomplete
        v-model="search"
        v-model:search="searchInput"
        :items="allPokemonNames"
        placeholder="Input Pokemon"
        variant="outlined"
        density="comfortable"
        hide-details
        clearable
        rounded
        bg-color="white"
        @update:model-value="handleSelection"
      >
        <template v-slot:append-inner>
          <v-icon>mdi-magnify</v-icon>
        </template>
      </v-autocomplete>
    </v-col>
    <v-col cols="8"></v-col>
  </v-row>
  
  <!-- ROW 5+: Grid + Type Matchups -->
  <v-row style="margin-top: -10px;">
    <!-- Left: Roster Grid -->
    <v-col cols="4">
      <div class="roster-grid">
        <div 
          v-for="(pokemon, index) in roster" 
          :key="index" 
          class="roster-slot"
          :style="{ 
            backgroundColor: getSlotColor(index),
            outline: highlightedPokemon.includes(index) ? '4px solid yellow' : 'none'
          }"
        >
          <!-- Tera Type Dropdown -->
          <v-select
            v-if="pokemon"
            v-model="teraTypes[index]"
            :items="['None', ...typeList]"
            variant="outlined"
            density="compact"
            hide-details
            bg-color="white"
            class="tera-dropdown"
          ></v-select>
          
          <!-- Ability Immunity Checkbox (if applicable, idk what to do here) -->
          <v-checkbox
            v-if="pokemon && hasImmunityAbility(pokemon, index)"
            v-model="abilityActive[index]"
            hide-details
            density="compact"
            class="ability-checkbox"
            :label="getAbilityLabel(pokemon)"
          ></v-checkbox>
          
          <v-btn 
            v-if="pokemon"
            icon="mdi-close"
            size="x-small"
            variant="text"
            class="delete-btn"
            @click.stop="$emit('remove-pokemon', index)"
          ></v-btn>
          
          <v-img 
            v-if="pokemon"
            :src="`/${pokemon.Name}.gif`"
            width="50"
            height="50"
          >
            <template #error>
              <v-img
                :src="`/${pokemon.Name}.png`"
                width="50"
                height="50"
              />
            </template>
          </v-img>
          <div v-if="pokemon" class="pokemon-name">{{ pokemon.Pokemon }}</div>
        </div>
      </div>
    </v-col>
    
    <!-- Right: Type Matchup Tables -->
    <v-col cols="8">
      <!-- Weaknesses -->
      <div class="matchup-section" style="margin-top: -44px;">
        <h3 class="section-title">Weaknesses</h3>
        <div class="type-grid">
          <div 
            v-for="type in typeList" 
            :key="type"
            class="type-box-wrapper"
          >
            <div 
              class="type-box"
              :style="{ backgroundColor: typeColors[type], borderColor: '#2C4566', color: '#FFFFE8' }"
            >
              {{ type }}
            </div>
            <div 
              class="type-count"
              @mouseenter="highlightWeakness(type)"
              @mouseleave="clearHighlight"
            >
              {{ getWeaknessCount(type) }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Resistances -->
      <div class="matchup-section">
        <h3 class="section-title">Resistances</h3>
        <div class="type-grid">
          <div 
            v-for="type in typeList" 
            :key="type"
            class="type-box-wrapper"
          >
            <div 
              class="type-box"
              :style="{ backgroundColor: typeColors[type], borderColor: '#2C4566', color: '#FFFFE8' }"
            >
              {{ type }}
            </div>
            <div 
              class="type-count"
              @mouseenter="highlightResistance(type)"
              @mouseleave="clearHighlight"
            >
              {{ getResistanceCount(type) }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Immunities -->
      <div class="matchup-section">
        <h3 class="section-title">Immunities</h3>
        <div class="type-grid-immunities">
          <div 
            v-for="type in immunityTypes" 
            :key="type"
            class="type-box-wrapper"
          >
            <div 
              class="type-box"
              :style="{ backgroundColor: typeColors[type], borderColor: '#2C4566', color: '#FFFFE8' }"
            >
              {{ type }}
            </div>
            <div 
              class="type-count"
              @mouseenter="highlightImmunity(type)"
              @mouseleave="clearHighlight"
            >
              {{ getImmunityCount(type) }}
            </div>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  roster: any[]
  allPokemon: any[]
}>()

const emit = defineEmits<{
  'add-pokemon': [pokemonName: string]
  'remove-pokemon': [index: number]
}>()

const search = ref<string | null>(null)
const searchInput = ref('')
const teraTypes = ref<string[]>(Array(12).fill('None'))
const abilityActive = ref<boolean[]>(Array(12).fill(true))
const highlightedPokemon = ref<number[]>([]) // WIP

// Matchup counts for each type (NEW)
const weaknessCounts = ref<Record<string, number>>({})
const resistanceCounts = ref<Record<string, number>>({})
const immunityCounts = ref<Record<string, number>>({})

const allPokemonNames = computed(() => props.allPokemon.map(p => p.Pokemon))

const typeList = [
  'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice',
  'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
  'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
]

const immunityTypes = [
  'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Fighting',
  'Poison', 'Ground', 'Psychic', 'Ghost', 'Dragon'
]

const typeColors: Record<string, string> = {
  'Normal': '#DDD4BF',
  'Fire': '#CE373C',
  'Water': '#47A2DB',
  'Grass': '#59BD38',
  'Electric': '#D7CC2B',
  'Ice': '#A9F3EE',
  'Fighting': '#BA7060',
  'Poison': '#7B59C1',
  'Ground': '#C59D5B',
  'Flying': '#7EACD9',
  'Psychic': '#CD59CA',
  'Bug': '#B0B751',
  'Rock': '#845B36',
  'Ghost': '#5B557D',
  'Dragon': '#5554DD',
  'Dark': '#484746',
  'Steel': '#A8B1B3',
  'Fairy': '#E0ABE0'
}

// Abilities that grant immunity (simplified)
const immunityAbilities: Record<string, string> = {
  'Flash Fire': 'Fire',
  'Levitate': 'Ground',
  'Volt Absorb': 'Electric',
  'Water Absorb': 'Water',
  'Lightning Rod': 'Electric',
  'Motor Drive': 'Electric',
  'Sap Sipper': 'Grass',
  // Add more...
}

function getSlotColor(index: number) {
  const row = Math.floor(index / 2)
  const col = index % 2
  return (row + col) % 2 === 0 ? '#E2DFDF' : '#828282'
}

function findPokemonByDisplayName(displayName: string) {
  if (!displayName) return null
  
  let pokemon = props.allPokemon.find(p => p.Pokemon === displayName)
  
  if (!pokemon) {
    const lowerName = displayName.toLowerCase()
    pokemon = props.allPokemon.find(p => p.Pokemon.toLowerCase() === lowerName)
  }
  
  return pokemon
}

function isPokemonInRoster(pokemonName: string): boolean {
  return props.roster.some(p => p !== null && p.Name === pokemonName)
}

function handleSelection(selectedValue: string | null) {
  if (!selectedValue) return
  
  const pokemon = findPokemonByDisplayName(selectedValue)
  if (!pokemon) {
    console.warn('❌ Could not find Pokemon:', selectedValue)
    search.value = null
    searchInput.value = ''
    return
  }
  
  if (isPokemonInRoster(pokemon.Name)) {
    alert(`${pokemon.Pokemon} is already in the roster!`)
    search.value = null
    searchInput.value = ''
    return
  }
  
  emit('add-pokemon', pokemon.Name)
  console.log('✅ Added:', pokemon.Pokemon, '(', pokemon.Name, ')')
  
  search.value = null
  searchInput.value = ''
}

// Fetch matchups from backend API
async function fetchMatchups(type1: string, type2: string | null) {
  try {
    let url = `http://localhost:3000/matchups?type=${type1}`
    if (type2 && type2 !== 'NULL') {
      url += `&type=${type2}`
    }
    
    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to fetch matchups')
    
    const data = await response.json()
    console.log(`Matchups for ${type1}${type2 ? `/${type2}` : ''}:`, data)
    
    return data // { Weaknesses: [...], Resistances: [...], Immunities: [...] }
  } catch (err) {
    console.error('❌ Error fetching matchups:', err)
    return { Weaknesses: [], Resistances: [], Immunities: [] }
  }
}

// Calculate all matchup counts for the roster
async function calculateMatchupCounts() {
  // Reset counts
  weaknessCounts.value = {}
  resistanceCounts.value = {}
  immunityCounts.value = {}
  
  // Initialize all types to 0
  typeList.forEach(type => {
    weaknessCounts.value[type] = 0
    resistanceCounts.value[type] = 0
  })
  
  immunityTypes.forEach(type => {
    immunityCounts.value[type] = 0
  })
  
  // For each Pokemon in roster
  for (let i = 0; i < props.roster.length; i++) {
    const pokemon = props.roster[i]
    if (!pokemon) continue
    
    // Determine types (use tera if selected)
    const type1 = teraTypes.value[i] !== 'None' ? teraTypes.value[i] : pokemon.Type1
    const type2 = teraTypes.value[i] !== 'None' ? null : (pokemon.Type2 !== 'NULL' ? pokemon.Type2 : null)
    
    // Fetch matchups from backend
    const matchups = await fetchMatchups(type1, type2)
    
    // Increment counts for each type in each category
    matchups.Weaknesses.forEach((type: string) => {
      if (weaknessCounts.value[type] !== undefined) {
        weaknessCounts.value[type]++
      }
    })
    
    matchups.Resistances.forEach((type: string) => {
      if (resistanceCounts.value[type] !== undefined) {
        resistanceCounts.value[type]++
      }
    })
    
    matchups.Immunities.forEach((type: string) => {
      if (immunityCounts.value[type] !== undefined) {
        immunityCounts.value[type]++
      }
    })
    
    // Handle ability immunities
    if (abilityActive.value[i] && hasImmunityAbility(pokemon, i)) {
      const abilityImmunity = getAbilityImmunityType(pokemon)
      if (abilityImmunity && immunityCounts.value[abilityImmunity] !== undefined) {
        immunityCounts.value[abilityImmunity]++
      }
    }
  }
  
  console.log('✅ Matchup counts calculated:', {
    weaknesses: weaknessCounts.value,
    resistances: resistanceCounts.value,
    immunities: immunityCounts.value
  })
}

// Watch for roster changes and recalculate
watch(() => props.roster, calculateMatchupCounts, { deep: true })
watch(teraTypes, calculateMatchupCounts, { deep: true })
watch(abilityActive, calculateMatchupCounts, { deep: true })

// Check if pokemon has ability that grants immunity
function hasImmunityAbility(pokemon: any, index: number): boolean {
  // TODO: Fetch abilities from backend and check
  const immunityMons = ['Heatran', 'Gengar', 'Rotom']
  return immunityMons.includes(pokemon.Pokemon)
}

function getAbilityLabel(pokemon: any): string {
  // TODO: Get actual ability from backend
  return 'Flash Fire'
}

function getAbilityImmunityType(pokemon: any): string | null {
  // TODO: Get actual ability immunity type
  return 'Fire' // Placeholder
}

function getWeaknessCount(type: string): number {
  return weaknessCounts.value[type] || 0
}

function getResistanceCount(type: string): number {
  return resistanceCounts.value[type] || 0
}

function getImmunityCount(type: string): number {
  return immunityCounts.value[type] || 0
}

function highlightWeakness(type: string) {
  highlightedPokemon.value = []
  
  props.roster.forEach(async (pokemon, index) => {
    if (!pokemon) return
    
    const type1 = teraTypes.value[index] !== 'None' ? teraTypes.value[index] : pokemon.Type1
    const type2 = teraTypes.value[index] !== 'None' ? null : (pokemon.Type2 !== 'NULL' ? pokemon.Type2 : null)
    
    const matchups = await fetchMatchups(type1, type2)
    
    if (matchups.Weaknesses.includes(type)) {
      highlightedPokemon.value.push(index)
    }
  })
}

function highlightResistance(type: string) {
  highlightedPokemon.value = []
  
  props.roster.forEach(async (pokemon, index) => {
    if (!pokemon) return
    
    const type1 = teraTypes.value[index] !== 'None' ? teraTypes.value[index] : pokemon.Type1
    const type2 = teraTypes.value[index] !== 'None' ? null : (pokemon.Type2 !== 'NULL' ? pokemon.Type2 : null)
    
    const matchups = await fetchMatchups(type1, type2)
    
    if (matchups.Resistances.includes(type)) {
      highlightedPokemon.value.push(index)
    }
  })
}

function highlightImmunity(type: string) {
  highlightedPokemon.value = []
  
  props.roster.forEach(async (pokemon, index) => {
    if (!pokemon) return
    
    const type1 = teraTypes.value[index] !== 'None' ? teraTypes.value[index] : pokemon.Type1
    const type2 = teraTypes.value[index] !== 'None' ? null : (pokemon.Type2 !== 'NULL' ? pokemon.Type2 : null)
    
    const matchups = await fetchMatchups(type1, type2)
    
    if (matchups.Immunities.includes(type)) {
      highlightedPokemon.value.push(index)
    }
    
    // Also check ability immunities
    if (abilityActive.value[index] && hasImmunityAbility(pokemon, index)) {
      const abilityImmunity = getAbilityImmunityType(pokemon)
      if (abilityImmunity === type) {
        highlightedPokemon.value.push(index)
      }
    }
  })
}

function clearHighlight() {
  highlightedPokemon.value = []
}
</script>

<style scoped>
.roster-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  height: 1350px;
}

.roster-slot {
  height: 225px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: outline 0.2s;
}

.tera-dropdown {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 65px;
  z-index: 5;
}

.ability-checkbox {
  position: absolute;
  top: 30px;
  left: 4px;
  z-index: 5;
  transform: scale(0.7);
}

:deep(.ability-checkbox .v-label) {
  font-size: 0.65rem !important;
  white-space: nowrap;
}

.delete-btn {
  position: absolute;
  top: 2px;
  right: 2px;
  color: #000000 !important;
  z-index: 10;
}

.pokemon-name {
  font-size: 0.7rem;
  text-align: center;
  margin-top: 2px;
  color: #000000;
}

.matchup-section {
  margin-bottom: 24px;
}

.section-title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 8px;
  color: #000000;
}

.type-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
  border: 2px solid #000000;
  padding: 8px;
}

.type-grid-immunities {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
  border: 2px solid #000000;
  padding: 8px;
}

.type-box-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.type-box {
  border: 2px solid;
  padding: 8px;
  text-align: center;
  font-weight: bold;
  width: 100%;
  font-size: 0.9rem;
}

.type-count {
  font-size: 1rem;
  color: #000000;
  margin-top: 4px;
  text-align: center;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.type-count:hover {
  background-color: rgba(255, 255, 0, 0.3);
}

:deep(.tera-dropdown .v-field__input) {
  font-size: 0.65rem !important;
  min-height: 24px !important;
  padding: 2px 4px !important;
}

:deep(.tera-dropdown .v-field) {
  font-size: 0.65rem !important;
}

/* Hide dropdown arrow for autocomplete */
:deep(.v-autocomplete .v-field__append-inner .v-icon) {
  display: none;
}
</style>