<template>
    <div class="onboarding-panel">
      <div class="video-container" :style="{ height: videoHeight }">
        <video-placeholder :height="videoHeight" />
      </div>
  
      <div class="content-wrapper" ref="contentWrapper">
        <div class="panel-content" ref="contentPanel">
          <div class="handle-indicator"></div>
  
          <h2 class="panel-title">How much time can you set aside for your recovery each day?</h2>
  
          <v-fade-transition>
            <div class="options-container">
              <v-btn
                v-for="(option, index) in timeOptions"
                :key="index"
                block
                variant="outlined"
                color="white"
                class="time-option mb-3"
                :class="{ 'selected': selectedTime === option.value }"
                @click="selectTime(option.value)"
              >
                <v-icon :icon="option.icon" class="mr-3"></v-icon>
                {{ option.label }}
              </v-btn>
            </div>
          </v-fade-transition>
  
          <div class="action-button">
            <app-button block @click="next" :disabled="!isValid">Continue</app-button>
          </div>
  
          <div class="bottom-blur-effect" :class="{ 'active': !contentExceedsHeight }"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUpdated } from 'vue';
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
  
  const emit = defineEmits(['next', 'back', 'select']);
  
  const selectedTime = ref(null);
  const contentPanel = ref(null);
  const contentWrapper = ref(null);
  const contentExceedsHeight = ref(false);
  
  const timeOptions = [
    {
      value: 'short',
      label: '5-10 minutes',
      icon: 'mdi-clock-time-five-outline'
    },
    {
      value: 'medium',
      label: '15-20 minutes',
      icon: 'mdi-clock-time-ten-outline'
    },
    {
      value: 'long',
      label: '30+ minutes',
      icon: 'mdi-clock-outline'
    }
  ];
  
  const isValid = computed(() => {
    return selectedTime.value !== null;
  });
  
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
  
  const selectTime = (value) => {
    selectedTime.value = value;
    setTimeout(checkContentHeight, 50);
  };
  
  const next = () => {
    if (isValid.value) {
      const data = {
        timeCommitment: selectedTime.value
      };
  
      emit('select', data);
      emit('next');
    }
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
  }
  
  .handle-indicator {
    width: 40px;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    margin: 0 auto 20px;
  }
  
  .panel-title {
    font-size: 24px;
    font-weight: 600;
    color: white;
    margin-bottom: 24px;
    text-align: center;
  }
  
  .options-container {
    width: 100%;
    padding-bottom: 16px;
  }
  
  .time-option {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-height: 56px;
    border-radius: 12px;
    background-color: #1E1E1E;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    text-align: left;
    padding: 0 16px;
  
    &.selected {
      background-color: rgba(136, 212, 86, 0.2);
      border-color: #88D456;
    }
  
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
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