import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Gacha from "../views/Gacha.vue";
import GachaStock from "../views/GachaStock.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/gacha",
    name: "Gacha",
    component: Gacha
  },
  {
    path: "/gachastock",
    name: "GachaStock",
    component: GachaStock
  }
];

const router = new VueRouter({
  routes
});

export default router;
