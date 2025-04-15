<template>
  <v-app>
    <v-main class="pa-0 ma-0">
      <div class="fill-height position-relative background">
        <!-- Animated background elements -->
        <div class="bg-circles">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
          <div class="circle circle-3"></div>
        </div>

        <v-row no-gutters class="mb-14">
          <v-col cols="12">
            <!-- Back button with improved styling -->
            <v-btn @click="back" icon variant="text" class="back-button" size="large">
              <v-icon size="x-large" color="white">mdi-chevron-left</v-icon>
            </v-btn>

            <v-window v-model="currentPanel" :touch="false">
              <!-- Panel 1: Reminders Prompt -->
              <v-window-item value="0">
                <div class="panel-content">
                  <h1 class="text-h3 font-weight-bold gradient-text mt-8 mb-4 text-center">
                    Let's help you stay consistent
                  </h1>
                  <div class="reminder-badge">
                    <div class="reminder-pulse"></div>
                    <div class="reminder-icon">
                      <v-icon size="x-large" color="white" class="bell-animation">mdi-bell-ring-outline</v-icon>
                    </div>
                  </div>

                
                  
                  <p class="text-white text-subtitle-1 text-center mb-8 mt-8">
                    We'll help you stay on track with gentle, timely reminders.
                  </p>

                  <div class="choice-buttons">
                    <v-btn 
                      @click="nextPanel" 
                      height="56" 
                      rounded="pill"
                      class="choice-button yes-button text-h6">
                      <span>Yes, please</span>
                      <v-icon end class="ml-2">mdi-check</v-icon>
                    </v-btn>

                    <v-btn 
                      @click="skipReminders" 
                      variant="outlined" 
                      height="56" 
                      rounded="pill"
                      class="choice-button skip-button text-h6">
                      <span>Skip for now</span>
                    </v-btn>
                  </div>
                </div>
              </v-window-item>

              <!-- Panel 2: Reminder Frequency -->
              <v-window-item value="1">
                <div class="panel-content">
                  <h1 class="text-h3 font-weight-bold gradient-text mb-6">
                    Choose your reminder schedule
                  </h1>
                  
                  <p class="text-white text-subtitle-1 mb-8">
                    How often would you like to be reminded?
                  </p>

                  <div class="frequency-options">
                    <div class="frequency-card" :class="{ active: selectedFrequency === 'daily' }" @click="selectedFrequency = 'daily'">
                      <div class="frequency-icon">
                        <v-icon size="large" color="#e94976">mdi-calendar-clock</v-icon>
                      </div>
                      <div class="frequency-text">
                        <div class="frequency-title">Daily</div>
                        <div class="frequency-time" @click.stop="showTimePicker = true">
                          {{ reminderTime }} <v-icon size="small">mdi-pencil</v-icon>
                        </div>
                      </div>
                      <div class="frequency-check" v-if="selectedFrequency === 'daily'">
                        <v-icon color="#e94976">mdi-check-circle</v-icon>
                      </div>
                    </div>

                    <div class="frequency-card" :class="{ active: selectedFrequency === 'weekly' }" @click="selectedFrequency = 'weekly'">
                      <div class="frequency-icon">
                        <v-icon size="large" color="#e94976">mdi-calendar-week</v-icon>
                      </div>
                      <div class="frequency-text">
                        <div class="frequency-title">3 times per week</div>
                        <div class="frequency-detail">Mon, Wed, Fri</div>
                      </div>
                      <div class="frequency-check" v-if="selectedFrequency === 'weekly'">
                        <v-icon color="#e94976">mdi-check-circle</v-icon>
                      </div>
                    </div>

                    <div class="frequency-card" :class="{ active: selectedFrequency === 'missed' }" @click="selectedFrequency = 'missed'">
                      <div class="frequency-icon">
                        <v-icon size="large" color="#e94976">mdi-calendar-alert</v-icon>
                      </div>
                      <div class="frequency-text">
                        <div class="frequency-title">Only when I skip</div>
                        <div class="frequency-detail">After missed sessions</div>
                      </div>
                      <div class="frequency-check" v-if="selectedFrequency === 'missed'">
                        <v-icon color="#e94976">mdi-check-circle</v-icon>
                      </div>
                    </div>
                  </div>

                  <!-- Time picker dialog -->
                  <v-dialog v-model="showTimePicker" max-width="290px">
                    <v-card class="time-picker-card">
                      <v-card-title class="text-h6">Select reminder time</v-card-title>
                      <v-card-text>
                        <v-select
                          v-model="reminderTime"
                          :items="timeOptions"
                          label="Choose time"
                          outlined
                          dense
                        ></v-select>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="showTimePicker = false">Done</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-window-item>

              <!-- Panel 3: Confirmation -->
              <v-window-item value="2">
                <div class="panel-content final-panel">
                  <div class="confirmation-icon">
                    <v-icon size="x-large" color="white">mdi-check-circle-outline</v-icon>
                  </div>
                  
                  <h1 class="text-h3 font-weight-bold gradient-text mt-6 mb-4 text-center">
                    All set!
                  </h1>

                  <div class="confirmation-card">
                    <div class="confirmation-details">
                      <div class="confirmation-item">
                       权益<v-icon color="#6c6cde" size="small" class="mr-4">mdi-bell</v-icon>
                        <span class='text-left' v-if="selectedFrequency === 'daily'">Daily reminders at {{ reminderTime }}</span>
                        <span class='text-left' v-else-if="selectedFrequency === 'weekly'">Reminders on Mon, Wed, Fri</span>
                        <span class='text-left' v-else>Reminders after missed sessions</span>
                      </div>
                      <div class="confirmation-item">
                        <v-icon color="#6c6cde" size="small" class="mr-4">mdi-message-text-outline</v-icon>
                        <span class='text-left'>Encouragement: Gentle & supportive</span>
                      </div>
                    </div>
                  </div>

                  <p class="text-white text-subtitle-1 mt-6 mb-8 text-center settings-note">
                    You can update these anytime from your profile settings.
                  </p>
                </div>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
        
        <!-- Enhanced action button -->
        <div class="action-button" v-if="currentPanel > 0">
          <v-btn 
            @click="handleNextButton" 
            block 
            height="60" 
            rounded="pill"
            class="next-button text-h6">
            <span v-if="currentPanel === 2">Done</span>
            <span v-else>Next</span>
            <v-icon end class="ml-2">mdi-arrow-right</v-icon>
          </v-btn>
        </div>

        <!-- Panel indicator dots -->
        <div class="panel-indicators">
          <div v-for="i in 3" :key="i" 
               class="indicator-dot" 
               :class="{ active: currentPanel === i-1 }"
               @click="currentPanel = i-1"></div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['complete', 'skip']);
const currentPanel = ref(0);
const selectedFrequency = ref('daily');
const reminderTime = ref('8:00 AM');
const showTimePicker = ref(false);
const timeOptions = ref([
  '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', 
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
]);

function nextPanel() {
  if (currentPanel.value < 2) {
    currentPanel.value++;
  }
}

function back() {
  if (currentPanel.value > 0) {
    currentPanel.value--;
  }
}

function skipReminders() {
  emit('skip');
}

function handleNextButton() {
  if (currentPanel.value < 2) {
    nextPanel();
  } else {
    emit('complete', {
      enabled: true,
      frequency: selectedFrequency.value,
      time: reminderTime.value
    });
  }
}
</script>

<style scoped>
.background {
  position: relative;
  background-color: #121212;
  min-height: 100vh;
  overflow: hidden;
}

.bg-circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.05;
}

.circle-1 {
  background: linear-gradient(45deg, #f8a465, #e94976);
  width: 500px;
  height: 500px;
  top: -200px;
  right: -100px;
  animation: float 20s infinite alternate ease-in-out;
}

.circle-2 {
  background: linear-gradient(135deg, #6c6cde, #e94976);
  width: 400px;
  height: 400px;
  bottom: -150px;
  left: -150px;
  animation: float 15s infinite alternate-reverse ease-in-out;
}

.circle-3 {
  background: linear-gradient(225deg, #f06543, #6c6cde);
  width: 300px;
  height: 300px;
  top: 50%;
  left: 70%;
  animation: float 25s infinite alternate ease-in-out;
}

@keyframes float {
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(30px, 30px) rotate(10deg); }
}

.panel-content {
  padding: 100px 24px 24px;
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.gradient-text {
  background: linear-gradient(to right, #f8a465, #e94976);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
  font-size: 2.5rem;
}

.back-button {
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: rgba(108, 108, 222, 0.2) !important;
  width: 50px !important;
  height: 50px !important;
  border-radius: 50% !important;
  z-index: 10;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.back-button:hover {
  background-color: rgba(108, 108, 222, 0.3) !important;
  transform: scale(1.05);
}

.action-button {
  width: 100%;
  position: fixed;
  bottom: 20px;
  padding: 0 24px 20px;
  z-index: 5;
}

.next-button {
  background: linear-gradient(to right, #f06543, #e94976) !important;
  font-weight: 500 !important;
  color: white;
}

.panel-indicators {
  position: fixed;
  bottom: 15px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 0 20px;
  z-index: 5;
}

.indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator-dot.active {
  background-color: white;
  width: 20px;
  border-radius: 10px;
}

.reminder-badge {
  position: relative;
  align-self: center;
  margin-top: 20px;
}

.reminder-pulse {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(240, 101, 67, 0.4) 0%, rgba(233, 73, 118, 0) 70%);
  animation: pulse 2s infinite;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.reminder-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f06543, #e94976);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 25px rgba(233, 73, 118, 0.5);
  position: relative;
  z-index: 1;
}

.bell-animation {
  animation: bellRing 2s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.95);
    opacity: 0.7;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05);
    opacity: 0.4;
  }
  100% {
    transform: translate(-50%, -50%) scale(0.95);
    opacity: 0.7;
  }
}

@keyframes bellRing {
  0% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(-15deg);
  }
}

.choice-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  margin-top: auto;
  margin-bottom: 50px;
}

.choice-button {
  width: 100%;
  font-weight: 500 !important;
}

.yes-button {
  background: linear-gradient(to right, #f06543, #e94976) !important;
  color: white;
}

.skip-button {
  border: 2px solid rgba(255, 255, 255, 0.3) !important;
  color: rgba(255, 255, 255, 0.7) !important;
}

.frequency-options {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.frequency-card {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.frequency-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08);
}

.frequency-card.active {
  border: 1px solid rgba(233, 73, 118, 0.5);
  background: rgba(233, 73, 118, 0.1);
}

.frequency-icon {
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(233, 73, 118, 0.1);
}

.frequency-text {
  flex-grow: 1;
}

.frequency-title {
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
}

.frequency-detail {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-top: 4px;
}

.frequency-time {
  color: #f8a465;
  font-size: 0.9rem;
  margin-top: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.frequency-check {
  margin-left: 10px;
}

.time-picker-card {
  background-color: #1E1E1E !important;
  color: white;
}

.final-panel {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.confirmation-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6c6cde, #e94976);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 25px rgba(233, 73, 118, 0.5);
  margin-top: 30px;
}

.confirmation-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 320px;
  margin-top: 24px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.confirmation-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.confirmation-item {
  display: flex;
  align-items: center;
  color: white;
  font-size: 1rem;
}

.settings-note {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.text-h3, .text-subtitle-1 {
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>