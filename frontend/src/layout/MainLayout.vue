<template>
  <div class="layout-wrapper">
    <the-header></the-header>
    <side-bar @send-view="handleView"></side-bar>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { provide, ref } from "vue";
import TheHeader from "../components/TheHeader.vue";
import SideBar from "../components/SideBar.vue";
import { RouterView } from "vue-router";

const view = ref(null);
provide("view", view);

function handleView(value) {
  view.value = value;
}
</script>

<style scoped>
.layout-wrapper {
  width: 100%;
  height: 100%;
}
</style>
