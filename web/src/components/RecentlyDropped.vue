<script setup lang="ts">
import * as card from "../types/card";

defineProps<{
  round: card.Round;
}>();
</script>

<template>
  <div class="col mb-4 border border-danger py-3 mx-2 px-0" v-cloak>
    <span class="text-danger small mx-2">
      Illegal as of
      {{ round.exitDate.humanize() }}
    </span>
    <div class="col list-group px-2">
      <template v-for="set in round.sets">
        <a
          class="p-3 list-group-item text-dark d-flex justify-content-between align-items-start set-border"
          :class="{
            'bg-light': set.isReleased(),
            'text-muted': !set.isReleased(),
          }"
          :href="
            set.code
              ? `https://www.scryfall.com/sets/${set.code.toLowerCase()}?utm_source=whatsinstandard`
              : ''
          "
        >
          <div
            v-if="set.code"
            :class="{
              'text-dark': set.isReleased(),
              'text-muted': !set.isReleased(),
            }"
          >
            {{ set.name || set.codename || "???" }}
          </div>
          <div
            class="text-dark"
            :class="{ lead: set.isReleased(), 'text-muted': !set.isReleased() }"
            v-else
          >
            {{ set.name || set.codename || "???" }}
          </div>
          <set-image :code="set.code" v-if="set.isReleased()"></set-image>
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
    </div>
  </div>
</template>
