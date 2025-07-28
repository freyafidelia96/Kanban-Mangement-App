import { defineStore } from "pinia";

export const useTheme = defineStore("Mode", {
  state() {
    return {
      isDarkMode: localStorage.getItem("themeMode") === "dark" ? true : false,
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

    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      // Persist the preference to localStorage
      localStorage.setItem("themeMode", this.isDarkMode ? "dark" : "light");
    },
    // Optional: action to set mode directly (e.g., if you have system preference detection)
    setDarkMode(mode) {
      this.isDarkMode = mode;
      localStorage.setItem("themeMode", mode ? "dark" : "light");
    },
  },

  getters: {
    getIsDarkMode(state) {
      return state.isDarkMode;
    },

    getSidebarVisibility(state) {
      return state.sidebarVisible;
    },
  },
});
