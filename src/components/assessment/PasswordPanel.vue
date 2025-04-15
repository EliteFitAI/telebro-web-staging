<template>
    <div class="onboarding-panel">
      <video-placeholder height="50vh" />
      
      <div class="panel-content">
        <h2 class="panel-title">Create a secure password to protect your progress.</h2>
        
        <div class="input-container">
          <app-input
            v-model="password"
            placeholder="Password"
            type="password"
            :rules="passwordRules"
          />
        </div>
        
        <div class="action-button">
          <app-button 
            block 
            :disabled="!isValidPassword"
            @click="handleCreateAccount"
          >
            Create Account
          </app-button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import AppButton from '@/components/assessment/common/AppButton.vue';
  import AppInput from '@/components/assessment/common/AppInput.vue';
  import VideoPlaceholder from '@/components/assessment/common/VideoPlaceholder.vue';
  
  const emit = defineEmits(['next', 'back', 'update:userData']);
  const password = ref('');
  
  const passwordRules = [
    v => !!v || 'Password is required',
    v => v.length >= 8 || 'Password must be at least 8 characters',
    v => /\d/.test(v) || 'Password must contain at least one number',
    v => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter'
  ];
  
  const isValidPassword = computed(() => {
    return password.value && 
           password.value.length >= 8 && 
           /\d/.test(password.value) && 
           /[A-Z]/.test(password.value);
  });
  
  function handleCreateAccount() {
    if (isValidPassword.value) {
      emit('update:userData', 'password', password.value);
      emit('next');
    }
  }
  </script>
  
  <style lang='scss' scoped>
  @import "@/views/assessment/styles/theme.scss";

  </style>