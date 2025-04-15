<template>
    <div class="onboarding-panel">
      <!-- <video-placeholder height="50vh" /> -->
      
      <div class="panel-content">
        <h2 class="panel-title">Join our growing community</h2>
        
        <div class="stats-container">
          <div class="stat-item">
            <div class="stat-icon">
              <v-icon color="white">mdi-account-group</v-icon>
            </div>
            <div class="stat-content">
              <h3 class="stat-value">250K+</h3>
              <p class="stat-label">active users worldwide</p>
            </div>
          </div>
          
          <div class="stat-item">
            <div class="stat-icon">
              <v-icon color="white">mdi-clock-outline</v-icon>
            </div>
            <div class="stat-content">
              <h3 class="stat-value">AI-powered</h3>
              <p class="stat-label">tailored physiotherapy</p>
            </div>
          </div>
          
          <div class="stat-item">
            <div class="stat-icon">
              <v-icon color="white">mdi-map-marker</v-icon>
            </div>
            <div class="stat-content">
              <h3 class="stat-value">Active in SE Asia</h3>
              <p class="stat-label">and expanding globally</p>
            </div>
          </div>
        </div>
        
        <div class="action-button">
          <app-button block @click="handleReady">I'm Ready</app-button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import AppButton from '@/components/assessment/common/AppButton.vue';
  import VideoPlaceholder from '@/components/assessment/common/VideoPlaceholder.vue';
  
  const emit = defineEmits(['next', 'back']);
  
  function handleReady() {
    // Here you would typically submit the user data to your backend
    // and redirect to the goal setting screen
    emit('next');
  }
  </script>
  
  <style lang='scss' scoped>
  @import "@/views/assessment/styles/theme.scss";
  
  .stats-container {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    background-color: #1E1E1E;
    border-radius: 12px;
    padding: 1rem;
    width: 100%;
  }
  
  .stat-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #6c5ce7;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
  }
  
  .stat-content {
    flex: 1;
  }
  
  .stat-value {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: white;
  }
  
  .stat-label {
    font-size: 0.9rem;
    opacity: 0.8;
  }
  </style>