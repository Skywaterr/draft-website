<template>
  <!-- ROW 4: Input -->
  <v-row class="mb-1" style="margin-top: -15px;">
    <v-col cols="4">
      <v-text-field
        v-model="search"
        placeholder="Input Pokemon"
        variant="outlined"
        density="comfortable"
        hide-details
        clearable
        rounded
        bg-color="white"
        @keyup.enter="addPokemon"
      >
        <template v-slot:append-inner>
          <v-icon>mdi-magnify</v-icon>
        </template>
      </v-text-field>
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
          :style="{ backgroundColor: getSlotColor(index) }"
        >
          <!-- Tera Type Dropdown -->
          <v-select
            v-if="pokemon"
            v-model="teraTypes[index]"
            :items="['Tera']"
            variant="outlined"
            density="compact"
            hide-details
            bg-color="white"
            class="tera-dropdown"
          ></v-select>
          
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
            :src="`https://placehold.co/60x60?text=${pokemon}`"
            width="50"
            height="50"
          ></v-img>
          <div v-if="pokemon" class="pokemon-name">{{ pokemon }}</div>
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
            <div class="type-count">0</div>
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
            <div class="type-count">0</div>
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
            <div class="type-count">0</div>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  roster: (string | null)[]
}>()

const emit = defineEmits<{
  'add-pokemon': [pokemon: string]
  'remove-pokemon': [index: number]
}>()

const search = ref('')
const teraTypes = ref<string[]>(Array(12).fill('None'))

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

function getSlotColor(index: number) {
  const row = Math.floor(index / 2)
  const col = index % 2
  return (row + col) % 2 === 0 ? '#E2DFDF' : '#828282'
}

function addPokemon() {
  if (search.value) {
    emit('add-pokemon', search.value)
    search.value = ''
  }
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

.tera-dropdown {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 80px;
  z-index: 5;
  font-size: 0.7rem;
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
}

.tera-dropdown {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 65px;
  z-index: 5;
}

:deep(.tera-dropdown .v-field__input) {
  font-size: 0.65rem !important;
  min-height: 24px !important;
  padding: 2px 4px !important;
}

:deep(.tera-dropdown .v-field) {
  font-size: 0.65rem !important;
}
</style>