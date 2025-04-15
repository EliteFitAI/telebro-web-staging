<template>
  <v-container class="pa-0 fill-height" fluid>
    <v-row no-gutters class="fill-height">
      <v-col cols="12" class="position-relative">
        <!-- Background image placeholder -->
        <div class="image-container">
          <img src="../../assets/aicoach1.png" alt="Video call person" class="fill-height-image" />
        </div>

        <!-- Navigation buttons -->
        <v-btn
          icon
          color="grey lighten-1"
          class="back-button"
          density="comfortable"
          size="large"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <v-btn
          icon
          color="grey lighten-1"
          class="sound-button"
          density="comfortable"
          size="large"
        >
          <v-icon>mdi-volume-high</v-icon>
        </v-btn>

        <!-- Bottom controls -->
        <div class="bottom-controls">
          <!-- Message bubble -->
          <v-card
            flat
            color="rgba(255, 255, 255, 0.5)"
            class="message-bubble text-center mb-3"
            rounded="pill"
          >
            <v-card-text class="bz--text text-subtitle-1">
              <p>Welcome to EliteFit.AI</p>
            </v-card-text>
          </v-card>

          <!-- Action button -->
          <v-btn
            block
            rounded="pill"
            height="56"
            @click="$emit('next')"
            class="action-button text-h6 font-weight-medium text-white"
          >
            Let's Begin
          </v-btn>
        </div>

        <!-- Bottom navigation bar -->
     
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import AppButton from '@/components/assessment/common/AppButton.vue';
import VideoPlaceholder from '@/components/assessment/common/VideoPlaceholder.vue';
defineEmits(['next']);
</script>

<style scoped>
.position-relative {
  position: relative;
}

.image-container {
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.fill-height-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.back-button {
  position: absolute;
  top: 32px;
  left: 16px;
  z-index: 2;
  background-color: rgba(128, 128, 128, 0.7) !important;
  color:white !important;
}

.sound-button {
  position: absolute;
  top: 32px;
  right: 16px;
  z-index: 2;
  color:white !important;
  background-color: rgba(128, 128, 128, 0.7) !important;
}

.bottom-controls {
  position: absolute;
  bottom: 20px;
  left: 16px;
  right: 16px;
  z-index: 2;
}

.message-bubble {
  margin-bottom: 12px !important;
  color: white !important;
}

.action-button {
  font-weight: 700;
  font-size: 20px !important;
  background: linear-gradient(to right, #ef5350, #ec407a) !important;
}

.nav-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
}

:deep(.v-card-text){
  padding: 12px !important;
  font-size: 16px !important;
  color: black !important;
  font-weight: 600 !important;
}
</style>