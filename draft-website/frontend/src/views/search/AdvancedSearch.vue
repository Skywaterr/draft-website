<template>
  <v-card 
    elevation="0" 
    class="pa-8 position-relative"
    style="background-color: #ADB0FF; border-radius: 12px;"
  >
    <!-- GIGA ADVANCED Button - Top Right Corner -->
    <v-btn
      style="background-color: #909000; color: #000000; position: absolute; top: -20px; right: -54px; font-size: 20px; text-transform: none !important;"
      variant="flat"
      size="large"
      @click="$emit('switch-to-giga')"
    >
      GIGA ADVANCED
    </v-btn>

    <h1 class="text-h3 text-center mb-4" style="color: #000000;">Advanced Search</h1>
    
    <div class="text-center mb-8">
      <v-btn
        style="background-color: #FFFCAD; color: #000000; text-transform: none !important;"
        variant="flat"
        @click="$emit('switch-to-simple')"
      >
        Go back to Simple Search!
      </v-btn>
    </div>

    <v-row>
      <!-- Draft Price -->
      <v-col cols="12" md="6">
        <fieldset class="filter-section pa-4">
          <legend class="text-h6 px-2">Draft Price</legend>
          
          <!-- Price Range Option -->
          <div class="mb-4">
            <v-radio-group v-model="priceFilterType" hide-details>
              <v-radio value="range">
                <template v-slot:label>
                  <div class="d-flex align-items-center ga-2 flex-wrap">
                    <span>Costs between</span>
                    <v-text-field
                      v-model.number="draftPriceMin"
                      placeholder="Number"
                      variant="outlined"
                      density="compact"
                      hide-details
                      bg-color="white"
                      type="number"
                      :min="1"
                      :max="26"
                      style="max-width: 80px;"
                    ></v-text-field>
                    <span>and</span>
                    <v-text-field
                      v-model.number="draftPriceMax"
                      placeholder="Number"
                      variant="outlined"
                      density="compact"
                      hide-details
                      bg-color="white"
                      type="number"
                      :min="1"
                      :max="26"
                      style="max-width: 80px;"
                    ></v-text-field>
                    <span>points.</span>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
            
            <!-- Validation Message for Draft Price -->
            <div v-if="draftPriceError" class="text-caption mt-1" style="color: #ff0000; margin-left: 40px;">
              {{ draftPriceError }}
            </div>
            
            <v-range-slider
              v-model="draftPriceRange"
              :min="1"
              :max="26"
              :step="1"
              strict
              show-ticks="always"
              tick-size="4"
              thumb-label
              color="#133AFF"
              track-color="rgba(0,0,0,0.2)"
              thumb-color="white"
              class="mt-4"
            >
              <template v-slot:prepend>
                <div class="text-caption" style="color: #000000;">1</div>
              </template>
              <template v-slot:append>
                <div class="text-caption" style="color: #000000;">26</div>
              </template>
            </v-range-slider>
          </div>

          <v-divider class="my-2 aligned-divider" color="rgba(0,0,0,0.3)"></v-divider>

          <!-- Tier Selection Option -->
          <div>
            <v-radio-group v-model="priceFilterType" hide-details>
              <v-radio value="tier">
                <template v-slot:label>
                  <span>Pokemon is a part of</span>
                </template>
              </v-radio>
            </v-radio-group>
            
            <div class="d-flex flex-wrap ga-3 mt-1 justify-center">
              <div v-for="tier in tierGroups" :key="tier" class="d-flex align-items-center">
                <v-checkbox
                  v-model="filters.draftTiers"
                  :value="tier"
                  hide-details
                  density="compact"
                  color="#000000"
                  @update:model-value="autoSelectTierRadio"
                >
                  <template v-slot:label>
                    <span style="color: #000000;">{{ tier }}</span>
                  </template>
                </v-checkbox>
              </div>
            </div>
          </div>

          <div class="d-flex justify-center mt-4 reset-button-container">
            <v-btn
              style="background-color: #D9D9D9; color: #000000;"
              class="reset-point-btn"
              size="small"
              variant="flat"
              @click="resetDraftPrice"
            >
              Reset Point settings
            </v-btn>
          </div>
        </fieldset>
      </v-col>

      <!-- Tera Captain Price -->
      <v-col cols="12" md="6">
        <fieldset class="filter-section pa-4">
          <legend class="text-h6 px-2">Tera Captain Price</legend>
          
          <!-- Price Range Option -->
          <div class="mb-4">
            <v-radio-group v-model="teraFilterType" hide-details>
              <v-radio value="range">
                <template v-slot:label>
                  <div class="d-flex align-items-center ga-2 flex-wrap">
                    <span>Costs between</span>
                    <v-text-field
                      v-model.number="teraPriceMin"
                      placeholder="Number"
                      variant="outlined"
                      density="compact"
                      hide-details
                      bg-color="white"
                      type="number"
                      :min="1"
                      :max="20"
                      style="max-width: 80px;"
                    ></v-text-field>
                    <span>and</span>
                    <v-text-field
                      v-model.number="teraPriceMax"
                      placeholder="Number"
                      variant="outlined"
                      density="compact"
                      hide-details
                      bg-color="white"
                      type="number"
                      :min="1"
                      :max="20"
                      style="max-width: 80px;"
                    ></v-text-field>
                    <span>tera points.</span>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
            
            <!-- Validation Message for Tera Price -->
            <div v-if="teraPriceError" class="text-caption mt-1" style="color: #ff0000; margin-left: 40px;">
              {{ teraPriceError }}
            </div>

            <v-range-slider
              v-model="teraPriceRange"
              :min="1"
              :max="20"
              :step="1"
              strict
              show-ticks="always"
              tick-size="4"
              thumb-label
              color="#133AFF"
              track-color="rgba(0,0,0,0.2)"
              thumb-color="white"
              class="mt-4"
            >
              <template v-slot:prepend>
                <div class="text-caption" style="color: #000000;">1</div>
              </template>
              <template v-slot:append>
                <div class="text-caption" style="color: #000000;">20</div>
              </template>
            </v-range-slider>
          </div>

          <v-divider class="my-4 aligned-divider" color="rgba(0,0,0,0.3)"></v-divider>

          <!-- Tera Types Count Option -->
          <div>
            <v-radio-group v-model="teraFilterType" hide-details>
              <v-radio value="types">
                <template v-slot:label>
                  <span>{{ teraTypesLabel }}</span>
                </template>
              </v-radio>
            </v-radio-group>
            
            <div class="d-flex justify-center mt-1 tera-type-checkboxes">
              <div v-for="num in [1, 2, 3, 4]" :key="num" class="d-flex align-items-center">
                <v-checkbox
                  v-model="filters.teraTypeCount"
                  :value="num"
                  hide-details
                  density="compact"
                  color="#000000"
                  @update:model-value="autoSelectTeraRadio"
                >
                  <template v-slot:label>
                    <span style="color: #000000;">{{ num }}</span>
                  </template>
                </v-checkbox>
              </div>
            </div>
          </div>

          <div class="d-flex justify-center mt-4 reset-button-container">
            <v-btn
              style="background-color: #D9D9D9; color: #000000;"
              class="reset-point-btn"
              size="small"
              variant="flat"
              @click="resetTeraPrice"
            >
              Reset Point settings
            </v-btn>
          </div>
        </fieldset>
      </v-col>

<!-- Base Stats Section -->
      <v-col cols="12">
        <fieldset class="filter-section pa-4">
          <legend class="text-h6 px-2">Base Stats</legend>
          
          <v-row>
            <!-- Left Column: Individual Stats -->
            <v-col cols="12" md="6">
              <div 
                v-for="stat in stats" 
                :key="stat.id"
                class="d-flex align-items-center ga-2 mb-3"
              >
                <v-checkbox 
                  v-model="stat.enabled" 
                  hide-details 
                  density="compact"
                  color="#000000"
                ></v-checkbox>
                <span style="min-width: 110px; color: #000000;">{{ stat.label }} is</span>
                <v-select
                  v-model="stat.operator"
                  :items="operators"
                  variant="outlined"
                  density="compact"
                  hide-details
                  bg-color="white"
                  class="operator-select"
                  @update:model-value="autoEnableStatCheckbox(stat)"
                ></v-select>
                <v-text-field
                  v-model="stat.value"
                  placeholder="Number Here"
                  variant="outlined"
                  density="compact"
                  hide-details
                  bg-color="white"
                  type="number"
                  class="number-input"
                  @input="autoEnableStatCheckbox(stat); validateNumberInput($event)"
                ></v-text-field>
              </div>
            </v-col>

            <!-- Right Column: BST -->
            <v-col cols="12" md="6" class="d-flex flex-column justify-center">
              <div class="d-flex align-items-center ga-2 mb-3">
                <v-checkbox
                  v-model="filters.bstEnabled" 
                  hide-details 
                  density="compact"
                  color="#000000"
                ></v-checkbox>
                <span style="color: #000000; white-space: nowrap;">Base Stat Total (BST) is</span>
                <v-select
                  v-model="filters.bstOperator"
                  :items="operators"
                  variant="outlined"
                  density="compact"
                  hide-details
                  bg-color="white"
                  class="operator-select"
                  @update:model-value="autoEnableBSTCheckbox"
                ></v-select>
                <v-text-field
                  v-model="filters.bstValue"
                  placeholder="Number Here"
                  variant="outlined"
                  density="compact"
                  hide-details
                  bg-color="white"
                  type="number"
                  class="number-input"
                  @input="autoEnableBSTCheckbox(); validateNumberInput($event)"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
        </fieldset>
      </v-col>

      <!-- Abilities Section -->
      <v-col cols="12">
        <fieldset class="filter-section pa-4">
          <legend class="text-h6 px-2">Abilities</legend>
          <div class="d-flex align-items-center ga-2">
            <v-checkbox 
              v-model="filters.abilityEnabled" 
              hide-details 
              density="compact"
              color="#000000"
            ></v-checkbox>
            <v-autocomplete
              v-model="filters.abilityName"
              :items="abilityNames"
              placeholder="Search by Ability Name"
              variant="outlined"
              density="compact"
              hide-details
              bg-color="white"
              :clearable="!!filters.abilityName"
              style="max-width: 400px;"
              @update:model-value="autoEnableAbilityCheckbox"
            ></v-autocomplete>
          </div>
        </fieldset>
      </v-col>

      <!-- Learned Moves Section -->
      <v-col cols="12">
        <fieldset class="filter-section pa-4">
          <legend class="text-h6 px-2">Learned Moves</legend>
          
          <!-- Move Name Search (2x3 grid) -->
          <div class="mb-4">
            <v-row>
              <v-col 
                v-for="(move, index) in filters.moves" 
                :key="index"
                cols="12" 
                sm="6" 
                md="4"
              >
                <div class="d-flex align-items-center ga-2">
                  <v-checkbox 
                    v-model="move.enabled" 
                    hide-details 
                    density="compact"
                    color="#000000"
                  ></v-checkbox>
                  <v-autocomplete
                    v-model="move.name"
                    :items="moveNames"
                    placeholder="Move Name"
                    variant="outlined"
                    density="compact"
                    hide-details
                    bg-color="white"
                    :clearable="!!move.name"
                    @update:model-value="autoEnableMoveCheckbox(index)"
                  ></v-autocomplete>
                </div>
              </v-col>
            </v-row>
          </div>

          <v-divider class="my-2" color="rgba(0,0,0,0.3)"></v-divider>

          <!-- Learns an attacking move that is... -->
          <div>
            <div class="text-h6 mb-3 px-2" style="color: #000000;">Learns an attacking move that is...</div>
            
            <div class="d-flex flex-column ga-3">
              <!-- Type -->
              <div class="d-flex align-items-center ga-2">
                <v-checkbox 
                  v-model="filters.moveType.enabled" 
                  hide-details 
                  density="compact"
                  color="#000000"
                ></v-checkbox>
                <span style="min-width: 140px; color: #000000;">Type:</span>
                <v-select
                  v-model="filters.moveType.value"
                  :items="pokemonTypes"
                  variant="outlined"
                  density="compact"
                  hide-details
                  bg-color="white"
                  :clearable="!!filters.moveType.value"
                  placeholder="--"
                  style="max-width: 150px;"
                  @update:model-value="autoEnableMoveTypeCheckbox"
                ></v-select>
              </div>

              <!-- Physical/Special -->
              <div class="d-flex align-items-center ga-2">
                <v-checkbox 
                  v-model="filters.moveCategory.enabled" 
                  hide-details 
                  density="compact"
                  color="#000000"
                ></v-checkbox>
                <span style="min-width: 140px; color: #000000;">Physical/Special:</span>
                <v-select
                  v-model="filters.moveCategory.value"
                  :items="['Physical', 'Special']"
                  variant="outlined"
                  density="compact"
                  hide-details
                  bg-color="white"
                  :clearable="!!filters.moveCategory.value"
                  placeholder="--"
                  style="max-width: 150px;"
                  @update:model-value="autoEnableMoveCategoryCheckbox"
                ></v-select>
              </div>

              <!-- Base power between -->
              <div class="d-flex align-items-center ga-2 flex-wrap">
                <v-checkbox 
                  v-model="filters.movePower.enabled" 
                  hide-details 
                  density="compact"
                  color="#000000"
                ></v-checkbox>
                <span style="min-width: 140px; color: #000000;">Base power between</span>
                <v-text-field
                  v-model="filters.movePower.min"
                  placeholder="Number Here"
                  variant="outlined"
                  density="compact"
                  hide-details
                  bg-color="white"
                  type="number"
                  class="number-input"
                  @input="autoEnableMovePowerCheckbox(); validateNumberInput($event)"
                ></v-text-field>
                <span style="color: #000000;">and</span>
                <v-text-field
                  v-model="filters.movePower.max"
                  placeholder="Number Here"
                  variant="outlined"
                  density="compact"
                  hide-details
                  bg-color="white"
                  type="number"
                  class="number-input"
                  @input="autoEnableMovePowerCheckbox(); validateNumberInput($event)"
                ></v-text-field>
              </div>

              <!-- Accuracy -->
              <div class="d-flex align-items-center ga-2">
                <v-checkbox 
                  v-model="filters.moveAccuracy.enabled" 
                  hide-details 
                  density="compact"
                  color="#000000"
                ></v-checkbox>
                <span style="min-width: 140px; color: #000000;">Accuracy</span>
                <v-select
                  v-model="filters.moveAccuracy.operator"
                  :items="operators"
                  variant="outlined"
                  density="compact"
                  hide-details
                  bg-color="white"
                  class="operator-select"
                  @update:model-value="autoEnableMoveAccuracyCheckbox"
                ></v-select>
                <v-text-field
                  v-model="filters.moveAccuracy.value"
                  placeholder="Number Here"
                  variant="outlined"
                  density="compact"
                  hide-details
                  bg-color="white"
                  type="number"
                  class="number-input"
                  @input="autoEnableMoveAccuracyCheckbox(); validateNumberInput($event)"
                ></v-text-field>
              </div>
            </div>
          </div>
        </fieldset>
      </v-col>

      <!-- Types Section -->
      <v-col cols="12">
        <fieldset class="filter-section pa-4">
          <legend class="text-h6 px-2">Types</legend>
          
          <div class="d-flex flex-column ga-3">
            <!-- Exactly These / Any of These -->
            <div class="d-flex align-items-center ga-2 flex-wrap">
              <v-checkbox 
                v-model="filters.typeFilters.exactlyThese.enabled" 
                hide-details 
                density="compact"
                color="#000000"
                style="flex: 0 0 auto;"
              ></v-checkbox>
              <v-select
                v-model="filters.typeFilters.exactlyThese.mode"
                :items="['Exactly These', 'Any of These']"
                variant="outlined"
                density="compact"
                hide-details
                bg-color="#AFFFA5"
                class="type-label-select"
                @update:model-value="autoEnableTypeCheckbox('exactlyThese')"
              ></v-select>
              <v-select
                v-for="i in 4"
                :key="`exact-${i}`"
                v-model="filters.typeFilters.exactlyThese.types[i-1]"
                :items="pokemonTypes"
                variant="outlined"
                density="compact"
                hide-details
                bg-color="white"
                placeholder="--"
                :clearable="!!filters.typeFilters.exactlyThese.types[i-1]"
                class="type-dropdown"
                @update:model-value="autoEnableTypeCheckbox('exactlyThese')"
              ></v-select>
            </div>

            <!-- Resists -->
            <div class="d-flex align-items-center ga-2 flex-wrap">
              <v-checkbox 
                v-model="filters.typeFilters.resists.enabled" 
                hide-details 
                density="compact"
                color="#000000"
                style="flex: 0 0 auto;"
              ></v-checkbox>
              <v-chip 
                style="background-color: #AFFFA5; color: #000000;" 
                size="small"
                class="type-label-chip"
              >
                Resists
              </v-chip>
              <v-select
                v-for="i in 4"
                :key="`resist-${i}`"
                v-model="filters.typeFilters.resists.types[i-1]"
                :items="pokemonTypes"
                variant="outlined"
                density="compact"
                hide-details
                bg-color="white"
                placeholder="--"
                :clearable="!!filters.typeFilters.resists.types[i-1]"
                class="type-dropdown"
                @update:model-value="autoEnableTypeCheckbox('resists')"
              ></v-select>
            </div>

            <!-- Immune To -->
            <div class="d-flex align-items-center ga-2 flex-wrap">
              <v-checkbox 
                v-model="filters.typeFilters.immuneTo.enabled" 
                hide-details 
                density="compact"
                color="#000000"
                style="flex: 0 0 auto;"
              ></v-checkbox>
              <v-chip 
                style="background-color: #AFFFA5; color: #000000;" 
                size="small"
                class="type-label-chip"
              >
                Immune To
              </v-chip>
              <v-autocomplete
                v-model="filters.typeFilters.immuneTo.searchType"
                :items="pokemonTypes"
                variant="outlined"
                density="compact"
                hide-details
                bg-color="white"
                placeholder="Type to search"
                :clearable="!!filters.typeFilters.immuneTo.searchType"
                class="type-dropdown-search"
                @update:model-value="autoEnableTypeCheckbox('immuneTo')"
              ></v-autocomplete>
              <v-select
                v-for="i in 2"
                :key="`immune-${i}`"
                v-model="filters.typeFilters.immuneTo.types[i-1]"
                :items="pokemonTypes"
                variant="outlined"
                density="compact"
                hide-details
                bg-color="white"
                placeholder="--"
                :clearable="!!filters.typeFilters.immuneTo.types[i-1]"
                class="type-dropdown"
                @update:model-value="autoEnableTypeCheckbox('immuneTo')"
              ></v-select>
            </div>

            <!-- NOT These -->
            <div class="d-flex align-items-center ga-2 flex-wrap">
              <v-checkbox 
                v-model="filters.typeFilters.notThese.enabled" 
                hide-details 
                density="compact"
                color="#000000"
                style="flex: 0 0 auto;"
              ></v-checkbox>
              <v-chip 
                style="background-color: #FFBFBF; color: #000000;" 
                size="small"
                class="type-label-chip"
              >
                NOT These
              </v-chip>
              <v-select
                v-for="i in 4"
                :key="`not-${i}`"
                v-model="filters.typeFilters.notThese.types[i-1]"
                :items="pokemonTypes"
                variant="outlined"
                density="compact"
                hide-details
                bg-color="white"
                placeholder="--"
                :clearable="!!filters.typeFilters.notThese.types[i-1]"
                class="type-dropdown"
                @update:model-value="autoEnableTypeCheckbox('notThese')"
              ></v-select>
            </div>
          </div>
        </fieldset>
      </v-col>

      <!-- Sort By -->
      <v-col cols="12">
        <div class="text-center d-flex align-items-center justify-center ga-4">
          <span class="text-h6" style="color: #000000;">Sort By:</span>
          <v-select
            v-model="sortBy"
            :items="sortOptions"
            variant="outlined"
            density="compact"
            hide-details
            bg-color="white"
            style="max-width: 200px;"
          ></v-select>
        </div>
      </v-col>

      <!-- Action Buttons -->
      <v-col cols="12">
        <div class="d-flex justify-center ga-4">
          <v-btn
            style="background-color: #93DAF3; color: #000000; text-transform: none !important;"
            size="x-large"
            variant="flat"
            @click="performSearch"
          >
            Search!
          </v-btn>
          <v-btn
            style="background-color: #D9D9D9; color: #000000; text-transform: none !important;"
            size="x-large"
            variant="flat"
            @click="resetAllFilters"
          >
            Reset!
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

defineEmits<{
  'switch-to-simple': []
  'switch-to-giga': []
}>()

const pokemonTypes = [
  'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice',
  'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
  'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
]

const tierGroups = ['S-tier', 'A-tier', 'B-tier', 'C-tier', 'D-tier', 'E-tier']

const operators = [
  'At Least (≥)',
  'More Than (>)',
  'Exactly (=)',
  'Less Than (<)',
  'At Most (≤)'
]

const sortOptions = [
  'Pokedex Number',
  'Point Value',
  'Tier',
  'Tera Point Value',
  'Base Speed',
  'Base Stat Total'
]

// TODO: Fetch from backend
const abilityNames = ref<string[]>([
  'Adaptability', 'Aerilate', 'Aftermath', 'Air Lock', 'Analytic',
  // Add more abilities which will come from backend ;-;
])

// TODO: Fetch from backend
const moveNames = ref<string[]>([
  'Thunderbolt', 'Ice Beam', 'Flamethrower', 'Surf', 'Earthquake',
  // Add more abilities which will come from backend ;-;
])

const priceFilterType = ref<'range' | 'tier'>('range')
const teraFilterType = ref<'range' | 'types'>('range')

const draftPriceMin = ref<number>(1)
const draftPriceMax = ref<number>(26)
const draftPriceRange = ref([1, 26])

const teraPriceMin = ref<number>(1)
const teraPriceMax = ref<number>(20)
const teraPriceRange = ref([1, 20])

const sortBy = ref('Pokedex Number')

const filters = ref({
  draftTiers: [] as string[],
  
  teraTypeCount: [] as number[],
  
  bstEnabled: false,
  bstOperator: 'At Least (≥)',
  bstValue: '',
  
  abilityEnabled: false,
  abilityName: '',
  
  moves: [
    { enabled: false, name: '' },
    { enabled: false, name: '' },
    { enabled: false, name: '' },
    { enabled: false, name: '' },
    { enabled: false, name: '' },
    { enabled: false, name: '' },
  ],
  
  moveType: { enabled: false, value: '' },
  moveCategory: { enabled: false, value: '' },
  movePower: { enabled: false, min: '', max: '' },
  moveAccuracy: { enabled: false, operator: 'At Least (≥)', value: '' },
  
  typeFilters: {
    exactlyThese: {
      enabled: false,
      mode: 'Exactly These',
      types: ['', '', '', '']
    },
    resists: {
      enabled: false,
      types: ['', '', '', '']
    },
    immuneTo: {
      enabled: false,
      searchType: '',
      types: ['', '']
    },
    notThese: {
      enabled: false,
      types: ['', '', '', '']
    }
  }
})

const stats = ref([
  { id: 'hp', label: 'HP', enabled: false, operator: 'At Least (≥)', value: '' },
  { id: 'attack', label: 'Attack', enabled: false, operator: 'At Least (≥)', value: '' },
  { id: 'defense', label: 'Defense', enabled: false, operator: 'At Least (≥)', value: '' },
  { id: 'spattack', label: 'Sp. Attack', enabled: false, operator: 'At Least (≥)', value: '' },
  { id: 'spdefense', label: 'Sp. Defense', enabled: false, operator: 'At Least (≥)', value: '' },
  { id: 'speed', label: 'Speed', enabled: false, operator: 'At Least (≥)', value: '' },
])

const draftPriceError = computed(() => {
  if (draftPriceMin.value < 1 || draftPriceMin.value > 26) {
    return 'Draft price must be between 1 and 26 points.'
  }
  if (draftPriceMax.value < 1 || draftPriceMax.value > 26) {
    return 'Draft price must be between 1 and 26 points.'
  }
  if (draftPriceMin.value !== '' && draftPriceMax.value !== '' && draftPriceMin.value > draftPriceMax.value) {
    return 'Minimum price cannot be greater than maximum price.'
  }
  return ''
})

const teraPriceError = computed(() => {
  if (teraPriceMin.value < 1 || teraPriceMin.value > 20) {
    return 'Tera price must be between 1 and 20 points.'
  }
  if (teraPriceMax.value < 1 || teraPriceMax.value > 20) {
    return 'Tera price must be between 1 and 20 points.'
  }
  if (teraPriceMin.value > teraPriceMax.value) {
    return 'Minimum tera price cannot be greater than maximum tera price.'
  }
  return ''
})

// Dynamic label for tera types
const teraTypesLabel = computed(() => {
  const count = filters.value.teraTypeCount.length
  if (count === 0) {
    return 'Pokemon can terastalize into _ types'
  } else {
    const sortedTypes = [...filters.value.teraTypeCount].sort((a, b) => a - b)
    const typeStr = sortedTypes.join(', ')
    return `Pokemon can terastalize into ${typeStr} types`
  }
})

const validateNumberInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  input.value = input.value.replace(/[^0-9]/g, '')
}

const autoSelectTierRadio = () => {
  if (filters.value.draftTiers.length > 0) {
    priceFilterType.value = 'tier'
  }
}

const autoSelectTeraRadio = () => {
  if (filters.value.teraTypeCount.length > 0) {
    teraFilterType.value = 'types'
  }
}

const autoEnableStatCheckbox = (stat: any) => {
  if (stat.value) {
    stat.enabled = true
  } else if (!stat.value && stat.operator === 'At Least (≥)') {
    stat.enabled = false
  }
}

const autoEnableBSTCheckbox = () => {
  if (filters.value.bstValue) {
    filters.value.bstEnabled = true
  } else if (!filters.value.bstValue && filters.value.bstOperator === 'At Least (≥)') {
    filters.value.bstEnabled = false
  }
}

const autoEnableAbilityCheckbox = () => {
  if (filters.value.abilityName) {
    filters.value.abilityEnabled = true
  } else {
    filters.value.abilityEnabled = false
  }
}

const autoEnableMoveCheckbox = (index: number) => {
  if (filters.value.moves[index].name) {
    filters.value.moves[index].enabled = true
  } else {
    filters.value.moves[index].enabled = false
  }
}

const autoEnableMoveTypeCheckbox = () => {
  if (filters.value.moveType.value) {
    filters.value.moveType.enabled = true
  } else {
    filters.value.moveType.enabled = false
  }
}

const autoEnableMoveCategoryCheckbox = () => {
  if (filters.value.moveCategory.value) {
    filters.value.moveCategory.enabled = true
  } else {
    filters.value.moveCategory.enabled = false
  }
}

const autoEnableMovePowerCheckbox = () => {
  if (filters.value.movePower.min || filters.value.movePower.max) {
    filters.value.movePower.enabled = true
  } else if (!filters.value.movePower.min && !filters.value.movePower.max) {
    filters.value.movePower.enabled = false
  }
}

const autoEnableMoveAccuracyCheckbox = () => {
  if (filters.value.moveAccuracy.value) {
    filters.value.moveAccuracy.enabled = true
  } else if (!filters.value.moveAccuracy.value && filters.value.moveAccuracy.operator === 'At Least (≥)') {
    filters.value.moveAccuracy.enabled = false
  }
}

const autoEnableTypeCheckbox = (filterName: string) => {
  const filter = filters.value.typeFilters[filterName as keyof typeof filters.value.typeFilters]

  let hasValue = false

  if ('types' in filter) {
    hasValue = filter.types.some((t: string) => t !== '')
  }
  if ('searchType' in filter && filter.searchType) {
    hasValue = true
  }
  filter.enabled = hasValue
}

// Watch draft price inputs and sync with slider (COOL, RIGHT?)
watch(draftPriceMin, (newVal) => {
  if (newVal >= 1 && newVal <= 26) {
    if (newVal <= draftPriceMax.value) {
      draftPriceRange.value = [newVal, draftPriceRange.value[1]]
    }
  }
})

watch(draftPriceMax, (newVal) => {
  if (newVal >= 1 && newVal <= 26) {
    if (newVal >= draftPriceMin.value) {
      draftPriceRange.value = [draftPriceRange.value[0], newVal]
    }
  }
})

// Watch draft price slider and sync with inputs (COOL, RIGHT?)
watch(draftPriceRange, (newVal) => {
  draftPriceMin.value = newVal[0]
  draftPriceMax.value = newVal[1]
})

// Watch tera price inputs and sync with slider (COOL, RIGHT?)
watch(teraPriceMin, (newVal) => {
  if (newVal >= 1 && newVal <= 20) {
    if (newVal <= teraPriceMax.value) {
      teraPriceRange.value = [newVal, teraPriceRange.value[1]]
    }
  }
})

watch(teraPriceMax, (newVal) => {
  if (newVal >= 1 && newVal <= 20) {
    if (newVal >= teraPriceMin.value) {
      teraPriceRange.value = [teraPriceRange.value[0], newVal]
    }
  }
})

// Watch tera price slider and sync with inputs (COOL, RIGHT?)
watch(teraPriceRange, (newVal) => {
  teraPriceMin.value = newVal[0]
  teraPriceMax.value = newVal[1]
})

// Map UI operators to backend operators :)
const operatorMap: Record<string, string> = {
  'At Least (≥)': 'gte',
  'More Than (>)': 'gt',
  'Exactly (=)': 'eq',
  'At Most (≤)': 'lte',
  'Less Than (<)': 'lt',
}

// Map UI stat names to backend field names :(
const statFieldMap: Record<string, string> = {
  'hp': 'hp',
  'attack': 'atk',
  'defense': 'def',
  'spattack': 's.at',
  'spdefense': 's.df',
  'speed': 'spd',
}

const performSearch = () => {
  const params = new URLSearchParams()

  // Build query from enabled stat filters yay yay
  stats.value.forEach(stat => {
    if (stat.enabled && stat.value) {
      const backendField = statFieldMap[stat.id]
      const backendOp = operatorMap[stat.operator]
      params.append(`${backendField}[${backendOp}]`, stat.value)
    }
  })

  if (filters.value.bstEnabled && filters.value.bstValue) {
    const backendOp = operatorMap[filters.value.bstOperator]
    params.append(`bst[${backendOp}]`, filters.value.bstValue)
  }

  if (filters.value.abilityEnabled && filters.value.abilityName) {
    params.append('ability', filters.value.abilityName)
  }

  // TODO: Add other filters (moves, types, price, etc.) when backend is booted
  
  // Navigate to results with query params
  router.push(`/search/results?${params.toString()}`)
}

const resetDraftPrice = () => {
  draftPriceMin.value = 1
  draftPriceMax.value = 26
  filters.value.draftTiers = []
  draftPriceRange.value = [1, 26]
  priceFilterType.value = 'range'
}

const resetTeraPrice = () => {
  teraPriceMin.value = 1
  teraPriceMax.value = 20
  filters.value.teraTypeCount = []
  teraPriceRange.value = [1, 20]
  teraFilterType.value = 'range'
}

const resetAllFilters = () => {
  // Reset all stats OBV
  stats.value.forEach(stat => {
    stat.enabled = false
    stat.operator = 'At Least (≥)'
    stat.value = ''
  })

  filters.value.bstEnabled = false
  filters.value.bstOperator = 'At Least (≥)'
  filters.value.bstValue = ''

  filters.value.abilityEnabled = false
  filters.value.abilityName = ''

  filters.value.moves.forEach(move => {
    move.enabled = false
    move.name = ''
  })
  filters.value.moveType = { enabled: false, value: '' }
  filters.value.moveCategory = { enabled: false, value: '' }
  filters.value.movePower = { enabled: false, min: '', max: '' }
  filters.value.moveAccuracy = { enabled: false, operator: 'At Least (≥)', value: '' }

  filters.value.typeFilters = {
    exactlyThese: { enabled: false, mode: 'Exactly These', types: ['', '', '', ''] },
    resists: { enabled: false, types: ['', '', '', ''] },
    immuneTo: { enabled: false, searchType: '', types: ['', ''] },
    notThese: { enabled: false, types: ['', '', '', ''] }
  }

  // Reset price filters OOF
  resetDraftPrice()
  resetTeraPrice()

  sortBy.value = 'Pokedex Number'
}
</script>

<style scoped>
:deep(.v-selection-control__input .v-icon) {
  color: white !important;
}

:deep(.v-selection-control--dirty .v-selection-control__input .v-icon) {
  color: #000000 !important;
}

:deep(.v-radio .v-selection-control__input) {
  color: white !important;
}

:deep(.v-radio--dirty .v-selection-control__input) {
  color: #000000 !important;
}

.filter-section {
  border: 2px solid #000000;
  border-radius: 8px;
  background-color: transparent;
  height: 100%;
}

.filter-section legend {
  color: #000000;
  font-weight: 600;
}

.tera-type-checkboxes {
  gap: 100px; 
}

/* Force lowercase 's' in "Reset Point settings" (very necessary) */
.reset-point-btn {
  text-transform: none !important;
  font-size: 0.875rem;
  letter-spacing: normal;
}

.reset-button-container {
  height: 40px;
  align-items: center;
}

.aligned-divider {
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
}

.operator-select {
  min-width: 175px;
  max-width: 175px;
}

.number-input {
  min-width: 145px;
  max-width: 145px;
}

.type-label-select {
  min-width: 170px;
  max-width: 170px;
  flex: 0 0 170px;
}

.type-label-chip {
  min-width: 170px;
  max-width: 170px;
  flex: 0 0 170px;
  display: flex;
  justify-content: center;
}

.type-dropdown {
  flex: 1 1 0;
  min-width: 110px;
}

.type-dropdown-search {
  flex: 1.5 1 0;
  min-width: 160px;
}

:deep(input[type="number"]::-webkit-inner-spin-button),
:deep(input[type="number"]::-webkit-outer-spin-button) {
  opacity: 1;
  position: relative;
  margin-left: auto;
  cursor: pointer;
}

:deep(input[type="number"]) {
  text-align: left;
  padding-right: 4px !important;
}

</style>