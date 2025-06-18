import axios, { AxiosError } from "axios";
import { User } from "@/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const TOKEN_KEY = "authToken";
const REFRESH_TOKEN_KEY = "refreshToken";

const tokenManager = {
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setTokens: (accessToken: string, refreshToken: string): void => {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  clearTokens: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  isTokenValid: (): boolean => {
    const token = tokenManager.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  },
};

api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async () => {
    // refresh token logic goes here
  }
);

export const authService = {
  async login(credentials: { username: string; password: string }) {
    try {
      const response = await api.post("/auth/login", credentials);
      const { accessToken, refreshToken } = response.data;

      tokenManager.setTokens(accessToken, refreshToken);

      return {
        success: true,
        token: accessToken,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Login failed";
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  async logout() {
    tokenManager.clearTokens();

    window.location.href = "/login";
  },

  isAuthenticated(): boolean {
    return tokenManager.isTokenValid();
  },

  getToken(): string | null {
    return tokenManager.getToken();
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error: unknown) {
      console.error("Failed to get user data:", error);
      return null;
    }
  },

  async refreshToken(): Promise<{
    success: boolean;
    error?: string;
    token?: string;
  }> {
    try {
      const refreshToken = tokenManager.getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
        { refreshToken }
      );

      const { accessToken, refreshToken: newRefreshToken } = response.data;
      tokenManager.setTokens(accessToken, newRefreshToken);

      return {
        success: true,
        token: accessToken,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      tokenManager.clearTokens();

      const errorMessage =
        error?.response?.data?.message || "Token refresh failed";
      return {
        success: false,
        error: errorMessage,
      };
    }
  },
};

export default api;
