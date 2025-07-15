<template>
  <div>
    <main-layout></main-layout>
  </div>
</template>

<script setup>
import { resolveComponent } from "vue";
import MainLayout from "./layout/MainLayout.vue";

const mainLayout = resolveComponent("MainLayout");
</script>

<style scoped></style>
