<template>
  <teleport to="body">
    <transition name="fade">
      <!-- v-show controls visibility -->
      <div v-show="modelValue" class="backdrop" @click.self="close">
        <aside class="sidebar dialog">
          <p class="sidebar__boards-count">
            ALL BOARDS (<span class="number">{{ boards.length }}</span
            >)
          </p>

          <nav aria-label="Boards">
            <ul class="sidebar__boards">
              <board-item
                v-for="board in boards"
                :board-name="board.name"
                :board-link="getLink(board.id)"
                :key="board.id"
                :class="{ sidebar__item: true, active: isActive(board.id) }"
              ></board-item>
            </ul>
          </nav>

          <div class="sidebar--create">
            <img src="../assets/images/icon-board.svg" alt="icon-board" />
            <button @click="handleCreateBoard" class="sidebar__new-btn">
              + Create New Board
            </button>
          </div>

          <div class="sidebar--toggleMode">
            <img
              src="../assets/images/icon-light-theme.svg"
              alt="icon-light-theme"
            />
            <label class="switch">
              <input
                type="checkbox"
                id="themeToggle"
                :checked="themeStore.getIsDarkMode"
                @change="themeStore.toggleDarkMode"
              />
              <span class="slider"></span>
            </label>

            <img
              src="../assets/images/icon-dark-theme.svg"
              alt="icon-dark-theme"
            />
          </div>
        </aside>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, computed } from "vue";
import { useBoards, useTheme } from "../stores";
import BoardItem from "../components/Boards/BoardItem.vue";
import { useRoute } from "vue-router";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const boardsStore = useBoards();
const boards = computed(() => boardsStore.getBoards);
const themeStore = useTheme();
const emit = defineEmits(["send-view"]);

const route = useRoute();
const boardId = computed(() => route.params.id);

function isActive(val) {
  return val == boardId.value;
}

function getLink(id) {
  return `/board/${id}`;
}

function close() {
  emit("update:modelValue", false);
}

function handleCreateBoard() {
  emit("send-view");
  close();
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: var(--backdrop-background); /* Changed from rgba(0, 0, 0, 0.5) */
  display: grid;
  place-items: center;
  z-index: 1000;
}

.dialog {
  position: relative;
  border-radius: 8px;
  padding-block: 10px;
  padding-inline-end: 20px;
  top: -40px;
  box-shadow: var(--box-shadow-dialog); /* Replaced hardcoded rgba values */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.sidebar__item {
  padding-left: 20px !important;
}

.sidebar {
  z-index: 2;
  background-color: var(--background-sidebar); /* Changed */
  width: 264px;
  display: flex;
  flex-direction: column;
}

.sidebar__logo {
  width: 152.23px;
  height: 25.22px;
  margin-top: 32px;
  margin-left: 32px;
}

.sidebar__boards-count {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color-body); /* Changed */
  letter-spacing: 2.4px;
  margin-block-start: 10px;
  margin-block-end: 20px;
  margin-left: 20px;
}

.sidebar__boards {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 1rem;
}

.sidebar--create {
  display: flex;
  gap: 10px;
  margin-block-start: 0;
  padding-left: 20px;
}

.sidebar--create img {
  /* This filter was hardcoded. To be theme-aware,
     your SVG icon for the board should ideally be monochrome and
     you can use `fill: currentColor;` on the SVG itself,
     or use a filter that inverts for dark mode if it's a fixed image.
     For now, this specific filter is kept but note it might not change with theme.
     If you want it to be purple, it should be `fill: var(--color-purple);`
     if it's an SVG that accepts fill. */
  filter: invert(35%) sepia(55%) saturate(7000%) hue-rotate(230deg)
    brightness(90%);
}

.sidebar__new-btn {
  color: var(
    --color-purple
  ); /* Changed from --text-color-button-secondary to --color-purple for direct purple color */
  font-weight: 600;
  font-size: 15px;
}

/* .sidebar__controls {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(19, 1fr);
} */

.flex-end {
  display: flex;
  flex-direction: column;
  margin-top: auto;
}

.sidebar--toggleMode {
  /* grid-row: span 1 / 18; */
  display: flex;
  background-color: var(
    --background-sidebar-small
  ); /* Changed to use variable */
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 12px;
  gap: 25px;
  margin-left: 20px;
}

.sidebar--hidden {
  /* grid-row: span 1 / 19; */
  margin-block-start: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 7px;
  width: 265px;
}

.sidebar--hidden img {
  padding-left: 18px;
  /* If this icon is dark in light mode, it might need a filter like this: */
  /* filter: var(--theme-icon-filter, none); */
}

.sidebar--hidden:hover img,
.sidebar--hidden:hover span {
  /* This filter was hardcoded. If the icon needs to change color
     it's better to use `color: var(--color-purple);` on the span and let SVG inherit,
     or use a dynamic filter. Keeping original for minimal changes. */
  filter: invert(35%) sepia(55%) saturate(7000%) hue-rotate(230deg)
    brightness(90%);
}

.sidebar--hidden:hover {
  background-color: var(
    --color-purple-hover-transparent
  ); /* Changed to use variable */
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  color: var(
    --color-purple
  ); /* Changed from --text-color-button-secondary to --color-purple */
}

.sidebar--hide {
  color: var(--text-color-body); /* Changed */
  font-weight: 600;
  font-size: 15px;
  background-color: transparent;
}

.switch {
  /* 1. size & layout of the track */
  position: relative;
  display: inline-block;
  width: 38px;
  height: 20px;
}

.switch input {
  /* 2. hide the real checkbox */
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  /* 3. draw the purple pill (the track) */
  position: absolute;
  inset: 0; /* top/right/bottom/left: 0 */
  background: var(
    --color-purple
  ); /* Changed from --text-color-button-secondary to --color-purple */
  border-radius: 999px; /* fully rounded ends */
  cursor: pointer;
  transition: background 0.2s;
}

.slider:hover {
  background: var(--color-purple-hover); /* Changed */
}

.slider::before {
  /* 4. create the white circular knob */
  content: "";
  position: absolute;
  width: 14px;
  height: 14px;
  left: 3px; /* gap from left edge of track */
  top: 3px; /* gap from top edge of track */
  background: var(--color-white); /* Changed */
  border-radius: 50%;
  transition: transform 0.2s; /* animate the slide */
}

.switch input:checked + .slider::before {
  transform: translateX(20px) !important;
}

.view {
  display: none;
}

.aside {
  position: fixed;
  z-index: 2;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  bottom: 40px;
  left: 0;
}

.aside button {
  padding: 0;
  margin: 0;
  background-color: transparent; /* Changed */
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  padding: 0;
  margin: 0;
}

button {
  border: none;
  background-color: transparent; /* Changed from var(--color-white) to transparent */
  cursor: pointer;
}

.sidebar img {
  align-self: flex-start;
}
</style>
