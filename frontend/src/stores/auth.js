import { defineStore } from "pinia";
import { authService } from "../services/api";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useBoards } from "./boards";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const user = ref(authService.getUser());
  const token = ref(authService.getToken());
  const isLoading = ref(false);
  const error = ref(null);

  const isAuthenticated = computed(() => !!token.value);

  async function login(username, password) {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await authService.login(username, password);
      token.value = response.data.token;
      user.value = {
        username,
        id: response.data.user_id, // adjust based on your API response
      };

      // Store in localStorage
      authService.setToken(token.value);
      authService.setUser(user.value);

      // Try to fetch user's boards from backend
      const boardsStore = useBoards();
      await boardsStore.fetchUserBoards();

      // Redirect to the first board if it exists, otherwise to board/0
      if (boardsStore.getBoards.length > 0) {
        router.push(`/board/${boardsStore.getBoards[0].id}`);
      } else {
        router.push("/board/0"); // Default route for empty state
      }
      return true;
    } catch (err) {
      console.error("Login error:", err);
      error.value =
        err.response?.data?.non_field_errors?.[0] ||
        "Failed to login. Please check your credentials.";
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async function register(username, email, password) {
    isLoading.value = true;
    error.value = null;

    try {
      await authService.register(username, email, password);
      // After registration, login the user automatically
      return await login(username, password);
    } catch (err) {
      console.error("Registration error:", err);
      // Handle different error messages from the API
      if (err.response?.data) {
        const errors = err.response.data;
        const firstError = Object.values(errors)[0]?.[0];
        error.value = firstError || "Failed to register. Please try again.";
      } else {
        error.value = "Failed to register. Please try again.";
      }
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    token.value = null;
    user.value = null;
    authService.logout();
    router.push("/login");
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
  };
});
