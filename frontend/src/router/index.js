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
    // Removed requireAuth to allow access to dummy data without login
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
