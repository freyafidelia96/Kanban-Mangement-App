<template>
  <!-- Teleport keeps the dialog outside normal layout -->
  <teleport to="body">
    <transition name="fade">
      <!-- v-show controls visibility -->
      <div v-show="modelValue" class="backdrop" @click.self="close">
        <div class="dialog">
          <div v-if="mode === 'view'">
            <div class="titleControls">
              <p class="title">{{ taskData?.title }}</p>
              <div class="board-menu">
                <button class="dots">
                  <img
                    src="../assets/images/icon-vertical-ellipsis.svg"
                    alt="icon-vertical-ellipsis"
                  />
                </button>
                <div class="editBoard">
                  <button class="edit" @click="setMode('edit')">
                    Edit Task
                  </button>
                  <button class="delete" @click="setMode('delete-confirm')">
                    Delete Task
                  </button>
                </div>
              </div>
            </div>
            <small class="description">{{ taskData?.description }}</small>
            <p class="subtasksNumber">
              Subtasks (<span>{{ isCompleted(taskData?.subtasks) }}</span> of
              <span>{{ taskData?.subtasks.length }}</span
              >)
            </p>
            <div
              class="subtasks"
              v-for="subtask in taskData?.subtasks"
              :key="subtask.title"
            >
              <label>
                <input
                  type="checkbox"
                  class="subtask-checkbox"
                  :checked="subtask?.isCompleted"
                  @change="toggleSubtask(subtask)"
                />
                <small
                  :class="{ 'completed-subtask-text': subtask.isCompleted }"
                  class="subtask-text"
                  >{{ subtask?.title }}</small
                >
              </label>
            </div>
            <p class="status">Current Status</p>
            <select
              v-model="currentStatus"
              @change="changeTaskStatus"
              class="status-select"
            >
              <option
                v-for="statusOption in availableStatuses"
                :key="statusOption"
                :value="statusOption"
              >
                {{ statusOption }}
              </option>
            </select>
          </div>
          <div v-else-if="mode === 'edit'">
            <p class="editTask">Edit Task</p>
            <div class="title">
              <label for="title">Title</label>
              <input type="text" v-model="editableTask.title" />
            </div>
            <div class="description">
              <label for="desc">Description</label>
              <textarea
                name="desc"
                id="desc"
                placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little."
                rows="5"
                v-model="editableTask.description"
              ></textarea>
            </div>
            <p class="subtask">Subtasks</p>
            <div
              class="controls"
              v-for="(subtask, idx) in editableTask.subtasks"
              :key="idx"
            >
              <input class="subtaskText" type="text" v-model="subtask.title" />
              <button @click="removeSubtask(idx)" class="remove-btn">✕</button>
            </div>
            <base-button
              label="+ Add New Subtask"
              btn-type="new-s-c"
              @click="addSubtask"
            ></base-button>

            <p class="status">Status</p>
            <select
              v-model="editableTask.status"
              @change="changeTaskStatus"
              class="status-select"
            >
              <option
                v-for="statusOption in availableStatuses"
                :key="statusOption"
                :value="statusOption"
              >
                {{ statusOption }}
              </option>
            </select>
            <base-button
              label="Save Changes"
              btn-type="save"
              @click="saveEditedTask"
            ></base-button>
          </div>
          <div v-else-if="mode === 'delete-confirm'" class="deleteDiv">
            <p>Delete this task?</p>
            <small>
              Are you sure you want to delete the ‘<span>{{
                editableTask.title
              }}</span
              >’ task and its subtasks? This action cannot be reversed.
            </small>
            <div class="deleteControls">
              <base-button
                label="Delete"
                btn-type="delete"
                @click="confirmDelete"
              ></base-button>
              <base-button
                label="Cancel"
                btn-type="cancel"
                @click="close()"
              ></base-button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useBoards } from "../stores";

const boardsStore = useBoards();
/* define v-model binding */
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  taskData: { type: Object, required: true },
  currentBoardId: { type: Number, required: true },
});
const emit = defineEmits([
  "update:modelValue",
  "update-task-status",
  "toggle-subtask-completion",
  "task-edited",
  "task-deleted",
]);

const mode = ref("view");
const editableTask = ref({
  title: "",
  description: "",
  subtasks: [],
  status: "",
});

watch(
  () => [props.modelValue, props.taskData],
  ([newModelValue, newUserData]) => {
    if (newModelValue && newUserData) {
      mode.value = "view";
      editableTask.value = JSON.parse(JSON.stringify(newUserData));
    } else if (!newModelValue) {
      mode.value = "view";
    }
  },
  { immediate: true }
);

function addSubtask() {
  editableTask.value.subtasks.push({ title: "", isCompleted: false });
}

function removeSubtask(index) {
  editableTask.value.subtasks.splice(index, 1);
}

function saveEditedTask() {
  emit("task-edited", {
    originalTaskTitle: props.taskData.title, // Use the original task title from the prop
    updatedTask: editableTask.value, // Send the entire modified task object
  });
  close();
}

function setMode(newMode) {
  mode.value = newMode;
}

function confirmDelete() {
  if (!props.taskData) return; // Safety check
  emit("task-deleted", {
    boardId: props.currentBoardId, // Pass current board ID
    taskTitle: props.taskData.title, // Pass the title of the task to delete
  });
  close(); // Close the dialog after emitting delete request
}

function close() {
  emit("update:modelValue", false);
  mode.value = "view";
}

function isCompleted(subtasks) {
  return subtasks?.filter((task) => task?.isCompleted).length;
}

function toggleSubtask(subtask) {
  if (!props.taskData) return; // Safety check
  emit("toggle-subtask-completion", {
    taskTitle: props.taskData.title,
    subtaskTitle: subtask.title,
    isCompleted: !subtask.isCompleted,
  });
}

// 1. Declare currentStatus as a reactive reference
const currentStatus = ref("");

// 2. Watch for changes in taskData to initialize currentStatus
//    This runs immediately on component mount if taskData is not null,
//    and whenever taskData changes (e.g., a different task is opened)
watch(
  () => props.taskData,
  (newTaskData) => {
    if (newTaskData) {
      currentStatus.value = newTaskData.status; // Set dropdown value to task's current status
    } else {
      currentStatus.value = ""; // Clear if taskData becomes null
    }
  },
  { immediate: true }
); // 'immediate: true' runs the watcher once on component creation

const availableStatuses = computed(() => {
  // Find the current board using the currentBoardId prop
  const currentBoard = boardsStore.getBoards.find(
    (board) => board.id === props.currentBoardId
  );

  if (currentBoard && currentBoard.columns) {
    // Map column names to be the available statuses
    return currentBoard.columns.map((column) => column.name);
  }
  return []; // Return an empty array if board or columns not found
});

function changeTaskStatus() {
  if (!props.taskData) return;
  emit("update-task-status", {
    taskTitle: props.taskData.title,
    newStatus: currentStatus.value, // The value selected by the user
  });
}
</script>

<style scoped>
.deleteControls {
  display: flex;
  margin-top: 20px;
  gap: 10px;
}

.deleteDiv p {
  color: var(--color-red); /* Changed from #ea5555 */
  font-weight: bold;
  font-size: 18px;
}

.deleteDiv small {
  color: var(--text-color-body); /* Changed from #828fa3 */
  font-size: 13px;
  font-weight: medium;
}

.title {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.subtaskText {
  border: 1px solid var(--color-lines-light); /* Changed from #d3dcee */
  border-radius: 4px; /* Rounded corners */
  padding: 8px;
  width: 92%;
  margin-bottom: 12px;
  padding-inline: 20px;
  color: var(--text-color-heading); /* Changed from #000112 */
  background-color: var(
    --background-input
  ); /* Added background for input fields */
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.remove-btn {
  color: var(--text-color-body); /* Changed from #828fa3 */
  font-size: 16px;
  font-weight: 900;
}

.title input {
  border: 1px solid var(--color-lines-light); /* Changed from #d3dcee */
  border-radius: 4px; /* Rounded corners */
  padding: 8px;
  width: 120%; /* Keeps it responsive to parent container */
  background-color: var(
    --background-input
  ); /* Added background for input fields */
  color: var(--text-color-heading); /* Added text color for input fields */
}

.description textarea {
  border: 1px solid var(--color-lines-light); /* Changed from #d3dcee */
  border-radius: 4px; /* Rounded corners */
  padding: 8px;
  background-color: var(--background-input); /* Added background for textarea */
  color: var(--text-color-heading); /* Added text color for textarea */
}

.title label,
.description label,
.subtask {
  color: var(--text-color-body); /* Changed from #828fa3 */
  font-size: 12px;
  font-weight: bold;
  background-color: transparent !important;
}

.description {
  display: flex;
  flex-direction: column;
}

.editTask {
  color: var(--text-color-heading); /* Changed from #000112 */
  font-weight: bold;
  font-size: 18px;
}

button {
  cursor: pointer;
  border: none;
  background-color: transparent;
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
  top: 40px;
  left: -70px;
  background-color: var(--background-dialog); /* Changed from white */
  padding: 15px;
  border-radius: 10px;
  z-index: 1000;
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

.status-select {
  width: 100%; /* Keeps it responsive to parent container */
  padding: 0.75rem 1rem; /* Adjust padding as needed */
  border: 1px solid var(--color-lines-light); /* Changed from #e4ebfa */
  border-radius: 4px; /* Rounded corners */
  background-color: var(
    --background-status-select
  ); /* Changed from white - using new input variable */
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  color: var(--text-color-status); /* Changed from #000112 */

  /* Keep these to control the native arrow's appearance */
  -webkit-appearance: menulist;
  -moz-appearance: menulist;
  appearance: menulist;

  accent-color: var(--color-purple); /* Changed from #635fc7 */

  transition: border-color 0.2s ease;
}

.status-select option {
  background: var(--background-input);
}

input:focus,
textarea:focus,
.status-select {
  outline: none;
  border-color: var(--color-purple); /* Changed from #635fc7 */
}

.status {
  color: var(--text-color-body); /* Changed from #828fa3 */
  font-size: 12px;
  font-weight: bold;
}

.subtask-checkbox {
  accent-color: var(--color-purple); /* Changed from #635fc7 */
  cursor: pointer;
}

.subtask-text {
  color: var(--text-color-heading); /* Changed from #000112 */
  font-size: 12px;
  font-weight: bold;
}

.completed-subtask-text {
  text-decoration: line-through;
  color: var(--text-color-body); /* Changed from #828fa3 */
}

.subtasks {
  background-color: var(--background-subtask-item); /* Changed from #e4ebfa */
  border-radius: 5px;
  margin-block: 10px;
  padding-block: 6px;
  padding-inline: 5px;
}

.subtasks:hover {
  background-color: var(
    --background-subtask-item-hover
  ); /* Changed from #a8a4ff */
  padding-block: 8px;
}

.subtasks label {
  display: flex;
  align-items: center;
  gap: 10px;
}

.subtasksNumber {
  font-size: 12px;
  font-weight: bold;
  color: var(--text-color-body); /* Changed from #828fa3 */
  margin-top: 18px;
}

.description {
  font-size: 13px;
  color: var(--text-color-body); /* Changed from #828fa3 */
  font-weight: medium;
  line-height: 23px;
  margin-block: 22px;
}

.title {
  font-size: 18px;
  color: var(--text-color-heading); /* Changed from #000112 */
  font-weight: bold;
  width: 350px;
  margin-top: 12px;
  margin-bottom: 0;
}

.titleControls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* backdrop covers the whole screen */
.backdrop {
  position: fixed;
  inset: 0;
  background: var(--backdrop-background); /* Changed from rgba(0, 0, 0, 0.5) */
  display: grid;
  place-items: center;
  z-index: 1000;
}

/* dialog box */
.dialog {
  position: relative;
  background: var(--background-dialog); /* Changed from #fff */
  border-radius: 8px;
  padding-inline: 30px;
  padding-block: 10px;
  width: 480px;
  box-shadow: var(--box-shadow-dialog); /* Replaced hardcoded rgba values */
}

/* tiny X button */
.close-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

@media (max-width: 540px) {
  .dialog {
    width: 313px;
  }

  .deleteControls {
    flex-direction: column;
  }
}
</style>
