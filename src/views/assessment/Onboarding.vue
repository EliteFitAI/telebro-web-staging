<template>
    <v-container class="onboarding-container pa-0 ma-0" fluid>
      <transition name="slide" mode="out-in">
        <component
          :is="currentPanel"
          :key="currentStep"
          @next="nextStep"
          @back="prevStep"
          @update:userData="updateUserData"
        />
      </transition>
    </v-container>
  </template>
  
  <script setup>
import { ref, computed, reactive, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import WelcomePanel from '@/components/assessment/WelcomePanel.vue';
import NameInputPanel from '@/components/assessment/NameInputPanel.vue';
import EmailInputPanel from '@/components/assessment/EmailInputPanel.vue';
import PasswordPanel from '@/components/assessment/PasswordPanel.vue';
import ExpertsPanel from '@/components/assessment/ExpertsPanel.vue';
import TestimonialsPanel from '@/components/assessment/TestimonialsPanel.vue';
import CommunityPanel from '@/components/assessment/CommunityPanel.vue';

// Step panels and their route names
const panels = [
  { name: 'welcome', component: WelcomePanel },
  { name: 'name', component: NameInputPanel },
  { name: 'email', component: EmailInputPanel },
  // { name: 'password', component: PasswordPanel },
  { name: 'experts', component: ExpertsPanel },
  { name: 'testimonials', component: TestimonialsPanel },
  // { name: 'community', component: CommunityPanel }
];

const route = useRoute();
const router = useRouter();

const currentStep = ref(0);
const userData = reactive({
  name: '',
  email: '',
  password: ''
});

// Sets step based on stepname in URL
function setStepFromRoute() {
  const stepname = route.params.stepname;
  const index = panels.findIndex(panel => panel.name === stepname);
  if (index !== -1) {
    currentStep.value = index;
  } else {
    router.replace({ name: 'Onboarding', params: { stepname: panels[0].name } });
  }
}

onMounted(() => {
  setStepFromRoute();
});

// Watch for browser navigation (back/forward)
watch(() => route.params.stepname, () => {
  setStepFromRoute();
});

// Watch step changes and update route if needed
watch(currentStep, (newStep) => {
  const stepname = panels[newStep].name;
  if (route.params.stepname !== stepname) {
    router.push({ name: 'Onboarding', params: { stepname } });
  }
});

const currentPanel = computed(() => panels[currentStep.value].component);

function nextStep() {
  if (currentStep.value < panels.length - 1) {
    currentStep.value++;
  }
  else{
    router.push({ name: 'Anatomy' });
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
}

function updateUserData(key, value) {
  userData[key] = value;
}
</script>

  
  
  <style lang='scss' scoped>
@import "@/views/assessment/styles/theme.scss";

  .onboarding-container {
    min-height: 100vh;
    max-width: 100%;
    background-color: #000;
    position: relative;
  }
  
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s ease;
  }
  
  .slide-enter-from {
    transform: translateX(50px);
    opacity: 0;
  }
  
  .slide-leave-to {
    transform: translateX(-50px);
    opacity: 0;
  }
  </style>