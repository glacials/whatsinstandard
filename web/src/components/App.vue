<script setup lang="ts">
import { ref, watch, watchEffect } from "vue";

import * as card from "../types/card";

import BannedCard from "./BannedCard.vue";
import FollowButton from "./FollowButton.vue";
import FormatChangeLog from "./FormatChangeLog.vue";
import SetList from "./SetList.vue";

const apiURL = "/api/v6/standard.json";

/**
 * Return the bans in the given bans array that apply to the given array of sets.
 *
 * @param sets The sets to filter bans for.
 * @param bans The bans to filter.
 * @returns The bans that apply to the given sets.
 */
function bansFor(sets: card.Set[], bans: card.Ban[]) {
  return bans.filter((ban: card.Ban) =>
    sets.map((set: card.Set) => set.code).includes(ban.setCode)
  );
}

/**
 * Return the last element of an array.
 *
 * @param a The array to return the last element of.
 * @returns The last element of the given array.
 */
function last<T>(a: Array<T>) {
  return a[a.length - 1];
}

const bans = ref<card.Ban[]>([]);
const rounds = ref<card.Round[]>([]);
const hideAlert20230507 = ref(
  localStorage.hideAlert20230507 === "1" ||
    Date.now() > Date.parse("2024-01-01T00:00:00Z")
);

watchEffect(async () => {
  const body = await (await fetch(apiURL)).json();
  rounds.value = card.Round.ify(body.sets.map((set: any) => new card.Set(set)));
  bans.value = body.bans.map((ban: any) => new card.Ban(ban));
});

watch(hideAlert20230507, (v) => {
  // Local storage only stores strings.
  localStorage.hideAlert20230507 = v ? "1" : "0";
});
</script>

<template>
  <div class="d-flex">
    <div class="col mx-1">
      <div class="row mb-2">
        <div class="mt-3 d-flex">
          <img
            id="site-icon"
            src="/icon-original.svg"
            alt="What's in Standard? logo"
            class="d-none d-sm-inline"
          />
          <div class="w-100">
            <h1>What's in Standard?</h1>
            <div class="row row-cols-1 row-cols-sm-2">
              <div class="my-2">for Magic: The Gathering</div>
              <div
                class="d-grid d-md-block d-xl-flex justify-content-sm-end justify-content-xs-center my-2 text-end"
              >
                <follow-button>
                  <img
                    alt="Mastodon logo"
                    class="me-1"
                    height="18"
                    src="../../assets/img/mastodon.svg"
                    width="18"
                  />
                  <img
                    alt="Twitter logo"
                    class="me-1"
                    height="18"
                    src="../../assets/img/twitter.svg"
                    width="18"
                  />
                  Follow the bot
                </follow-button>
                <a
                  aria-controls="recentlyDroppedCollapse"
                  aria-expanded="false"
                  class="btn btn-outline-secondary btn-sm mx-1 my-1"
                  data-bs-toggle="collapse"
                  href="#recentlyDroppedCollapse"
                  role="button"
                >
                  Toggle recently dropped
                </a>
              </div>
            </div>
          </div>
        </div>
        <div v-if="false" class="d-flex justify-content-center">
          <div class="spinner-border my-5" role="status"></div>
          <div class="visually-hidden">Fetching Standard</div>
        </div>
        <div class="col collapse" id="recentlyDroppedCollapse">
          <div class="row">
            <set-list
              :rounds="[last(card.Round.dropped(rounds))]"
              v-cloak
              v-if="rounds.length > 0"
            />
          </div>
        </div>
        <set-list
          :rounds="card.Round.relevant(rounds)"
          v-if="rounds.length > 0"
        />
        <div class="col-md-6">
          <h3 class="pt-3" id="bans">Banned cards</h3>
          <template v-if="bans.length === 0">
            <i>No cards are banned from Standard right now.</i>
          </template>
          <template v-else>
            <p>
              Despite being part of legal sets, the following cards are
              explicitly not allowed in decks for this format.
            </p>
            <div class="row" v-cloak>
              <banned-card
                :ban="ban"
                v-for="ban in bansFor(
                  card.Round.undropped(rounds)
                    .map((r) => r.sets)
                    .flat(),
                  bans
                )"
              />
            </div>
          </template>
        </div>
        <div class="col-md-6">
          <h2 class="pt-3" id="info">What <em>is</em> Standard?</h2>
          <p>
            <a
              target="_blank"
              href="https://magic.wizards.com/en/content/standard-formats-magic-gathering"
              rel="noopener"
            >
              <b>Standard</b>
            </a>
            is a tournament format containing ~9&ndash;12 recent
            <i>Magic: The Gathering</i> sets. Sets generally enter the format
            when they're released and drop out 2.5&ndash;3 years later in groups
            of four. This is a rule of thumb; exceptions are frequently made.
            This site will always have accurate information.
          </p>
          <p>
            A <b>Standard card</b> is a card from a set currently part of the
            legal pool.
            <a
              v-tippy
              class="tip"
              title="All versions of a card with the same
                  name are considered the same card. As long as any print is
                  Standard-legal, so are all prints of it from previous sets."
            >
            </a>
          </p>
          <p>
            A <b>Standard deck</b> contains 60+ Standard cards and can
            optionally have a sideboard
            <a
              v-tippy
              class="tip"
              title="A sideboard is a second pool of cards outside the main deck that cannot be used during games,
                  but whose cards can be swapped with or added to the main deck cards between games in a match.
                  Sideboard cards are usually situational, providing counters to specific deck archetypes."
            >
            </a>
            of up to 15 additional such cards. Apart from basic lands, the
            combined main deck and sideboard cannot have more than four copies
            of any card.
          </p>
          <h3 class="mt-5">Related sets and formats</h3>
          <p>
            <a
              target="_blank"
              href="https://magic.wizards.com/en/game-info/gameplay/formats/brawl"
              rel="noopener"
              ><b>Brawl</b></a
            >
            is a format based on Standard—all rotations listed here apply to
            Brawl as well—but Brawl has its own banlist.
          </p>
          <p>
            Not all sets enter Standard upon release. For example, Masters sets
            and Commander sets never enter the format.
          </p>
          <format-change-log />
          <div class="github my-4">
            <a
              rel="me"
              v-tippy
              class="btn"
              href="https://mas.to/@whatsinstandard"
              title="See rotations in your Mastodon timeline"
            >
              <img
                class="m-1"
                src="../../assets/img/mastodon.svg"
                alt="Mastodon logo"
                height="35"
                width="35"
              />
            </a>
            <a
              v-tippy
              class="btn"
              href="https://twitter.com/whatsinstandard"
              title="See rotations in your Twitter timeline"
            >
              <img
                class="m-1"
                src="../../assets/img/twitter.svg"
                alt="Twitter logo"
                height="35"
                width="35"
              />
            </a>
            <a
              v-tippy
              class="btn"
              href="https://github.com/glacials/whatsinstandard"
              title="We're open source!"
            >
              <img
                class="m-1"
                src="../../assets/img/github.png"
                alt="GitHub logo"
                height="35"
                width="35"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
