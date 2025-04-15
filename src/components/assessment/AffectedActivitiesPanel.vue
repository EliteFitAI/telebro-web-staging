<template>
    <div class="onboarding-panel">
      <div class="video-container" :style="{ height: videoHeight }">
        <video-placeholder :height="videoHeight" />
      </div>
  
      <div class="content-wrapper" ref="contentWrapper">
        <div class="panel-content" ref="contentPanel">
          <div class="handle-indicator"></div>
  
          <h2 class="panel-title">Which activities are affected by your pain?</h2>
          <p class="panel-subtitle">Select all that apply</p>
  
          <v-fade-transition>
            <div class="options-container">
              <div
                v-for="(activity, index) in activityOptions"
                :key="index"
                @click="toggleActivity(activity.value)"
                :class="[
                  'activity-option',
                  'mb-3',
                  { 'selected': selectedActivities.includes(activity.value) }
                ]"
              >
                <v-icon class="option-icon" :icon="activity.icon" />
                <div class="option-label">{{ activity.label }}</div>
              </div>
  
              <div v-if="selectedActivities.includes('other')" class="other-input-container mt-4">
                <app-input v-model="otherActivityDetails" placeholder="Tell us more" />
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
  import AppInput from '@/components/assessment/common/AppInput.vue';
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
  
  const emit = defineEmits(['next', 'back', 'update']);
  
  const activityOptions = [
    { value: 'walking', label: 'Walking', icon: 'mdi-walk' },
    { value: 'standing', label: 'Standing', icon: 'mdi-human-handsup' },
    { value: 'sitting', label: 'Sitting', icon: 'mdi-seat' },
    { value: 'bending', label: 'Bending', icon: 'mdi-human-handsdown' },
    { value: 'lifting', label: 'Lifting', icon: 'mdi-weight-lifter' },
    { value: 'sleeping', label: 'Sleeping', icon: 'mdi-sleep' },
    { value: 'exercise', label: 'Exercise', icon: 'mdi-weight' },
    { value: 'other', label: 'Other', icon: 'mdi-dots-horizontal-circle' },
  ];
  
  const selectedActivities = ref([]);
  const otherActivityDetails = ref('');
  const contentPanel = ref(null);
  const contentWrapper = ref(null);
  const contentExceedsHeight = ref(false);
  
  const isValid = computed(() => {
    if (selectedActivities.value.includes('other')) {
      return selectedActivities.value.length > 0 && otherActivityDetails.value.trim().length > 0;
    }
    return selectedActivities.value.length > 0;
  });
  
  const checkContentHeight = () => {
    if (contentPanel.value && contentWrapper.value) {
      contentExceedsHeight.value = contentPanel.value.scrollHeight > contentWrapper.value.clientHeight;
    }
  };
  
  const toggleActivity = (value) => {
    const index = selectedActivities.value.indexOf(value);
    if (index === -1) {
      selectedActivities.value.push(value);
    } else {
      selectedActivities.value.splice(index, 1);
    }
  };
  
  onMounted(() => {
    checkContentHeight();
    window.addEventListener('resize', checkContentHeight);
  });
  
  onUpdated(() => {
    checkContentHeight();
  });
  
  const next = () => {
    const data = {
      affectedActivities: selectedActivities.value,
      otherActivityDetails: selectedActivities.value.includes('other') ? otherActivityDetails.value : null
    };
    emit('update', data);
    emit('next');
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
    margin-bottom: 8px;
    text-align: center;
  }
  
  .panel-subtitle {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 24px;
    text-align: center;
  }
  
  .options-container {
    width: 100%;
    padding-bottom: 24px;
  }
  
  .activity-option {
    background-color: #1E1E1E;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    justify-content: start;
    gap: 20px;
    &.selected {
      border: 1px solid #88D456;
      background-color: rgba(136, 212, 86, 0.1);
    }
  
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  
  .option-label {
    color: white;
    font-size: 16px;
  }
  
  .other-input-container {
    animation: fadeIn 0.3s ease-in-out;
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
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>