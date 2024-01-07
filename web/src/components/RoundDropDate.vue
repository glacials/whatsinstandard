<script setup lang="ts">
import { BiDate } from "../types/BiDate";

defineProps<{
  exitDate: BiDate;
}>();
</script>

<template>
  <div class="col d-none d-lg-flex align-items-center h-100">
    <div
      class="px-1 h-100"
      style="
        border-width: 1px 1px 1px 0;
        border-style: solid;
        border-color: gray;
      "
    ></div>
    <div
      class="m-3 text-center text-bg-danger px-1"
      v-if="exitDate.hasPassed()"
    >
      Illegal since {{ exitDate.humanize() }}
    </div>
    <div v-else class="m-3 text-center">
      Legal until {{ exitDate.humanize() }}
    </div>
  </div>
  <div class="row d-block d-lg-none w-100 mx-0 px-2">
    <template v-if="exitDate.hasPassed()">
      <div
        class="py-1 my-3 w-100"
        style="
          border-width: 0px 1px 1px 1px;
          border-style: solid;
          border-color: red;
        "
      ></div>
      <div class="px-1 mx-0 my-3 text-center text-bg-danger">
        Illegal since {{ exitDate.humanize() }}
      </div></template
    ><template v-else>
      <div
        class="py-1 my-3 w-100"
        style="
          border-width: 0px 1px 1px 1px;
          border-style: solid;
          border-color: gray;
        "
      ></div>
      <div class="px-0 mx-0 my-3 text-center">
        Legal until {{ exitDate.humanize() }}
      </div>
    </template>
  </div>
</template>
