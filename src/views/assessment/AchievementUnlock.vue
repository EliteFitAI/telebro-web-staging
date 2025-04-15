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
  
          <div class="achievement-container">
            <!-- Confetti elements -->
            <div class="confetti-container">
              <div v-for="i in 30" :key="i" class="confetti-item" 
                   :style="{ 
                     left: `${Math.random() * 100}%`, 
                     top: `${Math.random() * 100}%`,
                     backgroundColor: getRandomColor(),
                     width: `${Math.random() * 15 + 5}px`,
                     height: `${Math.random() * 15 + 5}px`,
                     transform: `rotate(${Math.random() * 360}deg)`
                   }">
              </div>
            </div>
            
            <!-- Badge visual -->
            <div class="badge-container">
              <div class="badge">
                <v-icon color="white" size="56">mdi-star</v-icon>
              </div>
            </div>
            
            <!-- Achievement text -->
            <h1 class="achievement-title gradient-text text-h3 font-weight-bold text-center">
                Level Unlocked: Recovery Starter
            </h1>
            <p class="achievement-subtitle text-subtitle-1 text-center">
                You've completed your first milestone — let's keep going.
            </p>
            
            <!-- Continue button -->
            <div class="action-button">
              <v-btn @click="handleContinue" block height="60" rounded="pill"
                class="continue-button text-h6 text-white">
                Continue
                <v-icon end class="ml-2">mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  
  // Function to get random confetti colors - using the same color palette from ReminderConfiguration
  function getRandomColor() {
    const colors = ['#f8a465', '#e94976', '#f06543', '#6c6cde', '#5DADE2', '#48C9B0', '#F4D03F'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  const handleContinue = () => {
    router.push({name:'RecoveryPlan'});
  }
  </script>
  
  <style scoped>
  .background {
    position: relative;
    background-color: #121212;
    min-height: 100vh;
    overflow: hidden;
  }
  
  /* Animated background elements - matching the ReminderConfiguration */
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
  
  .achievement-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 100%;
    height: 100%;
    max-width: 500px;
    margin: 0 auto;
    position: relative;
    z-index: 10;
    padding-top: 100px;
  }
  
  .confetti-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
  
  .confetti-item {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    animation: fall 4s linear infinite;
  }
  
  .badge-container {
    margin-bottom: 40px;
    animation: bounce 1.5s ease infinite;
    position: relative;
  }
  
  .badge {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #f06543, #e94976);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 25px rgba(233, 73, 118, 0.5);
    position: relative;
    transform: rotate(8deg);
  }
  
  .badge::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #f06543, #e94976);
    border-radius: 16px;
    z-index: -1;
    transform: rotate(-16deg);
  }
  
  .gradient-text {
    background: linear-gradient(to right, #f8a465, #e94976);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.5px;
    font-size: 2.5rem;
  }
  
  .achievement-title {
    margin-top: 30px;
    margin-bottom: 10px;
    font-weight: 700;
    animation: fadeIn 0.8s ease-in-out;
  }
  
  .achievement-subtitle {
    margin-bottom: 60px;
    color: rgba(255, 255, 255, 0.7) !important;
    animation: fadeIn 0.8s ease-in-out;
  }
  
  .action-button {
    width: 100%;
    padding: 16px;
    position: relative;
    margin-top: auto;
  }
  
  .continue-button {
    background: linear-gradient(to right, #f06543, #e94976) !important;
    font-weight: 500 !important;
    box-shadow: 0 4px 15px rgba(240, 101, 67, 0.4);
  }
  
  @keyframes fall {
    0% {
      transform: translateY(-100%) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(1000%) rotate(360deg);
      opacity: 0;
    }
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Additional responsive styles */
  @media (max-width: 600px) {
    .badge {
      width: 100px;
      height: 100px;
    }
    
    .achievement-title {
      font-size: 2rem !important;
    }
  }
  </style>