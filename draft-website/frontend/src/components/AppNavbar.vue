<template>
  <v-app-bar color="accent" elevation="0" height="80">
    <v-container fluid class="d-flex align-center justify-space-between px-8">
      <div class="text-h5 text-white font-weight-bold">
        {{ config.siteName }}
      </div>
      <div class="d-flex ga-3">
        <v-btn
          v-for="item in config.navigation.main"
          :key="item.path"
          :color="item.color"
          variant="flat"
          size="large"
          class="nav-button"
          :to="item.path"
        >
          {{ item.name }}
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { siteConfig as config } from '@/config/siteConfig.ts'
</script>

<style scoped>
.nav-button {
  text-transform: none !important;
}
</style>