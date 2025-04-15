<template>
    <v-container class="pa-0" style="max-width: 500px; min-height: 100vh">
      <v-btn icon variant="text" class="back-button" size="large">
        <v-icon size="x-large" color="white">mdi-chevron-left</v-icon>
      </v-btn>
      <v-card class="rounded-lg elevation-0 background" style="width: 100%; min-height: 100vh">
        <!-- Animated background elements -->
        <div class="bg-circles">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
          <div class="circle circle-3"></div>
        </div>
  
        <!-- Screen 1: Detailed Results -->
        <div v-if="currentScreen === 'results'">
          <v-card-item class="pb-0 pt-12">
            <div class="d-flex align-center mb-4 mt-12">
              <v-avatar size="64" class="me-3">
                <div class="reminder-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
                    <defs>
                      <linearGradient id="gradientFill" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#f8a465" />
                        <stop offset="100%" stop-color="#e94976" />
                      </linearGradient>
                    </defs>
                    <g fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="white"/>
                      <path d="M9 5a2 2 0 114 0 2 2 0 01-4 0z" stroke="white" fill="url(#gradientFill)"/>
                      <path d="M9 14h.01M12 14h.01M15 14h.01M9 17h.01M12 17h.01M15 17h.01" stroke="white" stroke-width="2"/>
                      <path d="M6 9h12" stroke="white"/>
                    </g>
                    <circle cx="18" cy="17" r="5" fill="url(#gradientFill)" stroke="white" stroke-width="1.5"/>
                    <path d="M18 14v3.5H20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </v-avatar>
              <div class="text-white text-subtitle-1 fade-in">
                Lastly, check out your detailed scores. You'll have the chance to customize your exercise plan based on these results.
              </div>
            </div>
          </v-card-item>
  
          <v-card-text class="pt-9">
            <h2 class="text-h3 font-weight-bold gradient-text mb-6 fade-in">Your Detailed Results</h2>
  
            <!-- ROM Section -->
            <div class="mb-12">
              <div class="d-flex align-center mb-2">
                <div class="performance-circle me-4" :style="getCircleStyle(6)">
                  <span class="text-h4 font-weight-bold text-white">60%</span>
                </div>
                <div class="flex-grow-1">
                  <div class="text-h5 text-white font-weight-bold">Range of Motion</div>
                  <div class="d-flex align-items-center">
                    <v-icon color="#e94976" size="small" class="me-1">mdi-alert-circle</v-icon>
                    <span class="text-body-2 accent-text">Needs improvement</span>
                  </div>
                </div>
                <v-btn icon variant="text" @click="toggleSection('rom')" color="white" class="blur-button">
                  <v-icon>{{ expandedSections.rom ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </div>
  
              <v-expand-transition>
                <div v-if="expandedSections.rom" class="pt-2 pb-2 fade-in">
                  <div class="relative">
                    <div class="text-body-1 text-white mb-2">
                      The right hip displays weak performance with 6 reps and a max ROM of 80.79.
                    </div>
                    <!-- Payment overlay -->
                    <div class="payment-content text-center">
                      <v-icon color="white" size="36" class="mb-2">mdi-lock</v-icon>
                      <h3 class="text-h5 text-white mb-2">Unlock Full Assessment</h3>
                      <p class="text-body-1 text-white-70 mb-4">
                        Pay to see your complete report and get access to our professional physio trainer.
                      </p>
                      <v-btn color="#6c6cde" variant="elevated" rounded="pill" class="px-6 unlock-button">
                        Unlock Premium
                      </v-btn>
                    </div>
                  </div>
                </div>
              </v-expand-transition>
            </div>
  
            <!-- Balance Section -->
            <div class="mb-12">
              <div class="d-flex align-center mb-2">
                <div class="performance-circle me-4" :style="getCircleStyle(8)">
                  <span class="text-h4 font-weight-bold text-white">80%</span>
                </div>
                <div class="flex-grow-1">
                  <div class="text-h5 text-white font-weight-bold">Balance</div>
                  <div class="d-flex align-items-center">
                    <v-icon color="#f8a465" size="small" class="me-1">mdi-check-circle</v-icon>
                    <span class="text-body-2" style="color: #f8a465">Good</span>
                  </div>
                </div>
                <v-btn icon variant="text" @click="toggleSection('balance')" color="white" class="blur-button">
                  <v-icon>{{ expandedSections.balance ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </div>
  
              <v-expand-transition>
                <div v-if="expandedSections.balance" class="pt-2 pb-2 fade-in">
                  <div class="text-body-1 text-white">
                    The feedback stickers suggest that the right hip balance has potential for improvement. 
                    Focus on exercises that enhance stability and control.
                  </div>
                </div>
              </v-expand-transition>
            </div>
  
            <!-- Strength Section -->
            <div class="mb-12">
              <div class="d-flex align-center mb-2">
                <div class="performance-circle me-4" :style="getCircleStyle(7)">
                  <span class="text-h4 font-weight-bold text-white">70%</span>
                </div>
                <div class="flex-grow-1">
                  <div class="text-h5 text-white font-weight-bold">Strength</div>
                  <div class="d-flex align-items-center">
                    <v-icon color="#f06543" size="small" class="me-1">mdi-checkbox-marked-circle</v-icon>
                    <span class="text-body-2" style="color: #f06543">Fair</span>
                  </div>
                </div>
                <v-btn icon variant="text" @click="toggleSection('strength')" color="white" class="blur-button">
                  <v-icon>{{ expandedSections.strength ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </div>
  
              <v-expand-transition>
                <div v-if="expandedSections.strength" class="pt-2 pb-2 fade-in">
                  <div class="text-body-1 text-white">
                    Hip Weakness/Imbalance could be affecting your performance in right hip. 
                    Include strengthening routines to improve endurance and stability.
                  </div>
                </div>
              </v-expand-transition>
            </div>
  
            <div class="text-white text-subtitle-1 font-weight-medium mb-6 fade-in">
              Based on this, your plan will start at <span class="accent-text font-weight-bold">Level 2 – Guided Mobility Focus</span>
            </div>
          </v-card-text>
  
          <div class="action-button">
            <v-btn
              @click="nextPage"
              block
              height="60"
              rounded="pill"
              class="next-button text-h6 text-white"
            >
              Next
              <v-icon end class="ml-2">mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </div>
  
        <!-- Screen 2: Scoring Scale -->
        <div v-else-if="currentScreen === 'scale'">
          <v-card-item class="pb-0">
            <div class="d-flex align-center mb-4">
              <v-avatar size="48" class="me-3">
                <v-img src="https://via.placeholder.com/48" alt="Coach"></v-img>
                <div class="sound-wave-indicator"></div>
              </v-avatar>
              <div class="text-white text-subtitle-1 fade-in">
                By the way, this is how we score your physical performance assessment.
              </div>
            </div>
          </v-card-item>
  
          <v-card-text class="pt-4">
            <h2 class="text-h3 font-weight-bold gradient-text text-center mb-10 fade-in">Scoring Scale</h2>
  
            <div class="scoring-scale-container mb-8 fade-in">
              <!-- Excellent -->
              <div class="scale-row">
                <div class="scale-label text-white text-body-1 font-weight-medium">90-100%</div>
                <div class="scale-bar excellent"></div>
                <div class="scale-name text-green-accent-3 text-body-1 font-weight-medium">Excellent</div>
              </div>
  
              <!-- Good -->
              <div class="scale-row">
                <div class="scale-label text-white text-body-1 font-weight-medium">80-89%</div>
                <div class="scale-bar good"></div>
                <div class="scale-name text-amber-accent-2 text-body-1 font-weight-medium">Good</div>
              </div>
  
              <!-- Fair -->
              <div class="scale-row">
                <div class="scale-label text-white text-body-1 font-weight-medium">60-79%</div>
                <div class="scale-bar fair"></div>
                <div class="scale-name text-orange-accent-1 text-body-1 font-weight-medium">Fair</div>
              </div>
  
              <!-- Poor -->
              <div class="scale-row">
                <div class="scale-label text-white text-body-1 font-weight-medium">0-59%</div>
                <div class="scale-bar poor"></div>
                <div class="scale-name accent-text text-body-1 font-weight-medium">Poor</div>
              </div>
            </div>
  
            <div class="text-white text-body-1 mb-6 fade-in">
              {{ userData.Summary }}
            </div>
          </v-card-text>
  
          <v-card-actions class="pa-4">
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click="currentScreen = 'results'"
              class="text-white blur-button"
            ></v-btn>
            <v-spacer></v-spacer>
            <v-btn
              variant="elevated"
              rounded="pill"
              size="large"
              class="px-8 text-white next-button"
            >
              See My Plan
              <v-icon end class="ml-2">mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
        
        <!-- Panel indicator dots -->
        <div class="panel-indicators" v-if="currentScreen === 'results'">
          <div class="indicator-dot active"></div>
          <div class="indicator-dot" @click="currentScreen = 'scale'"></div>
        </div>
        <div class="panel-indicators" v-else>
          <div class="indicator-dot" @click="currentScreen = 'results'"></div>
          <div class="indicator-dot active"></div>
        </div>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  const router = useRouter()
  // Component state
  const currentScreen = ref('results');
  const expandedSections = ref({
    rom: false,
    balance: false,
    strength: false
  });
  
  // Dummy data
  const analysisData = ref({
    "Physical Performance Report": {
      "Balance": "The feedback stickers suggest that the right hip balance has potential for improvement.",
      "Possible Issues": "Hip Weakness/Imbalance could be affecting the user's performance in right hip.",
      "Range of Motion": "The right hip displays weak performance with 6 reps and a max ROM of 80.79.",
      "Corrective Actions": "For the right hip, include flexibility exercises like Bridge with Leg Lift and strengthening routines to improve endurance. Keep movements controlled and prioritize posture during activity.",
      "Safety Considerations": "Considering the poor performance in right hip, it's essential to take a slow approach with low-resistance exercises and incorporate stretching to reduce tension."
    }
  });
  
  const userData = ref({
    "Summary": "You are a 65-year-old with a mild hip discomfort experienced after stretching, currently experiencing low-level pain (1 out of 5) primarily affecting your sleep in the evening hours. You aim to restore mobility and flexibility while managing ongoing health conditions such as asthma, hypertension, and diabetes. You are moderately active, engaging in regular exercise 3-5 days a week.",
    "Category": "General Improvement",
    "Conclusion": "By integrating these strategies, you can effectively manage your hip discomfort while aiming to restore mobility and flexibility. Regular monitoring and adjustments based on your condition's progress are key to achieving your recovery goals.",
    "Track Progress": "Keep a simple log of your hip discomfort, noting any changes in pain intensity or mobility, to discuss with a healthcare provider if the condition does not improve.",
    "Focus on Flexibility": "Incorporate gentle stretching exercises focusing on hip mobility and flexibility into your daily routine to help alleviate discomfort and support your recovery goals.",
    "Monitor Activity Levels": "Maintain a moderately active lifestyle by continuing your regular exercise regimen, but pay attention to any movements that exacerbate the discomfort and adjust accordingly.",
    "Manage Health Conditions": "Ensure hypertension, asthma, and diabetes are well controlled with the help of your healthcare provider, as improving overall health can positively impact recovery and pain levels.",
    "Evening Routine Adjustment": "Consider altering your evening routine to include relaxation techniques such as gentle yoga or meditation that may facilitate better sleep and reduce nighttime discomfort."
  });
  
  // Methods
  const toggleSection = (section) => {
    expandedSections.value[section] = !expandedSections.value[section];
  };
  
  const getCircleStyle = (score) => {
    let color;
    if (score >= 9) color = '#1dd1a1'; // Green for Excellent
    else if (score >= 8) color = '#f8a465'; // Yellow for Good
    else if (score >= 6) color = '#f06543'; // Orange for Fair
    else color = '#e94976'; // Red for Poor
  
    return {
      background: `conic-gradient(${color} ${score * 10}%, #2c303a ${score * 10}%)`
    };
  };
  
  const nextPage = ()=>{
    router.push({name:'Achievement'})
  }
  </script>
  
  <style scoped>
  .background {
    position: relative;
    background-color: #121212;
    min-height: 100vh;
    overflow: hidden;
  }
  
  /* Animated background elements */
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
    box-shadow: 0 10px 25px rgba(233, 73, 118, 0.3);
    transition: all 0.3s ease;
  }
  
  .next-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(233, 73, 118, 0.4);
  }
  
  .unlock-button {
    background: linear-gradient(to right, #6c6cde, #e94976) !important;
    font-weight: 500 !important;
    box-shadow: 0 10px 25px rgba(108, 108, 222, 0.3);
  }
  
  .gradient-text {
    background: linear-gradient(to right, #f8a465, #e94976);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.5px;
    font-size: 2.5rem;
  }
  
  .accent-text {
    color: #e94976;
  }
  
  .performance-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
  .performance-circle::before {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #121212;
  }
  
  .performance-circle span {
    position: relative;
    z-index: 2;
  }
  
  .sound-wave-indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(to right, #f8a465, #e94976);
    border-radius: 4px;
  }
  
  .payment-content {
    padding: 24px;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .text-white-70 {
    color: rgba(255, 255, 255, 0.7);
  }
  
  .relative {
    position: relative;
  }
  
  .scoring-scale-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .scale-row {
    display: grid;
    grid-template-columns: 80px 1fr 80px;
    align-items: center;
    gap: 12px;
  }
  
  .scale-bar {
    height: 28px;
    border-radius: 14px 0 0 14px;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .scale-bar.excellent {
    background: linear-gradient(to right, #1dd1a1, #05c46b);
    width: 100%;
  }
  
  .scale-bar.good {
    background: linear-gradient(to right, #f8a465, #f06543);
    width: 70%;
  }
  
  .scale-bar.fair {
    background: linear-gradient(to right, #f06543, #e94976);
    width: 60%;
  }
  
  .scale-bar.poor {
    background: linear-gradient(to right, #e94976, #6c6cde);
    width: 50%;
  }
  
  .scale-bar::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 20px;
    background: inherit;
    filter: brightness(1.2);
    border-radius: 0 14px 14px 0;
  }
  
  /* Panel indicators */
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
  
  .blur-button {
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.1) !important;
    transition: all 0.3s ease;
  }
  
  .blur-button:hover {
    background-color: rgba(255, 255, 255, 0.2) !important;
  }
  
  .reminder-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f06543, #e94976);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 25px rgba(233, 73, 118, 0.5);
    position: relative;
    z-index: 1;
  }
  
  /* Animation for text elements */
  .fade-in {
    animation: fadeIn 0.8s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  </style>