<template>
  <div
    :style="{ paddingLeft: padding + 'px' }"
    :class="[
      'board-view',
      {
        'board-view--empty': board.columns.length === 0,
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
        ></column-item>
        <div class="new-column">
          <button>+ New column</button>
        </div>
      </div>
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
import { useBoards, useMode } from "../stores";
import { computed } from "vue";
import { useRoute } from "vue-router";
import ColumnItem from "../components/Boards/ColumnItem.vue";

const boards = useBoards();
const mode = useMode();
const route = useRoute();
const boardId = computed(() => Number(route.params.id));
const palette = ["#49C4E5", "#8471F2", "#67E2AE"];

const board = computed(() => {
  return (
    boards.getBoards.find((board) => board.id === boardId.value) ?? {
      id: null,
      name: "",
      columns: [
        {
          name: "",
          tasks: [
            {
              title: "",
              description: "",
              status: "",
              subtasks: [
                {
                  title: "",
                  isCompleted: null,
                },
              ],
            },
          ],
        },
      ],
    }
  );
});

const sidebarVisible = computed(() => mode.getSidebarVisibility);
const padding = computed(() => (sidebarVisible.value ? 320 : 20));
</script>

<style scoped>
.new-column {
  height: 100vh;
  background-color: #e4ebfa;
  margin-top: 50px;
  width: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.new-column button {
  background-color: transparent;
  border: none;
  color: #828fa3;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.noSidebar {
  padding-left: 320px;
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
  color: #828fa3;
  font-weight: 600;
  font-size: 18px;
}

.board-view {
  /* default: stretch to fill horizontally, let content define height */
  width: 100%;
  display: block;
  padding-bottom: 60px;
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
}

/* for non-empty, lay out columns in a row */
.board-view .columns {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  align-items: flex-start;
}

@media (max-width: 766px) {
  .board-view {
    padding-left: 20px !important;
  }
}
</style>
