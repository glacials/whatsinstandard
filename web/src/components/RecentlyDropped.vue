<script setup lang="ts">
import * as card from "../types/card";

import RoundDropDate from "./RoundDropDate.vue";
import SetListItem from "./SetListItem.vue";

defineProps<{
  round: card.Round;
}>();
</script>

<template>
  <div class="col mb-4 py-3 mx-2 px-0" v-cloak>
    <div class="col list-group px-2">
      <set-list-item v-for="set in round.sets" :set="set" />
    </div>
    <round-drop-date :exitDate="round.exitDate" />
  </div>
</template>
