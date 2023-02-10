import Vue from "vue";
import App from "./App.vue";
//import "@fortawesome/fontawesome-free/css/all.css";
//import "@fortawesome/fontawesome-free/js/all.js";
import "document-register-element/build/document-register-element";

Vue.config.productionTip = false;

import vueCustomElement from "vue-custom-element";
Vue.use(vueCustomElement);

Vue.customElement("weather-widget", App);
