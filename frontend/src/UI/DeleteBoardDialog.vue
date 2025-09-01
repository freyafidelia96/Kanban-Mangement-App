<template>
  <!-- Teleport keeps the dialog outside normal layout -->
  <teleport to="body">
    <transition name="fade">
      <!-- v-show controls visibility -->
      <div v-show="modelValue" class="backdrop" @click.self="close">
        <div class="dialog">
          <div class="deleteDiv">
            <p>Delete this board?</p>
            <small>
              Are you sure you want to delete the ‘<span>{{ boardName }}</span
              >’ board and its columns? This action cannot be reversed.
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

/* define v-model binding */
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  boardName: { type: String, required: true },
});
const emit = defineEmits(["update:modelValue", "confirm-delete-board"]);

function confirmDelete() {
  emit("confirm-delete-board");
  close();
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

/* .columnText {
  color: #000112; 
  font-size: 12px;
  font-weight: bold;
} */
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

  .deleteControls {
    flex-direction: column;
  }
}
</style>
