import axios from "axios";
const { VITE_BACKEND_URL } = import.meta.env;

const publicAxios = axios.create({
   baseURL: VITE_BACKEND_URL || "http://localhost:3001", // backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicAxios;
