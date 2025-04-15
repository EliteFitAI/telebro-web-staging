<template>
    <div class="app-input">
      <v-text-field
        v-model="inputValue"
        :type="showPassword ? 'text' : type"
        :label="label"
        :placeholder="placeholder"
        :rules="rules"
        :disabled="disabled"
        :loading="loading"
        :hide-details="hideDetails"
        :append-inner-icon="passwordToggleIcon"
        density="comfortable"
        variant="outlined"
        color="primary"
        :bg-color="'#1E1E1E'"
        @click:append-inner="togglePassword"
        @update:model-value="$emit('update:modelValue', $event)"
      ></v-text-field>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    label: String,
    placeholder: String,
    rules: {
      type: Array,
      default: () => []
    },
    disabled: Boolean,
    loading: Boolean,
    hideDetails: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  const showPassword = ref(false);
  const inputValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  });
  
  const passwordToggleIcon = computed(() => {
    if (props.type !== 'password') return null;
    return showPassword.value ? 'mdi-eye-off' : 'mdi-eye';
  });
  
  function togglePassword() {
    if (props.type === 'password') {
      showPassword.value = !showPassword.value;
    }
  }
  </script>
  
  <style scoped>
  .app-input {
    width: 100%;
    max-width: 500px;
    margin: 8px 0;
  }
  
  :deep(.v-field__outline) {
    opacity: 0.7;
    transition: opacity 0.2s ease, border-color 0.2s ease;
  }
  
  :deep(.v-field--focused .v-field__outline) {
    opacity: 1;
  }
  

  
  :deep(.v-field__input) {
    color: white !important;
    padding: 0 16px; /* Add horizontal padding for better text appearance */
  }
  
  :deep(.v-field__input::placeholder) {
    color: rgba(255, 255, 255, 0.5) !important;
  }
  
  :deep(.v-label) {
    color: rgba(255, 255, 255, 0.8) !important;
    margin-left: 6px; /* Adjust label position for better appearance with rounded borders */
  }
  
  /* Enhance hover state */
  :deep(.v-field:hover .v-field__outline) {
    opacity: 0.9;
  }
  
  /* Adjust append icon container */
  :deep(.v-field__append-inner) {
    align-self: center;
    padding-right: 12px; /* Increase padding for better spacing */
  }
  
  /* Add box-shadow on focus for better visual feedback */
  :deep(.v-field--focused) {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }
  </style>