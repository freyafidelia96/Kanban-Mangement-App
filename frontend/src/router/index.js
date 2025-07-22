import { createRouter, createWebHistory } from "vue-router";

import BoardView from "../views/BoardView.vue";

const routes = [
  { path: "/", redirect: "/board/0" },
  { path: "/board/:id", component: BoardView },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
