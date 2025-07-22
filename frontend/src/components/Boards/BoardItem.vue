<template>
  <li class="sidebar__item">
    <img src="../../assets/images/icon-board.svg" alt="icon-board" />
    <router-link :to="props.boardLink" class="sidebar__link">
      {{ props.boardName }}
    </router-link>
  </li>
</template>

<script setup>

const props = defineProps({
  boardLink: {
    type: String,
    required: true,
  },
  boardName: {
    type: String,
    required: true,
  },
});


</script>

<style scoped>
.sidebar__item {
  display: flex;
  gap: 15px;
  padding-left: 32px;
  padding-block: 14px;
  align-items: flex-start;
}

.sidebar__item:hover:not(.active) {
  background-color: #635fc71a;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}

.sidebar__item:hover:not(.active) img,
.sidebar__item:hover:not(.active) a {
  filter: invert(35%) sepia(55%) saturate(7000%) hue-rotate(230deg)
    brightness(90%);
}

.sidebar__link {
  color: #828fa3;
  font-size: 15px;
  font-weight: 700;
}

.active {
  background-color: #635fc7;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}

.active img,
.active a {
  filter: invert(0%) brightness(200%);
}

a {
  text-decoration: none;
}
</style>
