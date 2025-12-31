<template>
  <!-- ROW 4: Input + Speed vs Speed -->
  <v-row class="mb-1" style="margin-top: -10px;">
    <v-col cols="4">
      <v-text-field
        v-model="leftSearch"
        placeholder="Input Pokemon"
        variant="outlined"
        density="comfortable"
        hide-details
        clearable
        @keyup.enter="addPokemonLeft"
        style="background-color: white;"
      >
        <template v-slot:append-inner>
          <v-icon>mdi-magnify</v-icon>
        </template>
      </v-text-field>
    </v-col>
    
    <v-col cols="4">
      <div class="d-flex justify-center align-center ga-4" style="width: 100%;">
        <v-text-field
          value="Speed"
          readonly
          variant="outlined"
          density="comfortable"
          hide-details
          style="flex: 1; background-color: white;"
        ></v-text-field>
        <span class="text-h6">vs.</span>
        <v-text-field
          value="Speed"
          readonly
          variant="outlined"
          density="comfortable"
          hide-details
          style="flex: 1; background-color: white;"
        ></v-text-field>
      </div>
    </v-col>
    
    <v-col cols="4">
      <v-text-field
        v-model="rightSearch"
        placeholder="Input Pokemon"
        variant="outlined"
        density="comfortable"
        hide-details
        clearable
        @keyup.enter="addPokemonRight"
        style="background-color: white;"
      >
        <template v-slot:append-inner>
          <v-icon>mdi-magnify</v-icon>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
  
  <!-- ROW 5+: Grids + Gradient -->
  <v-row style="margin-top: -8px;">
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
            :src="`https://placehold.co/60x60?text=${pokemon}`"
            width="50"
            height="50"
          ></v-img>
          <div v-if="pokemon" class="pokemon-name">{{ pokemon }}</div>
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
            @click="selectFromGradient('left', pokemon.name)"
          >
            <v-img 
              :src="`https://placehold.co/40x40?text=${pokemon.name}`"
              width="40"
              height="40"
            ></v-img>
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
            @click="selectFromGradient('right', pokemon.name)"
          >
            <span class="speed-number">{{ pokemon.speed }}</span>
            <v-img 
              :src="`https://placehold.co/40x40?text=${pokemon.name}`"
              width="40"
              height="40"
            ></v-img>
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
            :src="`https://placehold.co/60x60?text=${pokemon}`"
            width="50"
            height="50"
          ></v-img>
          <div v-if="pokemon" class="pokemon-name">{{ pokemon }}</div>
        </div>
      </div>
    </v-col>
  </v-row>
  
  <!-- Calculator -->
  <v-row class="mt-8">
    <v-col cols="12">
      <div class="d-flex justify-center align-center ga-2 mb-2">
        <v-select
          v-model="leftPokemon"
          :items="allLeftPokemon"
          placeholder="Select Pokemon"
          variant="outlined"
          density="compact"
          hide-details
          style="max-width: 200px; background-color: white;"
        ></v-select>
        
        <span class="text-h6">wants to outspeed</span>
        
        <v-select
          v-model="rightPokemon"
          :items="allRightPokemon"
          placeholder="Select Pokemon"
          variant="outlined"
          density="compact"
          hide-details
          style="max-width: 200px; background-color: white;"
        ></v-select>
      </div>
      
      <!-- Swap button -->
      <div class="text-center mb-1">
        <v-btn icon variant="text" size="large" @click="swapPokemon">
          <v-icon size="x-large">mdi-swap-horizontal</v-icon>
        </v-btn>
      </div>
      
      <!-- Checkbox -->
      <div class="d-flex justify-center mb-4">
        <div style="width: 640px; display: flex; justify-content: flex-end; padding-right: 220px;">
          <v-checkbox
            v-model="speedBoostingNature"
            label="Speed boosting nature?"
            hide-details
            density="compact"
          ></v-checkbox>
        </div>
      </div>
      
      <!-- Result message (NATIVE SPINNERS) -->
      <p class="text-body-1 text-center">
        In order to always outspeed a <strong>{{ rightPokemon || 'Lycanroc-Dusk' }}</strong> 
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
          style="display: inline-block; width: 80px; vertical-align: middle; background-color: white; text-decoration: underline;"
        ></v-text-field>{{ speedBoostingNature ? '+' : '' }}
        Speed EVs at 
        <v-select
          v-model="opponentStage"
          :items="speedStages"
          variant="outlined"
          density="compact"
          hide-details
          style="display: inline-block; width: 85px; vertical-align: middle; background-color: white;"
        ></v-select>
        speed,<br>
        Your <strong>{{ leftPokemon || 'Iron Valiant' }}</strong> at 
        <v-select
          v-model="yourStage"
          :items="speedStages"
          variant="outlined"
          density="compact"
          hide-details
          style="display: inline-block; width: 85px; vertical-align: middle; background-color: white;"
        ></v-select>
        speed needs to have <strong>{{ calculatedEVs }}+</strong> speed EVs!
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
  leftRoster: (string | null)[]
  rightRoster: (string | null)[]
}>()

const emit = defineEmits<{
  'add-pokemon': [{ side: 'left' | 'right', pokemon: string }]
  'remove-pokemon': [{ side: 'left' | 'right', index: number }]
}>()

const leftSearch = ref('')
const rightSearch = ref('')
const leftPokemon = ref('')
const rightPokemon = ref('')
const opponentEVs = ref(252)
const opponentStage = ref('+0')
const yourStage = ref('+0')
const speedBoostingNature = ref(false)
const calculatedEVs = ref(208)

const speedStages = ['-6', '-5', '-4', '-3', '-2', '-1', '+0', '+1', '+2', '+3', '+4', '+5', '+6']

// Only allow numbers (no letters/characters)
function onlyNumbers(event: KeyboardEvent) {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault()
  }
}

// Validate EVs to be 0-252 only
function validateEVs() {
  if (opponentEVs.value < 0) opponentEVs.value = 0
  if (opponentEVs.value > 252) opponentEVs.value = 252
}

function getSlotColor(index: number) {
  const row = Math.floor(index / 2)
  const col = index % 2
  return (row + col) % 2 === 0 ? '#E2DFDF' : '#828282'
}

const allLeftPokemon = computed(() => props.leftRoster.filter(p => p !== null) as string[])
const allRightPokemon = computed(() => props.rightRoster.filter(p => p !== null) as string[])

const sortedLeftRoster = computed(() => {
  return allLeftPokemon.value.map((name, i) => ({
    name,
    speed: 150 - i * 10,
    position: (i / Math.max(allLeftPokemon.value.length - 1, 1)) * 90 + 5
  }))
})

const sortedRightRoster = computed(() => {
  return allRightPokemon.value.map((name, i) => ({
    name,
    speed: 145 - i * 10,
    position: (i / Math.max(allRightPokemon.value.length - 1, 1)) * 90 + 5
  }))
})

function addPokemonLeft() {
  if (leftSearch.value) {
    emit('add-pokemon', { side: 'left', pokemon: leftSearch.value })
    leftSearch.value = ''
  }
}

function addPokemonRight() {
  if (rightSearch.value) {
    emit('add-pokemon', { side: 'right', pokemon: rightSearch.value })
    rightSearch.value = ''
  }
}

function selectPokemon(side: 'left' | 'right', pokemon: string | null, index: number) {
  if (!pokemon) return
  if (side === 'left') leftPokemon.value = pokemon
  else rightPokemon.value = pokemon
}

function selectFromGradient(side: 'left' | 'right', pokemon: string) {
  if (side === 'left') leftPokemon.value = pokemon
  else rightPokemon.value = pokemon
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
  height: 1320px;
}

.roster-slot {
  height: 220px;
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
  height: 1320px;
  border-radius: 8px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: 1px 0;
}

.gradient-line {
  width: 20px;
  height: calc(100% - 2px);
  background: linear-gradient(180deg, #00FF11 0%, #FFFF00 50%, #FF0000 100%);
  border-radius: 2px;
  margin: auto 0;
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
</style>