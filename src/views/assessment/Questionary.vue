<template>
  <v-app>
    <v-main class="pa-0 ma-0">
      <div class="fill-height position-relative">
        <!-- Video/Image section -->
        <div class="video-section">
          <img :src="steps[currentStep].backgroundImage || '/src/assets/aicoach1.png'" alt="Coach" class="fill-height-image" />

          <!-- Back button -->
          <v-btn icon variant="text" class="back-button" size="large" @click="goBack">
            <v-icon size="x-large" color="white">mdi-chevron-left</v-icon>
          </v-btn>
          
          <!-- Sound button -->
          <v-btn icon variant="text" class="sound-button" size="large">
            <v-icon size="x-large" color="white">mdi-volume-high</v-icon>
          </v-btn>

          <!-- Coach message bubble with transition -->
          <transition name="fade">
            <div class="coach-message" v-if="steps[currentStep].coachMessage">
              <v-sheet color="rgba(128, 128, 128, 0.8)" class="px-4 py-2 rounded-lg">
                <p class="text-center text-white text-body-1 font-weight-regular">
                  {{ steps[currentStep].coachMessage }}
                </p>
              </v-sheet>
            </div>
          </transition>
        </div>

        <!-- Form section with transition -->
        <div class="form-section">
          <v-container class="px-6 py-6">
            <transition name="fade" mode="out-in">
              <div :key="currentStep">
                <h1 class="text-h4 text-white text-center mb-4">
                  {{ steps[currentStep].title }}
                </h1>
                
                <p v-if="steps[currentStep].subtitle" class="text-subtitle-1 text-center text-gray mb-6">
                  {{ steps[currentStep].subtitle }}
                </p>

                <!-- Different input types based on step type -->
                <div class="input-container">
                  <!-- Single or Multiple Selection Options -->
                  <div v-if="['singleSelect', 'multiSelect'].includes(steps[currentStep].type)" class="options-container">
                    <v-btn
                      v-for="(option, index) in steps[currentStep].options"
                      :key="index"
                      block
                      rounded="pill"
                      variant="outlined"
                      height="56"
                      class="option-button mb-4"
                      :class="{ 'selected-option': isOptionSelected(option.value) }"
                      @click="toggleOption(option.value)"
                    >
                      <div class="d-flex align-center w-100">
                        <v-icon v-if="option.icon" class="mr-3" color="white">{{ option.icon }}</v-icon>
                        <v-icon v-if="steps[currentStep].type === 'multiSelect'" class="mr-2" :color="isOptionSelected(option.value) ? 'white' : 'transparent'">
                          mdi-check
                        </v-icon>
                        <span class="text-white text-subtitle-1">{{ option.label }}</span>
                      </div>
                    </v-btn>

                    <v-text-field 
                      v-if="showTextInput && steps[currentStep].allowCustomInput"
                      v-model="customInputValue"
                      label="Tell us more"
                      flat
                      single-line 
                      variant="solo" 
                      rounded 
                      class="custom-input mb-6" 
                    />
                  </div>

                  <!-- Pain Level Slider -->
                  <div v-else-if="steps[currentStep].type === 'slider'" class="slider-container">
                    <div class="pain-scale mb-4">
                      <div class="d-flex justify-space-between">
                        <span class="text-white">{{ steps[currentStep].sliderConfig.min }} ({{ steps[currentStep].sliderConfig.minLabel }})</span>
                        <span class="text-white">{{ steps[currentStep].sliderConfig.max }} ({{ steps[currentStep].sliderConfig.maxLabel }})</span>
                      </div>
                    </div>
                    
                    <v-slider
                      v-model="sliderValue"
                      :min="steps[currentStep].sliderConfig.min"
                      :max="steps[currentStep].sliderConfig.max"
                      :step="1"
                      thumb-label="always"
                      color="orange"
                      track-color="rgba(255,255,255,0.3)"
                    >
                      <template v-slot:thumb-label="{ modelValue }">
                        {{ getEmojiForPainLevel(modelValue) }}
                      </template>
                    </v-slider>
                    
                    <div class="pain-score text-center mt-6">
                      <div class="text-h4 text-orange-lighten-1">{{ sliderValue }}%</div>
                      <div class="text-subtitle-1 text-gray mt-2">{{ getPainLevelDescription(sliderValue) }}</div>
                    </div>
                  </div>
                  
                  <!-- Text input -->
                  <div v-else-if="steps[currentStep].type === 'textInput'" class="text-input-container">
                    <v-textarea
                      v-model="textInputValue"
                      :label="steps[currentStep].inputLabel || 'Please specify'"
                      variant="outlined"
                      color="white"
                      bg-color="#1E1E1E"
                      rows="4"
                      auto-grow
                      class="mb-6"
                      hide-details
                    ></v-textarea>
                  </div>
                  
                  <!-- Red Flag Warning -->
                  <div v-else-if="steps[currentStep].type === 'warning'" class="warning-container text-center">
                    <v-icon size="64" color="red" class="mb-4">mdi-alert-circle</v-icon>
                    <p class="text-h5 text-white mb-4">{{ steps[currentStep].message }}</p>
                    <p class="text-subtitle-1 text-gray">{{ steps[currentStep].submessage }}</p>
                  </div>
                </div>
              </div>
            </transition>
          </v-container>
        </div>

        <!-- Next button -->
        <div class="action-button">
          <v-btn 
            @click="handleContinue" 
            block 
            height="56" 
            rounded="pill" 
            class="next-button text-h6 text-white"
            :readonly="!canContinue"
          >
            {{ steps[currentStep].nextButtonText || 'Next' }}
          </v-btn>
        </div>

        <!-- Navigation dots -->
        <div class="navigation-dots py-2">
          <div class="d-flex justify-center">
            <div 
              v-for="(step, index) in totalVisibleSteps" 
              :key="index"
              class="dot mx-1" 
              :class="{ 'active': index <= currentVisibleStepIndex }"
            ></div>
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const emit = defineEmits(['complete', 'update:userData']);

// Assessment data storage
const assessmentData = ref({});

// Current step tracking
const currentStep = ref(0);
const currentVisibleStepIndex = ref(0);

// Input values for different step types
const selectedOptions = ref([]);
const sliderValue = ref(5);
const textInputValue = ref('');
const customInputValue = ref('');
const router = useRouter()
// Define all steps in the assessment
const steps = ref([
  // Panel 2: Personal Reason ("Why")
  {
    title: "Why is this important to you?",
    subtitle: "Select one that applies",
    type: "singleSelect",
    allowCustomInput: true,
    backgroundImage: "/src/assets/aicoach1.png",
    coachMessage: "Tell me why you're doing this exercise?",
    options: [
      { label: "I want to move without pain", value: "no_pain", icon: "mdi-run" },
      { label: "I need to return to work or daily life", value: "return_to_work", icon: "mdi-briefcase" },
      { label: "I want to avoid surgery or medication", value: "avoid_surgery", icon: "mdi-pill" },
      { label: "I'm an athlete recovering from injury", value: "athlete_recovery", icon: "mdi-weight-lifter" },
      { label: "Write your reason", value: "custom", icon: "mdi-pencil" }
    ],
    dataKey: "personalReason",
    visibleInProgress: true
  },
  
  // Panel 3: Pain Level
  {
    title: "How would you rate your current pain level?",
    subtitle: "Slide to select your pain level",
    type: "slider",
    backgroundImage: "/src/assets/aicoach1.png",
    coachMessage: "Let's assess your current pain level",
    sliderConfig: {
      min: 0,
      max: 10,
      minLabel: "No pain",
      maxLabel: "Worst pain"
    },
    dataKey: "painLevel",
    visibleInProgress: true
  },
  
  // Panel 4a: Red Flag Symptoms
  {
    title: "Are you experiencing any of the following?",
    subtitle: "Select all that apply",
    type: "multiSelect",
    backgroundImage: "/src/assets/aicoach1.png",
    coachMessage: "Let me know if you have any concerning symptoms",
    options: [
      { label: "Unusual fatigue", value: "fatigue", icon: "mdi-sleep" },
      { label: "Numbness in lower back/buttocks", value: "numbness", icon: "mdi-human-handsdown" },
      { label: "Dizziness", value: "dizziness", icon: "mdi-rotate-3d-variant" },
      { label: "Difficulty with bladder/bowel control", value: "bladder_bowel", icon: "mdi-water" },
      { label: "None of the above", value: "none", icon: "mdi-close-circle" }
    ],
    dataKey: "redFlagSymptoms",
    visibleInProgress: true,
    conditionalNextStep: (data) => {
      // If any symptom selected other than "none", go to warning panel
      return data.includes("none") ? 5 : 4;
    }
  },
  
  // Panel 4b: Prompt to stop and go to doctor
  {
    title: "Please stop the assessment and go and see a doctor",
    submessage: "Your symptoms may require immediate medical attention",
    type: "warning",
    backgroundImage: "/src/assets/aicoach1.png",
    nextButtonText: "I understand",
    dataKey: "doctorReferral",
    visibleInProgress: false
  },
  
  // Panel 5: Prior Injuries or Conditions
  {
    title: "Do you have any prior injuries, surgeries, or ongoing health conditions?",
    subtitle: "Select all that apply",
    type: "multiSelect",
    allowCustomInput: true,
    backgroundImage: "/src/assets/aicoach1.png",
    coachMessage: "Let's talk about your medical history",
    options: [
      { label: "Previous injuries", value: "injuries", icon: "mdi-bandage" },
      { label: "Surgeries", value: "surgeries", icon: "mdi-hospital" },
      { label: "Chronic conditions", value: "chronic", icon: "mdi-chart-line" },
      { label: "None of the above", value: "none", icon: "mdi-check-circle" }
    ],
    dataKey: "priorConditions",
    visibleInProgress: true
  },
  
  // Panel 6: Previous Treatment
  {
    title: "Have you received treatment for this before?",
    type: "singleSelect",
    allowCustomInput: true,
    backgroundImage: "/src/assets/aicoach1.png",
    coachMessage: "Tell me about previous treatments",
    options: [
      { label: "Yes", value: "yes", icon: "mdi-check" },
      { label: "No", value: "no", icon: "mdi-close" }
    ],
    dataKey: "previousTreatment",
    visibleInProgress: true
  },
  
  // Panel 7: Affected Activities
  {
    title: "Which activities are affected by your pain?",
    subtitle: "Select all that apply",
    type: "multiSelect",
    allowCustomInput: true,
    backgroundImage: "/src/assets/aicoach1.png",
    coachMessage: "What activities cause you discomfort?",
    options: [
      { label: "Walking", value: "walking", icon: "mdi-walk" },
      { label: "Standing", value: "standing", icon: "mdi-human-handsup" },
      { label: "Sitting", value: "sitting", icon: "mdi-seat" },
      { label: "Bending", value: "bending", icon: "mdi-human-handsdown" },
      { label: "Lifting", value: "lifting", icon: "mdi-weight" },
      { label: "Sleeping", value: "sleeping", icon: "mdi-sleep" },
      { label: "Exercise", value: "exercise", icon: "mdi-dumbbell" },
      { label: "Other", value: "other", icon: "mdi-dots-horizontal" }
    ],
    dataKey: "affectedActivities",
    visibleInProgress: true
  },
  
  // Panel 8: Current Mobility/Activity Level
  {
    title: "How would you describe your movement right now?",
    type: "singleSelect",
    backgroundImage: "/src/assets/aicoach1.png",
    coachMessage: "Let's assess your current mobility",
    options: [
      { label: "Mostly inactive or resting", value: "inactive", icon: "mdi-bed" },
      { label: "Light activity with discomfort", value: "light", icon: "mdi-walk" },
      { label: "Moderate movement with limitations", value: "moderate", icon: "mdi-run" },
      { label: "Fully active, but not pain-free", value: "active", icon: "mdi-hiking" }
    ],
    dataKey: "mobilityLevel",
    visibleInProgress: true
  },
  
  // Panel 9: Time of Day with Most Pain
  {
    title: "When do you feel the most pain?",
    type: "singleSelect",
    backgroundImage: "/src/assets/aicoach1.png",
    coachMessage: "What time of day is your pain worst?",
    options: [
      { label: "Morning", value: "morning", icon: "mdi-weather-sunset-up" },
      { label: "Midday", value: "midday", icon: "mdi-weather-sunny" },
      { label: "Evening", value: "evening", icon: "mdi-weather-sunset-down" },
      { label: "At night", value: "night", icon: "mdi-weather-night" },
      { label: "Varies / No pattern", value: "varies", icon: "mdi-shuffle-variant" }
    ],
    dataKey: "painTimeOfDay",
    visibleInProgress: true
  },
  
  // Panel 10: Recovery Motivation Style
  {
    title: "What helps you stay on track during recovery?",
    type: "singleSelect",
    backgroundImage: "/src/assets/aicoach1.png",
    coachMessage: "How can I best support your recovery?",
    options: [
      { label: "Give me structure and a plan", value: "structure", icon: "mdi-calendar-check" },
      { label: "Show me daily progress", value: "progress", icon: "mdi-chart-line" },
      { label: "Gentle reminders keep me going", value: "reminders", icon: "mdi-bell" }
    ],
    dataKey: "motivationStyle",
    visibleInProgress: true
  },
  
  // Panel 11: Time Commitment
  {
    title: "How much time can you set aside for your recovery each day?",
    type: "singleSelect",
    backgroundImage: "/src/assets/aicoach1.png",
    coachMessage: "What's your availability for exercises?",
    options: [
      { label: "5–10 minutes", value: "5-10", icon: "mdi-clock-time-five" },
      { label: "15–20 minutes", value: "15-20", icon: "mdi-clock-time-ten" },
      { label: "30+ minutes", value: "30+", icon: "mdi-clock-time-twelve" }
    ],
    dataKey: "timeCommitment",
    visibleInProgress: true
  }
]);

// Calculate steps that should be visible in progress indicator
const totalVisibleSteps = computed(() => {
  return steps.value.filter(step => step.visibleInProgress).length;
});

// Logic for determining if user can proceed to next step
const canContinue = computed(() => {
  const currentStepData = steps.value[currentStep.value];
  
  if (currentStepData.type === 'singleSelect') {
    return selectedOptions.value.length > 0;
  } else if (currentStepData.type === 'multiSelect') {
    return selectedOptions.value.length > 0;
  } else if (currentStepData.type === 'slider') {
    return true; // Slider always has a value
  } else if (currentStepData.type === 'textInput') {
    return textInputValue.value.trim() !== '';
  } else if (currentStepData.type === 'warning') {
    return true; // Warning screen can always continue
  }
  
  return true;
});

// Check if text input should be displayed (for "Other" option)
const showTextInput = computed(() => {
  const currentStepData = steps.value[currentStep.value];
  
  if (['singleSelect', 'multiSelect'].includes(currentStepData.type)) {
    // Check if any selected option requires text input
    return selectedOptions.value.some(option => 
      ['custom', 'other', 'yes'].includes(option)
    );
  }
  
  return false;
});

// Helper to check if an option is selected
function isOptionSelected(value) {
  if (steps.value[currentStep.value].type === 'singleSelect') {
    return selectedOptions.value[0] === value;
  } else {
    return selectedOptions.value.includes(value);
  }
}

// Toggle selection of an option
function toggleOption(value) {
  const currentStepData = steps.value[currentStep.value];
  
  if (currentStepData.type === 'singleSelect') {
    // For single select, replace the array with just this value
    selectedOptions.value = [value];
    
    // Special handling for "None of the above" option
    if (value === 'none' && currentStepData.options.find(opt => opt.value === 'none')) {
      selectedOptions.value = ['none'];
    }
  } else if (currentStepData.type === 'multiSelect') {
    const index = selectedOptions.value.indexOf(value);
    
    // Special handling for "None of the above" option
    if (value === 'none') {
      if (index === -1) {
        // If selecting "none", clear all other selections
        selectedOptions.value = ['none'];
      } else {
        // If deselecting "none", just remove it
        selectedOptions.value.splice(index, 1);
      }
    } else {
      // For other options
      if (index === -1) {
        // If selecting a normal option, add it and remove "none" if present
        selectedOptions.value.push(value);
        const noneIndex = selectedOptions.value.indexOf('none');
        if (noneIndex !== -1) {
          selectedOptions.value.splice(noneIndex, 1);
        }
      } else {
        // If deselecting a normal option, just remove it
        selectedOptions.value.splice(index, 1);
      }
    }
  }
}

// Handle back button click
function goBack() {
  if (currentStep.value > 0) {
    // Special case for conditional steps (warning screen)
    if (steps.value[currentStep.value].type === 'warning') {
      currentStep.value = 3; // Go back to red flags question
    } else {
      currentStep.value--;
    }
    
    updateVisibleStepIndex();
    loadStepData();
  }
  else{
    router.push({ name: 'Onboarding', params: { stepname : 'testimonials' } });
  }
}

// Handle continue button click
function handleContinue() {
  // Save data from current step
  saveStepData();
  
  // Check if there's conditional logic for the next step
  const currentStepData = steps.value[currentStep.value];
  let nextStep;
  
  if (currentStepData.conditionalNextStep && typeof currentStepData.conditionalNextStep === 'function') {
    nextStep = currentStepData.conditionalNextStep(selectedOptions.value);
  } else {
    nextStep = currentStep.value + 1;
  }
  console.log("hello")
  // Check if assessment is complete
  if (nextStep >= steps.value.length) {
    router.push({ name: 'WorkoutListing' });
  }
  
  
  // Move to next step
  currentStep.value = nextStep;
  updateVisibleStepIndex();
  
  // Reset input values and load data for new step
  resetInputValues();
  loadStepData();
}

// Save data from current step
function saveStepData() {
  const currentStepData = steps.value[currentStep.value];
  const dataKey = currentStepData.dataKey;
  
  if (!dataKey) return;
  
  if (['singleSelect', 'multiSelect'].includes(currentStepData.type)) {
    let dataToSave = [...selectedOptions.value];
    
    // If custom input is enabled and relevant, save that too
    if (showTextInput.value && customInputValue.value) {
      assessmentData.value[dataKey + 'Details'] = customInputValue.value;
    }
    
    assessmentData.value[dataKey] = dataToSave;
  } else if (currentStepData.type === 'slider') {
    assessmentData.value[dataKey] = sliderValue.value;
  } else if (currentStepData.type === 'textInput') {
    assessmentData.value[dataKey] = textInputValue.value;
  }
  
  // Emit update
  emit('update:userData', assessmentData.value);
}

// Load data for current step
function loadStepData() {
  const currentStepData = steps.value[currentStep.value];
  const dataKey = currentStepData.dataKey;
  
  if (!dataKey || !assessmentData.value[dataKey]) {
    return;
  }
  
  if (['singleSelect', 'multiSelect'].includes(currentStepData.type)) {
    selectedOptions.value = [...assessmentData.value[dataKey]];
    
    // Load custom input if available
    if (assessmentData.value[dataKey + 'Details']) {
      customInputValue.value = assessmentData.value[dataKey + 'Details'];
    }
  } else if (currentStepData.type === 'slider') {
    sliderValue.value = assessmentData.value[dataKey];
  } else if (currentStepData.type === 'textInput') {
    textInputValue.value = assessmentData.value[dataKey];
  }
}

// Reset input values
function resetInputValues() {
  selectedOptions.value = [];
  customInputValue.value = '';
  // Don't reset sliderValue as it has a default
  textInputValue.value = '';
}

// Update the visible step index for progress indicator
function updateVisibleStepIndex() {
  // Count visible steps up to current step
  let visibleIndex = 0;
  for (let i = 0; i <= currentStep.value; i++) {
    if (steps.value[i].visibleInProgress) {
      visibleIndex++;
    }
  }
  currentVisibleStepIndex.value = visibleIndex - 1; // -1 because it's zero-based
}

// Get emoji for pain level
function getEmojiForPainLevel(level) {
  const emojis = ['😀', '🙂', '😐', '😕', '😣', '😖', '😫', '😩', '😭', '🥺', '😵'];
  return emojis[level] || '😐';
}

// Get description for pain level
function getPainLevelDescription(level) {
  if (level <= 2) return "Minimal Pain";
  if (level <= 4) return "Mild Pain";
  if (level <= 6) return "Moderate Pain";
  if (level <= 8) return "Severe Pain";
  return "Extreme Pain";
}

// Initialize
resetInputValues();
updateVisibleStepIndex();
</script>

<style scoped>
/* Fade transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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

.back-button, .sound-button {
  position: absolute;
  top: 20px;
  background-color: rgba(128, 128, 128, 0.7) !important;
  width: 50px !important;
  height: 50px !important;
  border-radius: 50% !important;
}

.back-button {
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: rgba(128, 128, 128, 0.3) !important;
  width: 50px !important;
  height: 50px !important;
  border-radius: 50% !important;
  z-index: 333;
}

.sound-button {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: rgba(128, 128, 128, 0.3) !important;
  width: 50px !important;
  height: 50px !important;
  border-radius: 50% !important;
  z-index: 333;
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
  padding-bottom: 80px; /* Make room for action button and nav dots */
}

.text-gray {
  color: #888888;
}

.option-button {
  border-color: #333333 !important;
  background-color: #1E1E1E !important;
  justify-content: flex-start;
  padding-left: 16px !important;
}

.selected-option {
  background-color: #5C6BC0 !important;
  border-color: #5C6BC0 !important;
}

.action-button {
  width: 100%;
  position: fixed;
  bottom: 8px;
  padding: 16px;
  z-index: 2;
}

.next-button {
  background: linear-gradient(to right, #f06543, #e94976) !important;
  font-weight: 500 !important;
}

.navigation-dots {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #121212;
  z-index: 1;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #333333;
}

.dot.active {
  background-color: #FFFFFF;
}

.slider-container {
  padding: 16px 0;
}

.pain-scale {
  margin-top: 16px;
}

.warning-container {
  padding: 32px 16px;
}
</style>