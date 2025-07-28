<template>
  <div class="wrapper">
    <main-layout></main-layout>
  </div>
</template>

<script setup>
import { watchEffect } from "vue";
import { useTheme } from "./stores";
import MainLayout from "./layout/MainLayout.vue";

const themeStore = useTheme();

watchEffect(() => {
  if (themeStore.getIsDarkMode) {
    document.documentElement.classList.add("theme-dark");
  } else {
    document.documentElement.classList.remove("theme-dark");
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
