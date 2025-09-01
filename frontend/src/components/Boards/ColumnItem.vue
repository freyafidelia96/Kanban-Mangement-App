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
        :empty-insert-threshold="20"
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

        <template #footer>
          <!-- This empty placeholder will always be present and ensure drop targets work in empty columns -->
          <div
            class="empty-column-placeholder"
            :class="{ 'is-empty': columnTasks.length === 0 }"
          ></div>
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
    // Always return the tasks array, even if empty
    return props.tasks || [];
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

    // Log all events for debugging
    console.log("Drag event:", event);
    console.log("Current column:", props.label);
    console.log("Column has tasks:", props.tasks.length);

    if (event.added) {
      // A task was added to this column from another column
      const { element: task } = event.added;
      const destinationColumn = props.label;

      console.log(
        `Task "${
          task.title
        }" dragged to column "${destinationColumn}" (Column was ${
          props.tasks.length === 1 ? "empty" : "not empty"
        } before)`
      );

      // Update the task status in the store
      boards.updateTaskStatus(currentBoardId, task.title, destinationColumn);

      // Force a refresh after a drag to empty column to ensure state is consistent
      if (props.tasks.length === 1) {
        console.log("Forcing refresh after drop to previously empty column");
        setTimeout(() => {
          boards.$patch({});
        }, 100);
      }
    } else if (event.moved) {
      // Task reordered within this column
      console.log("Task reordered within column:", props.label);
    } else if (event.removed) {
      // When a task is removed (dragged out)
      console.log("Task removed from column:", props.label);

      // Force column refresh if it's now empty
      if (props.tasks.length === 0) {
        setTimeout(() => {
          console.log("Column is now empty, forcing refresh");
          boards.$patch({});
        }, 100);
      }
    }

    // Only patch once at the end of all operations
    // We don't need to patch for removed items since the destination column will handle it
    if (event.added || event.moved || event.removed) {
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
  min-height: 200px; /* Ensure minimum height for empty columns */
  width: 100%; /* Ensure full width */
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
  min-height: 150px; /* Increased minimum height to ensure drop area is clearly visible */
  display: flex;
  flex-direction: column;
  gap: 20px; /* Adding additional gap between task items */
  padding-bottom: 20px; /* Add padding at the bottom to create space for dropping */
  position: relative; /* Positioning context for absolute positioning */
}

/* Empty column placeholder - creates an invisible but draggable area */
.empty-column-placeholder {
  width: 100%;
  min-height: 20px;
  border-radius: 8px;
  /* Basic size for all columns */
}

/* Taller placeholder when column is empty to create a larger drop target */
.empty-column-placeholder.is-empty {
  min-height: 120px;
  /* Add subtle style to help with debugging but invisible in production */
  /* border: 1px dotted rgba(0, 0, 0, 0.05); */
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
