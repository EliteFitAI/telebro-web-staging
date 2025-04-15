<template>
    <v-btn
      class="app-button"
      :class="[block ? 'w-100' : '']"
      :disabled="disabled"
      :loading="loading"
      :color="color"
      :variant="variant"
      :height="height"
      :min-width="minWidth"
      @click="$emit('click')"
    >
      <slot></slot>
    </v-btn>
  </template>
  
  <script setup>
  defineProps({
    disabled: Boolean,
    loading: Boolean,
    block: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    variant: {
      type: String,
      default: 'elevated'
    },
    height: {
      type: [String, Number],
      default: 56
    },
    minWidth: {
      type: [String, Number],
      default: 200
    }
  });
  
  defineEmits(['click']);
  </script>
  
  <style lang='scss' scoped>
    @import "@/views/assessment/styles/theme.scss";

  .app-button {
    border-radius: 28px;
    text-transform: none;
    font-weight: 500;
    font-size: 1rem;
    letter-spacing: 0.5px;
    background: $gradient-secondary;
  }
  
  .app-button:deep(.v-btn__content) {
    color: white;
    opacity: 1;
  }
  </style>