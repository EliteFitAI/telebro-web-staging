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

            <!-- Title Section with updated styling -->
            <div class="mt-12 px-4 pt-12 pb-4">
              <h1 class="text-h3 font-weight-bold gradient-text">
                Meet our experts
              </h1>
              <p class="text-white text-subtitle-1 mt-2">
                You'll get workout lessons from the top<br>fitness coaches in the world.
              </p>
            </div>

            <!-- Coaches Grid with updated styling -->
            <v-container class="px-4">
              <v-row>
                <v-col cols="12" sm="6" v-for="coach in coaches" :key="coach.name">
                  <div class="expert-card mx-auto">
                    <div class="expert-content">
                      <div class="expert-avatar">
                        <v-avatar size="80" class="expert-image">
                          <v-img :src="coach.image" :alt="coach.name" cover></v-img>
                        </v-avatar>
                      </div>
                      <div class="expert-info">
                        <h3 class="expert-name">{{ coach.name }}</h3>
                        <p class="expert-title">{{ coach.title }}</p>
                        <p class="expert-description">{{ coach.description }}</p>
                        <div class="specialty-chips">
                          <span v-for="specialty in coach.specialties" :key="specialty" class="specialty-chip">
                            {{ specialty }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>

        <!-- Enhanced action button -->
        <div class="action-button">
          <v-btn @click="$emit('next')" block height="60" rounded="pill" class="next-button text-h6 text-white">
            Next
            <v-icon end class="ml-2">mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

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

.expert-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 20px;
  transition: transform 0.3s ease;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 16px;
  cursor: pointer;
}

.expert-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(233, 73, 118, 0.3);
}

.expert-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.expert-avatar {
  position: relative;
}

.expert-image {
  border: 3px solid transparent;
  background: linear-gradient(135deg, #f06543, #e94976) border-box;
  box-shadow: 0 8px 16px rgba(233, 73, 118, 0.3);
}

.expert-info {
  flex-grow: 1;
}

.expert-name {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.expert-title {
  color: #f8a465;
  font-size: 0.95rem;
  margin-bottom: 8px;
}

.expert-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.specialty-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.specialty-chip {
  background: rgba(233, 73, 118, 0.15);
  color: #f8a465;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  border: 1px solid rgba(233, 73, 118, 0.3);
  transition: all 0.2s ease;
}

.specialty-chip:hover {
  background: rgba(233, 73, 118, 0.25);
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
  box-shadow: 0 8px 16px rgba(233, 73, 118, 0.4);
  transition: all 0.3s ease;
}

.next-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(233, 73, 118, 0.5);
}

/* Animation for text elements */
.text-h3, .text-subtitle-1 {
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .expert-card {
    width: 100%;
  }
  
  .expert-content {
    flex-direction: column;
    text-align: center;
  }
  
  .expert-avatar {
    margin-bottom: 12px;
  }

  .specialty-chips {
    justify-content: center;
  }
}
</style>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['next', 'back']);

const coaches = ref([
  {
    name: 'Coach Eliza',
    title: 'Strength & Conditioning Expert',
    image: 'https://randomuser.me/api/portraits/men/78.jpg',
    description: 'With over 15 years of experience, Eliza specializes in building functional strength and improving athletic performance.',
    specialties: ['Powerlifting', 'HIIT', 'Mobility']
  },
  {
    name: 'Coach Ron',
    title: 'Body Transformation Specialist',
    image: 'https://randomuser.me/api/portraits/men/77.jpg',
    description: 'Ron helps clients achieve their dream physique through customized nutrition and training plans.',
    specialties: ['Weight Loss', 'Muscle Building', 'Nutrition']
  },
  {
    name: 'Coach Josh',
    title: 'Mobility & Recovery Coach',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    description: 'Josh focuses on improving movement quality and accelerating recovery for optimal performance.',
    specialties: ['Yoga', 'Stretching', 'Recovery']
  },
  {
    name: 'Coach Nathan',
    title: 'Endurance Training Expert',
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
    description: 'Nathan designs programs to boost stamina and mental toughness for endurance athletes.',
    specialties: ['Running', 'Cycling', 'Triathlon']
  }
]);
</script>