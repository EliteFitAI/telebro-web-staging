<template>
  <div class="onboarding-panel">
    <div class="video-container" :style="{ height: videoHeight }">
      <video-placeholder :height="videoHeight" />
    </div>

    <div class="content-wrapper" ref="contentWrapper">
      <div class="panel-content" ref="contentPanel">
        <div class="handle-indicator"></div>

        <h2 class="panel-title">Do you have any prior injuries, surgeries, or ongoing health conditions?</h2>

        <v-fade-transition>
          <div class="options-container">
            <div
              v-for="(option, index) in historyOptions"
              :key="index"
              @click="toggleOption(option.value)"
              :class="[
                'history-option',
                'mb-3',
                { 'selected': selectedOptions.includes(option.value) }
              ]"
            >
              <v-icon class="option-icon" :icon="option.icon" />
              <div class="option-label">{{ option.label }}</div>
            </div>
            
            <v-expand-transition>
              <div v-if="showTextInput" class="mt-4">
                <app-input
                  v-model="historyDetails"
                  placeholder="Please provide details..."
                  :rows="3"
                  type="textarea"
                />
              </div>
            </v-expand-transition>
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
import { ref, computed, watch, onMounted, onUpdated } from 'vue';
import VideoPlaceholder from '@/components/assessment/common/VideoPlaceholder.vue';
import AppInput from '@/components/assessment/common/AppInput.vue';
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

const historyOptions = [
{ value: 'previous_injuries', label: 'Previous injuries', icon: 'mdi-bandage' },
{ value: 'surgeries', label: 'Surgeries', icon: 'mdi-medical-bag' },
{ value: 'chronic_conditions', label: 'Chronic conditions', icon: 'mdi-heart-pulse' },
{ value: 'none', label: 'None of the above', icon: 'mdi-close-circle' },
];

const selectedOptions = ref([]);
const historyDetails = ref('');
const contentPanel = ref(null);
const contentWrapper = ref(null);
const contentExceedsHeight = ref(false);

const showTextInput = computed(() => {
  return selectedOptions.value.length > 0 && !selectedOptions.value.includes('none');
});

const isValid = computed(() => {
  if (selectedOptions.value.includes('none')) {
    return true;
  }
  return selectedOptions.value.length > 0 && historyDetails.value.trim().length > 0;
});

const checkContentHeight = () => {
  if (contentPanel.value && contentWrapper.value) {
    contentExceedsHeight.value = contentPanel.value.scrollHeight > contentWrapper.value.clientHeight;
  }
};

const toggleOption = (value) => {
  const index = selectedOptions.value.indexOf(value);
  if (index === -1) {
      selectedOptions.value.push(value);
  } else {
      selectedOptions.value.splice(index, 1);
  }
  handleOptionSelection();
};

onMounted(() => {
  checkContentHeight();
  window.addEventListener('resize', checkContentHeight);
});

onUpdated(() => {
  checkContentHeight();
});

const handleOptionSelection = () => {
  if (selectedOptions.value.includes('none') && selectedOptions.value.length > 1) {
    if (selectedOptions.value[selectedOptions.value.length - 1] === 'none') {
      selectedOptions.value = ['none'];
      historyDetails.value = '';
    } else {
      selectedOptions.value = selectedOptions.value.filter(item => item !== 'none');
    }
  }
  setTimeout(checkContentHeight, 50);
};

watch(selectedOptions, handleOptionSelection, { deep: true });

const next = () => {
  if (isValid.value) {
    const data = {
      healthHistory: selectedOptions.value,
      historyDetails: showTextInput.value ? historyDetails.value : ''
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

.history-option {
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
      
      .option-icon {
          color: #88D456;
      }
  }

  &:hover {
      background-color: rgba(255, 255, 255, 0.1);
  }
}

.option-icon {
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
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