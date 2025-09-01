import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "https://kanban-mangement-app.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
// to include auth token for protected routes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  login(username, password) {
    return api.post("/login/", { username, password });
  },
  register(username, email, password) {
    return api.post("/register/", { username, email, password });
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
  setToken(token) {
    localStorage.setItem("token", token);
  },
  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  },
  getToken() {
    return localStorage.getItem("token");
  },
  getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
  isAuthenticated() {
    return !!this.getToken();
  },
};

// Export the API instance for other services to use
export default api;
