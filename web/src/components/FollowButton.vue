<template>
  <div class="d-none d-md-inline dropdown">
    <a
      aria-expanded="false"
      class="btn btn-outline-dark btn-sm dropdown-toggle my-1 mx-1"
      data-bs-toggle="dropdown"
      type="button"
    >
      <slot />
    </a>
    <ul class="dropdown-menu py-0 w-100">
      <li>
        <a
          class="dropdown-item py-1"
          href="https://m.twos.dev/@whatsinstandard"
          rel="me"
          target="_blank"
        >
          <span class="d-flex justify-content-between">
            <span
              ><img
                alt="Mastodon logo"
                class="me-1"
                height="18"
                src="../../assets/img/mastodon.svg"
                width="18"
              />
              Mastodon</span
            >
            <span>↗</span>
          </span>
        </a>
      </li>
      <li>
        <a
          class="dropdown-item py-1"
          href="https://twitter.com/whatsinstandard"
          target="_blank"
        >
          <span class="d-flex justify-content-between">
            <span
              ><img
                alt="Twitter logo"
                class="me-1"
                height="18"
                src="../../assets/img/twitter.svg"
                width="18"
              />
              Twitter</span
            >
            <span>↗</span>
          </span>
        </a>
      </li>
    </ul>
  </div>
  <button
    class="btn btn-outline-dark btn-sm d-block d-md-none my-1 mx-1"
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
      <a
        class="btn btn-lg btn-outline-dark d-block my-1"
        href="https://m.twos.dev/@whatsinstandard"
        rel="me"
        target="_blank"
      >
        <span class="d-flex justify-content-between">
          <span
            ><img
              alt="Mastodon logo"
              class="me-1"
              height="18"
              src="../../assets/img/mastodon.svg"
              width="18"
            />
            Mastodon</span
          >
          <span>↗</span>
        </span>
      </a>
      <a
        class="btn btn-lg btn-outline-dark d-block my-1"
        href="https://twitter.com/whatsinstandard"
        target="_blank"
      >
        <span class="d-flex justify-content-between">
          <span
            ><img
              alt="Twitter logo"
              class="me-1"
              height="18"
              src="../../assets/img/twitter.svg"
              width="18"
            />
            Twitter</span
          >
          <span>↗</span>
        </span>
      </a>
    </div>
  </div>
</template>
