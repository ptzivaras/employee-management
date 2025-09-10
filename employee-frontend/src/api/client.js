import axios from "axios";

// Base URL from Vite .env, with a sensible default
const baseURL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ||
  "http://localhost:8080/api/v1";

const client = axios.create({
  baseURL,
  // You can add headers here if needed
  // headers: { 'Content-Type': 'application/json' }
});

// NOTE: Interceptors (auth, global errors) will be introduced in a later commit.
export default client;
