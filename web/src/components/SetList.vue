<script setup lang="ts">
import * as card from "../types/card";

import RoundDropDate from "./RoundDropDate.vue";
import SetListItem from "./SetListItem.vue";

defineProps<{
  rounds: card.Round[];
}>();
</script>

<template>
  <div
    class="row row-cols-1 row-cols-lg-2 mb-4 px-0 py-3 mx-0"
    v-cloak
    v-for="round in rounds"
  >
    <div class="col list-group px-3">
      <div
        class="accordion accordion-flush border border-bottom-0"
        :id="`accordion-${round.internalId}`"
      >
        <set-list-item :round="round" :set="set" v-for="set in round.sets" />
      </div>
    </div>
    <round-drop-date :exitDate="round.exitDate" />
  </div>
</template>
