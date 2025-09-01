<template>
  <div
    :class="[
      'board-view',
      {
        'board-view--empty': board.columns.length === 0,
        'has-sidebar': sidebarVisible,
        noSidebar: !sidebarVisible,
      },
    ]"
  >
    <template v-if="board.columns.length">
      <div class="columns">
        <column-item
          v-for="(col, idx) in board.columns"
          :key="col.name"
          :label="col.name"
          :tasks-length="col.tasks.length"
          :color="palette[idx]"
          :tasks="col.tasks"
          @open-task="openTask"
        ></column-item>
        <div
          class="big-column"
          @click="handleEditBoard"
          @keydown.enter="handleEditBoard"
          @keydown.space.prevent="handleEditBoard"
          tabindex="0"
          role="button"
          aria-label="Add new column"
        >
          <span class="new-column-text">+ New column</span>
        </div>
      </div>
      <task-dialog
        :model-value="modelValue"
        :task-data="selectedTask"
        :current-board-id="boardId"
        @update:model-value="modelValue = $event"
        @toggle-subtask-completion="toggleSubtaskCompletion"
        @update-task-status="handleTaskStatusUpdate"
        @task-edited="handleTaskEdited"
        @task-deleted="handleTaskDeleted"
      ></task-dialog>
      <edit-board-dialog
        v-model="showEditBoardDialog"
        :board-data="board"
        @board-edited="handleEditedBoard"
      ></edit-board-dialog>
    </template>
    <template v-else>
      <div class="empty">
        <p>
          {{
            boards.getBoards.length === 0
              ? "You don't have any boards yet. Create your first board to get started."
              : "This board is empty. Add columns to get started."
          }}
        </p>
        <base-button
          :label="
            boards.getBoards.length === 0
              ? 'Create New Board'
              : 'Add New Column'
          "
          btn-type="new-column"
          @click="
            boards.getBoards.length === 0
              ? openCreateBoardDialog()
              : handleEditBoard()
          "
        >
          <template #icon>
            <img
              src="../assets/images/icon-add-task-mobile.svg"
              alt="icon-add-task-mobile"
            />
          </template>
        </base-button>
      </div>
    </template>

    <!-- Using global board dialog from MainLayout instead -->
  </div>
</template>

<script setup>
import { useBoards, useTheme, useAuthStore } from "../stores";
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ColumnItem from "../components/Boards/ColumnItem.vue";
import TaskDialog from "../UI/TaskDialog.vue";
import EditBoardDialog from "../UI/EditBoardDialog.vue";

const boards = useBoards();
const theme = useTheme();
const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const boardId = computed(() => Number(route.params.id));
const palette = ["#49C4E5", "#8471F2", "#67E2AE"];
const modelValue = ref(false);
const selectedTask = ref(null);
const showEditBoardDialog = ref(false);

// Check if user is authenticated and fetch their boards if they are
onMounted(async () => {
  if (auth.isAuthenticated) {
    await boards.fetchUserBoards();

    // If there are boards and we're on the default route, redirect to first board
    if (boards.getBoards.length > 0 && boardId.value === 0) {
      router.push(`/board/${boards.getBoards[0].id}`);
    }
  }
});

const board = computed(() => {
  // Handle case when boards array is empty
  if (boards.getBoards.length === 0) {
    return {
      id: null,
      name: "No Board",
      columns: [],
    };
  }

  return (
    boards.getBoards.find((board) => board.id === boardId.value) ?? {
      id: null,
      name: "",
      columns: [],
    }
  );
});

const sidebarVisible = computed(() => theme.getSidebarVisibility);

function openTask(task) {
  modelValue.value = true;
  selectedTask.value = task;
}

function toggleSubtaskCompletion({ taskTitle, subtaskTitle, isCompleted }) {
  boards.toggleSubtask({
    boardId: boardId.value,
    taskTitle,
    subtaskTitle,
    isCompleted,
  });
}

function handleTaskStatusUpdate({ taskTitle, newStatus }) {
  // Call the action on your Pinia store
  boards.updateTaskStatus(boardId.value, taskTitle, newStatus);
}

function handleTaskEdited({ originalTaskTitle, updatedTask }) {
  boards.editTask(boardId.value, originalTaskTitle, updatedTask);
  selectedTask.value = null;
}

function handleTaskDeleted({ boardId, taskTitle }) {
  // Call the 'deleteTask' action on your Pinia store
  boards.deleteTask(boardId, taskTitle);
  // The TaskDialog will automatically close itself after emitting 'task-deleted'
  selectedTask.value = null; // Clear selected task
}

function handleEditBoard() {
  if (board.value) {
    showEditBoardDialog.value = true;
  } else {
    alert("No board to show");
  }
}

function handleEditedBoard(updatedBoardData) {
  boards.editBoard(updatedBoardData);
}

function openCreateBoardDialog() {
  console.log("Opening create board dialog from BoardView");
  // Access the MainLayout's dialog instead of the local one
  const event = new CustomEvent("open-board-dialog");
  document.dispatchEvent(event);
}

// Using centralized board creation in MainLayout
</script>

<style scoped>
.has-sidebar {
  padding-left: 320px;
}

.big-column {
  height: calc(100vh - 150px); /* Reduced height to be more reasonable */
  background-color: var(--background-new-column); /* Changed from #e4ebfa */
  margin-top: 50px;
  width: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer; /* Indicate the entire area is clickable */
  transition: background-color 0.2s ease, transform 0.2s ease;
  position: relative; /* For focus outline positioning */
  user-select: none; /* Prevent text selection when clicking */
}

.big-column:hover {
  background-color: var(
    --background-new-column-hover,
    #d8e0f0
  ); /* Slightly darker on hover */
  transform: translateY(-2px); /* Subtle lift effect */
}

.big-column:active {
  transform: translateY(0); /* Press effect */
}

/* Add focus styles for keyboard navigation */
.big-column:focus {
  outline: 2px solid var(--color-purple);
  outline-offset: 2px;
}

.new-column-text {
  color: var(--text-color-body); /* Changed from #828fa3 */
  font-size: 24px;
  font-weight: bold;
  transition: color 0.2s ease;
}

.big-column:hover .new-column-text {
  color: var(--color-purple); /* Changed from #635fc7 */
}

.noSidebar {
  padding-left: 20px;
}

/* .pageContent {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
} */

.empty {
  text-align: center;
  display: flex;
  align-items: center;
  justify-self: center;
  flex-direction: column;
}

.empty p {
  color: var(--text-color-body); /* Changed from #828fa3 */
  font-weight: 600;
  font-size: 18px;
}

.board-view {
  /* default: stretch to fill horizontally, let content define height */
  width: 100%;
  display: block;
  padding-bottom: 60px;
  background-color: var(
    --background-main
  ); /* Assuming this is the main background of the board area */
}

.board-view:not(.board-view--empty) {
  padding-top: 120px;
}

/* when empty, switch to flex-centering */
.board-view--empty {
  display: flex;
  flex-direction: column; /* stack the message & button vertically */
  justify-content: center; /* vertical centering */
  align-items: center; /* horizontal centering */
  justify-self: center;
  height: 100vh; /* assume ancestor is 100% tall */
  text-align: center; /* center the text inside */
  background-color: var(
    --background-main
  ); /* Ensure empty state background also matches */
}

/* for non-empty, lay out columns in a row */
.board-view .columns {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  align-items: flex-start;
}

@media (max-width: 769px) {
  .has-sidebar {
    padding-left: 270px;
  }
}

@media (max-width: 541px) {
  .has-sidebar {
    padding-left: 20px;
  }

  .board-view:not(.board-view--empty) {
    padding-top: 100px;
  }
}
</style>
