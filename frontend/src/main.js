import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import "./assets/global-styling/style.css";
import BaseButton from "./UI/BaseButton.vue";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

app.component("base-button", BaseButton);
app.use(pinia);
app.use(router);
app.mount("#app");
