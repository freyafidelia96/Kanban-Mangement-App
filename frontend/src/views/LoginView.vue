<template>
  <section>
    <div>
      <h1>Login in to your account</h1>
      <small>Log in to stay up-to-date on the latest tasks and updates.</small>
      <form @submit.prevent="handleSubmit">
        <label for="username">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          v-model="username"
        />
        <label for="password">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          v-model="password"
        />
        <base-button label="Login" btnType="submit"></base-button>
      </form>
      <small
        >Don't have an account?
        <span @click="handleRegister">Register!</span></small
      >
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");

function handleRegister() {
  router.push("/register");
}

function handleSubmit() {
  console.log("Form submitted:", {
    username: username.value,
    email: email.value,
    password: password.value,
  });
}
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background-image: url(../assets/images/jason-goodman-Oalh2MojUuk-unsplash.jpg);
  background-size: cover;
  background-position: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px 20px 30px 20px;
  background-color: var(--background-body);
  width: 500px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 20px 2px 20px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  width: 300px;
}

h1 {
  color: var(--text-color-heading);
  margin-bottom: 8px;
  font-weight: 500;
}

small {
  color: var(--text-color-body);
}

label {
  color: var(--text-color-heading);
  font-weight: 500;
}

input {
  padding: 8px;
  margin-bottom: 8px;
  border: 2px solid var(--color-lines-light); /* Changed from #e4ebfa */
  border-radius: 4px; /* Rounded corners */
  background-color: var(--background-sidebar); /* New variable */
  color: var(--text-color-heading); /* Text input color */
}

input:focus {
  outline: none;
  border-color: var(--color-purple); /* Changed from #635fc7 */
}

span {
  color: var(--color-purple);
  font-weight: 700;
  cursor: pointer;
}
</style>
