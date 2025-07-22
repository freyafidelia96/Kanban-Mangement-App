<template>
  <div class="task-wrapper">
    <p>{{ taskName }}</p>
    <small
      ><span class="completed">{{ completed }}</span
      >of <span class="subtasks">{{ subtasksLength }}</span> subtasks</small
    >
  </div>
</template>

<script setup>
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
});
</script>

<style scoped>
.task-wrapper {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06),
    /* tight, light edge */ 0 8px 16px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: white;
  width: 280px;
  cursor: pointer;
  padding-block: 20px;
  padding-inline: 15px;
  border-radius: 5px;
}

.task-wrapper p {
  color: #000112;
  font-size: 15px;
  font-weight: bold;
  margin: 0;
  padding: 0;
}

.task-wrapper small {
  color: #828fa3;
  font-size: 12px;
  font-weight: 600;
}
</style>
