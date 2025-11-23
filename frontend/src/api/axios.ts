// api/axios.ts
import axios from "axios";
import { useAuthStore } from "../store/authstore";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // If request is to refresh or logout, reject immediately
    if (
      original.url?.includes("/auth/refresh") ||
      original.url?.includes("/auth/logout")
    ) {
      return Promise.reject(error);
    }

    // Retry 401 errors only once
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        // Prevent multiple refresh calls at the same time
        return Promise.reject(error);
      }

      isRefreshing = true;

      try {
        // Attempt to refresh the token
        await api.post("/auth/refresh");
        isRefreshing = false;

        // Retry the original request
        return api(original);
      } catch (err) {
        console.log(err)
        isRefreshing = false;

        // Only logout if the original request was NOT /me
        if (!original.url?.includes("/auth/me")) {
          await useAuthStore.getState().logout();
        }

        return Promise.reject(
          new axios.Cancel("Session expired or refresh failed.")
        );
      }
    }

    return Promise.reject(error);
  }
);

export default api;
