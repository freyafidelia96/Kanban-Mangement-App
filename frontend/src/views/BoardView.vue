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
        <div class="big-column">
          <button @click="handleEditBoard">+ New column</button>
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
        <p>This board is empty. Create a new column to get started.</p>
        <base-button label="Add New Column" btn-type="new-column">
          <template #icon>
            <img
              src="../assets/images/icon-add-task-mobile.svg"
              alt="icon-add-task-mobile"
            />
          </template>
        </base-button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useBoards, useTheme } from "../stores";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import ColumnItem from "../components/Boards/ColumnItem.vue";
import TaskDialog from "../UI/TaskDialog.vue";
import EditBoardDialog from "../UI/EditBoardDialog.vue";

const boards = useBoards();
const theme = useTheme();
const route = useRoute();
const boardId = computed(() => Number(route.params.id));
const palette = ["#49C4E5", "#8471F2", "#67E2AE"];
const modelValue = ref(false);
const selectedTask = ref(null);
const showEditBoardDialog = ref(false);

const board = computed(() => {
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
</script>

<style scoped>
.has-sidebar {
  padding-left: 320px;
}

.big-column {
  height: 100vh;
  background-color: var(--background-new-column); /* Changed from #e4ebfa */
  margin-top: 50px;
  width: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.big-column button {
  background-color: transparent;
  border: none;
  color: var(--text-color-body); /* Changed from #828fa3 */
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.big-column button:hover {
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
