<template>
  <div class="category">
    <div class="title">
      <div class="circle" :style="{ backgroundColor: color }"></div>
      <p class="desc">
        {{ label }} (<span>{{ tasksLength }}</span
        >)
      </p>
    </div>
    <div class="body">
      <task-item
        v-for="task in tasks"
        :completed="getCompleted(task.subtasks)"
        :task-name="task.title"
        :subtasks-length="getSubtasksLength(task.subtasks)"
      ></task-item>
    </div>
  </div>
</template>

<script setup>
import TaskItem from "./TaskItem.vue";
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  tasksLength: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  tasks: {
    type: Array,
    required: true,
  },
});

function getCompleted(subtasks) {
  return subtasks.filter((task) => task.isCompleted).length;
}

function getSubtasksLength(subtasks) {
  return subtasks.length;
}
</script>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  justify-content: start;
  justify-self: start;
  gap: 20px;
}

.circle {
  width: 15px;
  height: 15px;
  background-color: #49c4e5;
  border-radius: 50%;
}

.desc {
  color: #828fa3;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.2px;
  font-weight: 600;
}

.title {
  display: flex;
  height: 100%;
  width: 280px;
  align-items: center;
  gap: 8px;
}

.category {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
}
</style>
