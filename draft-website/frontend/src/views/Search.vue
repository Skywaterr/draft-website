<template>
  <v-app>
    <!-- Top Navigation Bar -->
    <v-app-bar color="accent" elevation="0" height="80">
      <v-container fluid class="d-flex align-center justify-space-between px-8">
        <div class="text-h5 text-white font-weight-bold">
          Pokemon Draft League!
        </div>
        <div class="d-flex ga-3">
          <v-btn color="primary" variant="flat" size="large" class="nav-button" to="/">Home!</v-btn>
          <v-btn color="primary" variant="flat" size="large" class="nav-button" to="/learn">Learn!</v-btn>
          <v-btn color="primary" variant="flat" size="large" class="nav-button" to="/search">Search!</v-btn>
          <v-btn color="primary" variant="flat" size="large" class="nav-button" to="/compare">Compare!</v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="page-background">
      <v-container fluid class="py-8">
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <!-- Simple Search Box -->
            <v-card 
              v-if="searchMode === 'simple'" 
              elevation="0" 
              class="pa-12"
              style="background-color: #FFFCAD; border-radius: 12px;"
            >
              <h1 class="text-h3 text-center mb-8" style="color: #000000;">Simple Search!</h1>

              <!-- Pokemon Name Search -->
              <div class="mb-6">
                <div class="d-flex align-center justify-center mb-4">
                  <span class="text-h6 mr-4" style="color: #000000;">Pokemon Name</span>
                  <v-icon>mdi-chevron-down</v-icon>
                </div>
                
                <div class="d-flex align-center justify-center ga-4">
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
                  >
                    <template v-slot:append-inner>
                      <v-icon>mdi-magnify</v-icon>
                    </template>
                  </v-text-field>
                  
                  <v-btn
                    style="background-color: #CCF1FF; color: #000000; text-transform: none !important;"
                    size="large"
                    variant="flat"
                    @click="performSearch"
                  >
                    Search! →
                  </v-btn>
                </div>
              </div>

              <!-- First divider and OR -->
              <v-divider class="my-4" thickness="2" color="#000000"></v-divider>
              <div class="text-h5 text-center my-2" style="color: #000000;">OR</div>

              <!-- Pokemon Tier (divider BEFORE, no divider after) -->
              <v-divider class="my-4" thickness="2" color="#000000"></v-divider>
              <div class="mb-6">
                <div class="d-flex align-center justify-center mb-4">
                  <span class="text-h6 mr-4" style="color: #000000;">Pokemon Tier</span>
                  <v-icon>mdi-chevron-down</v-icon>
                </div>
              </div>

              <!-- Second OR (divider before) -->
              <v-divider class="my-4" thickness="2" color="#000000"></v-divider>
              <div class="text-h5 text-center my-2" style="color: #000000;">OR</div>

              <!-- Type Matchups (divider BEFORE, no divider after) -->
              <v-divider class="my-4" thickness="2" color="#000000"></v-divider>
              <div class="mb-6">
                <div class="d-flex align-center justify-center mb-4">
                  <span class="text-h6 mr-4" style="color: #000000;">Type Matchups</span>
                  <v-icon>mdi-chevron-down</v-icon>
                </div>
              </div>

              <!-- Third OR (divider before) -->
              <v-divider class="my-4" thickness="2" color="#000000"></v-divider>
              <div class="text-h5 text-center my-2" style="color: #000000;">OR</div>
              <v-divider class="my-4" thickness="2" color="#000000"></v-divider>

              <!-- Advanced Search Button -->
              <div class="text-center mt-6">
                <v-btn
                  style="background-color: #ADB0FF; color: #000000; text-transform: none !important;"
                  size="x-large"
                  variant="flat"
                  @click="searchMode = 'advanced'"
                >
                  Advanced Search!
                </v-btn>
              </div>
            </v-card>

            <!-- Advanced Search -->
            <v-card 
              v-else-if="searchMode === 'advanced'" 
              elevation="0" 
              class="pa-8 position-relative"
              style="background-color: #ADB0FF; border-radius: 12px;"
            >
              <!-- GIGA ADVANCED Button - Top Right Corner -->
              <v-btn
                style="background-color: #909000; color: #000000; position: absolute; top: 16px; right: 16px; font-size: 18px; font-weight: bold; text-transform: none !important;"
                variant="flat"
                size="large"
                @click="searchMode = 'giga'"
              >
                GIGA ADVANCED
              </v-btn>

              <h1 class="text-h3 text-center mb-4" style="color: #000000;">Advanced Search</h1>
              
              <div class="text-center mb-8">
                <v-btn
                  style="background-color: #FFFCAD; color: #000000; text-transform: none !important;"
                  variant="flat"
                  @click="searchMode = 'simple'"
                >
                  Go back to Simple Search!
                </v-btn>
              </div>

              <v-row>
                <!-- Draft Price & Tera Captain Price side by side -->
                <v-col cols="12" md="6">
                  <fieldset class="filter-section pa-4">
                    <legend class="text-h6 px-2">Draft Price</legend>
                    <v-radio-group v-model="filters.draftPriceEnabled" hide-details>
                      <v-radio :value="true">
                        <template v-slot:label>
                          <div class="d-flex align-items-center ga-2 flex-wrap">
                            <span>Costs between</span>
                            <v-text-field
                              v-model="filters.draftPriceMin"
                              placeholder="Number Here"
                              variant="outlined"
                              density="compact"
                              hide-details
                              style="max-width: 100px;"
                            ></v-text-field>
                            <span>and</span>
                            <v-text-field
                              v-model="filters.draftPriceMax"
                              placeholder="Number Here"
                              variant="outlined"
                              density="compact"
                              hide-details
                              style="max-width: 100px;"
                            ></v-text-field>
                            <span>points.</span>
                          </div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                    
                    <v-range-slider
                      v-model="draftPriceRange"
                      :min="1"
                      :max="20"
                      :step="1"
                      strict
                      thumb-label
                      class="mt-4"
                    ></v-range-slider>

                    <v-radio-group v-model="filters.tierEnabled" hide-details class="mt-4">
                      <v-radio :value="true">
                        <template v-slot:label>
                          <span>Pokemon is a part of</span>
                        </template>
                      </v-radio>
                    </v-radio-group>
                    
                    <div class="d-flex flex-wrap ga-2 mt-2">
                      <v-checkbox v-model="filters.tiers" value="S-tier" label="S-tier" hide-details density="compact"></v-checkbox>
                      <v-checkbox v-model="filters.tiers" value="A-tier" label="A-tier" hide-details density="compact"></v-checkbox>
                      <v-checkbox v-model="filters.tiers" value="B-tier" label="B-tier" hide-details density="compact"></v-checkbox>
                      <v-checkbox v-model="filters.tiers" value="C-tier" label="C-tier" hide-details density="compact"></v-checkbox>
                      <v-checkbox v-model="filters.tiers" value="D-tier" label="D-tier" hide-details density="compact"></v-checkbox>
                      <v-checkbox v-model="filters.tiers" value="E-tier" label="E-tier" hide-details density="compact"></v-checkbox>
                    </div>

                    <div class="text-center mt-4">
                      <v-btn
                        style="background-color: #D9D9D9; color: #000000; text-transform: none !important;"
                        size="small"
                        variant="flat"
                      >
                        Reset Point Settings
                      </v-btn>
                    </div>
                  </fieldset>
                </v-col>

                <v-col cols="12" md="6">
                  <fieldset class="filter-section pa-4">
                    <legend class="text-h6 px-2">Tera Captain Price</legend>
                    <v-radio-group v-model="filters.teraPriceEnabled" hide-details>
                      <v-radio :value="true">
                        <template v-slot:label>
                          <div class="d-flex align-items-center ga-2 flex-wrap">
                            <span>Costs between</span>
                            <v-text-field
                              v-model="filters.teraPriceMin"
                              placeholder="Number Here"
                              variant="outlined"
                              density="compact"
                              hide-details
                              style="max-width: 100px;"
                            ></v-text-field>
                            <span>and</span>
                            <v-text-field
                              v-model="filters.teraPriceMax"
                              placeholder="Number Here"
                              variant="outlined"
                              density="compact"
                              hide-details
                              style="max-width: 100px;"
                            ></v-text-field>
                            <span>tera points.</span>
                          </div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                    
                    <v-range-slider
                      v-model="teraPriceRange"
                      :min="1"
                      :max="20"
                      :step="1"
                      strict
                      thumb-label
                      class="mt-4"
                    ></v-range-slider>

                    <v-radio-group v-model="filters.teraTypesEnabled" hide-details class="mt-4">
                      <v-radio :value="true">
                        <template v-slot:label>
                          <span>Pokemon can terastalize into __ types</span>
                        </template>
                      </v-radio>
                    </v-radio-group>
                    
                    <div class="d-flex flex-wrap ga-2 mt-2">
                      <v-checkbox v-model="filters.teraTypes" value="1" label="1" hide-details density="compact"></v-checkbox>
                      <v-checkbox v-model="filters.teraTypes" value="2" label="2" hide-details density="compact"></v-checkbox>
                      <v-checkbox v-model="filters.teraTypes" value="3" label="3" hide-details density="compact"></v-checkbox>
                      <v-checkbox v-model="filters.teraTypes" value="4" label="4" hide-details density="compact"></v-checkbox>
                    </div>

                    <div class="text-center mt-4">
                      <v-btn
                        style="background-color: #D9D9D9; color: #000000; text-transform: none !important;"
                        size="small"
                        variant="flat"
                      >
                        Reset Point Settings
                      </v-btn>
                    </div>
                  </fieldset>
                </v-col>

                <!-- Base Stats Section -->
                <v-col cols="12">
                  <fieldset class="filter-section pa-4">
                    <legend class="text-h6 px-2">Base Stats</legend>
                    
                    <v-row>
                      <v-col cols="12" md="8">
                        <div class="d-flex flex-column ga-2">
                          <div class="d-flex align-items-center ga-2" v-for="stat in stats" :key="stat.id">
                            <v-checkbox v-model="stat.enabled" hide-details density="compact"></v-checkbox>
                            <span style="min-width: 100px;">{{ stat.label }} is</span>
                            <v-select
                              v-model="stat.operator"
                              :items="['At Least (≥)', 'At Most (≤)', 'Exactly (=)']"
                              variant="outlined"
                              density="compact"
                              hide-details
                              style="max-width: 140px;"
                            ></v-select>
                            <v-text-field
                              v-model="stat.value"
                              placeholder="Number Here"
                              variant="outlined"
                              density="compact"
                              hide-details
                              style="max-width: 100px;"
                            ></v-text-field>
                          </div>
                        </div>
                      </v-col>
                      
                      <v-col cols="12" md="4">
                        <div class="d-flex align-items-center ga-2 flex-wrap">
                          <v-checkbox v-model="filters.bstEnabled" hide-details density="compact"></v-checkbox>
                          <span>Base Stat Total(BST) is</span>
                          <v-select
                            v-model="filters.bstOperator"
                            :items="['At Least (≥)', 'At Most (≤)', 'Exactly (=)']"
                            variant="outlined"
                            density="compact"
                            hide-details
                            style="max-width: 140px;"
                          ></v-select>
                          <v-text-field
                            v-model="filters.bstValue"
                            placeholder="Number Here"
                            variant="outlined"
                            density="compact"
                            hide-details
                            style="max-width: 100px;"
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
                      <v-checkbox hide-details density="compact"></v-checkbox>
                      <v-text-field
                        placeholder="Search by Ability Name"
                        variant="outlined"
                        density="compact"
                        hide-details
                        style="max-width: 300px;"
                      ></v-text-field>
                    </div>
                  </fieldset>
                </v-col>

                <!-- Learned Moves Section -->
                <v-col cols="12">
                  <fieldset class="filter-section pa-4">
                    <legend class="text-h6 px-2">Learned Moves</legend>
                    
                    <v-row class="mb-4">
                      <v-col cols="12" md="4" v-for="i in 6" :key="i">
                        <div class="d-flex align-items-center ga-2">
                          <v-checkbox hide-details density="compact"></v-checkbox>
                          <v-text-field
                            placeholder="Move Name"
                            variant="outlined"
                            density="compact"
                            hide-details
                          ></v-text-field>
                        </div>
                      </v-col>
                    </v-row>

                    <div class="text-subtitle-1 mb-3" style="font-weight: 600;">Learns an attacking move that is...</div>
                    
                    <div class="d-flex flex-column ga-2">
                      <div class="d-flex align-items-center ga-2">
                        <v-checkbox hide-details density="compact"></v-checkbox>
                        <span style="min-width: 120px;">Type:</span>
                        <v-select
                          :items="['--']"
                          variant="outlined"
                          density="compact"
                          hide-details
                          style="max-width: 150px;"
                        ></v-select>
                      </div>

                      <div class="d-flex align-items-center ga-2">
                        <v-checkbox hide-details density="compact"></v-checkbox>
                        <span style="min-width: 120px;">Physical/Special:</span>
                        <v-select
                          :items="['--']"
                          variant="outlined"
                          density="compact"
                          hide-details
                          style="max-width: 150px;"
                        ></v-select>
                      </div>

                      <div class="d-flex align-items-center ga-2 flex-wrap">
                        <v-checkbox hide-details density="compact"></v-checkbox>
                        <span>Base power between</span>
                        <v-text-field
                          placeholder="Number Here"
                          variant="outlined"
                          density="compact"
                          hide-details
                          style="max-width: 100px;"
                        ></v-text-field>
                        <span>and</span>
                        <v-text-field
                          placeholder="Number Here"
                          variant="outlined"
                          density="compact"
                          hide-details
                          style="max-width: 100px;"
                        ></v-text-field>
                      </div>

                      <div class="d-flex align-items-center ga-2">
                        <v-checkbox hide-details density="compact"></v-checkbox>
                        <span style="min-width: 80px;">Accuracy</span>
                        <v-select
                          :items="['At Least (≥)']"
                          variant="outlined"
                          density="compact"
                          hide-details
                          style="max-width: 140px;"
                        ></v-select>
                        <v-text-field
                          placeholder="Number Here"
                          variant="outlined"
                          density="compact"
                          hide-details
                          style="max-width: 100px;"
                        ></v-text-field>
                      </div>
                    </div>
                  </fieldset>
                </v-col>

                <!-- Types Section -->
                <v-col cols="12">
                  <fieldset class="filter-section pa-4">
                    <legend class="text-h6 px-2">Types</legend>
                    
                    <div class="d-flex flex-column ga-3">
                      <div class="d-flex align-items-center ga-2 flex-wrap">
                        <v-checkbox hide-details density="compact"></v-checkbox>
                        <v-chip style="background-color: #AFFFA5; color: #000000;" size="small">Exactly These</v-chip>
                        <v-select :items="['--']" variant="outlined" density="compact" hide-details style="max-width: 120px;"></v-select>
                        <v-select :items="['--']" variant="outlined" density="compact" hide-details style="max-width: 120px;"></v-select>
                        <v-select :items="['--']" variant="outlined" density="compact" hide-details style="max-width: 120px;"></v-select>
                        <v-select :items="['--']" variant="outlined" density="compact" hide-details style="max-width: 120px;"></v-select>
                      </div>

                      <div class="d-flex align-items-center ga-2 flex-wrap">
                        <v-checkbox hide-details density="compact"></v-checkbox>
                        <v-chip style="background-color: #AFFFA5; color: #000000;" size="small">Resists</v-chip>
                        <v-select :items="['--']" variant="outlined" density="compact" hide-details style="max-width: 120px;"></v-select>
                        <v-select :items="['--']" variant="outlined" density="compact" hide-details style="max-width: 120px;"></v-select>
                        <v-select :items="['--']" variant="outlined" density="compact" hide-details style="max-width: 120px;"></v-select>
                        <v-select :items="['--']" variant="outlined" density="compact" hide-details style="max-width: 120px;"></v-select>
                      </div>

                      <div class="d-flex align-items-center ga-2 flex-wrap">
                        <v-checkbox hide-details density="compact"></v-checkbox>
                        <v-chip style="background-color: #AFFFA5; color: #000000;" size="small">Immune To</v-chip>
                        <v-select :items="['--']" variant="outlined" density="compact" hide-details style="max-width: 200px;"></v-select>
                        <v-select :items="['--']" variant="outlined" density="compact" hide-details style="max-width: 120px;"></v-select>
                      </div>

                      <div class="d-flex align-items-center ga-2 flex-wrap">
                        <v-checkbox hide-details density="compact"></v-checkbox>
                        <v-chip style="background-color: #FFBFBF; color: #000000;" size="small">NOT These</v-chip>
                        <v-select :items="['--']" variant="outlined" density="compact" hide-details style="max-width: 120px;"></v-select>
                        <v-select :items="['--']" variant="outlined" density="compact" hide-details style="max-width: 120px;"></v-select>
                        <v-select :items="['--']" variant="outlined" density="compact" hide-details style="max-width: 120px;"></v-select>
                        <v-select :items="['--']" variant="outlined" density="compact" hide-details style="max-width: 120px;"></v-select>
                      </div>
                    </div>
                  </fieldset>
                </v-col>

                <!-- Sort By -->
                <v-col cols="12">
                  <div class="text-center d-flex align-items-center justify-center ga-4">
                    <span class="text-h6">Sort By:</span>
                    <v-select
                      :items="['Pokedex Number', 'Name', 'HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed', 'BST']"
                      variant="outlined"
                      density="compact"
                      hide-details
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
                    >
                      Reset!
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card>

            <!-- GIGA ADVANCED Search -->
            <v-card 
              v-else-if="searchMode === 'giga'" 
              elevation="0" 
              class="pa-12"
              style="background-color: #D9D9D9; border-radius: 12px;"
            >
              <div class="d-flex align-items-start ga-8">
                <div style="flex: 1;">
                  <p class="text-h5 mb-6" style="color: #000000; text-align: left; line-height: 1.5;">
                    Still need help finding the right pokemon? Find out which one is best for you by messaging Big Pikachu™ at (346)-467-0505
                  </p>
                  
                  <v-btn
                    style="background-color: #ADB0FF; color: #000000; text-transform: none !important;"
                    size="large"
                    variant="flat"
                    @click="searchMode = 'advanced'"
                  >
                    ← Back to Advanced Search
                  </v-btn>
                </div>

                <v-img 
                  :src="gigaPikachuImage"
                  max-width="400"
                  style="border-radius: 8px; flex-shrink: 0;"
                ></v-img>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const searchMode = ref<'simple' | 'advanced' | 'giga'>('simple')

// Query parameter on mount
onMounted(() => {
  if (route.query.mode === 'advanced') {
    searchMode.value = 'advanced'
  }
})

// Placeholder image for GIGA ADVANCED
const gigaPikachuImage = ref('https://placehold.co/400x400/FFD700/000000?text=Big+Pikachu')

const pokemonSearch = ref('')

const draftPriceRange = ref([1, 20])
const teraPriceRange = ref([1, 20])

const filters = ref({
  draftPriceEnabled: false,
  draftPriceMin: '',
  draftPriceMax: '',
  tierEnabled: false,
  tiers: [] as string[],
  teraPriceEnabled: false,
  teraPriceMin: '',
  teraPriceMax: '',
  teraTypesEnabled: false,
  teraTypes: [] as string[],
  bstEnabled: false,
  bstOperator: 'At Least (≥)',
  bstValue: '',
})

const stats = ref([
  { id: 'hp', label: 'HP', enabled: false, operator: 'At Least (≥)', value: '' },
  { id: 'attack', label: 'Attack', enabled: false, operator: 'At Least (≥)', value: '' },
  { id: 'defense', label: 'Defense', enabled: false, operator: 'At Least (≥)', value: '' },
  { id: 'spattack', label: 'Sp. Attack', enabled: false, operator: 'At Least (≥)', value: '' },
  { id: 'spdefense', label: 'Sp. Defense', enabled: false, operator: 'At Least (≥)', value: '' },
  { id: 'speed', label: 'Speed', enabled: false, operator: 'At Least (≥)', value: '' },
])

const performSearch = () => {
  router.push('/search/results')
}
</script>

<style scoped>
.page-background {
  background-color: #FFDEDE;
}

.nav-button {
  text-transform: none !important;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  letter-spacing: 0;
  color: #000000;
}

.filter-section {
  border: 2px solid #000000;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.3);
  height: 100%;
}

.filter-section legend {
  color: #000000;
  font-weight: 600;
}
</style>