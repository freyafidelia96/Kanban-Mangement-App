<template>
  <div class="layout-wrapper">
    <!-- Only show header and sidebar if not on login or register pages -->
    <template v-if="!isAuthPage">
      <the-header
        @edit-board="handleEditBoard"
        @delete-board="handleDeleteBoard"
        @add-new-task="handleAddNewTask"
        @add-board="handleDialog"
      ></the-header>
      <side-bar
        @send-visibility="handleView"
        @send-view="handleDialog"
      ></side-bar>
    </template>
    <router-view></router-view>
    <board-dialog
      v-model="showBoardDialog"
      @create-new-board="createNewBoard"
    ></board-dialog>
    <edit-board-dialog
      v-model="showEditBoardDialog"
      :board-data="currentBoard"
      @board-edited="handleEditedBoard"
    ></edit-board-dialog>
    <delete-board-dialog
      v-model="showDeleteBoardDialog"
      :board-name="currentBoard?.name"
      @confirm-delete-board="handleConfirmDeleteBoard"
    ></delete-board-dialog>
    <add-task-dialog
      v-model="showAddTaskDialog"
      :current-board-columns="currentBoard?.columns"
      @add-new-task="handleAddNewTaskConfirmed"
    ></add-task-dialog>
  </div>
</template>

<script setup>
import { provide, ref, computed, onMounted, onUnmounted } from "vue";
import TheHeader from "../components/TheHeader.vue";
import SideBar from "../components/SideBar.vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import BoardDialog from "../UI/BoardDialog.vue";
import EditBoardDialog from "../UI/EditBoardDialog.vue";
import DeleteBoardDialog from "../UI/DeleteBoardDialog.vue";
import AddTaskDialog from "../UI/AddTaskDialog.vue";
import { useBoards } from "../stores";

const view = ref(null);
const boards = useBoards();
const route = useRoute();
const router = useRouter();
provide("view", view);

const showBoardDialog = ref(false);
const showEditBoardDialog = ref(false);
const showDeleteBoardDialog = ref(false);
const showAddTaskDialog = ref(false);

const isAuthPage = computed(() => {
  return route.path === "/login" || route.path === "/register";
});

// Listen for the custom event
onMounted(() => {
  document.addEventListener("open-board-dialog", () => {
    showBoardDialog.value = true;
  });
});

onUnmounted(() => {
  document.removeEventListener("open-board-dialog", () => {
    showBoardDialog.value = true;
  });
});

const currentBoard = computed(() => {
  const boardId = Number(route.params.id);
  return boards.getBoards.find((b) => b.id === boardId);
});

function handleDialog(value) {
  if (value === "create-new-board") {
    showBoardDialog.value = true;
  }
}

function handleView(value) {
  view.value = value;
}

async function createNewBoard(newBoardData) {
  try {
    // Create the new board using your store action
    const newBoardId = await boards.addBoard(newBoardData);

    console.log("New board created with ID:", newBoardId);

    // Navigate to the new board using its ID
    if (newBoardId !== undefined) {
      // Use router to navigate to the new board
      router.push(`/board/${newBoardId}`);
    }
  } catch (error) {
    console.error("Failed to create board:", error);
    alert(`Error creating board: ${error.message}`);
  }
}

function handleEditBoard() {
  if (isAuthPage.value) return; // Don't process on auth pages

  if (currentBoard) {
    showEditBoardDialog.value = true;
  } else {
    alert("No board Selected");
  }
}

function handleEditedBoard(updatedBoardData) {
  boards.editBoard(updatedBoardData);
}

function handleDeleteBoard() {
  if (isAuthPage.value) return; // Don't process on auth pages

  if (currentBoard.value) {
    showDeleteBoardDialog.value = true;
  } else {
    alert("No board was selected");
  }
}

function handleConfirmDeleteBoard() {
  if (currentBoard.value) {
    boards.deleteBoard(currentBoard.value.id);
    showDeleteBoardDialog.value = false;

    const remainingBoards = boards.getBoards;
    if (remainingBoards.length > 0) {
      router.push(`/board/${remainingBoards[0].id}`);
    } else if (currentBoard.value.id > remainingBoards.length - 1) {
      router.push("/");
    } else {
      router.push("/");
    }
  }
}

function handleAddNewTask() {
  if (isAuthPage.value) return; // Don't process on auth pages

  if (currentBoard.value) {
    showAddTaskDialog.value = true;
  } else {
    alert("Please select a board to add a task to first.");
  }
}

// Handles new task data from AddTaskDialog
function handleAddNewTaskConfirmed(newTaskData) {
  if (currentBoard.value) {
    boards.addTask(currentBoard.value.id, newTaskData);
    showAddTaskDialog.value = false;
  }
}
</script>

<style scoped>
.layout-wrapper {
  width: 100%;
  height: 100%;
}

/* Additional styling for auth pages can be added here if needed */
</style>
