import axios from "axios";
import { getToken } from "../utils/helpers/auth/auth";

const api = axios.create({
  baseURL: "https://grabit-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
