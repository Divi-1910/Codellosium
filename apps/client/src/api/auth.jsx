import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await api.post("/auth/refresh");
    return response.data;
  } catch (error) {
    console.error(
      "Refresh token error:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

export const logoutUser = async () => {
  try {
    await api.post("/auth/logout");
    return true;
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
