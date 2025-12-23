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
            <v-card 
              elevation="0" 
              class="pa-12"
              style="background-color: #FFE1AD; border-radius: 12px;"
            >
              <h1 class="text-h3 text-center mb-12" style="color: #000000;">I want to learn about...</h1>

              <v-row>
                <!-- Pokémon! and Draft League! on same row -->
                <v-col cols="12" md="6" class="mb-6">
                  <v-expansion-panels>
                    <v-expansion-panel class="learn-panel">
                      <v-expansion-panel-title class="learn-panel-title">
                        <span class="panel-title-text">Pokémon!</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="learn-panel-content">
                        <v-row dense>
                          <!-- 100: Intro to Pokémon -->
                          <v-col cols="12">
                            <div class="video-item">
                              <p class="video-title">100: Intro to Pokémon</p>
                              <a href="https://youtu.be/gM5ivAGfHMI?si=j5SdN1kzodogO0-k" target="_blank" class="video-link">
                                <div class="video-thumbnail">
                                  <iframe 
                                    width="100%" 
                                    height="200"
                                    src="https://www.youtube.com/embed/gM5ivAGfHMI" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                  ></iframe>
                                </div>
                              </a>
                            </div>
                          </v-col>

                          <!-- 101: Intro to Gen 9 -->
                          <v-col cols="12">
                            <div class="video-item">
                              <p class="video-title">101: Intro to Gen 9</p>
                              <a href="https://youtu.be/BUmxuXVBDCE?si=4iQYUaSPtqowQBgx" target="_blank" class="video-link">
                                <div class="video-thumbnail">
                                  <iframe 
                                    width="100%" 
                                    height="200"
                                    src="https://www.youtube.com/embed/BUmxuXVBDCE" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                  ></iframe>
                                </div>
                              </a>
                            </div>
                          </v-col>
                        </v-row>

                        <a href="#" class="content-link">
                          <p class="text-h3 text-center content-text">Other Resources</p>
                        </a>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>

                <v-col cols="12" md="6" class="mb-6">
                  <v-expansion-panels>
                    <v-expansion-panel class="learn-panel">
                      <v-expansion-panel-title class="learn-panel-title">
                        <span class="panel-title-text">Draft League!</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="learn-panel-content">
                        <v-row dense>
                          <!-- 102: Intro to Draft League! -->
                          <v-col cols="12">
                            <div class="video-item">
                              <p class="video-title">102: Intro to Draft League!</p>
                              <a href="https://youtu.be/SGcSMyjJLAo?si=MIkoS0iT1DgNWtRw" target="_blank" class="video-link">
                                <div class="video-thumbnail">
                                  <iframe 
                                    width="100%" 
                                    height="200"
                                    src="https://www.youtube.com/embed/SGcSMyjJLAo" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                  ></iframe>
                                </div>
                              </a>
                            </div>
                          </v-col>

                          <!-- 103: This year's format! -->
                          <v-col cols="12">
                            <div class="video-item">
                              <p class="video-title">103: This year's format!</p>
                              <a href="https://youtu.be/cygPyNreM3I?si=P2TlKuLNNnGMxhmF" target="_blank" class="video-link">
                                <div class="video-thumbnail">
                                  <iframe 
                                    width="100%" 
                                    height="200"
                                    src="https://www.youtube.com/embed/cygPyNreM3I" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                  ></iframe>
                                </div>
                              </a>
                            </div>
                          </v-col>
                        </v-row>

                        <a href="#" class="content-link">
                          <p class="text-h3 text-center content-text">Other Resources</p>
                        </a>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>

                <!-- Drafting a Roster! (full width) -->
                <v-col cols="12" class="mb-6">
                  <v-expansion-panels>
                    <v-expansion-panel class="learn-panel">
                      <v-expansion-panel-title class="learn-panel-title">
                        <span class="panel-title-text">Drafting a Roster!</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="learn-panel-content">
                        <v-row dense>
                          <!-- First row: 3 videos -->
                          <v-col cols="12" md="4">
                            <div class="video-item">
                              <p class="video-title">200: Roster drafting overview</p>
                              <a href="https://youtu.be/LNDw4Z7trPk?si=O7HG8EYxc5K8MfyZ" target="_blank" class="video-link">
                                <div class="video-thumbnail">
                                  <iframe 
                                    width="100%" 
                                    height="180"
                                    src="https://www.youtube.com/embed/LNDw4Z7trPk" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                  ></iframe>
                                </div>
                              </a>
                            </div>
                          </v-col>

                          <v-col cols="12" md="4">
                            <div class="video-item">
                              <p class="video-title">201: Types and Cores</p>
                              <a href="https://youtu.be/uzik3fw2cBo?si=4Cent0rDm6Rv7OvR" target="_blank" class="video-link">
                                <div class="video-thumbnail">
                                  <iframe 
                                    width="100%" 
                                    height="180"
                                    src="https://www.youtube.com/embed/uzik3fw2cBo" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                  ></iframe>
                                </div>
                              </a>
                            </div>
                          </v-col>

                          <v-col cols="12" md="4">
                            <div class="video-item">
                              <p class="video-title">202: Learnsets</p>
                              <a href="https://youtu.be/wJBvyMpROa4?si=tFzi-mVGAz3AhAhh" target="_blank" class="video-link">
                                <div class="video-thumbnail">
                                  <iframe 
                                    width="100%" 
                                    height="180"
                                    src="https://www.youtube.com/embed/wJBvyMpROa4" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                  ></iframe>
                                </div>
                              </a>
                            </div>
                          </v-col>

                          <!-- Second row: 2 videos -->
                          <v-col cols="12" md="6">
                            <div class="video-item">
                              <p class="video-title">203: Speed Tiers</p>
                              <a href="https://youtu.be/WgImC3TAo-Q?si=dmmia-57XdthRmb4" target="_blank" class="video-link">
                                <div class="video-thumbnail">
                                  <iframe 
                                    width="100%" 
                                    height="180"
                                    src="https://www.youtube.com/embed/WgImC3TAo-Q" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                  ></iframe>
                                </div>
                              </a>
                            </div>
                          </v-col>

                          <v-col cols="12" md="6">
                            <div class="video-item">
                              <p class="video-title">204: Other roles and nuances</p>
                              <a href="https://youtu.be/nVtP-mclunI?si=Bb3SCCEYPSGVqQqX" target="_blank" class="video-link">
                                <div class="video-thumbnail">
                                  <iframe 
                                    width="100%" 
                                    height="180"
                                    src="https://www.youtube.com/embed/nVtP-mclunI" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                  ></iframe>
                                </div>
                              </a>
                            </div>
                          </v-col>
                        </v-row>

                        <a href="#" class="content-link">
                          <p class="text-h3 text-center content-text">Other Resources</p>
                        </a>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>

                <!-- Making a Team! (full width) -->
                <v-col cols="12" class="mb-6">
                  <v-expansion-panels>
                    <v-expansion-panel class="learn-panel">
                      <v-expansion-panel-title class="learn-panel-title">
                        <span class="panel-title-text">Making a Team!</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="learn-panel-content">
                        <v-row dense>
                          <v-col cols="12" md="6">
                            <div class="video-item">
                              <p class="video-title">300: Teambuilding overview!</p>
                              <a href="https://youtu.be/5t-rrjvS04Y?si=J330cRnbJ6HTkgyB" target="_blank" class="video-link">
                                <div class="video-thumbnail">
                                  <iframe 
                                    width="100%" 
                                    height="200"
                                    src="https://www.youtube.com/embed/5t-rrjvS04Y" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                  ></iframe>
                                </div>
                              </a>
                            </div>
                          </v-col>

                          <v-col cols="12" md="6">
                            <div class="video-item">
                              <p class="video-title">301: Making a Plan</p>
                              <a href="https://youtu.be/c_P0aG-UFWo?si=0MSPP444oBISMqQX" target="_blank" class="video-link">
                                <div class="video-thumbnail">
                                  <iframe 
                                    width="100%" 
                                    height="200"
                                    src="https://www.youtube.com/embed/c_P0aG-UFWo" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                  ></iframe>
                                </div>
                              </a>
                            </div>
                          </v-col>

                          <v-col cols="12" md="6">
                            <div class="video-item">
                              <p class="video-title">302: EV optimization</p>
                              <a href="https://youtu.be/Xq3ERFBTFmo?si=K-MpI3USvTGpKasD" target="_blank" class="video-link">
                                <div class="video-thumbnail">
                                  <iframe 
                                    width="100%" 
                                    height="200"
                                    src="https://www.youtube.com/embed/Xq3ERFBTFmo" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                  ></iframe>
                                </div>
                              </a>
                            </div>
                          </v-col>

                          <v-col cols="12" md="6">
                            <div class="video-item">
                              <p class="video-title">303: Mock Battles and more thoughts</p>
                              <a href="https://youtu.be/cZiL7KrmpAI?si=eq_3Jdl3f72IrQRj" target="_blank" class="video-link">
                                <div class="video-thumbnail">
                                  <iframe 
                                    width="100%" 
                                    height="200"
                                    src="https://www.youtube.com/embed/cZiL7KrmpAI" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                  ></iframe>
                                </div>
                              </a>
                            </div>
                          </v-col>
                        </v-row>

                        <a href="#" class="content-link">
                          <p class="text-h3 text-center content-text">Other Resources</p>
                        </a>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>

                <!-- Having a successful battle! (full width) -->
                <v-col cols="12">
                  <v-expansion-panels>
                    <v-expansion-panel class="learn-panel">
                      <v-expansion-panel-title class="learn-panel-title">
                        <span class="panel-title-text">Having a successful battle!</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="learn-panel-content">
                        <v-row dense>
                          <v-col cols="12">
                            <div class="video-item">
                              <p class="video-title">400: General Tips</p>
                              <a href="https://youtu.be/OjzPVD0IHGQ?si=y7jad_Dtk3IpB8Dp" target="_blank" class="video-link">
                                <div class="video-thumbnail">
                                  <iframe 
                                    width="100%" 
                                    height="300"
                                    src="https://www.youtube.com/embed/OjzPVD0IHGQ" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                  ></iframe>
                                </div>
                              </a>
                            </div>
                          </v-col>
                        </v-row>

                        <a href="#" class="content-link">
                          <p class="text-h3 text-center content-text">Other Resources</p>
                        </a>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// No state needed - expansion panels handle their own state
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

.learn-panel {
  background-color: #D9D9D9 !important;
  border: 2px solid #000000;
  border-radius: 8px;
  margin-bottom: 0 !important;
}

.learn-panel-title {
  min-height: 60px;
  background-color: #D9D9D9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
}

.learn-panel-title :deep(.v-expansion-panel-title__overlay) {
  background-color: transparent;
}

/* Force the title to be centered */
.learn-panel-title :deep(.v-expansion-panel-title__icon) {
  position: absolute !important;
  right: 16px !important;
  margin: 0 !important;
}

.panel-title-text {
  font-size: 1.25rem;
  font-weight: 500;
  color: #000000;
  font-family: 'Inter', sans-serif;
  text-align: center;
  width: 100%;
}

.learn-panel-content {
  background-color: #D9D9D9;
  padding: 16px;
}

.video-item {
  margin-bottom: 16px;
}

.video-title {
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
  margin-bottom: 8px;
  text-align: center;
}

.video-link {
  display: block;
  text-decoration: none;
}

.video-thumbnail {
  background-color: #666666;
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 16/9;
}

.video-thumbnail iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.content-link {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: opacity 0.2s;
  margin-top: 24px;
}

.content-link:hover {
  opacity: 0.8;
}

.content-text {
  color: #000000;
  margin: 0;
}
</style>