import { createApp } from "vue";

import "./styles/bootstrap.scss";
import "bootstrap";
import { plugin as VueTippy } from "vue-tippy";
import "tippy.js/dist/tippy.css";

import App from "./components/App.vue";

const app = createApp(App);
app.use(VueTippy, {
  directive: "tippy", // => v-tippy
});
app.mount("#app");
