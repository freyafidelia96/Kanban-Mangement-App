<template>
  <div class="header-wrapper">
    <header>
      <div class="desc">
        <div class="logo">
          <img
            :src="themeStore.getIsDarkMode ? logoLight : logoDark"
            alt="logo-dark"
            class="big-screen"
          />
          <img
            src="../assets/images/logo-mobile.svg"
            alt="logo-mobile"
            class="small-screen"
          />
        </div>
        <div
          :class="{
            boardName: true,
            padding: !themeStore.getSidebarVisibility,
          }"
        >
          <span>Platform Launch</span>
          <img
            :src="showDropDown ? iconChevronDown : iconChevronUp"
            :alt="showDropDown ? 'close dropdown' : 'open dropdown'"
            class="icon-up"
            :class="{
              'rotate-180': true,
            }"
            @click="handleDropdown"
          />
        </div>
      </div>
      <div class="actions">
        <div class="btn-add-new-task">
          <base-button @click="emit('add-new-task')" label="Add New Task">
            <template #icon>
              <img
                class="add"
                src="../assets/images/icon-add-task-mobile.svg"
                alt="add"
              />
            </template>
          </base-button>
        </div>
        <div class="board-menu">
          <button class="dots">
            <img
              src="../assets/images/icon-vertical-ellipsis.svg"
              alt="icon-vertical-ellipsis"
            />
          </button>
          <div class="editBoard">
            <button class="edit" @click="emit('edit-board')">Edit Board</button>
            <button class="delete" @click="emit('delete-board')">
              Delete Board
            </button>
          </div>
        </div>
      </div>
    </header>
    <sidebar-dialog
      v-model="showSidebarDialog"
      @send-view="createNewBoard"
    ></sidebar-dialog>
  </div>
</template>

<script setup>
import { inject, ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useTheme, useBoards } from "../stores";

import logoDark from "../assets/images/logo-dark.svg";
import logoLight from "../assets/images/logo-light.svg";
import SidebarDialog from "../UI/SidebarDialog.vue";

import iconChevronUp from "../assets/images/icon-chevron-up.svg";
import iconChevronDown from "../assets/images/icon-chevron-down.svg";

const view = inject("view");
const boards = useBoards();
const showDropDown = ref(false);

const themeStore = useTheme();
const emit = defineEmits([
  "edit-board",
  "delete-board",
  "add-new-task",
  "add-board",
]);

const isSmallScreen = ref(false); // New state to track large screen size

function handleDropdown() {
  showDropDown.value = !showDropDown.value;
  showSidebarDialog.value = showDropDown.value && isSmallScreen;
  console.log(showDropDown.value, showSidebarDialog.value, isSmallScreen.value);
}

const showSidebarDialog = ref(false);
// Function to check screen size
const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth <= 540; // Adjust breakpoint as needed (e.g., 768px, 1024px)
  if (!isSmallScreen.value && showDropDown.value) {
    showDropDown.value = false;
  }
};

function createNewBoard() {
  emit("add-board", "create-new-board");
}

watch(showSidebarDialog, (newValue) => {
  if (!newValue) {
    // If showSidebarDialog becomes false
    showDropDown.value = false; // Ensure the dropdown arrow also goes to the "closed" state
  }
});

// Set initial screen size on component mount
onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

// Clean up event listener on component unmount
onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}

.icon-up {
  display: none;
  cursor: pointer;
}
.boardName {
  font-size: 25px;
  color: var(--text-color-heading); /* Changed from #000112 */
  font-weight: 700;
  padding-inline-start: 100px;
  padding-block: 31px;
  letter-spacing: 0px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.padding {
  padding-inline-start: 32px;
}

.logo {
  padding-inline-end: 36px;
  border-right: var(--color-lines-light) solid 1px; /* Changed from #e4ebfa */
  padding-block: 31px;
}

header {
  display: flex;
  height: 90px;
  background-color: var(--background-header); /* Changed from white */
  justify-content: space-between;
  padding-inline: 34px;
  border-bottom: 0.1px solid var(--color-lines-light);
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  z-index: 1;
}

.add {
  width: 10px;
  height: 10px;
}

.desc {
  display: flex;
}

.actions {
  display: flex;
  align-items: center;
  gap: 30px;
}

.actions > img {
  width: 6px;
  height: 24px;
}

.small-screen {
  display: none;
}

button {
  cursor: pointer;
  border: none;
  background-color: transparent; /* Assuming you want transparent, not white */
}

.board-menu {
  position: relative;
  display: inline-block;
}

.board-menu .editBoard {
  display: none;
  position: absolute;
  width: 192px;
  height: auto;
  right: 5px;
  top: 60px;
  background-color: var(
    --background-dialog
  ); /* Changed from white for pop-up menu */
  padding: 15px;
  border-radius: 10px;
}

.editBoard .edit {
  color: var(--text-color-body); /* Changed from #828fa3 */
}

.editBoard .delete {
  color: var(--color-red); /* Changed from #ea5555 */
}

.board-menu:hover .editBoard {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 14px;
}

@media (max-width: 1023px) {
  .boardName {
    padding-inline-start: 70px;
    margin: 0;
  }

  .padding {
    padding-inline-start: 22px;
  }

  .logo {
    padding-inline-end: 20px;
    margin: 0;
  }

  header {
    padding-inline: 20px;
  }

  .actions {
    gap: 15px;
  }
}

@media (max-width: 767px) {
  .small-screen {
    display: inline;
  }

  .big-screen {
    display: none;
  }

  .boardName {
    padding-inline-start: 5px;
    padding-block: 0;
    margin: 0;
  }

  .logo {
    padding-inline-end: 10px;
    border: none;
    padding-block: 0;
    margin: 0;
  }

  header {
    padding-inline: 20px;
    height: 70px;
  }

  .desc {
    align-items: center;
  }

  .actions {
    gap: 15px;
  }
}

@media (max-width: 541px) {
  .boardName {
    font-size: 20px;
  }

  header {
    padding-inline: 10px;
  }

  .actions {
    gap: 5px;
  }

  .icon-up {
    display: inline;
    transition: transform 0.2s ease;
  }
}
</style>
