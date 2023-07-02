<script setup lang="ts">
import { ref, watch, watchEffect } from "vue";

import * as card from "../types/card";

import RecentlyDropped from "./RecentlyDropped.vue";
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

/**
 * Show or hide the recently dropped sets area of the page.
 */
function toggleRecentlyDropped() {
  showRecentlyDropped.value = !showRecentlyDropped.value;
}

const bans = ref<card.Ban[]>([]);
const rounds = ref<card.Round[]>([]);
const showRecentlyDropped = ref(false);
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
                class="d-xl-flex text-end justify-content-xs-center justify-content-sm-end my-2"
              >
                <button
                  class="btn btn-outline-dark btn-sm my-1 mx-1"
                  v-on:click.prevent="toggleRecentlyDropped"
                >
                  <template v-if="showRecentlyDropped">
                    Hide left sets
                  </template>
                  <template v-else> What just left?</template>
                </button>
                <div class="dropdown">
                  <a
                    class="btn btn-outline-dark btn-sm my-1 mx-1 dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      class="m-1"
                      src="../../assets/img/mastodon.svg"
                      alt="Mastodon logo"
                      height="20"
                      width="20"
                    />
                    <img
                      class="m-1"
                      src="../../assets/img/twitter.svg"
                      alt="Twitter logo"
                      height="20"
                      width="20"
                    />
                    Follow the bot!
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        rel="me"
                        class="dropdown-item"
                        href="https://m.twos.dev/@whatsinstandard"
                      >
                        <img
                          class="m-1"
                          src="../../assets/img/mastodon.svg"
                          alt="Mastodon logo"
                          height="20"
                          width="20"
                        />
                        Mastodon
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="https://twitter.com/whatsinstandard"
                      >
                        <img
                          class="m-1"
                          src="../../assets/img/twitter.svg"
                          alt="Twitter logo"
                          height="20"
                          width="20"
                        />
                        Twitter
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="false" class="d-flex justify-content-center">
          <div class="spinner-border my-5" role="status"></div>
          <div class="visually-hidden">Fetching Standard</div>
        </div>
        <div class="row mx-0 px-0 row-cols-1 row-cols-lg-2">
          <recently-dropped
            :round="last(card.Round.dropped(rounds))"
            v-if="showRecentlyDropped"
          />
        </div>
        <div
          v-if="!hideAlert20230507"
          class="row justify-content-around px-3 mx-0"
          v-cloak
        >
          <div
            class="col-md-8 alert alert-info alert-dismissible fade show"
            role="alert"
          >
            <h4 class="alert-heading mb-3">New rules</h4>
            <p>
              On
              <a
                class="alert-link"
                href="https://magic.wizards.com/en/news/announcements/revitalizing-standard"
                >2023-05-07</a
              >, <i>Wizards</i> permanently lengthened sets' Standard lifespans
              by one year, effective immediately.
            </p>
            <p>
              Therefore no sets will drop from Standard in 2023. This increases
              the average size of Standard from 6 ½ sets to 10 ½ sets.
            </p>
            <p>
              All information below has been updated to reflect this change.
            </p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              @click="hideAlert20230507 = true"
            ></button>
          </div>
        </div>
        <set-list
          v-if="rounds.length > 0"
          :rounds="card.Round.relevant(rounds)"
        />
        <div class="row">
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
                <div
                  v-for="ban in bansFor(
                    card.Round.undropped(rounds)
                      .map((r) => r.sets)
                      .flat(),
                    bans
                  )"
                  class="col-sm-12 col-md-12 col-lg-6"
                >
                  <div class="card mb-3">
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
              when they're released and drop out 2.5&ndash;3 years later in
              groups of four. This is a rule of thumb; exceptions are frequently
              made. This site will always have accurate information.
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
              Not all sets enter Standard upon release. For example, Masters
              sets and Commander sets never enter the format.
            </p>
            <div class="github my-4">
              <a
                rel="me"
                v-tippy
                class="btn"
                href="https://m.twos.dev/@whatsinstandard"
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
  </div>
</template>
