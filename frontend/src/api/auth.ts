// api/auth.ts
import api from "./axios";

export const fetchMe = () => api.get("/auth/me");
export const loginUser = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);
export const logoutUser = () => api.post("/auth/logout");
export const registerUser = (data: { username: string; email: string; password: string }) =>
  api.post("/auth/register", data);
