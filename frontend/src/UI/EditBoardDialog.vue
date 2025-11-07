<template>
  <!-- Teleport keeps the dialog outside normal layout -->
  <teleport to="body">
    <transition name="fade">
      <!-- v-show controls visibility -->
      <div v-show="modelValue" class="backdrop" @click.self="close">
        <div class="dialog">
          <div>
            <p class="addBoard">Edit Board</p>
            <div class="title">
              <label for="title">Board Name</label>
              <input id="board-name" type="text" v-model="editableBoard.name" />
            </div>
            <p class="column">Board Columns</p>
            <div
              class="controls"
              v-for="(column, idx) in editableBoard.columns"
              :key="idx"
            >
              <input class="columnText" type="text" v-model="column.name" />
              <button @click="removeColumns(idx)" class="remove-btn">✕</button>
            </div>
            <base-button
              label="+ Add New Column"
              btn-type="new-s-c"
              @click="addColumn"
            ></base-button>
            <base-button
              label="Edit Board"
              btn-type="save"
              @click="saveChanges"
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

/* define v-model binding */
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  boardData: { type: Object, required: true },
});
const emit = defineEmits(["update:modelValue", "board-edited"]);

const editableBoard = ref({
  id: null,
  name: "",
  columns: [],
});

watch(
  () => props.boardData,
  (newBoardData) => {
    if (newBoardData) {
      editableBoard.value = JSON.parse(JSON.stringify(newBoardData));
    }
  },
  { immediate: true }
);

watch(
  () => props.modelValue,
  (isVisible) => {
    if (!isVisible && props.boardData) {
      editableBoard.value = JSON.parse(JSON.stringify(props.boardData));
    }
  }
);

function addColumn() {
  editableBoard.value.columns.push({ name: "", tasks: [] });
}

function removeColumns(index) {
  editableBoard.value.columns.splice(index, 1);
}

function saveChanges() {
  if (!editableBoard.value.name.trim()) {
    alert("Name cannot be empty!");
    return;
  }

  if (editableBoard.value.columns.some((col) => !col.name.trim())) {
    alert("Column names cannot be empty!");
    return;
  }

  emit("board-edited", editableBoard.value);
  close();
}

function close() {
  emit("update:modelValue", false);
}
</script>

<style scoped>
.title {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.columnText {
  border: 1px solid var(--color-lines-light); /* Changed from #d3dcee */
  border-radius: 4px; /* Rounded corners */
  padding: 8px;
  width: 92%;
  margin-bottom: 12px;
  padding-inline: 20px;
  color: var(--text-color-heading); /* Changed from #000112 */
  font-weight: 100;
  font-size: 13px;
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
  width: 100%; /* Keeps it responsive to parent container */
  background-color: var(
    --background-input
  ); /* Added background for input fields */
  color: var(--text-color-heading); /* Added text color for input fields */
}

.title label,
.column {
  color: var(--text-color-body); /* Changed from #828fa3 */
  font-size: 12px;
  font-weight: bold;
  background-color: transparent !important;
}

.addTask {
  color: var(--text-color-heading); /* Changed from #000112 */
  font-weight: bold;
  font-size: 18px;
}

button {
  cursor: pointer;
  border: none;
  background-color: transparent;
}

.status-select {
  width: 100%; /* Keeps it responsive to parent container */
  padding: 0.75rem 1rem; /* Adjust padding as needed */
  border: 1px solid var(--color-lines-light); /* Changed from #e4ebfa */
  border-radius: 4px; /* Rounded corners */
  background-color: var(
    --background-input
  ); /* Changed from white - using input background */
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  color: var(--text-color-heading); /* Changed from #000112 */

  /* Keep these to control the native arrow's appearance */
  -webkit-appearance: menulist;
  -moz-appearance: menulist;
  appearance: menulist;

  accent-color: var(--color-purple); /* Changed from #635fc7 */

  transition: border-color 0.2s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-purple); /* Changed from #635fc7 */
}

.status {
  color: var(--text-color-body); /* Changed from #828fa3 */
  font-size: 12px;
  font-weight: bold;
}

.column {
  margin-top: 25px;
}

.addBoard {
  font-size: 18px;
  color: var(--text-color-heading); /* Changed from #000112 */
  font-weight: bold;
  width: 350px;
  margin-top: 12px;
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
}
</style>
