<script setup lang="ts">
import * as card from "../types/card";

import SetImage from "./SetImage.vue";

defineProps<{
  round: card.Round;
  set: card.Set;
}>();
</script>

<template>
  <div
    class="p-3 list-group-item text-dark d-flex justify-content-between align-items-start set-border"
    :class="{
      'list-group-item-light': set.isReleased() && !set.isDropped(),
      'text-muted': !set.isReleased(),
      'list-group-item-danger': set.isDropped(),
    }"
    :aria-controls="`accordion-collapse-${set.internalId}`"
    aria-expanded="true"
    :data-bs-target="`#accordion-collapse-${set.internalId}`"
    data-bs-toggle="collapse"
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
  </div>
  <div
    :id="`accordion-collapse-${set.internalId}`"
    class="accordion-collapse collapse hide border border-light"
    :data-bs-parent="`#accordion-${round.internalId}`"
  >
    <div class="btn-group w-100">
      <a
        class="btn btn-outline-dark btn-sm rounded-0 text-uppercase"
        :href="
          set.code
            ? `https://www.scryfall.com/sets/${set.code.toLowerCase()}?utm_source=whatsinstandard`
            : ''
        "
        rel="noopener"
        target="_blank"
      >
        Scryfall ↗
      </a>
      <a
        class="btn btn-outline-dark btn-sm rounded-0 text-uppercase"
        :href="`https://mtg.fandom.com/wiki/${set.name}?utm_source=whatsinstandard`"
        rel="noopener"
        target="_blank"
        v-if="set.name !== null"
        ><span class="d-none d-sm-inline">MTG</span> Wiki ↗</a
      >
      <!-- Uncomment once we have access to set number according to MTG Salvation
        <a
          class="btn btn-outline-dark btn-sm rounded-0 text-uppercase"
          :href="`https://www.mtgsalvation.com/cards?filter-set=${set.number}&utm_source=whatsinstandard`"
          rel="noopener"
          target="_blank"
          v-if="set.name !== null"
          ><span class="d-none d-sm-inline">MTG</span> Salvation ↗</a
        >
        -->
    </div>
  </div>
</template>
