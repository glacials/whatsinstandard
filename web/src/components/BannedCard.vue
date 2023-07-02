<script setup lang="ts">
import * as card from "../types/card";

defineProps<{
  ban: card.Ban;
}>();
</script>

<template>
  <div class="col-sm-12 col-md-12 col-lg-6">
    <div class="card mb-3 rounded-top-4">
      <img
        :src="ban.cardImageUrl"
        class="card-img-top"
        :alt="`${ban.cardName} from ${ban.setCode}`"
      />
      <div class="card-body">
        <p class="card-text">{{ ban.reason }}</p>
        <a
          :href="`https://scryfall.com/search?q=!“${ban.cardName}” set:${ban.setCode}&utm_source=whatsinstandard`"
          class="btn btn-outline-primary btn-sm text-uppercase my-1 me-1"
          rel="noopener"
        >
          Scryfall
        </a>
        <a
          :href="ban.announcementUrl"
          class="btn btn-outline-secondary btn-sm text-uppercase my-1"
        >
          Announcement
        </a>
      </div>
    </div>
  </div>
</template>
