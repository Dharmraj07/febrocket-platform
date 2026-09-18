import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://febrocket-api-gateway-441625071558.asia-south1.run.app";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== "undefined") {
      const url = error?.config?.url || "";
      const storedUser = getStoredUser();

      if (storedUser && url.includes("/api/auth/me")) {
        return Promise.resolve({
          data: {
            success: true,
            user: storedUser,
          },
        });
      }
    }

    return Promise.reject(error);
  }
);

export function getStoredUser() {
  if (typeof window === "undefined") return null;

  try {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;

    const parsedUser = JSON.parse(storedUser);
    return parsedUser && typeof parsedUser === "object" ? parsedUser : null;
  } catch (error) {
    console.error("Failed to parse stored user:", error);
    localStorage.removeItem("user");
    return null;
  }
}

export function setStoredUser(user) {
  if (typeof window === "undefined") return;

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
  if (typeof window === "undefined") return;

  localStorage.removeItem("user");
}

export function safeAuthError(error, fallbackMessage) {
  if (!error) return fallbackMessage;

  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.request) {
    return "Unable to connect to the server. Please try again.";
  }

  return error.message || fallbackMessage;
}

export function isUserPayloadValid(user) {
  return !!user && typeof user === "object" && (user.userName || user.email || user.id);
}
