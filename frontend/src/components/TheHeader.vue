<template>
  <div class="header-wrapper">
    <header>
      <div class="desc">
        <div class="logo">
          <img
            src="../assets/images/logo-dark.svg"
            alt="logo-dark"
            class="big-screen"
          />
          <img
            src="../assets/images/logo-mobile.svg"
            alt="logo-mobile"
            class="small-screen"
          />
        </div>
        <div :class="{ boardName: true, padding: view }">Platform Launch</div>
      </div>
      <div class="actions">
        <div class="btn-add-new-task">
          <base-button label="Add New Task">
            <template #icon>
              <img
                class="add"
                src="../assets/images/icon-add-task-mobile.svg"
                alt="add"
              />
            </template>
          </base-button>
        </div>
        <div class="board-menu">
          <button class="dots">
            <img
              src="../assets/images/icon-vertical-ellipsis.svg"
              alt="icon-vertical-ellipsis"
            />
          </button>
          <div class="editBoard">
            <button class="edit">Edit Board</button>
            <button class="delete">Delete Board</button>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { inject } from "vue";
const view = inject("view");
</script>

<style scoped>
.boardName {
  font-size: 25px;
  color: #000112;
  font-weight: 700;
  padding-inline-start: 100px;
  padding-block: 31px;
  letter-spacing: 0px;
}

.padding {
  padding-inline-start: 32px;
}

.logo {
  padding-inline-end: 36px;
  border-right: #e4ebfa solid 1px;
  padding-block: 31px;
}

header {
  display: flex;
  height: 100px;
  background-color: white;
  justify-content: space-between;
  padding-inline: 34px;
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  z-index: 1;
}

.add {
  width: 10px;
  height: 10px;
}

.desc {
  display: flex;
}

.actions {
  display: flex;
  align-items: center;
  gap: 30px;
}

.actions > img {
  width: 6px;
  height: 24px;
}

.small-screen {
  display: none;
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
  right: 5px;
  top: 60px;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
}

.editBoard .edit {
  color: #828fa3;
}

.editBoard .delete {
  color: #ea5555;
}

.board-menu:hover .editBoard {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 14px;
}

@media (max-width: 1023px) {
  .boardName {
    padding-inline-start: 70px;
    margin: 0;
  }

  .padding {
    padding-inline-start: 22px;
  }

  .logo {
    padding-inline-end: 20px;
    margin: 0;
  }

  header {
    padding-inline: 20px;
  }

  .actions {
    gap: 15px;
  }
}

@media (max-width: 767px) {
  .small-screen {
    display: inline;
  }

  .big-screen {
    display: none;
  }

  .boardName {
    padding-inline-start: 5px;
    padding-block: 0;
    margin: 0;
  }

  .logo {
    padding-inline-end: 10px;
    border: none;
    padding-block: 0;
    margin: 0;
  }

  header {
    padding-inline: 20px;
    height: 70px;
  }

  .desc {
    align-items: center;
  }

  .actions {
    gap: 15px;
  }
}
</style>
