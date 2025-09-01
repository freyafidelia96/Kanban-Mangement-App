import { createRouter, createWebHistory } from "vue-router";
import { requireAuth, redirectIfAuthenticated } from "./guards";

import BoardView from "../views/BoardView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

const routes = [
  { path: "/", redirect: "/board/0" },
  {
    path: "/board/:id",
    component: BoardView,
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    component: LoginView,
    beforeEnter: redirectIfAuthenticated,
  },
  {
    path: "/register",
    component: RegisterView,
    beforeEnter: redirectIfAuthenticated,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
