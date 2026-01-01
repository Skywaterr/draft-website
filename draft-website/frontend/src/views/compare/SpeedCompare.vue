<template>
  <!-- ROW 4: Input + Speed vs Speed -->
  <v-row class="mb-1" style="margin-top: -15px;">
    <v-col cols="4">
      <v-text-field
        v-model="leftSearch"
        placeholder="Input Pokemon"
        variant="outlined"
        density="comfortable"
        hide-details
        clearable
        rounded
        bg-color="white"
        @keyup.enter="addPokemonLeft"
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
      <v-text-field
        v-model="rightSearch"
        placeholder="Input Pokemon"
        variant="outlined"
        density="comfortable"
        hide-details
        clearable
        rounded
        bg-color="white"
        @keyup.enter="addPokemonRight"
      >
        <template v-slot:append-inner>
          <v-icon>mdi-magnify</v-icon>
        </template>
      </v-text-field>
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
  <v-row style="margin-top: -5px;">
    <v-col cols="12">
      <div class="d-flex justify-center align-center ga-2 mb-2">
        <v-select
          v-model="leftPokemon"
          :items="allLeftPokemon"
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
          :items="allRightPokemon"
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
            src="@/assets/swap-arrows.png"
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
        Your <strong>{{ leftPokemon || 'Iron Valiant' }}</strong> at 
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
</style>