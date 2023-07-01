<script setup lang="ts">
defineProps<{
  code: string;
}>();
</script>

<template>
  <span class="text-center" style="width: 2.5em" :title="code" v-tippy>
    <span
      class="ml-2"
      style="font-size: 1.5em"
      v-if="code !== undefined && code !== null"
    >
      <i class="ss" :class="'ss-' + code.toLowerCase()"></i>
    </span>
  </span>
</template>
