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
.new-column,
.new-s-c,
.save,
.delete,
.cancel {
  background-color: var(--color-purple); /* Changed from #635fc7 */
  border-radius: 28px;
  font-size: 15px;
  font-weight: bold;
  color: var(--color-white); /* Changed from white */
  padding-block: 15px;
  padding-inline: 15px;
  border: none;
  display: flex;
  gap: 5px;
  width: 175px;
  align-items: center;
  justify-content: center;
}

.new-s-c,
.save {
  width: 416px;
  color: var(--color-purple); /* Changed from #635fc7 */
  background-color: var(
    --color-purple-hover-transparent
  ); /* Changed from #635fc71a */
  padding-block: 10px;
}
.new-s-c span,
.save span,
.delete span,
.cancel span {
  display: inline !important;
  font-size: 13px;
  font-weight: bold;
}

.delete {
  background-color: var(--color-red) !important; /* Changed from #ea5555 */
  color: var(--color-white) !important; /* Changed from white */
}

.delete span {
  color: var(--color-white); /* Changed from white */
}

.cancel span {
  color: var(--color-purple); /* Changed from #635fc7 */
}

.delete,
.cancel {
  width: 200px;
  padding-block: 12px;
}

.cancel {
  background-color: var(
    --color-purple-hover-transparent
  ); /* Changed from #635fc71a */
}

.save {
  background-color: var(--color-purple); /* Changed from #635fc7 */
  color: var(--color-white); /* Changed from white */
  margin-top: 25px;
}

button {
  cursor: pointer;
}

.new-task:hover,
.new-column:hover,
.save:hover {
  background-color: var(--color-purple-hover); /* Changed from #a8a4ff */
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
