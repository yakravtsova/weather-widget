import Vue from "vue";
import App from "./App.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "document-register-element/build/document-register-element";

Vue.config.productionTip = false;

//App.store = store;
//App.router = router;

/*new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");*/

import vueCustomElement from "vue-custom-element";
Vue.use(vueCustomElement);

Vue.customElement("weather-widget", App);
