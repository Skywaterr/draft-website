<template>
  <!-- ROW 4: Input + Stat vs Stat -->
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
        <v-select
          v-model="leftStat"
          :items="statOptions"
          item-title="display"
          item-value="value"
          variant="outlined"
          density="comfortable"
          hide-details
          bg-color="white"
          style="flex: 1;"
        ></v-select>
        <span class="text-h6">vs.</span>
        <v-select
          v-model="rightStat"
          :items="statOptions"
          item-title="display"
          item-value="value"
          variant="outlined"
          density="comfortable"
          hide-details
          bg-color="white"
          style="flex: 1;"
        ></v-select>
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
            <span class="speed-number">{{ pokemon.statValue }}</span>
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
            <span class="speed-number">{{ pokemon.statValue }}</span>
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
const leftSearchInput = ref('')
const rightSearchInput = ref('')
const leftStat = ref('HP')
const rightStat = ref('HP')

const statOptions = [
  { value: 'HP', display: 'HP' },
  { value: 'Atk', display: 'Attack' },
  { value: 'Def', display: 'Defense' },
  { value: 'S.At', display: 'Special Attack' },
  { value: 'S.Df', display: 'Special Defense' }
]

const statFieldMap: Record<string, string> = {
  'HP': 'HP',
  'Atk': 'Atk',
  'Def': 'Def',
  'S.At': 'S.At',
  'S.Df': 'S.Df'
}

const allPokemonNames = computed(() => props.allPokemon.map(p => p.Pokemon))

function getSlotColor(index: number) {
  const row = Math.floor(index / 2)
  const col = index % 2
  return (row + col) % 2 === 0 ? '#E2DFDF' : '#828282'
}

const sortedLeftRoster = computed(() => {
  const filtered = props.leftRoster.filter(p => p !== null)
  const field = statFieldMap[leftStat.value] as 'HP' | 'Atk' | 'Def' | 'S.At' | 'S.Df'
  
  const sorted = [...filtered].sort((a, b) => b[field] - a[field])
  
  return sorted.map((pokemon, i) => ({
    data: pokemon,
    statValue: pokemon[field],
    position: (i / Math.max(sorted.length - 1, 1)) * 90 + 5
  }))
})

const sortedRightRoster = computed(() => {
  const filtered = props.rightRoster.filter(p => p !== null)
  const field = statFieldMap[rightStat.value] as 'HP' | 'Atk' | 'Def' | 'S.At' | 'S.Df'
  
  const sorted = [...filtered].sort((a, b) => b[field] - a[field])
  
  return sorted.map((pokemon, i) => ({
    data: pokemon,
    statValue: pokemon[field],
    position: (i / Math.max(sorted.length - 1, 1)) * 90 + 5
  }))
})

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
  
  if (isPokemonInRoster(pokemon.Name)) {
    alert(`${pokemon.Pokemon} is already in a roster!`)
    leftSearch.value = null
    leftSearchInput.value = ''
    return
  }
  
  emit('add-pokemon', { side: 'left', pokemonName: pokemon.Name })
  console.log('✅ Added to left:', pokemon.Pokemon, '(', pokemon.Name, ')')
  
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
  
  if (isPokemonInRoster(pokemon.Name)) {
    alert(`${pokemon.Pokemon} is already in a roster!`)
    rightSearch.value = null
    rightSearchInput.value = ''
    return
  }
  
  emit('add-pokemon', { side: 'right', pokemonName: pokemon.Name })
  console.log('✅ Added to right:', pokemon.Pokemon, '(', pokemon.Name, ')')
  
  rightSearch.value = null
  rightSearchInput.value = ''
}

function selectPokemon(side: 'left' | 'right', pokemon: any | null, index: number) {
  if (!pokemon) return
}

function selectFromGradient(side: 'left' | 'right', pokemon: any) {
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

/* Hide dropdown arrow for autocomplete (NEW) */
:deep(.v-autocomplete .v-field__append-inner .v-icon) {
  display: none;
}
</style>