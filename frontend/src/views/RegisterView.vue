<template>
  <section>
    <div>
      <h1>Register your account</h1>
      <small
        >Get started today and stay up-to-date with latest tasks and
        updates.</small
      >
      <form @submit.prevent="handleSubmit">
        <label for="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          v-model="username"
          :disabled="isSubmitting"
          autocomplete="username"
          required
        />
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          v-model="email"
          :disabled="isSubmitting"
          autocomplete="email"
          required
        />
        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          v-model="password"
          :disabled="isSubmitting"
          autocomplete="new-password"
          required
        />
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <base-button
          :label="isSubmitting ? 'Registering...' : 'Register'"
          btnType="submit"
          :disabled="isSubmitting"
        ></base-button>
      </form>
      <small>
        Already have an account?
        <span @click="handleLogin">Login!</span>
      </small>
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
const email = ref("");
const password = ref("");
const isSubmitting = ref(false);
const errorMessage = ref("");

function handleLogin() {
  router.push("/login");
}

async function handleSubmit() {
  if (!username.value || !email.value || !password.value) {
    errorMessage.value = "Please fill in all fields";
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    const success = await auth.register(
      username.value,
      email.value,
      password.value
    );
    if (!success) {
      errorMessage.value = auth.error;
    }
  } catch (error) {
    console.error("Registration error:", error);
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
  margin-top: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: clamp(15px, 5%, 20px) clamp(15px, 5%, 20px) clamp(20px, 5%, 30px)
    clamp(15px, 5%, 20px);
  background-color: var(--background-body);
  width: 90%;
  max-width: 500px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: clamp(15px, 5%, 20px) clamp(15px, 5%, 20px) 6px clamp(15px, 5%, 20px);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  width: 100%;
  max-width: 340px;
}

h1 {
  color: var(--text-color-heading);
  margin-bottom: 8px;
  font-weight: 600;
}

small {
  color: var(--text-color-body);
  text-align: center;
  padding-inline: 35px;
}

label {
  color: var(--text-color-heading);
  font-weight: 500;
  font-size: clamp(12px, 2.5vw, 14px);
  margin-bottom: 6px;
}

input {
  padding: 8px 12px;
  margin-bottom: 8px;
  border: 2px solid var(--color-lines-light); /* Changed from #e4ebfa */
  border-radius: 4px; /* Rounded corners */
  background-color: var(--background-sidebar); /* New variable */
  color: var(--text-color-heading); /* Text input color */
  font-weight: 400;
  width: 100%;
  font-size: clamp(13px, 3vw, 15px);
  height: 40px;
}

input:focus {
  outline: none;
  border-color: var(--color-purple); /* Changed from #635fc7 */
}

span {
  color: var(--color-purple);
  font-weight: 700;
  cursor: pointer;
  font-size: clamp(13px, 3vw, 15px);
}

.error-message {
  color: #ea5555;
  font-size: clamp(12px, 2.5vw, 14px);
  margin: 8px 0;
  text-align: center;
  padding: 8px;
  background-color: rgba(234, 85, 85, 0.1);
  border-radius: 4px;
  width: 100%;
}

/* Button styling for better mobile touch targets */
:deep(.btn) {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: clamp(8px, 2vw, 12px) clamp(16px, 4vw, 24px);
  font-size: clamp(13px, 3vw, 15px);
  min-height: 40px;
  width: 100%;
  touch-action: manipulation;
}

/* Media queries for responsiveness */
@media (max-width: 480px) {
  div {
    width: 95%;
    margin-top: 20px;
    padding: 15px 15px 25px 15px;
  }

  form {
    padding: 15px 15px 6px 15px;
  }

  section {
    padding: 10px 5px;
  }

  input {
    height: 38px;
    padding: 6px 10px;
  }

  :deep(.btn) {
    padding: 10px 16px;
    min-height: 44px; /* Larger touch target for mobile */
  }
}

@media (max-width: 320px) {
  div {
    width: 98%;
    padding: 12px 12px 20px 12px;
  }

  form {
    padding: 12px 12px 6px 12px;
  }

  small {
    padding-inline: 10px;
  }
}
</style>
