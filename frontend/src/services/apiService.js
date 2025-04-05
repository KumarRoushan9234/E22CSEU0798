import axios from "axios";

const apiService = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, 
  headers: { "Content-Type": "application/json" },
});

apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("🔴 Unauthorized! Redirecting to login...");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default apiService;
