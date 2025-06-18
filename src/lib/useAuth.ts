"use client";

import { useState, useEffect } from "react";
import { auth } from "./auth";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const isAuth = auth.isAuthenticated();

        setIsAuthenticated(isAuth);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);

    try {
      const result = await auth.login({ username, password });

      if (result.success) {
        setIsAuthenticated(true);
        return { success: true };
      }

      return { success: false, error: result.error };
    } catch {
      return {
        success: false,
        error: "An unexpected error occurred",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    auth.logout();
    setIsAuthenticated(false);
  };

  return {
    isLoading,
    isAuthenticated,
    login,
    logout,
  };
};
