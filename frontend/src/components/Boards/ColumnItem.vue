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
      <draggable
        class="task-list"
        v-model="columnTasks"
        group="tasks"
        item-key="title"
        :animation="150"
        ghost-class="ghost-card"
        :delay="50"
        :delayOnTouchOnly="true"
        @change="onTaskChange"
      >
        <template #item="{ element: task }">
          <div
            v-memo="[
              task.title,
              getCompleted(task.subtasks),
              getSubtasksLength(task.subtasks),
            ]"
          >
            <task-item
              :completed="getCompleted(task.subtasks)"
              :task-name="task.title"
              :subtasks-length="getSubtasksLength(task.subtasks)"
              :task="task"
              @open="emit('open-task', $event)"
            ></task-item>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup>
import TaskItem from "./TaskItem.vue";
import draggable from "vuedraggable"; // Import the draggable component
import { computed } from "vue";
import { useBoards } from "../../stores";
import { useRoute } from "vue-router";

const boards = useBoards();
const route = useRoute();
const emit = defineEmits(["open-task"]);

// Function to get the current board ID from the route
function getCurrentBoardId() {
  return Number(route.params.id);
}
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

// Simplified reactive reference for draggable component
// Using a simple reference without unnecessary deep reactivity
const columnTasks = computed({
  get() {
    return props.tasks;
  },
  set(value) {
    // Only proceed if we have changes, avoid unnecessary updates
    // This will be a no-op for the most part since we're handling events in onTaskChange
    // We're keeping this minimal to avoid reactivity loops
  },
});

// Handle changes when tasks are dragged between columns
// Debounced to prevent multiple rapid calls
let updateTimeout = null;
function onTaskChange(event) {
  // Clear any pending update to prevent multiple rapid calls
  if (updateTimeout) {
    clearTimeout(updateTimeout);
  }

  // Schedule a new update with a small delay
  updateTimeout = setTimeout(() => {
    const currentBoardId = getCurrentBoardId();

    if (event.added) {
      // A task was added to this column from another column
      const { element: task } = event.added;
      const destinationColumn = props.label;

      // Update the task status in the store
      boards.updateTaskStatus(currentBoardId, task.title, destinationColumn);
    } else if (event.moved) {
      // Task reordered within this column - we might want to update task order in the future
      // Currently, we don't track explicit order in the store
    }

    // Only patch once at the end of all operations
    // We don't need to patch for removed items since the destination column will handle it
    if (event.added || event.moved) {
      // Use requestAnimationFrame for better performance with UI updates
      requestAnimationFrame(() => {
        boards.$patch({});
      });
    }
  }, 50); // Small delay to batch operations
}

// Memoized helper function for better performance
const completedCache = new WeakMap();
function getCompleted(subtasks) {
  // Use caching for subtasks arrays we've already processed
  if (completedCache.has(subtasks)) {
    return completedCache.get(subtasks);
  }

  const completedCount = subtasks.filter((task) => task.isCompleted).length;
  completedCache.set(subtasks, completedCount);
  return completedCount;
}

// Simple length function - doesn't need optimization
function getSubtasksLength(subtasks) {
  return subtasks?.length || 0;
}
</script>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  justify-content: start;
  justify-self: start;
  gap: 32px; /* Increased from 20px for more space between tasks */
}

.circle {
  width: 15px;
  height: 15px;
  background-color: var(--color-blue); /* Changed from #49c4e5 */
  border-radius: 50%;
}

.desc {
  color: var(--text-color-body); /* Changed from #828fa3 */
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

/* Styling for the task list */
.task-list {
  width: 100%;
  min-height: 10px; /* Ensures there's always a drop area even when empty */
  display: flex;
  flex-direction: column;
  gap: 20px; /* Adding additional gap between task items */
}

/* Style for the ghost element (element being dragged) */
.sortable-ghost,
.ghost-card {
  opacity: 0.4;
  background-color: var(--background-subtle);
  border: 1px dashed var(--color-purple);
  border-radius: 8px;
  /* Use transform instead of box-shadow for better performance */
  transform: scale(0.98);
}

/* Style for the chosen element */
.sortable-chosen {
  cursor: grabbing;
  /* Use will-change to optimize for animation */
  will-change: transform;
}

/* Style for the drag element */
.sortable-drag {
  cursor: grabbing;
  /* Optimize with GPU acceleration */
  will-change: transform;
}
</style>
