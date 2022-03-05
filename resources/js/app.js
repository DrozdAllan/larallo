require("./bootstrap");

window.Vue = require("vue").default;
import Vue from "vue";
import VueRouter from "vue-router";
import vuetify from "./vuetify";

import router from "./router/index";
import store from "./store/index";

Vue.use(VueRouter);

Vue.component("app-view", require("./views/App.vue").default);

const app = new Vue({
    el: "#app",
    vuetify,
    router,
    store,
});
