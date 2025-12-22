<template>
  <v-app>
    <!-- Top Navigation Bar -->
    <v-app-bar
      color="accent"
      elevation="0"
      height="80"
    >
      <v-container fluid class="d-flex align-center justify-space-between px-8">
        <!-- Logo/Title -->
        <div class="text-h5 text-white font-weight-bold">
          {{ config.siteName }}
        </div>

        <!-- Navigation Buttons -->
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

    <!-- Main Content -->
    <v-main class="page-background">
      <v-container fluid class="py-16">
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <!-- Secondary Navigation -->
            <div class="secondary-nav mb-8">
              <div class="text-h5 text-white font-weight-bold">
                {{ config.siteName }}
              </div>

              <div class="d-flex ga-3 align-center">
                <v-btn
                  v-for="item in config.navigation.secondary"
                  :key="item.path"
                  :color="item.color"
                  variant="flat"
                  size="large"
                  class="nav-button"
                  :to="item.path"
                >
                  {{ item.name }}
                </v-btn>

                <!-- Other Tools Dropdown -->
                <v-menu offset-y>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      :color="config.navigation.dropdown.color"
                      variant="flat"
                      size="large"
                      class="nav-button"
                      v-bind="props"
                    >
                      {{ config.navigation.dropdown.label }}
                      <v-icon end>mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list style="background-color: #FFFFFF;">
                    <v-list-item
                      v-for="item in config.navigation.dropdown.items"
                      :key="item.path"
                      :to="item.path"
                    >
                      <v-list-item-title style="color: #000000;">
                        {{ item.name }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </div>

            <!-- Main Content Box -->
            <v-card
              color="surface"
              elevation="0"
              class="pa-12 content-card"
            >
              <!-- Welcome Section -->
              <div class="content-section mb-12">
                <p class="text-h6 text-center content-text">
                  {{ config.homeContent.welcome }}
                </p>
              </div>

              <!-- Data Sheet Link Section -->
              <div class="content-section mb-12">
                <a :href="config.homeContent.dataSheetUrl" class="content-link">
                  <p class="text-h6 text-center content-text">
                    {{ config.homeContent.dataSheetLabel }}
                  </p>
                </a>
              </div>

              <!-- Submit Battle Section -->
              <div class="content-section mb-12">
                <a :href="config.homeContent.battleSubmitUrl" class="content-link">
                  <p class="text-h6 text-center content-text">
                    {{ config.homeContent.battleSubmitLabel }}
                  </p>
                </a>
              </div>

              <!-- Learn Section -->
              <div class="content-section">
                <a :href="config.homeContent.learnVideoUrl" class="content-link">
                  <p class="text-h6 text-center content-text">
                    {{ config.homeContent.learnLabel }}
                  </p>
                </a>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { siteConfig } from '@/config/siteConfig.ts'

const config = siteConfig
</script>

<style scoped>
.page-background {
  background-color: rgb(var(--v-theme-background));
}

.secondary-nav {
  background-color: rgb(var(--v-theme-accent));
  padding: 16px 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-button {
  text-transform: none !important;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  letter-spacing: 0;
  color: rgb(var(--v-theme-on-primary));
}

.content-card {
  border-radius: 12px;
}

.content-section {
  font-family: 'Inter', sans-serif;
}

.content-text {
  color: rgb(var(--v-theme-on-surface));
  margin: 0;
}

.content-link {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: opacity 0.2s;
}

.content-link:hover {
  opacity: 0.8;
}
</style>