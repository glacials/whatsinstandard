<script setup>
  import { ref } from 'vue'

defineProps({
  code: {
    type: String,
    required: true
  }
})
</script>

<template>
  <span class="text-center" style="width: 2.5em;">
    <span class="ml-2" style="font-size: 1.5em;" v-if="code !== undefined && code !== null">
      <i class="ss" :class="'ss-' + code.toLowerCase()"></i>
    </span>
  </span>
</template>
