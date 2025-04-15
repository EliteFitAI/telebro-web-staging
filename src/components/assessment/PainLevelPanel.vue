<template>
    <div class="onboarding-panel">
      <div class="video-container" :style="{ height: videoHeight }">
        <video-placeholder :height="videoHeight" />
      </div>
  
      <div class="content-wrapper" ref="contentWrapper">
        <div class="panel-content" ref="contentPanel">
          <div class="handle-indicator"></div>
  
          <h2 class="panel-title">How would you rate your current pain level?</h2>
  
          <v-fade-transition>
            <div class="pain-scale-container">
              <div class="scale-label-container">
                <span class="scale-label">{{getPainLevelName(painLevel)}}</span>
              </div>
              
              <v-slider
      v-model="painLevel"
      :min="0"
      :max="10"
      step="1"
      :color="thumbColor" 
      track-color="rgba(255, 255, 255, 0.1)"
      thumb-label="always"
      class="pain-slider"
    ></v-slider>
              
              <div class="emoji-scale">
                <div v-for="n in 11" :key="n" class="emoji-container" :class="{ 'active': painLevel === n-1 }">
                  <v-icon :icon="getPainEmoji(n-1)" :color="getPainColor(n-1)" size="24"></v-icon>
                </div>
              </div>
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
      default: false
    }
  });
  
  const emit = defineEmits(['next', 'back', 'select']);
  
  const painLevel = ref(3);
  const contentPanel = ref(null);
  const contentWrapper = ref(null);
  const contentExceedsHeight = ref(false);
  
  const isValid = computed(() => {
    return painLevel.value !== null;
  });

  const trackGradient = computed(() => {
  const green = '#88D456';
  const orange = '#FFA500';
  const red = '#FF0000';
  const percentage = (painLevel.value / 10) * 100; // 0% to 100%

  // Adjust gradient stops based on painLevel
  if (painLevel.value <= 3) {
    return `linear-gradient(to right, ${green} 0%, ${green} ${percentage}%, ${orange} ${percentage}%, ${red} 100%)`;
  } else if (painLevel.value <= 7) {
    return `linear-gradient(to right, ${green} 0%, ${orange} ${percentage / 2}%, ${red} ${percentage}%, ${red} 100%)`;
  } else {
    return `linear-gradient(to right, ${green} 0%, ${orange} 30%, ${red} ${percentage}%, ${red} 100%)`;
  }
});

// Computed property for thumb color to match the gradient end
const thumbColor = computed(() => {
  if (painLevel.value <= 3) return '#88D456';
  if (painLevel.value <= 7) return '#FFA500';
  return '#FF0000';
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
  
  const getPainEmoji = (level) => {
    const emojis = [
      'mdi-emoticon',            // 0
      'mdi-emoticon',            // 1
      'mdi-emoticon-neutral',    // 2
      'mdi-emoticon-neutral',    // 3
      'mdi-emoticon-neutral',    // 4
      'mdi-emoticon-neutral',    // 5
      'mdi-emoticon-sad',        // 6
      'mdi-emoticon-sad',        // 7
      'mdi-emoticon-sad',        // 8
      'mdi-emoticon-cry',        // 9
      'mdi-emoticon-cry'         // 10
    ];
    return emojis[level];
  };
  
  const getPainLevelName = (level) => {
  const painLevels = [
    'No pain',           // 0
    'Very mild pain',    // 1
    'Mild pain',         // 2
    'Mild pain',         // 3
    'Moderate pain',     // 4
    'Moderate pain',     // 5
    'Moderately severe pain', // 6
    'Severe pain',       // 7
    'Severe pain',       // 8
    'Very severe pain',  // 9
    'Worst possible pain' // 10
  ];
  return painLevels[level] || 'Unknown'; // Fallback for invalid levels
};

  const getPainColor = (level) => {
    if (level <= 1) return '#88D456';      // Green
    if (level <= 5) return '#FFC107';      // Yellow
    if (level <= 8) return '#FF9800';      // Orange
    return '#FF5252';                      // Red
  };
  
  const next = () => {
    if (isValid.value) {
      const data = {
        painLevel: painLevel.value
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
  
  .pain-scale-container {
    width: 100%;
    padding-bottom: 16px;
    margin-top: 20px;

  }
  
  .scale-label-container {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
  
  .scale-label {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .pain-slider {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }
  
  .emoji-scale {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }
  
  .emoji-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    opacity: 0.5;
    transition: all 0.3s ease;
    
    &.active {
      opacity: 1;
      transform: scale(1.3);
    }
  }
  
  :deep(.v-slider.v-input--horizontal){
    margin-inline: 0 !important;
  }


  :deep(.v-slider__track__fill) {
  background: v-bind(trackGradient); /* Bind the computed gradient */
  border-radius: 4px; /* Smooth edges */
  transition: background 0.3s ease; /* Smooth transition for gradient changes */
}

/* Ensure the track background remains transparent */
:deep(.v-slider__track__background) {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

/* Optional: Style the thumb to match the gradient end */
:deep(.v-slider__thumb) {
  border-color: v-bind(thumbColor); /* Match thumb to gradient end */
  background-color: v-bind(thumbColor); /* Match thumb to gradient end */
}
  
  </style>