import { createApp } from "vue";
import "./assets/global-styling/style.css";
import BaseButton from "./UI/BaseButton.vue";
import App from "./App.vue";

const app = createApp(App);
app.component("base-button", BaseButton);

app.mount("#app");
