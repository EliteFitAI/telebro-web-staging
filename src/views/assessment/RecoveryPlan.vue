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
            <v-col cols="12" class="mb-4">
              <!-- Back button with improved styling -->
              <v-btn @click="$emit('back')" icon variant="text" class="back-button" size="large">
                <v-icon size="x-large" color="white">mdi-chevron-left</v-icon>
              </v-btn>
  
              <!-- Title Section -->
              <div class="panel-content">
                <h1 class="text-h3 font-weight-bold gradient-text mb-6">
                  Excellent! Here's how we will personalize your recovery plan:
                </h1>
  
                <!-- Summary Cards -->
                <div class="summary-cards">
                  <div v-for="(item, index) in summaryItems" 
                       :key="index" 
                       class="summary-card mb-3">
                    <div class="d-flex align-center justify-space-between pa-4">
                      <div class="d-flex align-center">
                        <div class="summary-icon">
                          <v-icon color="#e94976">mdi-check-circle</v-icon>
                        </div>
                        <div class="summary-label">{{ item.label }}</div>
                      </div>
                      <div class="summary-value">{{ item.value }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
  
          <!-- Enhanced action button -->
          <div class="action-button">
            <v-btn 
              @click="handleContinue" 
              block 
              height="60" 
              rounded="pill"
              class="next-button text-h6">
              <span>Continue</span>
              <v-icon end class="ml-2">mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </div>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  const router = useRouter();
  const emit = defineEmits(['continue', 'back']);
  
  const handleContinue = () => {
    router.push({name:'RecoveryTimeline'});
  };
  
  const summaryItems = ref([
    { label: 'Goal', value: 'Improve shoulder pain' },
    { label: 'Reason', value: 'Return to work without pain' },
    { label: 'Style', value: 'Structured plans' },
    { label: 'Current mobility', value: 'Moderate with limitations' },
    { label: 'Time', value: '15–20 min per day' }
  ]);
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
    display: flex;
    flex-direction: column;
  }
  
  .gradient-text {
    background: linear-gradient(to right, #f8a465, #e94976);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.5px;
    font-size: 2.25rem;
    animation: fadeIn 0.8s ease-in-out;
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
  
  /* Summary Cards styling */
  .summary-cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    margin-bottom: 80px;
  }
  
  .summary-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    animation: fadeIn 0.8s ease-in-out;
    animation-fill-mode: both;
  }
  
  .summary-card:nth-child(2) {
    animation-delay: 0.1s;
  }
  
  .summary-card:nth-child(3) {
    animation-delay: 0.2s;
  }
  
  .summary-card:nth-child(4) {
    animation-delay: 0.3s;
  }
  
  .summary-card:nth-child(5) {
    animation-delay: 0.4s;
  }
  
  .summary-card:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.08);
  }
  
  .summary-icon {
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .summary-label {
    color: white;
    font-size: 1.1rem;
    font-weight: 500;
  }
  
  .summary-value {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    font-weight: 400;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @media (max-width: 600px) {
    .gradient-text {
      font-size: 1.8rem;
    }
    
    .summary-label {
      font-size: 1rem;
    }
    
    .summary-value {
      font-size: 0.9rem;
    }
  }
  </style>