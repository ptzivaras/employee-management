import axios from "axios";
import { pushToast } from "../components/ToastHost";

// Normalize base URL and strip trailing slashes
const baseURL =
  (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1")
    .replace(/\/+$/, "");

const client = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Optional interceptors (helpful to surface backend errors)
client.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    const detail =
      error?.response?.data?.detail ||
      error?.response?.data?.message ||
      (error?.response?.data?.fieldErrors &&
        Object.values(error.response.data.fieldErrors).join(", ")) ||
      error?.message ||
      "Network error";

    if (status >= 500) pushToast({ type: "danger", text: `Server error: ${detail}` });
    else if (status >= 400) pushToast({ type: "warning", text: detail });
    else pushToast({ type: "danger", text: detail });

    return Promise.reject(error);
  }
);

export default client;
