<template>
  <v-app>
    <v-main class="pa-0 ma-0">
      <div class="fill-height position-relative">
        <!-- Video/Image section -->
        <div class="video-section">
          <img src="../../assets/aicoach1.png" alt="Accent coach" class="fill-height-image" />

          <v-btn @click="$emit('back')" icon variant="text" class="back-button" size="large">
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
                Where can we reach you with progress updates?
              </p>
            </v-sheet>
          </div>
        </div>

        <!-- Form section -->
        <div class="form-section">
          <v-container class="px-6 py-8">
            <h1 class="text-h3 text-white text-center mb-8">Create Your Account</h1>

            <v-text-field 
              placeholder="Your Email" 
              :rules="emailRules" 
              label="Enter your email" 
              v-model="email" 
              flat
              single-line 
              variant="solo" 
              rounded 
              class="custom-input mb-6" 
            />

            <v-text-field 
              :type="showPassword ? 'text' : 'password'"
              placeholder="Your Password" 
              :rules="passwordRules" 
              label="Enter password" 
              v-model="password" 
              flat
              single-line 
              variant="solo" 
              rounded 
              class="custom-input mb-6"
            >
              <template v-slot:append-inner>
                <v-btn
                  icon
                  variant="text"
                  @click="showPassword = !showPassword"
                  class="password-toggle"
                >
                  <v-icon color="white">
                    {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
                  </v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-container>
        </div>
        <div class="action-button">
          <v-btn @click="$emit('next')" block height="56" rounded="pill" class="next-button text-h6 text-white">
            Next
          </v-btn>
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

.custom-input :deep(.v-input__control) {
  background-color: #2B2C30;
  border-radius: 999px !important;
  color: white !important;
}

.custom-input :deep(.v-field__input) {
  background-color: #2B2C30;
  border-radius: 999px !important;
  color: white !important;
}

.custom-input :deep(input) {
  color: white !important;
  background-color: #2B2C30;
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
  opacity: 1;
  font-size: 16px;
}

:deep(.v-field__overlay) {
  background-color: #2B2C30 !important;
}

/* New styles for password toggle button */


:deep(.v-field__append-inner) {
  padding: 0 !important;
  align-self: center;
}
</style>

<script setup>
import { computed, ref } from 'vue';
import AppButton from '@/components/assessment/common/AppButton.vue';
import AppInput from '@/components/assessment/common/AppInput.vue';
import VideoPlaceholder from '@/components/assessment/common/VideoPlaceholder.vue';

const emit = defineEmits(['next', 'back', 'update:userData']);
const email = ref('');
const password = ref('');
const showPassword = ref(false);

const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'Email must be valid',
  v => v.length <= 100 || 'Email must be less than 100 characters'
];

const passwordRules = [
  v => !!v || 'Password is required',
  v => v.length >= 8 || 'Password must be at least 8 characters',
  v => /\d/.test(v) || 'Password must contain at least one number',
  v => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter'
];

const isValidPassword = computed(() => {
  return (
    password.value &&
    password.value.length >= 8 &&
    /\d/.test(password.value) &&
    /[A-Z]/.test(password.value)
  );
});

function handleContinue() {
  if (email.value.trim()) {
    emit('update:userData', 'name', email.value.trim());
    emit('next');
  }
}
</script>