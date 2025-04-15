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

        <v-row no-gutters>
          <v-col cols="12">
            <!-- Back button with improved styling -->
            <v-btn @click="$emit('back')" icon variant="text" class="back-button" size="large">
              <v-icon size="x-large" color="white">mdi-chevron-left</v-icon>
            </v-btn>
            
            <!-- Title Section -->
            <div class="panel-content">
              <h1 class="text-h3 font-weight-bold gradient-text mb-6">
                You're in good company!
              </h1>
              
              <!-- Impact and Reach Section -->
              <div class="achievements-section">
                <!-- First Laurel Container (Left Aligned) -->
                <div class="laurel-container laurel-left-align">
                  <div class="laurel-left">
                    <img src="../../assets/feather-left.png" height="80px">
                  </div>
                  <div class="rating-content">
                    <div class="text-h5 text-white font-weight-bold">
                      <v-icon color="#f8a465" class="mr-2">mdi-check-circle</v-icon>138K+
                    </div>
                    <div class="text-white text-body-1 mt-1">
                      <p>active users</p>
                    </div>
                  </div>
                  <div class="laurel-right">
                    <img src="../../assets/feather-right.png" height="80px">
                  </div>
                </div>

                <!-- Second Laurel Container (Right Aligned) -->
                <div class="laurel-container laurel-right-align">
                  <div class="laurel-left">
                    <img src="../../assets/feather-left.png" height="80px">
                  </div>
                  <div class="rating-content">
                    <div class="text-h5 text-white font-weight-bold">
                      <v-icon color="#6c6cde" class="mr-2">mdi-clock-fast</v-icon>AI-powered
                    </div>
                    <div class="text-white text-body-1 mt-1">
                      <p>tailored physiotherapy</p>
                    </div>
                  </div>
                  <div class="laurel-right">
                    <img src="../../assets/feather-right.png" height="80px">
                  </div>
                </div>

                <!-- Third Laurel Container (Left Aligned) -->
                <div class="laurel-container laurel-left-align">
                  <div class="laurel-left">
                    <img src="../../assets/feather-left.png" height="80px">
                  </div>
                  <div class="rating-content">
                    <div class="text-h5 text-white font-weight-bold">
                      <v-icon color="#e94976" class="mr-2">mdi-map-marker</v-icon>Active
                    </div>
                    <div class="text-white text-body-1 mt-1">
                      <p>in Singapore & Asia</p>
                    </div>
                  </div>
                  <div class="laurel-right">
                    <img src="../../assets/feather-right.png" height="80px">
                  </div>
                </div>
              </div>
              
              <!-- Testimonials Section -->
              <div class="testimonials-section">
                <h2 class="text-h5 text-white font-weight-bold mb-6">Here's what others are saying</h2>
                <div class="testimonial-cards">
                  <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card-wrapper">
                    <div class="testimonial-card">
                      <div class="d-flex justify-space-between align-center">
                        <div class="text-h6 text-white">{{ testimonial.name }}</div>
                        <div class="text-right text-subtitle text-white">
                          {{ testimonial.date }}
                        </div>
                      </div>
                      <div class="d-flex my-2">
                        <v-icon v-for="n in testimonial.rating" :key="n" icon="mdi-star" color="#f8a465" size="small"></v-icon>
                      </div>
                      <div class="text-white text-subtitle mt-2">
                        "{{ testimonial.quote }}"
                      </div>
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
            @click="$emit('next')" 
            block 
            height="60" 
            rounded="pill"
            class="next-button text-h6">
            <span>I'm Ready</span>
            <v-icon end class="ml-2">mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['back', 'next']);

const testimonials = ref([
  {
    id: 1,
    name: 'Sarah M.',
    date: 'January 2025',
    rating: 5,
    quote: 'I feel like I finally found a physiotherapy program that understands my needs!'
  },
  {
    id: 2,
    name: 'James T.',
    date: 'December 2024',
    rating: 4,
    quote: 'The AI tailoring makes every session feel personalized and effective.'
  },
  {
    id: 3,
    name: 'Lisa K.',
    date: 'November 2024',
    rating: 5,
    quote: 'I feel like my mobility has improved dramatically since starting!'
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

/* Laurel container styling */
.achievements-section {
  margin-bottom: 30px;
  animation: fadeIn 0.8s ease-in-out;
}

.laurel-container {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  height: 100px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  animation: slideIn 0.8s ease-in-out;
  animation-fill-mode: both;
}

.laurel-container:nth-child(2) {
  animation-delay: 0.2s;
}

.laurel-container:nth-child(3) {
  animation-delay: 0.4s;
}

.laurel-left-align {
  justify-content: flex-start;
  padding-left: 20px;
}

.laurel-right-align {
  justify-content: flex-end;
  padding-right: 20px;
}

.laurel-left {
  margin-right: 10px;
}

.laurel-right {
  margin-left: 10px;
}

.rating-content {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 2;
}

.rating-content p {
  margin: 8px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
}

/* Testimonials section styling */
.testimonials-section {
  margin-top: 20px;
  margin-bottom: 120px;
  animation: fadeIn 1s ease-in-out;
  animation-delay: 0.6s;
  animation-fill-mode: both;
}

.testimonial-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.testimonial-card-wrapper {
  animation: slideUp 0.5s ease-in-out;
  animation-fill-mode: both;
}

.testimonial-card-wrapper:nth-child(1) {
  animation-delay: 0.8s;
}

.testimonial-card-wrapper:nth-child(2) {
  animation-delay: 1s;
}

.testimonial-card-wrapper:nth-child(3) {
  animation-delay: 1.2s;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(233, 73, 118, 0.3);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .laurel-left-align {
    padding-left: 10px;
  }
  
  .laurel-right-align {
    padding-right: 10px;
  }
  
  .laurel-left {
    margin-right: 5px;
  }
  
  .laurel-right {
    margin-left: 5px;
  }
  
  .gradient-text {
    font-size: 1.8rem;
  }
}
</style>