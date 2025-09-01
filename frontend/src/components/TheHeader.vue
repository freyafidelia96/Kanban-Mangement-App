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
          <!-- Only show login button when not authenticated -->
          <base-button
            v-if="!isAuthenticated"
            label="Login"
            btnType="login"
            @click="handleLogin"
          ></base-button>
        </div>
        <div
          class="board-menu"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          @focusin="showBoardOptions = true"
          @focusout="handleFocusOut"
        >
          <button
            class="dots"
            aria-label="Board options"
            :aria-expanded="showBoardOptions"
            @click="toggleBoardOptions"
            tabindex="0"
          >
            <img
              src="../assets/images/icon-vertical-ellipsis.svg"
              alt="icon-vertical-ellipsis"
            />
          </button>
          <div class="editBoard" :class="{ 'show-options': showBoardOptions }">
            <button class="edit" @click="handleEditClick" tabindex="0">
              Edit Board
            </button>
            <button class="delete" @click="handleDeleteClick" tabindex="0">
              Delete Board
            </button>
            <!-- Show logout button only when authenticated -->
            <button
              v-if="isAuthenticated"
              class="logout"
              @click="handleLogout"
              tabindex="0"
            >
              Logout
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
import { useRouter } from "vue-router";
import { useTheme, useBoards, useAuthStore } from "../stores";

import logoDark from "../assets/images/logo-dark.svg";
import logoLight from "../assets/images/logo-light.svg";
import SidebarDialog from "../UI/SidebarDialog.vue";

import iconChevronUp from "../assets/images/icon-chevron-up.svg";
import iconChevronDown from "../assets/images/icon-chevron-down.svg";

const router = useRouter();

const view = inject("view");
const boards = useBoards();
const auth = useAuthStore();
const showDropDown = ref(false);
const showBoardOptions = ref(false); // New ref for controlling board options visibility

const themeStore = useTheme();
const isAuthenticated = computed(() => auth.isAuthenticated);
const emit = defineEmits([
  "edit-board",
  "delete-board",
  "add-new-task",
  "add-board",
]);

const isSmallScreen = ref(false); // New state to track large screen size

function handleLogin() {
  console.log("Login clicked");
  router.push("/login");
}

function handleLogout() {
  console.log("Logout clicked");
  auth.logout();
  // The router.push to login page is handled in the logout function in auth store
}

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

// Variable to track mouseenter/mouseleave timeouts
let menuTimeout = null;

// Handle mouseenter with a small delay to prevent accidental triggers
function handleMouseEnter() {
  if (menuTimeout) clearTimeout(menuTimeout);
  showBoardOptions.value = true;
}

// Handle mouseleave with a small delay to make the menu less jumpy
function handleMouseLeave() {
  if (menuTimeout) clearTimeout(menuTimeout);
  menuTimeout = setTimeout(() => {
    showBoardOptions.value = false;
  }, 100);
}

// Handle focusout with a small delay to allow clicking menu items
function handleFocusOut(event) {
  // Check if the new focus target is within our menu
  if (!event.currentTarget.contains(event.relatedTarget)) {
    setTimeout(() => {
      showBoardOptions.value = false;
    }, 100);
  }
}

// Handle clicks outside the board menu
function handleClickOutside(event) {
  const boardMenu = document.querySelector(".board-menu");
  if (boardMenu && !boardMenu.contains(event.target)) {
    showBoardOptions.value = false;
  }
}

// Toggle board options menu with keyboard or click
function toggleBoardOptions(event) {
  // Stop event propagation to prevent it from triggering handleClickOutside
  event.stopPropagation();
  showBoardOptions.value = !showBoardOptions.value;

  // Log to check if the function is being called
  console.log("Board options toggled:", showBoardOptions.value);
}

// Handle edit board click
function handleEditClick(event) {
  event.stopPropagation(); // Prevent bubbling
  emit("edit-board");
  showBoardOptions.value = false; // Hide menu after action
}

// Handle delete board click
function handleDeleteClick(event) {
  event.stopPropagation(); // Prevent bubbling
  emit("delete-board");
  showBoardOptions.value = false; // Hide menu after action
}

// Set initial screen size on component mount
onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
  // Add global click listener to close menu when clicking outside
  document.addEventListener("mousedown", handleClickOutside);
});

// Clean up event listeners on component unmount
onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>

<style scoped>
.btn-add-new-task {
  display: flex;
  align-items: center;
  gap: 16px;
}

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
  gap: 20px;
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

.board-menu .dots {
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.board-menu .dots:hover {
  background-color: var(--background-subtle);
}

.board-menu .editBoard {
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
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  display: none; /* Hidden by default */
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 3px;
  z-index: 100;
}

/* Show the menu when this class is applied */
.board-menu .editBoard.show-options {
  display: flex; /* Show as flex when active */
}

.editBoard .edit {
  color: var(--text-color-body); /* Changed from #828fa3 */
  width: 100%;
  text-align: left;
  padding: 8px 0;
  transition: color 0.2s ease;
}

.editBoard .delete {
  color: var(--color-red); /* Changed from #ea5555 */
  width: 100%;
  text-align: left;
  padding: 8px 0;
  transition: color 0.2s ease;
}

.editBoard .edit:hover,
.editBoard .edit:focus {
  color: var(--color-purple);
}

.editBoard .delete:hover,
.editBoard .delete:focus {
  color: #ff9898; /* Lighter red for hover */
}

.editBoard .logout {
  color: var(--color-purple); /* Purple color for logout */
  width: 100%;
  text-align: left;
  padding: 8px 0;
  transition: color 0.2s ease;
  border-top: 1px solid var(--border-color);
  padding-top: 12px;
}

.editBoard .logout:hover,
.editBoard .logout:focus {
  color: var(--color-purple-hover);
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
