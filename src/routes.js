import Home from "./views/Home.vue";
import Checkin from "./views/Checkin.vue";
import NotFound from "./views/NotFound.vue";

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: "/", name: "Home", component: Home, meta: { title: "Home" } },
  {
    path: "/checkin",
    name: "Checkin",
    component: Checkin,
    meta: { title: "Checkin" },
  },
  { path: "/:path(.*)", component: NotFound },
];
