<script setup lang="ts">
import FollowMastodonButton from "./FollowMastodonButton.vue";
import FollowTwitterButton from "./FollowTwitterButton.vue";
</script>

<style>
.btn-outline-secondary {
  color: black;
}
@media (prefers-color-scheme: dark) {
  .btn-outline-secondary {
    color: white;
  }
}
</style>

<template>
  <div class="d-none d-md-inline dropdown">
    <a
      aria-expanded="false"
      class="btn btn-outline-secondary btn-sm dropdown-toggle my-1 mx-1"
      data-bs-toggle="dropdown"
      type="button"
    >
      <slot />
    </a>
    <ul class="dropdown-menu py-0 w-100">
      <li><follow-mastodon-button class="dropdown-item py-1" /></li>
      <li><follow-twitter-button class="dropdown-item py-1" /></li>
    </ul>
  </div>
  <button
    class="btn btn-outline-secondary btn-sm d-block d-md-none my-1 mx-1"
    type="button"
    data-bs-target="#offcanvasFollowMenu"
    data-bs-toggle="offcanvas"
    aria-controls="offcanvasFollowMenu"
  >
    <slot />
  </button>

  <div
    aria-labelledby="offcanvasFollowMenuLabel"
    class="offcanvas offcanvas-bottom"
    id="offcanvasFollowMenu"
    style="--bs-offcanvas-height: 13em"
    tabindex="-1"
  >
    <div class="offcanvas-header">See Standard updates in your timeline.</div>
    <div class="offcanvas-body">
      <follow-mastodon-button
        class="btn btn-lg btn-outline-secondary d-block my-1"
      />
      <follow-twitter-button
        class="btn btn-lg btn-outline-secondary d-block my-1"
      />
    </div>
  </div>
</template>
