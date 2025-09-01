import { createRouter, createWebHistory } from "vue-router";

import BoardView from "../views/BoardView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

const routes = [
  { path: "/", redirect: "/board/0" },
  { path: "/board/:id", component: BoardView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
