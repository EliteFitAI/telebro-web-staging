<template>
    <div class="onboarding-panel">
      <div class="video-container" :style="{ height: videoHeight }">
        <video-placeholder :height="videoHeight" />
      </div>
  
      <div class="content-wrapper" ref="contentWrapper">
        <div class="panel-content" ref="contentPanel">
          <div class="handle-indicator"></div>
  
          <h2 class="panel-title">Are you experiencing any of the following?</h2>
  
          <v-fade-transition>
            <div class="options-container">
              <div
                v-for="(option, index) in symptomOptions"
                :key="index"
                @click="toggleSymptom(option.value)"
                :class="[
                  'symptom-option',
                  'mb-3',
                  { 'selected': selectedSymptoms.includes(option.value) }
                ]"
              >
                <v-icon class="option-icon" :icon="option.icon" />
                <div class="option-label">{{ option.label }}</div>
              </div>
            </div>
          </v-fade-transition>
  
          <div class="action-button">
            <app-button block @click="next">Continue</app-button>
          </div>
  
          <div class="bottom-blur-effect" :class="{ 'active': !contentExceedsHeight }"></div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
import { ref, computed, onMounted, onUpdated, watch } from 'vue';
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

const symptomOptions = [
  { value: 'fatigue', label: 'Unusual fatigue', icon: 'mdi-sleep' },
  { value: 'numbness', label: 'Numbness in lower back/buttocks', icon: 'mdi-arm-flex' },
  { value: 'dizziness', label: 'Dizziness', icon: 'mdi-head-snowflake' },
  { value: 'bladder_bowel', label: 'Difficulty with bladder/bowel control', icon: 'mdi-toilet' },
  { value: 'none', label: 'None of the above', icon: 'mdi-close-circle' },
];

const selectedSymptoms = ref([]);
const contentPanel = ref(null);
const contentWrapper = ref(null);
const contentExceedsHeight = ref(false);

const hasRedFlagSymptoms = computed(() => {
    return selectedSymptoms.value.length > 0 && !selectedSymptoms.value.includes('none');
});

const checkContentHeight = () => {
    if (contentPanel.value && contentWrapper.value) {
      contentExceedsHeight.value = contentPanel.value.scrollHeight > contentWrapper.value.clientHeight;
    }
};

const toggleSymptom = (value) => {
    const index = selectedSymptoms.value.indexOf(value);
    if (index === -1) {
        selectedSymptoms.value.push(value);
    } else {
        selectedSymptoms.value.splice(index, 1);
    }
    handleSymptomSelection();
};

onMounted(() => {
    checkContentHeight();
    window.addEventListener('resize', checkContentHeight);
});

onUpdated(() => {
    checkContentHeight();
});

const handleSymptomSelection = () => {
    if (selectedSymptoms.value.includes('none') && selectedSymptoms.value.length > 1) {
      if (selectedSymptoms.value[selectedSymptoms.value.length - 1] === 'none') {
        selectedSymptoms.value = ['none'];
      } else {
        selectedSymptoms.value = selectedSymptoms.value.filter(item => item !== 'none');
      }
    }
};

watch(selectedSymptoms, handleSymptomSelection, { deep: true });

const next = () => {
    const data = {
      symptoms: selectedSymptoms.value,
      hasRedFlagSymptoms: hasRedFlagSymptoms.value
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
    margin-bottom: 24px;
    text-align: center;
}

.options-container {
    width: 100%;
    padding-bottom: 24px;
}

.symptom-option {
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