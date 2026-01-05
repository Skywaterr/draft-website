<template>
  <v-app>
    <!-- Navigation Bar -->
    <AppNavbar />

    <!-- Main Content -->
    <v-main style="background-color: #FFDEDE;">
      <v-container fluid class="py-8">
        <v-card elevation="0" style="background-color: #A0FFB5; border-radius: 12px; min-height: 85vh;">
          <v-card-text class="pa-6">
            <v-row>
              <!-- Left Column - Back Buttons and Sidebar -->
              <v-col cols="12" md="3">
                <!-- Back Buttons - Stacked at top left -->
                <div class="d-flex flex-column ga-2 mb-4">
                  <v-btn
                    style="background-color: #FFFCAD; color: #000000; text-transform: none !important; justify-content: flex-start; padding-left: 12px; width: fit-content;"
                    variant="flat"
                    size="small"
                    @click="$router.push('/search')"
                  >
                    ← Back to Simple Search!
                  </v-btn>
                  <v-btn
                    style="background-color: #ADB0FF; color: #000000; text-transform: none !important; justify-content: flex-start; padding-left: 12px; width: fit-content;"
                    variant="flat"
                    size="small"
                    @click="goToAdvancedSearch"
                  >
                    ← Back to Advanced Search!
                  </v-btn>
                </div>

                <!-- Filter Panel Container - Same height as table -->
                <div style="background-color: #E0E0E0; padding: 16px; border-radius: 0; display: flex; flex-direction: column;">
                  <div class="d-flex flex-column">

                <!-- Price Filter -->
                <v-expansion-panels class="mb-3" v-model="openPanels.price" style="background-color: transparent;">
                  <v-expansion-panel style="background-color: transparent; box-shadow: none;">
                    <v-expansion-panel-title style="background-color: transparent; min-height: 40px;">
                      <span class="font-weight-bold" style="color: #000000;">Price</span>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text style="background-color: transparent;">
                      <!-- Draft Price - One liner with inputs -->
                      <div class="d-flex align-items-center ga-2 mb-2 flex-wrap">
                        <span style="color: #000000; white-space: nowrap; line-height: 1; display: flex; align-items: center;">Draft Price:</span>
                        <v-text-field
                          v-model.number="draftPriceMin"
                          placeholder="Number Here"
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="white"
                          type="number"
                          :min="1"
                          :max="26"
                          style="max-width: 70px;"
                          @input="validateDraftPriceMin"
                          @keypress="onlyNumbers"
                        ></v-text-field>
                        <span style="color: #000000; line-height: 1; display: flex; align-items: center;">to</span>
                        <v-text-field
                          v-model.number="draftPriceMax"
                          placeholder="Number Here"
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="white"
                          type="number"
                          :min="1"
                          :max="26"
                          style="max-width: 70px;"
                          @input="validateDraftPriceMax"
                          @keypress="onlyNumbers"
                        ></v-text-field>
                      </div>

                      <!-- Draft Price Slider -->
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
                        class="mt-2"
                        style="margin-bottom: -25px;"
                      >
                        <template v-slot:prepend>
                          <div class="text-caption" style="color: #000000;">1</div>
                        </template>
                        <template v-slot:append>
                          <div class="text-caption" style="color: #000000;">26</div>
                        </template>
                      </v-range-slider>

                      <!-- Tier Checkboxes -->
                      <div class="mb-3">
                        <v-row dense>
                          <v-col cols="4" v-for="tier in ['S-tier', 'A-tier', 'B-tier']" :key="tier">
                            <v-checkbox
                              v-model="selectedTiers"
                              :value="tier"
                              :label="tier"
                              hide-details
                              density="compact"
                              color="#000000"
                            ></v-checkbox>
                          </v-col>
                        </v-row>
                        <v-row dense>
                          <v-col cols="4" v-for="tier in ['C-tier', 'D-tier', 'E-tier']" :key="tier">
                            <v-checkbox
                              v-model="selectedTiers"
                              :value="tier"
                              :label="tier"
                              hide-details
                              density="compact"
                              color="#000000"
                            ></v-checkbox>
                          </v-col>
                        </v-row>
                      </div>

                      <!-- Tera Price -->
                      <div class="d-flex align-items-center ga-2 mb-2 flex-wrap">
                        <span style="color: #000000; white-space: nowrap; line-height: 1; display: flex; align-items: center;">Tera Price:</span>
                        <v-text-field
                          v-model.number="teraPriceMin"
                          placeholder="Number Here"
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="white"
                          type="number"
                          :min="1"
                          :max="20"
                          style="max-width: 70px;"
                          @input="validateTeraPriceMin"
                          @keypress="onlyNumbers"
                        ></v-text-field>
                        <span style="color: #000000; line-height: 1; display: flex; align-items: center;">to</span>
                        <v-text-field
                          v-model.number="teraPriceMax"
                          placeholder="Number Here"
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="white"
                          type="number"
                          :min="1"
                          :max="20"
                          style="max-width: 70px;"
                          @input="validateTeraPriceMax"
                          @keypress="onlyNumbers"
                        ></v-text-field>
                      </div>

                      <!-- Tera Price Slider -->
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
                        class="mt-2"
                        style="margin-bottom: -25px;"
                      >
                        <template v-slot:prepend>
                          <div class="text-caption" style="color: #000000;">1</div>
                        </template>
                        <template v-slot:append>
                          <div class="text-caption" style="color: #000000;">20</div>
                        </template>
                      </v-range-slider>

                      <!-- Tera Types Checkboxes -->
                      <div class="d-flex ga-1 flex-nowrap" style="margin-left: -10px; width: calc(100% + 30px);">
                        <v-checkbox
                          v-for="num in [1, 2, 3, 4]"
                          :key="num"
                          v-model="selectedTeraTypes"
                          :value="num"
                          :label="`${num} Type${num > 1 ? 's' : ''}`"
                          hide-details
                          density="compact"
                          color="#000000"
                          style="margin-right: 2px;"
                        ></v-checkbox>
                      </div>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>

<!-- Base Stats Filter -->
                <v-expansion-panels class="mb-3" v-model="openPanels.stats" style="background-color: transparent;">
                  <v-expansion-panel style="background-color: transparent; box-shadow: none;">
                    <v-expansion-panel-title style="background-color: transparent; min-height: 40px;">
                      <span class="font-weight-bold" style="color: #000000;">Base Stats</span>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text style="background-color: transparent;">
                      <div class="d-flex flex-column ga-2">
                        <div
                          v-for="stat in baseStats"
                          :key="stat.id"
                          class="d-flex align-items-center ga-2"
                        >
                          <v-checkbox 
                            v-model="stat.enabled" 
                            hide-details 
                            density="compact" 
                            color="#000000" 
                            style="flex-shrink: 0;"
                          ></v-checkbox>
                          <span style="min-width: 60px; font-size: 0.875rem; color: #000000; line-height: 1; display: flex; align-items: center;">{{ stat.label }}:</span>
                          <v-select
                            v-model="stat.operator"
                            :items="operators"
                            variant="outlined"
                            density="compact"
                            hide-details
                            bg-color="white"
                            style="max-width: 200px; font-size: 0.75rem;"
                          ></v-select>
                          <v-text-field
                            v-model="stat.value"
                            placeholder="###"
                            variant="outlined"
                            density="compact"
                            hide-details
                            bg-color="white"
                            type="number"
                            style="max-width: 70px;"
                            @input="validateStatValue(stat)"
                            @keypress="onlyNumbers"
                          ></v-text-field>
                        </div>
                      </div>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>

                <!-- Types Filter -->
                <v-expansion-panels class="mb-3" v-model="openPanels.types" style="background-color: transparent;">
                  <v-expansion-panel style="background-color: transparent; box-shadow: none;">
                    <v-expansion-panel-title style="background-color: transparent; min-height: 40px;">
                      <span class="font-weight-bold" style="color: #000000;">Types</span>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text style="background-color: transparent;">
                      <!-- Exact Type -->
                      <v-expansion-panels class="mb-2" style="background-color: transparent;">
                        <v-expansion-panel style="background-color: transparent; box-shadow: none;">
                          <v-expansion-panel-title class="pa-2" style="min-height: 36px; background-color: transparent;">
                            <span class="font-weight-bold" style="font-size: 0.875rem; color: #000000;">Exact Type</span>
                          </v-expansion-panel-title>
                          <v-expansion-panel-text style="background-color: transparent;">
                            <v-row dense>
                              <v-col cols="6" v-for="i in 4" :key="`exact-${i}`">
                                <v-select
                                  :items="pokemonTypes"
                                  variant="outlined"
                                  density="compact"
                                  hide-details
                                  bg-color="white"
                                  placeholder="--"
                                ></v-select>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-text>
                        </v-expansion-panel>
                      </v-expansion-panels>

                      <!-- Resistances -->
                      <v-expansion-panels class="mb-2" style="background-color: transparent;">
                        <v-expansion-panel style="background-color: transparent; box-shadow: none;">
                          <v-expansion-panel-title class="pa-2" style="min-height: 36px; background-color: transparent;">
                            <span class="font-weight-bold" style="font-size: 0.875rem; color: #000000;">Resistances</span>
                          </v-expansion-panel-title>
                          <v-expansion-panel-text style="background-color: transparent;">
                            <v-row dense>
                              <v-col cols="6" v-for="i in 4" :key="`resist-${i}`">
                                <v-select
                                  :items="pokemonTypes"
                                  variant="outlined"
                                  density="compact"
                                  hide-details
                                  bg-color="white"
                                  placeholder="--"
                                ></v-select>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-text>
                        </v-expansion-panel>
                      </v-expansion-panels>

                      <!-- Immunities -->
                      <v-expansion-panels class="mb-2" style="background-color: transparent;">
                        <v-expansion-panel style="background-color: transparent; box-shadow: none;">
                          <v-expansion-panel-title class="pa-2" style="min-height: 36px; background-color: transparent;">
                            <span class="font-weight-bold" style="font-size: 0.875rem; color: #000000;">Immunities</span>
                          </v-expansion-panel-title>
                          <v-expansion-panel-text style="background-color: transparent;">
                            <v-row dense>
                              <v-col cols="6" v-for="i in 2" :key="`immune-${i}`">
                                <v-select
                                  :items="pokemonTypes"
                                  variant="outlined"
                                  density="compact"
                                  hide-details
                                  bg-color="white"
                                  placeholder="--"
                                ></v-select>
                              </v-col>
                            </v-row>
                            <v-row dense>
                              <v-col cols="6" offset="3">
                                <v-select
                                  :items="pokemonTypes"
                                  variant="outlined"
                                  density="compact"
                                  hide-details
                                  bg-color="white"
                                  placeholder="--"
                                ></v-select>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-text>
                        </v-expansion-panel>
                      </v-expansion-panels>

                      <!-- NOT this type -->
                      <v-expansion-panels style="background-color: transparent;">
                        <v-expansion-panel style="background-color: transparent; box-shadow: none;">
                          <v-expansion-panel-title class="pa-2" style="min-height: 36px; background-color: transparent;">
                            <span class="font-weight-bold" style="font-size: 0.875rem; color: #000000;">NOT this type</span>
                          </v-expansion-panel-title>
                          <v-expansion-panel-text style="background-color: transparent;">
                            <v-row dense>
                              <v-col cols="6" v-for="i in 4" :key="`not-${i}`">
                                <v-select
                                  :items="pokemonTypes"
                                  variant="outlined"
                                  density="compact"
                                  hide-details
                                  bg-color="white"
                                  placeholder="--"
                                ></v-select>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-text>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
            </div>
              </v-col>

              <!-- Main Content Area -->
              <v-col cols="12" md="9">
                <h1 class="text-h3 text-center mb-4" style="color: #000000;">Search Results!</h1>

                <!-- Stats/Price Toggle -->
                <div class="d-flex justify-space-between align-items-center mb-4 flex-wrap ga-3">
                  <v-btn-toggle v-model="viewMode" mandatory style="background-color: #D9D9D9; border-radius: 0;">
                    <v-btn 
                      value="stats" 
                      style="background-color: #D9D9D9; color: #000000; text-transform: none !important;"
                      :class="{ 'font-weight-bold': viewMode === 'stats' }"
                    >
                      Stats
                    </v-btn>
                    <v-btn 
                      value="price" 
                      style="background-color: #D9D9D9; color: #000000; text-transform: none !important;"
                      :class="{ 'font-weight-bold': viewMode === 'price' }"
                    >
                      Price
                    </v-btn>
                  </v-btn-toggle>
                </div>

<!-- Quick Search and Pagination Row -->
                <div class="d-flex justify-space-between align-items-center mb-4 flex-wrap ga-3">
                  <div class="d-flex align-items-center ga-2">
                    <span style="color: #000000; line-height: 1; display: flex; align-items: center;">Quick Search:</span>
                    <v-text-field
                      v-model="quickSearch"
                      placeholder="Enter Pokémon"
                      variant="outlined"
                      density="compact"
                      hide-details
                      bg-color="white"
                      width="310px"
                      rounded
                    ></v-text-field>
                  </div>

                  <div class="d-flex align-items-center ga-2 flex-wrap">
                    <!-- Previous button (only show if not on page 1) -->
                    <v-btn
                      v-if="currentPage > 1"
                      variant="text"
                      size="small"
                      style="background-color: #D9D9D9; color: #000000; min-width: 36px;"
                      @click="prevPage"
                    >
                      &lt;
                    </v-btn>

                    <v-btn
                      v-for="page in [1, 2, 3, 4]"
                      :key="page"
                      :variant="page === currentPage ? 'flat' : 'text'"
                      size="small"
                      style="background-color: #D9D9D9; color: #000000; min-width: 36px;"
                      @click="currentPage = page"
                    >
                      {{ page }}
                    </v-btn>
                    <v-btn
                      variant="text"
                      size="small"
                      style="background-color: #D9D9D9; color: #000000; min-width: 36px;"
                      @click="nextPage"
                    >
                      &gt;
                    </v-btn>

                    <span style="color: #000000; line-height: 1; display: flex; align-items: center;">Show</span>
                    <v-select
                      v-model="itemsPerPage"
                      :items="[10, 25, 50, 100]"
                      variant="outlined"
                      density="compact"
                      hide-details
                      bg-color="white"
                      style="max-width: 80px;"
                    ></v-select>
                    <span style="color: #000000; line-height: 1; display: flex; align-items: center;">Pokémon per page</span>
                  </div>
                </div>

                <!-- Results Table -->

                <!-- Results Table -->
                <v-table style="background-color: transparent;">
                  <thead>
                    <tr style="background-color: #66D276;">
                      <th
                        v-for="header in currentHeaders"
                        :key="header.key"
                        class="text-center"
                        style="color: #000000; cursor: pointer;"
                        @click="header.sortable !== false && sortByColumn(header.key)"
                      >
                        {{ header.title }}
                        <template v-if="header.sortable !== false">
                          <span class="sort-arrows">
                            <span class="arrow-up">▲</span>
                            <span class="arrow-down">▼</span>
                          </span>
                        </template>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(pokemon, index) in paginatedResults"
                      :key="index"
                      :style="{ backgroundColor: index % 2 === 0 ? '#A5D9AB' : '#D7FFDC' }"
                    >
                      <td class="text-center" style="color: #000000;">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                      <td class="text-center">
                        <div class="d-flex flex-column align-items-center justify-center">
                          <v-img
                            :src="`/${pokemon.Name}.gif`"
                            width="60"
                            height="60"
                            class="mb-1 mx-auto"
                          >  
                            <template #error>
                              <v-img
                                src="/${pokemon.Name}.png"
                                width="60"
                                height="60"
                                alt="Unknown Pokémon"
                              />
                            </template>
                          </v-img>
                          <span style="color: #000000;">{{pokemon["Pokemon"]}}</span>
                        </div>
                      </td>
                      <td class="text-center">
                        <div class="d-flex flex-column align-items-center ga-2">
                          <div 
                            :style="{
                              backgroundColor: typeColors[pokemon.Type1 as keyof typeof typeColors],
                              color: '#FFFFE8',
                              padding: '2px 8px',
                              borderRadius: '0',
                              minWidth: '60px',
                              textAlign: 'center',
                              border: '1px solid #2C4566'
                            }"
                          >{{pokemon["Type1"]}}</div>
                          <div
                            v-if="pokemon.Type2 !== 'NULL'"
                            :style="{
                              backgroundColor: typeColors[pokemon.Type2 as keyof typeof typeColors],
                              color: '#FFFFE8',
                              padding: '2px 8px',
                              borderRadius: '0',
                              minWidth: '60px',
                              textAlign: 'center',
                              border: '1px solid #2C4566'
                            }"
                          >{{pokemon["Type2"]}}</div>                        
                        </div>
                      </td>
                      <template v-if="viewMode === 'stats'">
                        <td class="text-center" style="color: #000000;">{{pokemon["HP"]}}</td>
                        <td class="text-center" style="color: #000000;">{{pokemon["Atk"]}}</td>
                        <td class="text-center" style="color: #000000;">{{pokemon["Def"]}}</td>
                        <td class="text-center" style="color: #000000;">{{pokemon["S.At"]}}</td>
                        <td class="text-center" style="color: #000000;">{{pokemon["S.Df"]}}</td>
                        <td class="text-center" style="color: #000000;">{{pokemon["Spd"]}}</td>
                        <td class="text-center" style="color: #000000;">{{pokemon["BST"]}}</td>
                      </template>
                      <template v-else>
                        <td class="text-center" style="color: #000000;">XX</td>
                        <td class="text-center" style="color: #000000;">XX</td>
                        <td class="text-center" style="color: #000000;">XX</td>
                        <td class="text-center" style="color: #000000;">XX</td>
                      </template>
                    </tr>
                  </tbody>
                </v-table>

                <!-- Bottom Pagination -->
                <div class="d-flex justify-center align-items-center mt-4 ga-2">
                  <!-- Previous button (only show if not on page 1) -->
                  <v-btn
                    v-if="currentPage > 1"
                    variant="text"
                    size="small"
                    style="background-color: #D9D9D9; color: #000000; min-width: 36px;"
                    @click="prevPage"
                  >
                    &lt;
                  </v-btn>

                  <v-btn
                    v-for="page in [1, 2, 3, 4]"
                    :key="`bottom-${page}`"
                    :variant="page === currentPage ? 'flat' : 'text'"
                    size="small"
                    style="background-color: #D9D9D9; color: #000000; min-width: 36px;"
                    @click="currentPage = page"
                  >
                    {{ page }}
                  </v-btn>
                  <v-btn
                    variant="text"
                    size="small"
                    style="background-color: #D9D9D9; color: #000000; min-width: 36px;"
                    @click="nextPage"
                  >
                    &gt;
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'

const router = useRouter()
const route = useRoute()

// Loading and error states
const loading = ref(false)
const error = ref<string | null>(null)

// View mode
const viewMode = ref('stats')
const quickSearch = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Filter states
const draftPriceMin = ref(1)
const draftPriceMax = ref(26)
const draftPriceRange = ref([1, 26])
const teraPriceMin = ref(1)
const teraPriceMax = ref(20)
const teraPriceRange = ref([1, 20])
const selectedTiers = ref<string[]>([])
const selectedTeraTypes = ref<number[]>([])

// Expansion panels state
const openPanels = ref({
  price: [],
  stats: [],
  types: []
})

const operators = [
  'At Least (≥)',
  'More Than (>)',
  'Exactly (=)',
  'Less Than (<)',
  'At Most (≤)'
]

const baseStats = ref([
  { id: 'hp', label: 'HP', enabled: false, operator: 'At Least (≥)', value: '' },
  { id: 'attack', label: 'Attack', enabled: false, operator: 'At Least (≥)', value: '' },
  { id: 'defense', label: 'Defense', enabled: false, operator: 'At Least (≥)', value: '' },
  { id: 'spattack', label: 'Sp. Atk', enabled: false, operator: 'At Least (≥)', value: '' },
  { id: 'spdefense', label: 'Sp. Def', enabled: false, operator: 'At Least (≥)', value: '' },
  { id: 'speed', label: 'Speed', enabled: false, operator: 'At Least (≥)', value: '' },
  { id: 'bst', label: 'BST', enabled: false, operator: 'At Least (≥)', value: '' }
])

const autoEnableStatCheckbox = (stat: any) => {
  if (stat.value) {
    stat.enabled = true
  } else {
    stat.enabled = false
  }
}

const pokemonTypes = [
  'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice',
  'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
  'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
]

const typeColors = {
  'Normal': "#DDD4BF", 
  'Fire': "#CE373C",
  'Water': "#47A2DB",
  'Grass': "#59BD38",
  'Electric': "#D7CC2B",
  'Ice': "#A9F3EE",
  'Fighting': "#BA7060",
  'Poison': "#7B59C1",
  'Ground': "#C59D5B",
  'Flying': "#7EACD9",
  'Psychic': "#BB51B9",
  'Bug': "#B0B751",
  'Rock': "#845B36",
  'Ghost': "#5B557D",
  'Dragon': "#5554DD",
  'Dark': "#484746",
  'Steel': "#A8B1B3",
  'Fairy': "#E0ABE0",
}


// Headers
const statsHeaders = [
  { title: '#', key: 'number' },
  { title: 'Pokemon', key: 'pokemon' },
  { title: 'Type', key: 'type', sortable: false },
  { title: 'HP', key: 'hp' },
  { title: 'Atk', key: 'atk' },
  { title: 'Def', key: 'def' },
  { title: 'S.At', key: 'sat' },
  { title: 'S.Df', key: 'sdf' },
  { title: 'Spd', key: 'spd' },
  { title: 'BST', key: 'bst' }
]

const priceHeaders = [
  { title: '#', key: 'number' },
  { title: 'Pokemon', key: 'pokemon' },
  { title: 'Type', key: 'type', sortable: false },
  { title: 'Draft Price', key: 'draftPrice' },
  { title: 'Draft Tier', key: 'draftTier' },
  { title: 'Tera Price', key: 'teraPrice' },
  { title: 'Tera Types', key: 'teraTypes' }
]

const currentHeaders = computed(() => {
  return viewMode.value === 'stats' ? statsHeaders : priceHeaders
})

// Real results from backend
const allResults = ref<any[]>([])

const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return allResults.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(allResults.value.length / itemsPerPage.value)
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Fetch results from backend
const fetchResults = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Get query parameters from URL
    const queryString = route.fullPath.split('?')[1] || ''
    
    if (!queryString) {
      // No search parameters - show message
      error.value = 'No search parameters provided. Please use the search page to find Pokemon.'
      allResults.value = []
      return
    }
    
    console.log('🔍 Fetching Pokemon with query:', queryString)
    
    // Fetch from backend
    const response = await fetch(`http://localhost:3000/pokemon?${queryString}`)
    
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    console.log(`✅ Found ${data.length} Pokemon`)
    
    allResults.value = data
    currentPage.value = 1 // Reset to first page
    
  } catch (err) {
    console.error('❌ Search failed:', err)
    error.value = `Failed to load search results: ${err instanceof Error ? err.message : 'Unknown error'}`
    allResults.value = []
  } finally {
    loading.value = false
  }
}

// Watch for route changes (new searches)
watch(() => route.query, () => {
  fetchResults()
})

// Fetch on mount
onMounted(() => {
  fetchResults()
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const sortByColumn = (key: string) => {
  // TODO: Implement sorting
  console.log('Sort by:', key)
}

const getHeaderStyle = (key: string) => {
  // Fixed width for #, Pokemon, Type columns in both views
  const fixedColumns = ['number', 'pokemon', 'type']
  
  if (fixedColumns.includes(key)) {
    return 'color: #000000; cursor: pointer; width: auto;'
  }
  return 'color: #000000; cursor: pointer;'
}

const getCellStyle = (columnName: string, index: number) => {
  const baseColor = index % 2 === 0 ? '#A5D9AB' : '#D7FFDC'
  return `color: #000000; background-color: ${baseColor};`
}

const goToAdvancedSearch = () => {
  router.push({ path: '/search', query: { mode: 'advanced' } })
}

// Watch sliders and sync with inputs
watch(draftPriceMin, (newVal) => {
  if (newVal >= 1 && newVal <= 26) {
    if (newVal <= draftPriceMax.value) {
      draftPriceRange.value = [newVal, draftPriceRange.value[1]!]
    }
  }
})

watch(draftPriceMax, (newVal) => {
  if (newVal >= 1 && newVal <= 26) {
    if (newVal >= draftPriceMin.value) {
      draftPriceRange.value = [draftPriceRange.value[0]!, newVal]
    }
  }
})

watch(draftPriceRange, (newVal) => {
  draftPriceMin.value = newVal[0]!
  draftPriceMax.value = newVal[1]!
})

watch(teraPriceMin, (newVal) => {
  if (newVal >= 1 && newVal <= 20) {
    if (newVal <= teraPriceMax.value) {
      teraPriceRange.value = [newVal, teraPriceRange.value[1]!]
    }
  }
})

watch(teraPriceMax, (newVal) => {
  if (newVal >= 1 && newVal <= 20) {
    if (newVal >= teraPriceMin.value) {
      teraPriceRange.value = [teraPriceRange.value[0]!, newVal]
    }
  }
})

watch(teraPriceRange, (newVal) => {
  teraPriceMin.value = newVal[0]!
  teraPriceMax.value = newVal[1]!
})

const onlyNumbers = (event: KeyboardEvent) => {
  const char = event.key
  // Allow only digits 0-9
  if (!/^\d$/.test(char)) {
    event.preventDefault()
  }
}

const validateDraftPriceMin = () => {
  if (draftPriceMin.value < 1) draftPriceMin.value = 1
  if (draftPriceMin.value > 26) draftPriceMin.value = 26
  draftPriceMin.value = Math.floor(draftPriceMin.value)
}

const validateDraftPriceMax = () => {
  if (draftPriceMax.value < 1) draftPriceMax.value = 1
  if (draftPriceMax.value > 26) draftPriceMax.value = 26
  draftPriceMax.value = Math.floor(draftPriceMax.value)
}

const validateTeraPriceMin = () => {
  if (teraPriceMin.value < 1) teraPriceMin.value = 1
  if (teraPriceMin.value > 20) teraPriceMin.value = 20
  teraPriceMin.value = Math.floor(teraPriceMin.value)
}

const validateTeraPriceMax = () => {
  if (teraPriceMax.value < 1) teraPriceMax.value = 1
  if (teraPriceMax.value > 20) teraPriceMax.value = 20
  teraPriceMax.value = Math.floor(teraPriceMax.value)
}

const validateStatValue = (stat: any) => {
  if (stat.value) {
    // Remove decimals
    stat.value = Math.floor(Number(stat.value)).toString()
    
    // Limit to 3 digits for regular stats, 4 for BST
    const maxLength = stat.id === 'bst' ? 4 : 3
    if (stat.value.length > maxLength) {
      stat.value = stat.value.slice(0, maxLength)
    }
    
    // Auto-enable checkbox
    stat.enabled = true
  } else {
    stat.enabled = false
  }
}
</script>

<style scoped>
/* Checkbox styling - same as AdvancedSearch.vue */
:deep(.v-checkbox .v-selection-control__input) {
  width: 18px;
  height: 18px;
  background-color: rgb(255, 255, 255);
  border-radius: 1px;
}

:deep(.v-selection-control__input .v-icon) {
  color: white !important;
}

:deep(.v-selection-control--dirty .v-selection-control__input .v-icon) {
  color: #000000 !important;
  font-size: 26px !important;
}

/* Number input arrow styling */
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

/* Sort arrows styling - spread out */
.sort-arrows {
  display: inline-flex;
  flex-direction: column;
  margin-left: 4px;
  line-height: 0.9;
  vertical-align: middle;
  gap: 0px;
}

.arrow-up {
  font-size: 10px;
  color: #000000;
}

.arrow-down {
  font-size: 10px;
  color: #000000;
}

/* Remove expansion panel shadows */
:deep(.v-expansion-panel) {
  box-shadow: none !important;
}

:deep(.v-expansion-panel::before) {
  box-shadow: none !important;
}

:deep(.v-expansion-panel::after) {
  box-shadow: none !important;
}

/* Curved results table corners */
:deep(.v-table) {
  border-radius: 8px;
  overflow: hidden;
}
</style>