
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://backend.febrocket.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/*
 * Authentication is handled by the backend using
 * HTTP-only cookies.
 *
 * IMPORTANT:
 * Do NOT convert a 401 from /api/auth/me into a
 * successful localStorage response.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("[API auth] Request failed", {
      method: error.config?.method?.toUpperCase() || null,
      endpoint: error.config?.url || null,
      status: error.response?.status || null,
      code: error.code || null,
      message: error.message,
      hasResponse: Boolean(error.response),
      hasRequest: Boolean(error.request),
    });
    return Promise.reject(error);
  }
);

export function getStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    const parsedUser = JSON.parse(storedUser);

    return parsedUser && typeof parsedUser === "object"
      ? parsedUser
      : null;
  } catch (error) {
    console.error("Failed to parse stored user:", error);

    localStorage.removeItem("user");

    return null;
  }
}

export function setStoredUser(user) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (!user) {
      localStorage.removeItem("user");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Failed to save user:", error);
  }
}

export function clearStoredUser() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("user");
}

export function safeAuthError(error, fallbackMessage) {
  if (!error) {
    return fallbackMessage;
  }

  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.request) {
    return "Unable to connect to the server. Please try again.";
  }

  return error.message || fallbackMessage;
}

export function isUserPayloadValid(user) {
  return (
    !!user &&
    typeof user === "object" &&
    !!(user.userName || user.name || user.email || user.id)
  );
}
