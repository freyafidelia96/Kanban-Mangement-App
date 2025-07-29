<template>
  <!-- Teleport keeps the dialog outside normal layout -->
  <teleport to="body">
    <transition name="fade">
      <!-- v-show controls visibility -->
      <div v-show="modelValue" class="backdrop" @click.self="close">
        <div class="dialog">
          <div>
            <p class="editTask">Add New Task</p>
            <div class="title">
              <label for="title">Title</label>
              <input
                type="text"
                v-model="newTask.title"
                placeholder="e.g Take coffee break"
              />
            </div>
            <div class="description">
              <label for="desc">Description</label>
              <textarea
                name="desc"
                id="desc"
                placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little."
                rows="5"
                v-model="newTask.description"
              ></textarea>
            </div>
            <p class="subtask">Subtasks</p>
            <div
              class="controls"
              v-for="(subtask, idx) in newTask.subtasks"
              :key="idx"
            >
              <input
                class="subtaskText"
                type="text"
                v-model="subtask.title"
                placeholder="e.g Make coffee"
              />
              <button @click="removeSubtask(idx)" class="remove-btn">✕</button>
            </div>
            <base-button
              label="+ Add New Task"
              btn-type="new-s-c"
              @click="addSubtask"
            ></base-button>

            <p class="status">Status</p>
            <select v-model="newTask.status" class="status-select">
              <option
                v-for="column in currentBoardColumns"
                :key="column.name"
                :value="column.name"
              >
                {{ column.name }}
              </option>
            </select>
            <base-button
              label="Create New Task"
              btn-type="save"
              @click="createTask"
            ></base-button>
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
  currentBoardColumns: { type: Array, default: [] },
});
const emit = defineEmits(["update:modelValue", "add-new-task"]);

const newTask = ref({
  title: "",
  description: "",
  subtasks: [
    { title: "", isCompleted: false },
    { title: "", isCompleted: false },
  ],
  status: "",
});

watch(
  () => props.modelValue,
  (isVisible) => {
    if (isVisible) {
      // Reset form to initial state when dialog opens
      newTask.value = {
        title: "",
        description: "",
        status:
          props.currentBoardColumns.length > 0
            ? props.currentBoardColumns[0].name
            : "",
        subtasks: [
          { title: "", isCompleted: false },
          { title: "", isCompleted: false },
        ],
      };
    }
  },
  { immediate: true }
);

function addSubtask() {
  newTask.value.subtasks.push({ title: "", isCompleted: false });
}

function removeSubtask(index) {
  newTask.value.subtasks.splice(index, 1);
}

function createTask() {
  // Basic Validation
  if (!newTask.value.title.trim()) {
    alert("Task title cannot be empty!");
    return;
  }
  if (!newTask.value.status) {
    alert("Task status cannot be empty!");
    return;
  }

  // Filter out empty subtasks before emitting
  const validSubtasks = newTask.value.subtasks.filter(
    (s) => s.title.trim() !== ""
  );

  const taskToEmit = {
    ...newTask.value,
    subtasks: validSubtasks,
  };

  emit("add-new-task", taskToEmit);
  close(); // Close the dialog after creating
}

function close() {
  emit("update:modelValue", false);
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
  background-color: var(--background-dialog);
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
  /* Add background and text color for inputs */
  background-color: var(--background-input); /* New variable */
  color: var(--text-color-heading); /* Text input color */
}

.description textarea {
  border: 1px solid var(--color-lines-light); /* Changed from #d3dcee */
  border-radius: 4px; /* Rounded corners */
  padding: 8px;
  /* Add background and text color for textareas */
  background-color: var(--background-input); /* New variable */
  color: var(--text-color-heading); /* Textarea input color */
}

.title label,
.description label,
.subtask {
  color: var(--text-color-body); /* Changed from #828fa3 */
  font-size: 12px;
  font-weight: bold;
  background-color: transparent !important; /* Keep as is, it's about transparency */
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
  background-color: transparent; /* Keep as is */
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
  background-color: var(
    --background-subtask-item
  ); /* Changed from #e4ebfa - new variable */
  border-radius: 5px;
  margin-block: 10px;
  padding-block: 6px;
  padding-inline: 5px;
}

.subtasks:hover {
  background-color: var(
    --background-subtask-item-hover
  ); /* Changed from #a8a4ff - new variable */
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
  margin: 0;
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
    top: 120px;
  }
}
</style>
