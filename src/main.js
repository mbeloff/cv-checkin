import { createApp } from "vue";
import "./tailwind.css";
import store from './store.js'
import App from "./App.vue";
import { DatePicker } from "v-calendar";
import { routes } from "./routes.js";
import { createRouter, createWebHistory } from "vue-router";
import VueSignaturePad from 'vue-signature-pad';

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router).use(store).use(VueSignaturePad).component("DatePicker", DatePicker);
app.mount("#app");
