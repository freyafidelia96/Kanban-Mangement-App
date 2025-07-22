import { defineStore } from "pinia";

export const useMode = defineStore("Mode", {
  state() {
    return {
      light: true,
      sidebarVisible: true,
    };
  },

  actions: {
    changeMode() {
      this.light = !this.light;
    },

    changeSidebarVisibility() {
      this.sidebarVisible = !this.sidebarVisible;
    },
  },

  getters: {
    getLightMode(state) {
      return state.light;
    },

    getSidebarVisibility(state) {
      return state.sidebarVisible;
    },
  },
});
