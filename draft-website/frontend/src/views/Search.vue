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
            <!-- Simple Search Component -->
            <SimpleSearch 
              v-if="searchMode === 'simple'" 
              @switch-to-advanced="searchMode = 'advanced'"
            />

            <!-- Advanced Search Component -->
            <AdvancedSearch 
              v-else-if="searchMode === 'advanced'"
              @switch-to-simple="searchMode = 'simple'"
              @switch-to-giga="searchMode = 'giga'"
            />

            <!-- GIGA ADVANCED Component -->
            <GigaAdvanced 
              v-else-if="searchMode === 'giga'" 
              @switch-to-advanced="searchMode = 'advanced'"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SimpleSearch from '@/views/search/SimpleSearch.vue'
import AdvancedSearch from '@/views/search/AdvancedSearch.vue'
import GigaAdvanced from '@/views/search/GigaAdvanced.vue'

const route = useRoute()

const searchMode = ref<'simple' | 'advanced' | 'giga'>('simple')

// Query parameter on mount to set initial mode
onMounted(() => {
  if (route.query.mode === 'advanced') {
    searchMode.value = 'advanced'
  } else if (route.query.mode === 'giga') {
    searchMode.value = 'giga'
  }
})

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

</style>