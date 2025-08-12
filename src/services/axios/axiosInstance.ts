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
    // Add token to headers if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
