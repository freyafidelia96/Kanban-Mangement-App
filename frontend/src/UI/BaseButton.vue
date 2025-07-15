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
.new-task {
  background-color: #635fc7;
  border-radius: 28px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  padding-block: 17px;
  padding-inline: 24px;
  border: none;
  display: flex;
  gap: 5px;
  width: 204px;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1023px) {
  .new-task {
    width: 180px;
    padding-inline: 10px;
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
