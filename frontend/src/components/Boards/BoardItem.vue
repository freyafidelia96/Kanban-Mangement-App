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
  background-color: var(
    --color-purple-hover-transparent
  ); /* Replaced #635fc71a with a theme variable */
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}

.sidebar__item:hover:not(.active) img,
.sidebar__item:hover:not(.active) a {
  /* This filter was a hardcoded purple. We can achieve this with a color variable.
     Assuming your SVG icon can inherit color via `fill: currentColor`,
     and the `a` tag's color is what you want to change.
     Let's use a color variable instead of the filter. */
  color: var(--color-purple);
}

.sidebar__link {
  color: var(--text-color-body); /* Replaced #828fa3 with theme variable */
  font-size: 15px;
  font-weight: 700;
}

.active {
  background-color: var(
    --color-purple
  ); /* Replaced #635fc7 with theme variable */
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}

.active img,
.active a {
  /* This filter inverts to white, which is what is needed for dark backgrounds.
     This can be kept as it is effective for both themes.
     The `a` tag's color should also be set to white in the active state. */
  filter: invert(0%) brightness(200%);
  color: var(
    --color-white
  ); /* Added this to ensure text is white in active state */
}

a {
  text-decoration: none;
}
</style>
