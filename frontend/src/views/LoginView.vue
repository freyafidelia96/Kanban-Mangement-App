<template>
  <section>
    <div>
      <h1>Login to your account</h1>
      <small>Log in to stay up-to-date on the latest tasks and updates.</small>
      <form @submit.prevent="handleSubmit">
        <label for="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          v-model="username"
          :disabled="isSubmitting"
          autocomplete="username"
        />
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          v-model="password"
          :disabled="isSubmitting"
          autocomplete="current-password"
        />
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <base-button
          :label="isSubmitting ? 'Logging in...' : 'Login'"
          btnType="submit"
          :disabled="isSubmitting"
        ></base-button>
      </form>
      <small class="register-prompt"
        >Don't have an account?
        <span @click="handleRegister">Register!</span></small
      >
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores";

const router = useRouter();
const auth = useAuthStore();
const username = ref("");
const password = ref("");
const isSubmitting = ref(false);
const errorMessage = ref("");

function handleRegister() {
  router.push("/register");
}

async function handleSubmit() {
  if (!username.value || !password.value) {
    errorMessage.value = "Please enter both username and password";
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    const success = await auth.login(username.value, password.value);
    if (!success) {
      errorMessage.value = auth.error;
    }
  } catch (error) {
    console.error("Login error:", error);
    errorMessage.value = "An unexpected error occurred. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  height: 100%;
  background-image: url(../assets/images/jason-goodman-Oalh2MojUuk-unsplash.jpg);
  background-size: cover;
  background-position: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px 10px;
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
  width: 90%;
  max-width: 500px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 20px 6px 20px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  width: 100%;
  max-width: 300px;
}

h1 {
  color: var(--text-color-heading);
  margin-bottom: 8px;
  font-weight: 600;
  font-size: clamp(1.5rem, 4vw, 2rem);
  text-align: center;
}

small {
  color: var(--text-color-body);
  text-align: center;
  margin-bottom: 15px;
}

label {
  color: var(--text-color-heading);
  font-weight: 500;
  align-self: flex-start;
  margin-top: 5px;
  font-size: 0.9rem;
}

input {
  padding: 12px 10px;
  margin-bottom: 8px;
  border: 2px solid var(--color-lines-light); /* Changed from #e4ebfa */
  border-radius: 4px; /* Rounded corners */
  background-color: var(--background-sidebar); /* New variable */
  color: var(--text-color-heading); /* Text input color */
  font-weight: 100;
  width: 100%;
  font-size: 16px; /* Better default size for mobile */
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

.register-prompt {
  margin-top: 15px;
}

.error-message {
  color: #ea5555;
  font-size: 14px;
  margin: 8px 0;
  text-align: center;
  padding: 8px;
  background-color: rgba(234, 85, 85, 0.1);
  border-radius: 4px;
  width: 100%;
}

/* Media Queries for Responsive Design */
@media screen and (max-width: 480px) {
  div {
    margin-top: 30px;
    padding: 15px 15px 20px 15px;
  }

  form {
    padding: 15px 15px 6px 15px;
  }

  h1 {
    font-size: 1.4rem;
  }

  small {
    font-size: 0.85rem;
  }

  input {
    padding: 10px;
    font-size: 16px; /* Prevent zoom on mobile */
  }
}

@media screen and (max-height: 600px) {
  section {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  div {
    margin-top: 15px;
  }
}
</style>
