<template>
  <div class="wrapper">
    <main-layout></main-layout>
  </div>
</template>

<script setup>
import { watchEffect, onMounted } from "vue";
import { useTheme, useBoards, useAuthStore } from "./stores";
import MainLayout from "./layout/MainLayout.vue";

const themeStore = useTheme();
const boardsStore = useBoards();
const authStore = useAuthStore();

// Initialize theme
watchEffect(() => {
  if (themeStore.getIsDarkMode) {
    document.documentElement.classList.add("theme-dark");
  } else {
    document.documentElement.classList.remove("theme-dark");
  }
});

// Load user boards when app initializes (if authenticated)
onMounted(async () => {
  if (authStore.isAuthenticated) {
    try {
      await boardsStore.fetchUserBoards();
    } catch (error) {
      console.error("Failed to load boards on app initialization:", error);
    }
  }
});
</script>

<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
