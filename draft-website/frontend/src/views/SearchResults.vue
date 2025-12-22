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
    <v-main style="background-color: #FFDEDE;">
      <v-container fluid class="py-8">
        <v-card elevation="0" style="background-color: #90EE90; border-radius: 12px; min-height: 85vh;">
          <v-card-text class="pa-6">
            <v-row>
              <!-- Left Sidebar - Filters -->
              <v-col cols="12" md="3">
                <!-- Back Buttons - Stacked -->
                <div class="d-flex flex-column ga-2 mb-4">
                  <v-btn
                    style="background-color: #FFFCAD; color: #000000; text-transform: none !important;"
                    variant="flat"
                    size="small"
                    @click="$router.push('/search')"
                  >
                    ← Back to Simple Search!
                  </v-btn>
                  <v-btn
                    style="background-color: #ADB0FF; color: #000000; text-transform: none !important;"
                    variant="flat"
                    size="small"
                    @click="goToAdvancedSearch"
                  >
                    ← Back to Advanced Search!
                  </v-btn>
                </div>

                <!-- Price Filter -->
                <v-expansion-panels class="mb-4">
                  <v-expansion-panel style="background-color: #E0E0E0;">
                    <v-expansion-panel-title>
                      <span class="font-weight-bold">Price</span>
                      <template v-slot:actions>
                        <v-icon>mdi-minus</v-icon>
                      </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <div class="mb-4">
                        <div class="text-caption mb-2">Draft Price:</div>
                        <div class="d-flex align-items-center ga-2 mb-2">
                          <v-text-field
                            placeholder="Number Here"
                            variant="outlined"
                            density="compact"
                            hide-details
                          ></v-text-field>
                          <span>to</span>
                          <v-text-field
                            placeholder="Number Here"
                            variant="outlined"
                            density="compact"
                            hide-details
                          ></v-text-field>
                        </div>
                        <v-range-slider :min="1" :max="20" :step="1" strict thumb-label></v-range-slider>
                      </div>

                      <div class="mb-3">
                        <v-checkbox v-model="priceFilters.sTier" label="S-tier" hide-details density="compact"></v-checkbox>
                        <v-checkbox v-model="priceFilters.aTier" label="A-tier" hide-details density="compact"></v-checkbox>
                        <v-checkbox v-model="priceFilters.bTier" label="B-tier" hide-details density="compact"></v-checkbox>
                        <v-checkbox v-model="priceFilters.cTier" label="C-tier" hide-details density="compact"></v-checkbox>
                        <v-checkbox v-model="priceFilters.dTier" label="D-tier" hide-details density="compact"></v-checkbox>
                        <v-checkbox v-model="priceFilters.eTier" label="E-tier" hide-details density="compact"></v-checkbox>
                      </div>

                      <div>
                        <div class="text-caption mb-2">Tera Price:</div>
                        <div class="d-flex align-items-center ga-2 mb-2">
                          <v-text-field
                            placeholder="Number Here"
                            variant="outlined"
                            density="compact"
                            hide-details
                          ></v-text-field>
                          <span>to</span>
                          <v-text-field
                            placeholder="Number Here"
                            variant="outlined"
                            density="compact"
                            hide-details
                          ></v-text-field>
                        </div>
                        <v-range-slider :min="1" :max="20" :step="1" strict thumb-label></v-range-slider>
                      </div>

                      <div class="mt-3">
                        <v-checkbox v-model="priceFilters.oneType" label="1 Type" hide-details density="compact"></v-checkbox>
                        <v-checkbox v-model="priceFilters.twoTypes" label="2 Types" hide-details density="compact"></v-checkbox>
                        <v-checkbox v-model="priceFilters.threeTypes" label="3 Types" hide-details density="compact"></v-checkbox>
                        <v-checkbox v-model="priceFilters.fourTypes" label="4 Types" hide-details density="compact"></v-checkbox>
                      </div>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>

                <!-- Base Stats Filter -->
                <v-expansion-panels class="mb-4">
                  <v-expansion-panel style="background-color: #E0E0E0;">
                    <v-expansion-panel-title>
                      <span class="font-weight-bold">Base Stats</span>
                      <template v-slot:actions>
                        <v-icon>mdi-minus</v-icon>
                      </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <div class="d-flex flex-column ga-2">
                        <div class="d-flex align-items-center ga-2" v-for="stat in ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed', 'BST']" :key="stat">
                          <v-checkbox hide-details density="compact"></v-checkbox>
                          <span style="min-width: 80px; font-size: 0.875rem;">{{ stat }}:</span>
                          <v-select
                            :items="['At Least (≥)', 'At Most (≤)', 'Exactly (=)']"
                            variant="outlined"
                            density="compact"
                            hide-details
                            style="max-width: 120px; font-size: 0.75rem;"
                          ></v-select>
                          <v-text-field
                            placeholder="###"
                            variant="outlined"
                            density="compact"
                            hide-details
                            style="max-width: 60px;"
                          ></v-text-field>
                        </div>
                      </div>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>

                <!-- Types Filter -->
                <v-expansion-panels class="mb-4">
                  <v-expansion-panel style="background-color: #E0E0E0;">
                    <v-expansion-panel-title>
                      <span class="font-weight-bold">Types</span>
                      <template v-slot:actions>
                        <v-icon>mdi-minus</v-icon>
                      </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <div class="mb-3">
                        <div class="font-weight-bold mb-2 d-flex align-items-center">
                          Exact Type
                          <v-btn icon="mdi-plus" size="x-small" variant="text"></v-btn>
                        </div>
                      </div>
                      
                      <div class="mb-3">
                        <div class="font-weight-bold mb-2 d-flex align-items-center">
                          Resistances
                          <v-btn icon="mdi-plus" size="x-small" variant="text"></v-btn>
                        </div>
                      </div>

                      <div class="mb-3">
                        <div class="font-weight-bold mb-2 d-flex align-items-center">
                          Immunities
                          <v-btn icon="mdi-plus" size="x-small" variant="text"></v-btn>
                        </div>
                      </div>

                      <div>
                        <div class="font-weight-bold mb-2 d-flex align-items-center">
                          NOT this type
                          <v-btn icon="mdi-plus" size="x-small" variant="text"></v-btn>
                        </div>
                      </div>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>

              <!-- Main Content Area -->
              <v-col cols="12" md="9">
                <h1 class="text-h3 text-center mb-4" style="color: #000000;">Search Results!</h1>

                <!-- Tabs for Stats/Price -->
                <div class="d-flex justify-center mb-4">
                  <v-btn-toggle v-model="viewMode" mandatory>
                    <v-btn value="stats" style="background-color: white; color: #000000; text-transform: none !important;">Stats</v-btn>
                    <v-btn value="price" style="background-color: white; color: #000000; text-transform: none !important;">Price</v-btn>
                  </v-btn-toggle>
                </div>

                <!-- Quick Search and Pagination -->
                <div class="d-flex justify-space-between align-items-center mb-4 flex-wrap ga-3">
                  <div class="d-flex align-items-center ga-2">
                    <span>Quick Search:</span>
                    <v-text-field
                      placeholder="Enter Pokémon"
                      variant="outlined"
                      density="compact"
                      hide-details
                      style="max-width: 200px;"
                    ></v-text-field>
                  </div>

                  <div class="d-flex align-items-center ga-2 flex-wrap">
                    <v-pagination
                      v-model="currentPage"
                      :length="5"
                      :total-visible="5"
                      size="small"
                    ></v-pagination>
                    <span>Show</span>
                    <v-select
                      v-model="itemsPerPage"
                      :items="[10, 25, 50, 100]"
                      variant="outlined"
                      density="compact"
                      hide-details
                      style="max-width: 80px;"
                    ></v-select>
                    <span>Pokémon per page</span>
                  </div>
                </div>

                <!-- Results Table -->
                <v-table style="background-color: transparent;">
                  <thead>
                    <tr style="background-color: rgba(255, 255, 255, 0.5);">
                      <th class="text-center">#</th>
                      <th class="text-center">Pokemon</th>
                      <th class="text-center">Type</th>
                      <th class="text-center">HP</th>
                      <th class="text-center">Atk</th>
                      <th class="text-center">Def</th>
                      <th class="text-center">S.At</th>
                      <th class="text-center">S.Df</th>
                      <th class="text-center">Spd</th>
                      <th class="text-center">BST</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="i in 10" :key="i" style="background-color: rgba(255, 255, 255, 0.3);">
                      <td class="text-center">XXXX</td>
                      <td class="text-center">
                        <div class="d-flex flex-column align-items-center">
                          <v-img 
                            src="https://placehold.co/60x60/90EE90/000000?text=PKM"
                            width="60"
                            height="60"
                            class="mb-1"
                          ></v-img>
                          <span>Pokemon</span>
                        </div>
                      </td>
                      <td class="text-center">
                        <div class="d-flex flex-column align-items-center ga-1">
                          <v-chip size="small" style="background-color: #90EE90; color: #000000;">Type</v-chip>
                          <v-chip size="small" style="background-color: #9370DB; color: #FFFFFF;">Type</v-chip>
                        </div>
                      </td>
                      <td class="text-center">XXX</td>
                      <td class="text-center">XXX</td>
                      <td class="text-center">XXX</td>
                      <td class="text-center">XXX</td>
                      <td class="text-center">XXX</td>
                      <td class="text-center">XXX</td>
                      <td class="text-center">XXX</td>
                    </tr>
                  </tbody>
                </v-table>

                <!-- Bottom Pagination -->
                <div class="d-flex justify-center mt-4">
                  <v-pagination
                    v-model="currentPage"
                    :length="5"
                    :total-visible="5"
                  ></v-pagination>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const viewMode = ref('stats')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const priceFilters = ref({
  sTier: false,
  aTier: false,
  bTier: false,
  cTier: false,
  dTier: false,
  eTier: false,
  oneType: false,
  twoTypes: false,
  threeTypes: false,
  fourTypes: false,
})

const goToAdvancedSearch = () => {
  router.push({ path: '/search', query: { mode: 'advanced' } })
}
</script>

<style scoped>
.nav-button {
  text-transform: none !important;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  letter-spacing: 0;
  color: #000000;
}
</style>