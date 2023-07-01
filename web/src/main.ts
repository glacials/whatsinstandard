import { createApp } from "vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { plugin as VueTippy } from "vue-tippy";
import "tippy.js/dist/tippy.css";

import App from "./components/App.vue";

const app = createApp(App);
app.use(VueTippy, {
  directive: "tippy", // => v-tippy
});
app.mount("#app");
