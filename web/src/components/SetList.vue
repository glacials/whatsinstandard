<script setup lang="ts">
import * as card from "../types/card";

import SetListItem from "./SetListItem.vue";

defineProps<{
  rounds: card.Round[];
}>();
</script>

<template>
  <div
    v-for="round in rounds"
    class="row row-cols-1 row-cols-lg-2 mb-4 px-0 py-3 mx-0"
    v-cloak
  >
    <div class="col list-group px-3">
      <set-list-item v-for="set in round.sets" :set="set" />
    </div>
    <div class="col d-none d-lg-flex align-items-center h-100">
      <div
        class="px-1 h-100"
        style="
          border-width: 1px 1px 1px 0;
          border-style: solid;
          border-color: black;
        "
      ></div>
      <div class="m-3 text-center">
        Legal until {{ round.exitDate.humanize() }}
      </div>
    </div>
    <div class="row d-block d-lg-none w-100 mx-0 px-2">
      <div
        class="py-1 my-3 w-100"
        style="
          border-width: 0px 1px 1px 1px;
          border-style: solid;
          border-color: black;
        "
      ></div>
      <div class="px-0 mx-0 my-3 text-center">
        Legal until {{ round.exitDate.humanize() }}
      </div>
    </div>
  </div>
</template>
