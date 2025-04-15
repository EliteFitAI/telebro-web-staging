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
            <v-btn @click="$emit('back')" icon variant="text" class="back-button" size="large">
              <v-icon size="x-large" color="white">mdi-chevron-left</v-icon>
            </v-btn>
            
            <!-- Title Section -->
            <div class="panel-content">
              <div class="assessment-badge">
                <div class="assessment-pulse"></div>
                <div class="assessment-icon">
                  <v-icon size="x-large" color="white">mdi-run</v-icon>
                </div>
              </div>

              <h1 class="text-h3 font-weight-bold gradient-text mt-8 mb-4 text-center">
                Let's start an assessment on your movement
              </h1>
              
              <p class="text-white text-subtitle-1 text-center mb-8">
                These quick assessments help us tailor your recovery plan to your body. It takes 1-3 minutes.
              </p>

              <!-- Assessments Section -->
              <div class="assessment-cards">
                <div v-for="assessment in assessments" :key="assessment.id" class="frequency-card mb-4">
                  <div class="d-flex align-center">
                    <div class="assessment-image-container mr-4">
                      <img :src="assessment.image" alt="Assessment thumbnail" class="assessment-image" />
                    </div>
                    <div class="frequency-text">
                      <div class="frequency-title">{{ assessment.title }}</div>
                      <div class="frequency-detail">{{ assessment.description }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        
        <!-- Enhanced action button -->
        <div class="action-button">
          <v-btn 
            @click="goToWorkout" 
            block 
            height="60" 
            rounded="pill"
            class="next-button text-h6">
            <span>Begin Assessments</span>
            <v-icon end class="ml-2">mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['back', 'next']);

const goToWorkout = () => {
  router.push({name:'Report'});
};

const assessments = ref([
  {
    id: 1,
    title: 'Range of Motion',
    description: 'Evaluate your joint flexibility through guided movements.',
    image: 'https://i.ytimg.com/vi/oQJOv7I8u_M/hqdefault.jpg'
  },
  {
    id: 2,
    title: 'Strength Test',
    description: 'Measure your muscle strength with simple exercises.',
    image: 'https://i.ytimg.com/vi/OV-JkYCguU0/hqdefault.jpg'
  },
  {
    id: 3,
    title: 'Balance Assessment',
    description: 'Test your stability and coordination with quick tasks.',
    image: 'https://i.ytimg.com/vi/dPBo5KGYnBk/hqdefault.jpg'
  }
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

/* Assessment icon styling */
.assessment-badge {
  position: relative;
  align-self: center;
  margin-top: 20px;
}

.assessment-pulse {
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

.assessment-icon {
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

.assessment-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-top: 16px;
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
}

.frequency-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(233, 73, 118, 0.3);
}

.assessment-image-container {
  width: 90px;
  height: 70px;
  overflow: hidden;
  border-radius: 10px;
  position: relative;
  flex-shrink: 0;
  border: 1px solid rgba(233, 73, 118, 0.2);
}

.assessment-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

/* Animation for text elements */
.text-h3, .text-subtitle-1 {
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>