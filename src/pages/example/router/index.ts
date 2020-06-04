/* eslint-disable */

import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../pages/home/index.vue";
import Goods from "../pages/goods/index.vue";

Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
  { path: "/index", name: "index", component: Home },
  { path: "/goods", name: "goods", component: Goods },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
