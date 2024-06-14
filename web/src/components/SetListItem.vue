<script setup lang="ts">
import * as card from "../types/card";

import SetImage from "./SetImage.vue";

defineProps<{
  round: card.Round;
  set: card.CardSet;
}>();
</script>

<style>
.set-list-item:hover {
  opacity: 0.75;
}
</style>

<template>
  <div
    :aria-controls="`accordion-collapse-${set.internalId}`"
    aria-expanded="true"
    class="align-items-start border-0 border-bottom collapsed d-flex justify-content-between list-group-item p-3 set-list-item"
    :class="{
      'list-group-item-danger': set.isDropped(),
      'list-group-item-light': set.isReleased() && !set.isDropped(),
      'text-muted': !set.isReleased(),
    }"
    :data-bs-target="`#accordion-collapse-${set.internalId}`"
    data-bs-toggle="collapse"
    style="cursor: default"
  >
    <span
      :class="{
        'text-muted': !set.isReleased(),
      }"
      v-if="set.code"
    >
      {{ set.name || `"${set.codename}"` || "???" }}
    </span>
    <span
      :class="{
        lead: set.isReleased(),
        'text-muted': !set.isReleased(),
      }"
      v-else
    >
      {{ set.name || `"${set.codename}"` || "???" }}
    </span>
    <set-image
      :code="set.code || ''"
      v-if="set.isReleased() && set.code !== undefined"
    />
    <small
      class="font-italic"
      :title="set.enterDate.humanize()"
      v-if="!set.isReleased()"
      v-tippy
    >
      releases {{ set.enterDate.relative() }}
    </small>
  </div>
  <div
    class="accordion-collapse collapse hide"
    :data-bs-parent="`#accordion-${round.internalId}`"
    :id="`accordion-collapse-${set.internalId}`"
  >
    <div class="btn-group w-100" v-if="set.code !== null || set.name !== null">
      <a
        class="border border-left-0 border-right-0 border-top-0 btn btn-outline-secondary btn-sm rounded-0 text-uppercase"
        :href="
          set.code
            ? `https://www.scryfall.com/sets/${set.code.toLowerCase()}?utm_source=whatsinstandard`
            : ''
        "
        rel="noopener"
        target="_blank"
        v-if="set.code !== null"
      >
        Scryfall ↗
      </a>
      <a
        class="border border-right-0 border-top-0 btn btn-outline-secondary btn-sm rounded-0 text-uppercase"
        :href="`https://mtg.fandom.com/wiki/${set.name}?utm_source=whatsinstandard`"
        rel="noopener"
        target="_blank"
        v-if="set.name !== null"
        ><span class="d-none d-sm-inline">MTG</span> Wiki ↗</a
      >
      <!-- Uncomment once we have access to set number according to MTG Salvation
        <a
          class="btn btn-outline-secondary btn-sm rounded-0 text-uppercase"
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
