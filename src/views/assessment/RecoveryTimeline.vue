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
                <!-- Panel 1: Overview -->
                <v-window-item value="0">
                  <div class="panel-content">
                    <div class="text-container">
                      <h1 class="text-h3 font-weight-bold gradient-text mb-2">
                        Your Recovery Journey
                      </h1>
                      <p class="text-white text-subtitle-1 mb-8 intro-text">
                        Everyone's path to healing is unique. Here's your personalized recovery roadmap.
                      </p>
                    </div>
  
                    <!-- Enhanced timeline visualization -->
                    <div class="timeline-wrapper">
                      <div class="timeline-container">
                        <div class="timeline-bar">
                          <div class="timeline-progress"></div>
                          <div class="timeline-dot active">
                            <div class="timeline-icon">
                              <v-icon color="white">mdi-medication</v-icon>
                            </div>
                            <span class="timeline-label">Relief</span>
                            <span class="timeline-sublabel">Weeks 1-2</span>
                          </div>
                          <div class="timeline-dot">
                            <div class="timeline-icon">
                              <v-icon>mdi-reload</v-icon>
                            </div>
                            <span class="timeline-label">Restore</span>
                            <span class="timeline-sublabel">Weeks 3-4</span>
                          </div>
                          <div class="timeline-dot">
                            <div class="timeline-icon">
                              <v-icon>mdi-arm-flex</v-icon>
                            </div>
                            <span class="timeline-label">Strengthen</span>
                            <span class="timeline-sublabel">Weeks 5-6</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-window-item>
  
                <!-- Panel 2: Phase 1 -->
                <v-window-item value="1">
                  <div class="panel-content">
                    <div class="phase-header">
                      <div class="phase-badge">PHASE 1</div>
                      <h1 class="text-h3 font-weight-bold gradient-text">
                        Pain Relief & Mobility
                      </h1>
                      <div class="phase-timeline">
                        <span class="phase-weeks">WEEKS 1-2</span>
                        <div class="phase-progress-bar">
                          <div class="phase-progress" style="width: 33%"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="phase-content">
                      <div class="goal-card">
                        <div class="goal-icon">
                          <v-icon size="large" color="#e94976">mdi-fire</v-icon>
                        </div>
                        <div class="goal-text">Reduce inflammation</div>
                      </div>
  
                      <div class="goal-card">
                        <div class="goal-icon">
                          <v-icon size="large" color="#e94976">mdi-rotate-orbit</v-icon>
                        </div>
                        <div class="goal-text">Improve joint range of motion</div>
                      </div>
  
                      <div class="goal-card">
                        <div class="goal-icon">
                          <v-icon size="large" color="#e94976">mdi-human-handsup</v-icon>
                        </div>
                        <div class="goal-text">Begin light movement</div>
                      </div>
                    </div>
                  </div>
                </v-window-item>
  
                <!-- Panel 3: Phase 2 -->
                <v-window-item value="2">
                  <div class="panel-content">
                    <div class="phase-header">
                      <div class="phase-badge">PHASE 2</div>
                      <h1 class="text-h3 font-weight-bold gradient-text">
                        Restore Function
                      </h1>
                      <div class="phase-timeline">
                        <span class="phase-weeks">WEEKS 3-4</span>
                        <div class="phase-progress-bar">
                          <div class="phase-progress" style="width: 66%"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="phase-content">
                      <div class="goal-card">
                        <div class="goal-icon">
                          <v-icon size="large" color="#e94976">mdi-dumbbell</v-icon>
                        </div>
                        <div class="goal-text">Strengthen supporting muscles</div>
                      </div>
  
                      <div class="goal-card">
                        <div class="goal-icon">
                          <v-icon size="large" color="#e94976">mdi-yoga</v-icon>
                        </div>
                        <div class="goal-text">Improve coordination and balance</div>
                      </div>
  
                      <div class="goal-card">
                        <div class="goal-icon">
                          <v-icon size="large" color="#e94976">mdi-walk</v-icon>
                        </div>
                        <div class="goal-text">Resume basic activities with less discomfort</div>
                      </div>
                    </div>
                  </div>
                </v-window-item>
  
                <!-- Panel 4: Phase 3 -->
                <v-window-item value="3">
                  <div class="panel-content">
                    <div class="phase-header">
                      <div class="phase-badge">PHASE 3</div>
                      <h1 class="text-h3 font-weight-bold gradient-text">
                        Build Strength & Stability
                      </h1>
                      <div class="phase-timeline">
                        <span class="phase-weeks">WEEKS 5-6</span>
                        <div class="phase-progress-bar">
                          <div class="phase-progress" style="width: 100%"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="phase-content">
                      <div class="goal-card">
                        <div class="goal-icon">
                          <v-icon size="large" color="#e94976">mdi-run</v-icon>
                        </div>
                        <div class="goal-text">Return to normal movement patterns</div>
                      </div>
  
                      <div class="goal-card">
                        <div class="goal-icon">
                          <v-icon size="large" color="#e94976">mdi-arm-flex-outline</v-icon>
                        </div>
                        <div class="goal-text">Build strength and confidence</div>
                      </div>
  
                      <div class="goal-card">
                        <div class="goal-icon">
                          <v-icon size="large" color="#e94976">mdi-shield-check</v-icon>
                        </div>
                        <div class="goal-text">Learn how to avoid future injury</div>
                      </div>
                    </div>
                  </div>
                </v-window-item>
  
                <!-- Panel 5: Personalized Reminder -->
                <v-window-item value="4">
                  <div class="panel-content final-panel">
                    <h1 class="text-h3 font-weight-bold gradient-text mb-4">
                      Your Recovery Timeline
                    </h1>
                    
                    <!-- Enhanced milestone visualization -->
                    <div class="milestone-container">
                      <div class="milestone-pulse"></div>
                      <div class="milestone-circle">
                        <div class="milestone-inner">
                          <span class="milestone-text">4-6</span>
                          <span class="milestone-subtext">WEEKS</span>
                        </div>
                      </div>
                    </div>
                    
                    <p class="text-white text-subtitle-1 mt-8 final-text">
                      Based on your inputs, we expect meaningful progress within <span class="highlight-text">4–6 weeks</span> — if you stay consistent with your program, you'll feel the difference sooner than you think.
                    </p>
                    
                    <div class="consistency-meter mt-4">
                      <div class="consistency-label">Consistency is key to your recovery</div>
                      <div class="consistency-bar">
                        <div class="consistency-progress"></div>
                      </div>
                      <div class="consistency-markers">
                        <span>Start</span>
                        <span>Halfway</span>
                        <span>Success</span>
                      </div>
                    </div>
                  </div>
                </v-window-item>
              </v-window>
            </v-col>
          </v-row>
          
          <!-- Enhanced action button -->
          <div class="action-button">
            <v-btn 
              @click="nextPanel" 
              block 
              height="60" 
              rounded="pill"
              class="next-button text-h6">
              <span v-if="currentPanel === 4">Let's Begin My Journey</span>
              <span v-else>Next</span>
              <v-icon end class="ml-2">mdi-arrow-right</v-icon>
            </v-btn>
          </div>
  
          <!-- Panel indicator dots -->
          <div class="panel-indicators">
            <div v-for="i in 5" :key="i" 
                 class="indicator-dot" 
                 :class="{ active: currentPanel === i-1 }"
                 @click="currentPanel = i-1"></div>
          </div>
        </div>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  const router = useRouter()
  const emit = defineEmits(['next', 'back']);
  const currentPanel = ref(0);
  
  function nextPanel() {
    if (currentPanel.value < 4) {
      currentPanel.value++;
    } else {
      // When on the last panel and button is clicked
      router.push({name:'ReminderConfig'})
    }
  }

  const back = ()=>{
    if (currentPanel.value > 0) {
      currentPanel.value--;
    } 
  }
  
  onMounted(() => {
    // Add animation for the consistency bar on final panel
    setTimeout(() => {
      const progressBar = document.querySelector('.consistency-progress');
      if (progressBar) {
        progressBar.style.width = '75%';
      }
    }, 500);
  });
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
  color: white
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
  
  /* Enhanced Timeline styling */
  .timeline-wrapper {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  
  .timeline-container {
    display: flex;
    justify-content: left;
    align-items: center;
    height: 400px;
    width: 100%;
    margin-left: 40px
  }
  
  .timeline-bar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    height: 100%;
    width: 6px;
    background-color: rgba(108, 108, 222, 0.5) !important;
    border-radius: 3px;
  }
  
  .timeline-progress {
    position: absolute;
    width: 100%;
    background: linear-gradient(to top, #6c6cde, #e94976);
    border-radius: 3px;
    bottom: 0;
    transition: height 1s ease;
  }
  
  .timeline-dot {
    position: relative;
    display: flex;
    align-items: center;
    z-index: 1;
    transform: translateX(-50%);
    left: 50%;
    transition: all 0.3s ease;
  }
  
  .timeline-icon {
    min-width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(108, 108, 222, 1) !important;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.6);
    transition: all 0.3s ease;
    border: 2px solid rgba(108, 108, 222, 0.5);
    margin-left: -22px;
    z-index: 4
  }
  
  .timeline-dot.active .timeline-icon {
    background: linear-gradient(to right, #f06543, #e94976);
    color: white;
    box-shadow: 0 0 15px rgba(233, 73, 118, 0.5);
    border: 2px solid rgba(255, 255, 255, 0.8);
  }
  
  .timeline-label {
    position: absolute;
    left: 60px;
    color: white;
    font-weight: 600;
    font-size: 1.2rem;
    white-space: nowrap;
    margin-bottom: 25px
  }
  
  .timeline-sublabel {
    position: absolute;
    left: 60px;
    top: 30px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    white-space: nowrap;
  }
  
  /* Phase content styling */
  .phase-header {
    margin-bottom: 40px;
  }
  
  .phase-badge {
    display: inline-block;
    background: rgba(108, 108, 222, 0.2);
    color: #6c6cde;
    padding: 6px 16px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 12px;
    letter-spacing: 1px;
  }
  
  .phase-timeline {
    margin-top: 20px;
  }
  
  .phase-weeks {
    display: inline-block;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 8px;
    letter-spacing: 1px;
  }
  
  .phase-progress-bar {
    height: 6px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    overflow: hidden;
    margin-top: 4px;
  }
  
  .phase-progress {
    height: 100%;
    background: linear-gradient(to right, #f8a465, #e94976);
    border-radius: 3px;
    transition: width 1s ease;
  }
  
  .goal-card {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }
  
  .goal-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.08);
  }
  
  .goal-icon {
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(233, 73, 118, 0.1);
  }
  
  .goal-text {
    color: white;
    font-size: 1.1rem;
    font-weight: 500;
  }
  
  /* Final panel styling */
  .final-panel {
    text-align: center;
  }
  
  .milestone-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px 0;
  }
  
  .milestone-pulse {
    position: absolute;
    width: 170px;
    height: 170px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(240, 101, 67, 0.4) 0%, rgba(233, 73, 118, 0) 70%);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.4;
    }
    100% {
      transform: scale(0.95);
      opacity: 0.7;
    }
  }
  
  .milestone-circle {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f06543, #e94976);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 25px rgba(233, 73, 118, 0.5);
    position: relative;
    z-index: 1;
  }
  
  .milestone-inner {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    background-color: rgba(18, 18, 18, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .milestone-text {
    color: white;
    font-size: 2.8rem;
    font-weight: bold;
    line-height: 1;
  }
  
  .milestone-subtext {
    color: #6c6cde;
    font-size: 0.9rem;
    font-weight: 600;
    margin-top: 4px;
    letter-spacing: 2px;
  }
  
  .final-text {
    line-height: 1.6;
    max-width: 320px;
    margin: 0 auto;
  }
  
  .highlight-text {
    color: #f8a465;
    font-weight: 600;
  }
  
  .consistency-meter {
    margin-top: 30px;
  }
  
  .consistency-label {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    margin-bottom: 10px;
    font-weight: 500;
  }
  
  .consistency-bar {
    height: 8px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    overflow: hidden;
  }
  
  .consistency-progress {
    height: 100%;
    width: 0;
    background: linear-gradient(to right, #6c6cde, #e94976);
    border-radius: 4px;
    transition: width 2s ease;
  }
  
  .consistency-markers {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.8rem;
  }
  
  .intro-text {
    max-width: 320px;
  }
  
  /* Animation for text elements */
  .text-h3, .text-subtitle-1 {
    animation: fadeIn 0.8s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  </style>