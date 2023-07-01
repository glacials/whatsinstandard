<script setup lang="ts">
import { plugin as VueTippy } from "vue-tippy"
import "tippy.js/dist/tippy.css"

defineProps({
  code: {
    type: String,
    required: true
  }
})
</script>

<script lang="ts">
export default {
  components: {
    VueTippy
  }
}
</script>

<template>
  <span class="text-center" style="width: 2.5em;" :title="code" v-tippy>
    <span class="ml-2"   style="font-size: 1.5em;" v-if="code !== undefined && code !== null">
      <i class="ss" :class="'ss-' + code.toLowerCase()"></i>
    </span>
  </span>
</template>
