<!-- eslint-disable vue/no-parsing-error -->
<script setup>
// Component properties
defineProps({
  labelFor: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <label class="form-label" :for="labelFor">
    <slot></slot>
    <span v-if="required" class="text-danger">*</span>
  </label>
</template>
