// src/services/apiService.js
import axios from "axios";

const apiService = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Allows sending cookies
  headers: { "Content-Type": "application/json" },
});

// Interceptor to handle 401 (Unauthorized) globally
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("🔴 Unauthorized! Redirecting to login...");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default apiService;
