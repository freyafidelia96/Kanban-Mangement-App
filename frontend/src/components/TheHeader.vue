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
        <div class="board-name">Platform Launch</div>
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
        <img
          src="../assets/images/icon-vertical-ellipsis.svg"
          alt="icon-vertical-ellipsis"
        />
      </div>
    </header>
  </div>
</template>

<script setup></script>

<style scoped>
.board-name {
  font-size: 25px;
  color: #000112;
  font-weight: 900;
  padding-inline-start: 36px;
  padding-block: 31px;
  line-height: auto;
  letter-spacing: 0px;
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

@media (max-width: 1023px) {
  .board-name {
    padding-inline-start: 15px;
    margin: 0;
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

  .board-name {
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
  }

  .desc {
    align-items: center;
  }

  .actions {
    gap: 15px;
  }
}
</style>
