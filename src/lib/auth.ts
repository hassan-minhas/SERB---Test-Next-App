import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const TOKEN_KEY = "authToken";
const REFRESH_TOKEN_KEY = "refreshToken";

const getTokens = () => {
  if (typeof window === "undefined") return { token: null, refreshToken: null };

  return {
    token: localStorage.getItem(TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  };
};

const setTokens = (token: string, refreshToken?: string) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(TOKEN_KEY, token);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

const clearAuthData = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const auth = {
  login: async (credentials: { username: string; password: string }) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const { token, refreshToken } = response.data;

      setTokens(token, refreshToken);

      return { success: true, data: response.data };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Login failed";
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  logout: () => {
    clearAuthData();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  },

  isAuthenticated: () => {
    const { token } = getTokens();
    return !!token;
  },

  getToken: () => {
    const { token } = getTokens();
    return token;
  },

  refreshToken: async () => {
    const { refreshToken } = getTokens();

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token: newToken, refreshToken: newRefreshToken } = response.data;
      setTokens(newToken, newRefreshToken);

      return { success: true, token: newToken };
    } catch (error: unknown) {
      clearAuthData();
      const errorMessage =
        error instanceof Error && "response" in error
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (error as any).response?.data?.message
          : "Token refresh failed";
      return {
        success: false,
        error: errorMessage,
      };
    }
  },
};

export default api;
