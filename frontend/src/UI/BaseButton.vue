<template>
  <button :class="btnType">
    <slot name="icon"></slot>
    <span class="small-screen">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  btnType: {
    type: String,
    default: "new-task",
  },
});
</script>

<style lang="css" scoped>
.new-task,
.new-column {
  background-color: #635fc7;
  border-radius: 28px;
  font-size: 15px;
  font-weight: bold;
  color: white;
  padding-block: 15px;
  padding-inline: 15px;
  border: none;
  display: flex;
  gap: 5px;
  width: 175px;
  align-items: center;
  justify-content: center;
}

button {
  cursor: pointer;
}

.new-task:hover,
.new-column:hover {
  background-color: #a8a4ff;
}

@media (max-width: 1023px) {
  .new-task {
    width: 170px;
    padding-inline: 8px;
  }
}

@media (max-width: 766px) {
  .small-screen {
    display: none;
  }

  .new-task {
    padding-inline: 10px;
    width: 50px;
  }
}
</style>
