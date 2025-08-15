import axios from "axios";
const { VITE_BACKEND_URL } = import.meta.env;

const axiosInstance = axios.create({
  baseURL: VITE_BACKEND_URL, // Set the base URL here
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Check for admin token first (higher priority)
    const adminToken = localStorage.getItem("token");
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
      return config;
    }

    // Check for citizen token as fallback
    const citizenToken = localStorage.getItem("citizenToken");
    if (citizenToken) {
      config.headers.Authorization = `Bearer ${citizenToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
