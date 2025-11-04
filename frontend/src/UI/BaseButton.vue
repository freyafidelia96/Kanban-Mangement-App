<template>
  <button :class="btnType" @click="handleClick">
    <slot name="icon"></slot>
    <span class="small-screen">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script setup>
const emit = defineEmits(["click"]);
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

function handleClick(event) {
  // forward native click event to parent components
  emit("click", event);
}
</script>

<style lang="css" scoped>
.new-task,
.new-column,
.new-s-c,
.save,
.delete,
.cancel,
.login,
.submit {
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
  width: 180px;
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

.submit {
  width: 262px;
}

.new-s-c span,
.save span,
.submit span,
.delete span,
.cancel span {
  display: inline !important;
  font-size: 13px;
  font-weight: bold;
}

.delete,
.login {
  background-color: var(--color-red) !important; /* Changed from #ea5555 */
  color: var(--color-white) !important; /* Changed from white */
}

.delete span,
.login span {
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

.login {
  width: 100px;
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
.save:hover,
.submit:hover {
  background-color: var(--color-purple-hover); /* Changed from #a8a4ff */
}

.delete:hover,
.login:hover {
  background-color: var(
    --color-red-hover
  ) !important; /* Changed from #ff9898 */
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

@media (max-width: 540px) {
  .new-s-c,
  .save {
    width: 270px;
  }

  .submit {
    width: 90%;
  }

  .delete,
  .cancel {
    width: 270px;
  }
}
</style>
