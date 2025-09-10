import axios from "axios";
import { pushToast } from "../components/ToastHost";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1",
  timeout: 15000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor (π.χ. place for auth header later)
client.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor: ομοιόμορφα errors
client.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    const detail =
      error?.response?.data?.detail ||
      error?.response?.data?.message ||
      error?.message ||
      "Network error";

    if (status >= 500) {
      pushToast({ type: "danger", text: `Server error: ${detail}` });
    } else if (status >= 400) {
      pushToast({ type: "warning", text: detail });
    } else {
      pushToast({ type: "danger", text: detail });
    }

    return Promise.reject(error);
  }
);

export default client;
