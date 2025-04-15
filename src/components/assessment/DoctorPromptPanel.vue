<template>
    <div class="onboarding-panel">
      <div class="video-container" :style="{ height: videoHeight }">
        <video-placeholder :height="videoHeight" />
      </div>
  
      <div class="content-wrapper" ref="contentWrapper">
        <div class="panel-content" ref="contentPanel">
          <div class="handle-indicator"></div>
  
          <div class="alert-container">
            <v-icon icon="mdi-alert-circle" color="#FF5252" size="64" class="alert-icon"></v-icon>
            
            <h2 class="panel-title">Please stop the assessment and see a doctor</h2>
            
            <p class="alert-text">
              Based on your symptoms, we recommend consulting a healthcare professional before continuing.
            </p>
  
            <v-divider class="my-4" color="rgba(255, 255, 255, 0.1)"></v-divider>
            
            <p class="additional-info">
              Your symptoms may require medical attention. This app is not a substitute for professional medical advice.
            </p>
          </div>
  
          <div class="action-buttons">
            <app-button block @click="exitAssessment" class="exit-button">
              Exit Assessment
            </app-button>
            
            <v-btn
              block
              variant="text"
              color="white"
              class="mt-3 back-button"
              @click="goBack"
            >
              Go Back
            </v-btn>
          </div>
  
          <div class="bottom-blur-effect" :class="{ 'active': !contentExceedsHeight }"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUpdated } from 'vue';
  import { useRouter } from 'vue-router';
  import VideoPlaceholder from '@/components/assessment/common/VideoPlaceholder.vue';
  import AppButton from '@/components/assessment/common/AppButton.vue';
  
  const props = defineProps({
    videoHeight: {
      type: String,
      default: '50vh'
    },
    applyScrolling: {
      type: Boolean,
      default: true
    }
  });
  
  const emit = defineEmits(['back']);
  const router = useRouter();
  
  const contentPanel = ref(null);
  const contentWrapper = ref(null);
  const contentExceedsHeight = ref(false);
  
  const checkContentHeight = () => {
    if (contentPanel.value && contentWrapper.value) {
      contentExceedsHeight.value = contentPanel.value.scrollHeight > contentWrapper.value.clientHeight;
    }
  };
  
  onMounted(() => {
    checkContentHeight();
    window.addEventListener('resize', checkContentHeight);
  });
  
  onUpdated(() => {
    checkContentHeight();
  });
  
  const exitAssessment = () => {
    // Navigate to home or a specific "seek medical help" page
    router.push({ name: 'Home' });
  };
  
  const goBack = () => {
    emit('back');
  };
  </script>
  
  <style lang="scss" scoped>
  @import "@/views/assessment/styles/theme.scss";
  
  .onboarding-panel {
    position: relative;
    height: 100dvh;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .video-container {
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    max-width: 600px;
    margin: 0 auto;
    transition: height 1s linear;
  }
  
  .content-wrapper {
    position: relative;
    flex: 1;
    overflow-y: auto;
    z-index: 2;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: scrollbar;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  
  .panel-content {
    position: relative;
    background: rgba(0, 0, 0, 0.9);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 20px 16px;
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .handle-indicator {
    width: 40px;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    margin: 0 auto 20px;
  }
  
  .alert-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 16px;
  }
  
  .alert-icon {
    margin-bottom: 16px;
  }
  
  .panel-title {
    font-size: 24px;
    font-weight: 600;
    color: #FF5252;
    margin-bottom: 16px;
    text-align: center;
  }
  
  .alert-text {
    font-size: 18px;
    color: white;
    margin-bottom: 16px;
    line-height: 1.5;
  }
  
  .additional-info {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 16px;
    line-height: 1.5;
  }
  
  .exit-button {
    background: linear-gradient(to right, #FF5252, #FF8A80);
  }
  
  .back-button {
    opacity: 0.7;
  }
  
  .bottom-blur-effect1 {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    pointer-events: none;
    z-index: 10;
  
    &.active {
      display: block;
    }
  }
  </style>