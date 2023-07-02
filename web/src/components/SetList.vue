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
    v-for="round in rounds"
    class="row row-cols-1 row-cols-lg-2 mb-4 px-0 py-3 mx-0"
    v-cloak
  >
    <div class="col list-group px-3">
      <div class="accordion" :id="`accordion-${round.internalId}`">
        <set-list-item v-for="set in round.sets" :round="round" :set="set" />
      </div>
    </div>
    <round-drop-date :exitDate="round.exitDate" />
  </div>
</template>
