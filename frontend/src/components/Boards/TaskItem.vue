<template>
  <div class="task-wrapper" @click="$emit('open', task)">
    <p>{{ taskName }}</p>
    <small>
      <span class="completed">{{ completed }}</span>
      of <span class="subtasks">{{ subtasksLength }}</span> subtasks
    </small>
  </div>
</template>

<script setup>
defineEmits(["open"]);
const props = defineProps({
  taskName: {
    type: String,
    required: true,
  },
  completed: {
    type: Number,
    required: true,
  },
  subtasksLength: {
    type: Number,
    required: true,
  },

  task: {
    type: Object,
    default: null,
  },
});

function showDialog(taskName) {}
</script>

<style scoped>
.task-wrapper {
  /* Box-shadows need to be dynamic for dark theme */
  box-shadow: var(--box-shadow-task-card); /* Replaced hardcoded rgba values */
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: var(--background-task-card); /* Changed from white */
  width: 280px;
  cursor: pointer;
  padding-block: 20px;
  padding-inline: 15px;
  border-radius: 5px;
}

.task-wrapper p {
  color: var(--text-color-heading); /* Changed from #000112 */
  font-size: 15px;
  font-weight: bold;
  margin: 0;
  padding: 0;
}

.task-wrapper small {
  color: var(--text-color-body); /* Changed from #828fa3 */
  font-size: 12px;
  font-weight: 600;
}

.task-wrapper:hover p {
  color: var(--color-purple); /* Changed from #635fc7 */
}
</style>
