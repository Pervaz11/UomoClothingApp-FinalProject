import axios from "axios";
import { API_BASE_URL } from "./api";

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: {
    "api-key": "code_academy",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Token alma funksiyası
const getAccessToken = (): string | null => {
  try {
    const stored = localStorage.getItem("token");
    if (!stored) return null;

    return stored.replace(/^"|"$/g, "");
  } catch {
    return null;
  }
};

// Request interceptor
instance.interceptors.request.use(
  function (config) {
    const token = getAccessToken();
    if (token && config.headers) {
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
