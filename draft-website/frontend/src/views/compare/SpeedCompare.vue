<template>
  <!-- ROW 4: Input + Speed vs Speed -->
  <v-row class="mb-1" style="margin-top: -15px;">
    <v-col cols="4">
      <v-autocomplete
        v-model="leftSearch"
        v-model:search="leftSearchInput"
        :items="allPokemonNames"
        placeholder="Input Pokemon"
        variant="outlined"
        density="comfortable"
        hide-details
        clearable
        rounded
        bg-color="white"
        @update:model-value="handleLeftSelection"
      >
        <template v-slot:append-inner>
          <v-icon>mdi-magnify</v-icon>
        </template>
      </v-autocomplete>
    </v-col>
    
    <v-col cols="4">
      <div class="d-flex justify-center align-center ga-4" style="width: 100%;">
        <v-text-field
          value="Speed"
          readonly
          variant="outlined"
          density="comfortable"
          hide-details
          bg-color="white"
          style="flex: 1;"
        ></v-text-field>
        <span class="text-h6">vs.</span>
        <v-text-field
          value="Speed"
          readonly
          variant="outlined"
          density="comfortable"
          hide-details
          bg-color="white"
          style="flex: 1;"
        ></v-text-field>
      </div>
    </v-col>
    
    <v-col cols="4">
      <v-autocomplete
        v-model="rightSearch"
        v-model:search="rightSearchInput"
        :items="allPokemonNames"
        placeholder="Input Pokemon"
        variant="outlined"
        density="comfortable"
        hide-details
        clearable
        rounded
        bg-color="white"
        @update:model-value="handleRightSelection"
      >
        <template v-slot:append-inner>
          <v-icon>mdi-magnify</v-icon>
        </template>
      </v-autocomplete>
    </v-col>
  </v-row>
  
  <!-- ROW 5+: Grids + Gradient -->
  <v-row style="margin-top: -10px;">
    <v-col cols="4">
      <div class="roster-grid">
        <div 
          v-for="(pokemon, index) in leftRoster" 
          :key="index" 
          class="roster-slot"
          :style="{ backgroundColor: getSlotColor(index) }"
          @click="selectPokemon('left', pokemon, index)"
        >
          <v-btn 
            v-if="pokemon"
            icon="mdi-close"
            size="x-small"
            variant="text"
            class="delete-btn"
            @click.stop="$emit('remove-pokemon', { side: 'left', index })"
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
    
    <v-col cols="4">
      <div class="gradient-container">
        <div class="pokemon-side left-side">
          <div 
            v-for="(pokemon, index) in sortedLeftRoster" 
            :key="`left-${index}`"
            class="pokemon-speed-item"
            :style="{ top: `${pokemon.position}%` }"
            @click="selectFromGradient('left', pokemon.data)"
          >
            <v-img 
              :src="`/${pokemon.data.Name}.gif`"
              width="40"
              height="40"
            >
              <template #error>
                <v-img
                  :src="`/${pokemon.data.Name}.png`"
                  width="40"
                  height="40"
                />
              </template>
            </v-img>
            <span class="speed-number">{{ pokemon.speed }}</span>
          </div>
        </div>
        
        <div class="gradient-line"></div>
        
        <div class="pokemon-side right-side">
          <div 
            v-for="(pokemon, index) in sortedRightRoster" 
            :key="`right-${index}`"
            class="pokemon-speed-item"
            :style="{ top: `${pokemon.position}%` }"
            @click="selectFromGradient('right', pokemon.data)"
          >
            <span class="speed-number">{{ pokemon.speed }}</span>
            <v-img 
              :src="`/${pokemon.data.Name}.gif`"
              width="40"
              height="40"
            >
              <template #error>
                <v-img
                  :src="`/${pokemon.data.Name}.png`"
                  width="40"
                  height="40"
                />
              </template>
            </v-img>
          </div>
        </div>
      </div>
    </v-col>
    
    <v-col cols="4">
      <div class="roster-grid">
        <div 
          v-for="(pokemon, index) in rightRoster" 
          :key="index" 
          class="roster-slot"
          :style="{ backgroundColor: getSlotColor(index) }"
          @click="selectPokemon('right', pokemon, index)"
        >
          <v-btn 
            v-if="pokemon"
            icon="mdi-close"
            size="x-small"
            variant="text"
            class="delete-btn"
            @click.stop="$emit('remove-pokemon', { side: 'right', index })"
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
  </v-row>
  
  <!-- Calculator -->
  <v-row style="margin-top: -5px;">
    <v-col cols="12">
      <div class="d-flex justify-center align-center ga-2 mb-2">
        <v-select
          v-model="leftPokemon"
          :items="allRosterOptions"
          item-title="title"
          item-value="value"
          placeholder="Select Pokemon"
          variant="outlined"
          density="compact"
          hide-details
          bg-color="white"
          style="max-width: 200px;"
        ></v-select>
        
        <span class="text-h6">wants to outspeed</span>
        
        <v-select
          v-model="rightPokemon"
          :items="allRosterOptions"
          item-title="title"
          item-value="value"
          placeholder="Select Pokemon"
          variant="outlined"
          density="compact"
          hide-details
          bg-color="white"
          style="max-width: 200px;"
        ></v-select>
      </div>
      
      <!-- Swap button + Checkbox -->
      <div class="d-flex justify-center align-center mb-4" style="position: relative;">
        <div style="flex: 1; text-align: right;">
          <!-- Empty space for left alignment -->
        </div>
        
        <div style="flex: 0;">
          <img
            src="/swap-arrows.png"
            alt="Swap"
            class="swap-image"
            @click="swapPokemon"
          />
        </div>
        
        <div style="flex: 1; position: relative;">
          <div style="position: absolute; top: -30px; left: 55px;">
            <v-checkbox
              v-model="speedBoostingNature"
              label="Speed boosting nature?"
              hide-details
              density="compact"
              class="small-checkbox"
            ></v-checkbox>
          </div>
        </div>
      </div>
      
      <!-- Result message -->
      <p class="text-body-1 text-center" v-if="leftPokemon && rightPokemon">
        In order to always outspeed a <strong>{{ rightPokemonDisplay }}</strong> 
        with 
        <v-text-field
          v-model.number="opponentEVs"
          variant="outlined"
          density="compact"
          hide-details
          type="number"
          min="0"
          max="252"
          @keypress="onlyNumbers"
          @input="validateEVs"
          class="ev-input"
          bg-color="white"
          style="display: inline-block; width: 80px; vertical-align: middle; text-decoration: underline;"
        ></v-text-field>{{ speedBoostingNature ? '+' : '' }}
        Speed EVs at 
        <v-select
          v-model="opponentStage"
          :items="speedStages"
          variant="outlined"
          density="compact"
          hide-details
          bg-color="white"
          style="display: inline-block; width: 85px; vertical-align: middle;"
        ></v-select>
        speed,<br>
        Your <strong>{{ leftPokemonDisplay }}</strong> at 
        <v-select
          v-model="yourStage"
          :items="speedStages"
          variant="outlined"
          density="compact"
          hide-details
          bg-color="white"
          style="display: inline-block; width: 85px; vertical-align: middle;"
        ></v-select>
        speed needs to have <strong>{{ calculatedEVs }}+</strong> speed EVs!
      </p>
      
      <p class="text-body-1 text-center" v-else>
        <em>Select two Pokémon from the dropdowns above to calculate required Speed EVs.</em>
      </p>
      
      <p class="text-caption text-center mt-2">
        (Note: Having a "+" at the end of the number of speed EVs signifies the inclusion of a speed boosting nature, such as Jolly or Timid!)
      </p>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  leftRoster: any[]
  rightRoster: any[]
  allPokemon: any[]
}>()

const emit = defineEmits<{
  'add-pokemon': [{ side: 'left' | 'right', pokemonName: string }]
  'remove-pokemon': [{ side: 'left' | 'right', index: number }]
}>()

const leftSearch = ref<string | null>(null)
const rightSearch = ref<string | null>(null)
const leftSearchInput = ref('')  // What user types
const rightSearchInput = ref('') // What user types
const leftPokemon = ref<string | null>(null)
const rightPokemon = ref<string | null>(null)
const opponentEVs = ref(252)
const opponentStage = ref('+0')
const yourStage = ref('+0')
const speedBoostingNature = ref(false)

const speedStages = ['-6', '-5', '-4', '-3', '-2', '-1', '+0', '+1', '+2', '+3', '+4', '+5', '+6']

// All Pokemon names for autocomplete (NEW)
const allPokemonNames = computed(() => props.allPokemon.map(p => p.Pokemon))

// ALL roster Pokemon for both dropdowns - FILTER OUT DUPLICATES (NEW)
const allRosterOptions = computed(() => {
  const combined = [...props.leftRoster, ...props.rightRoster]
    .filter(p => p !== null)
  
  // Remove duplicates by Name (NEW)
  const unique = combined.filter((pokemon, index, self) =>
    index === self.findIndex(p => p.Name === pokemon.Name)
  )
  
  return unique.map(p => ({
    title: p.Pokemon,
    value: p.Name
  }))
})

// Display names for selected Pokemon - WIP
const leftPokemonDisplay = computed(() => {
  if (!leftPokemon.value) return ''
  const allPokemon = [...props.leftRoster, ...props.rightRoster].filter(p => p !== null)
  const pokemon = allPokemon.find(p => p.Name === leftPokemon.value)
  return pokemon ? pokemon.Pokemon : ''
})

const rightPokemonDisplay = computed(() => {
  if (!rightPokemon.value) return ''
  const allPokemon = [...props.leftRoster, ...props.rightRoster].filter(p => p !== null)
  const pokemon = allPokemon.find(p => p.Name === rightPokemon.value)
  return pokemon ? pokemon.Pokemon : ''
})

// Sorted rosters for gradient display - WIP
const sortedLeftRoster = computed(() => {
  const filtered = props.leftRoster.filter(p => p !== null)
  const sorted = [...filtered].sort((a, b) => b.Spd - a.Spd)
  
  return sorted.map((pokemon, i) => ({
    data: pokemon,
    speed: pokemon.Spd,
    position: (i / Math.max(sorted.length - 1, 1)) * 90 + 5
  }))
})

const sortedRightRoster = computed(() => {
  const filtered = props.rightRoster.filter(p => p !== null)
  const sorted = [...filtered].sort((a, b) => b.Spd - a.Spd)
  
  return sorted.map((pokemon, i) => ({
    data: pokemon,
    speed: pokemon.Spd,
    position: (i / Math.max(sorted.length - 1, 1)) * 90 + 5
  }))
})

// Calculate required EVs
const calculatedEVs = computed(() => {
  if (!leftPokemon.value || !rightPokemon.value) return '???'
  
  // TODO: Implement Pokemon Showdown speed calc formula
  return '???'
})

function onlyNumbers(event: KeyboardEvent) {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault()
  }
}

function validateEVs() {
  if (opponentEVs.value < 0) opponentEVs.value = 0
  if (opponentEVs.value > 252) opponentEVs.value = 252
}

function getSlotColor(index: number) {
  const row = Math.floor(index / 2)
  const col = index % 2
  return (row + col) % 2 === 0 ? '#E2DFDF' : '#828282'
}

// Helper to find Pokemon by display name
function findPokemonByDisplayName(displayName: string) {
  if (!displayName) return null
  
  // Exact match on Pokemon display name
  let pokemon = props.allPokemon.find(p => p.Pokemon === displayName)
  
  if (!pokemon) {
    // Case-insensitive match
    const lowerName = displayName.toLowerCase()
    pokemon = props.allPokemon.find(p => p.Pokemon.toLowerCase() === lowerName)
  }
  
  return pokemon
}

// Check if Pokemon already exists in EITHER roster
function isPokemonInRoster(pokemonName: string): boolean {
  const allRosterPokemon = [...props.leftRoster, ...props.rightRoster].filter(p => p !== null)
  return allRosterPokemon.some(p => p.Name === pokemonName)
}

function handleLeftSelection(selectedValue: string | null) {
  if (!selectedValue) return
  
  const pokemon = findPokemonByDisplayName(selectedValue)
  if (!pokemon) {
    console.warn('❌ Could not find Pokemon:', selectedValue)
    leftSearch.value = null
    leftSearchInput.value = ''
    return
  }
  
  // Check if already in roster
  if (isPokemonInRoster(pokemon.Name)) {
    alert(`${pokemon.Pokemon} is already in a roster!`)
    leftSearch.value = null
    leftSearchInput.value = ''
    return
  }
  
  emit('add-pokemon', { side: 'left', pokemonName: pokemon.Name })
  console.log('✅ Added to left:', pokemon.Pokemon, '(', pokemon.Name, ')')
  
  // Clear inputs
  leftSearch.value = null
  leftSearchInput.value = ''
}

function handleRightSelection(selectedValue: string | null) {
  if (!selectedValue) return
  
  const pokemon = findPokemonByDisplayName(selectedValue)
  if (!pokemon) {
    console.warn('❌ Could not find Pokemon:', selectedValue)
    rightSearch.value = null
    rightSearchInput.value = ''
    return
  }
  
  // Check if already in roster
  if (isPokemonInRoster(pokemon.Name)) {
    alert(`${pokemon.Pokemon} is already in a roster!`)
    rightSearch.value = null
    rightSearchInput.value = ''
    return
  }
  
  emit('add-pokemon', { side: 'right', pokemonName: pokemon.Name })
  console.log('✅ Added to right:', pokemon.Pokemon, '(', pokemon.Name, ')')
  
  // Clear inputs
  rightSearch.value = null
  rightSearchInput.value = ''
}

function selectPokemon(side: 'left' | 'right', pokemon: any | null, index: number) {
  if (!pokemon) return
  if (side === 'left') leftPokemon.value = pokemon.Name
  else rightPokemon.value = pokemon.Name
}

function selectFromGradient(side: 'left' | 'right', pokemon: any) {
  if (side === 'left') leftPokemon.value = pokemon.Name
  else rightPokemon.value = pokemon.Name
}

function swapPokemon() {
  const temp = leftPokemon.value
  leftPokemon.value = rightPokemon.value
  rightPokemon.value = temp
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

.gradient-container {
  background-color: #A99FFF;
  height: 1350px;
  border-radius: 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: 0;
}

.gradient-line {
  width: 20px;
  height: 100%;
  background: linear-gradient(180deg, #00FF11 0%, #FFFF00 50%, #FF0000 100%);
  border-radius: 0;
  margin: 0;
}

.pokemon-side {
  flex: 1;
  position: relative;
}

.left-side {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}

.right-side {
  display: flex;
  justify-content: flex-start;
  padding-left: 10px;
}

.pokemon-speed-item {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.speed-number {
  font-size: 0.85rem;
  font-weight: 600;
  color: #000000;
}

:deep(.ev-input input[type="number"]::-webkit-inner-spin-button),
:deep(.ev-input input[type="number"]::-webkit-outer-spin-button) {
  opacity: 1;
  position: relative;
  margin-left: auto;
  cursor: pointer;
}

:deep(.ev-input input[type="number"]) {
  text-align: left;
  padding-right: 4px !important;
}

.swap-image {
  width: 60px;
  height: auto;
  cursor: pointer;
  display: block;
  margin: 0 auto;
}

.swap-image:hover {
  opacity: 0.8;
}

.small-checkbox {
  font-size: 0.75rem !important;
  transform: scale(0.85);
  transform-origin: left center;
}

:deep(.small-checkbox .v-label) {
  font-size: 0.75rem !important;
}

/* Hide dropdown arrow for autocomplete (NEW) */
:deep(.v-autocomplete .v-field__append-inner .v-icon) {
  display: none;
}
</style>