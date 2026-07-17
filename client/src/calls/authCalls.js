import axios from "axios";
import { API_BASE_URL } from "./config.js";
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const register = async (values) => {
  try {
    const response = await api.post("/api/auth/register", values);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Registration failed",
    };
  }
};
export const login = async (values) => {
  try {
    const response = await api.post("/api/auth/login", values);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Login failed",
    };
  }
};
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/api/auth/current-user",{withCredentials:true});
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch current user",
    };
  }
};
