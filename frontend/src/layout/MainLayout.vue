<template>
  <div class="layout-wrapper">
    <the-header></the-header>
  </div>
</template>

<script setup>
import { resolveComponent } from "vue";
import TheHeader from "../components/TheHeader.vue";

const theHeader = resolveComponent("TheHeader");
</script>

<style scoped>
layout-wrapper {
  width: 100vw;
}
</style>
