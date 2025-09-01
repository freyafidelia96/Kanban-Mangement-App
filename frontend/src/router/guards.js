import { authService } from "../services/api";

// Navigation guard to check if user is authenticated
export function requireAuth(to, from, next) {
  if (!authService.isAuthenticated()) {
    // User is not authenticated, redirect to login
    return next({
      path: "/login",
      query: { redirect: to.fullPath }, // Store the path they were trying to access
    });
  }

  // User is authenticated, proceed
  next();
}

// Navigation guard to redirect authenticated users away from auth pages
export function redirectIfAuthenticated(to, from, next) {
  if (authService.isAuthenticated()) {
    // User is authenticated, redirect to boards
    return next("/board/0");
  }

  // User is not authenticated, proceed to auth page
  next();
}
