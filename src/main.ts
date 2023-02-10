import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
/*import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

library.add(faGear);

Vue.component("font-awesome-icon", FontAwesomeIcon);*/
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

/**
 * @todo Выводить экран ошибки, если api недоступно
 */
