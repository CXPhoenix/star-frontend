import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import router from "./utils/router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { dom } from "@fortawesome/fontawesome-svg-core";

library.add(fas);

dom.watch();

createApp(App)
  .use("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
