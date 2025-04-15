<template>
  <v-app>
    <v-main class="pa-0 ma-0">
      <div class="fill-height position-relative">
        <!-- Video/Image section -->
        <div class="video-section">
          <img src="../../assets/aicoach1.png" alt="Accent coach" class="fill-height-image" />

          <v-btn  @click="$emit('back')" icon variant="text" class="back-button" size="large">
            <v-icon size="x-large" color="white">mdi-chevron-left</v-icon>
          </v-btn>
          <!-- Sound button -->
          <v-btn icon variant="text" class="sound-button" size="large">
            <v-icon size="x-large" color="white">mdi-volume-high</v-icon>
          </v-btn>

          <!-- Coach message bubble -->
          <div class="coach-message">
            <v-sheet color="rgba(128, 128, 128, 0.8)" class="px-4 py-5 rounded-lg">
              <p class="text-center text-white text-h6 font-weight-regular">
                I'm your fitness coach, Eliza. What's your name?
              </p>
            </v-sheet>
          </div>
        </div>

        <!-- Form section -->
        <div class="form-section">
          <v-container class="px-6 py-8">
            <h1 class="text-h3 text-white text-center mb-8">What is your name?</h1>

            <v-text-field placeholder="Your Name" label="Your Name" flat single-line variant="solo" rounded class="custom-input mb-12" />





          </v-container>


        </div>
        <div class="action-button"> <v-btn  @click="$emit('next')" block height="56" rounded="pill" class="next-button text-h6 text-white">
            Next
          </v-btn>

          <!-- <div class="text-center">
            <span class="text-white text-subtitle-1">Already have an account?</span>
            <v-btn variant="text" class="text-subtitle-1 font-weight-bold text-decoration-underline ml-1 pa-0"
              style="text-transform: none; color: white; text-decoration: underline;">
              Log In
            </v-btn>
          </div> -->
        </div>
      </div>
    </v-main>
  </v-app>
</template>



<style scoped>
.position-relative {
  position: relative;
}

.video-section {
  position: relative;
  height: 50vh;
  overflow: hidden;
}

.fill-height-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: top;
  position: fixed;
}

.action-button {
  width: 100%;
  position: fixed;
  bottom: 20px;
  padding: 16px;
  padding-bottom: 0;
}

.sound-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(128, 128, 128, 0.7) !important;
  width: 50px !important;
  height: 50px !important;
  border-radius: 50% !important;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(128, 128, 128, 0.7) !important;
  width: 50px !important;
  height: 50px !important;
  border-radius: 50% !important;
}

.coach-message {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
}

.form-section {
  position: relative;
  background-color: #121212;
  min-height: 50vh;
}

.next-button {
  background: linear-gradient(to right, #f06543, #e94976) !important;
  font-weight: 500 !important;
}

.custom-nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  background-color: black;
  z-index: 3;
  display: flex;
  align-items: center;
}

.custom-input :deep(.v-input__control) {
  background-color: #2B2C30;
  /* Adjusted dark background */
  border-radius: 999px !important;
  color: white !important;
}


.custom-input :deep(.v-field__input) {
  background-color: #2B2C30;
  /* Adjusted dark background */
  border-radius: 999px !important;
  color: white !important;
}

.custom-input :deep(input) {
  color: white !important;
  background-color: #2B2C30;
  ;
  border-radius: 999px !important;
  padding-left: 20px;
}

:deep(.v-field) {

  border-radius: 999px !important;

}

.custom-input :deep(.v-label) {
  color: white !important;
}

.custom-input :deep(input::placeholder) {
  color: rgba(255, 255, 255, 0.7);
  /* Makes placeholder clearly visible */
  opacity: 1;
  /* Ensures full visibility */
  font-size: 16px;
}

:deep(.v-field__overlay){
  background-color: #2B2C30 !important;
}
</style>

<script setup>
import { ref } from 'vue';
import AppButton from '@/components/assessment/common/AppButton.vue';
import AppInput from '@/components/assessment/common/AppInput.vue';
import VideoPlaceholder from '@/components/assessment/common/VideoPlaceholder.vue';

const emit = defineEmits(['next', 'back', 'update:userData']);
const name = ref('');

const nameRules = [
  v => !!v || 'Name is required',
  v => v.length <= 50 || 'Name must be less than 50 characters'
];

function handleContinue() {
  if (name.value.trim()) {
    emit('update:userData', 'name', name.value.trim());
    emit('next');
  }
}
</script>