<template>
  <div class="wrapper">
    <main-layout></main-layout>
  </div>
</template>

<script setup>
import { resolveComponent } from "vue";
import MainLayout from "./layout/MainLayout.vue";
</script>

<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
