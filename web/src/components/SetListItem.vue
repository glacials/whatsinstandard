<script setup lang="ts">
import * as card from "../types/card";

import SetImage from "./SetImage.vue";

defineProps<{
  set: card.Set;
}>();
</script>

<template>
  <a
    class="p-3 list-group-item text-dark d-flex justify-content-between align-items-start set-border"
    :class="{ 'bg-light': set.isReleased(), 'text-muted': !set.isReleased() }"
    :href="
      set.code
        ? `https://www.scryfall.com/sets/${set.code.toLowerCase()}?utm_source=whatsinstandard`
        : ''
    "
  >
    <span
      v-if="set.code"
      :class="{
        'text-dark': set.isReleased(),
        'text-muted': !set.isReleased(),
      }"
    >
      {{ set.name || set.codename || "???" }}
    </span>
    <span
      class="text-dark"
      :class="{
        lead: set.isReleased(),
        'text-muted': !set.isReleased(),
      }"
      v-else
    >
      {{ set.name || set.codename || "???" }}
    </span>
    <set-image
      :code="set.code"
      v-if="set.isReleased() && set.code !== undefined"
    />
    <small
      class="font-italic"
      v-if="!set.isReleased()"
      v-tippy
      :title="set.enterDate.humanize()"
    >
      releases {{ set.enterDate.relative() }}
    </small>
  </a>
</template>
