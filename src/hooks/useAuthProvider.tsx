import { useState, useEffect, useCallback } from "react";
import { User, authAPI } from "../API/auth/api";
import { AuthContextType } from "../contexts/AuthContext";

export function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = useCallback(async (authToken: string) => {
    try {
      const response = await authAPI.getMe();
      if (response.success && response.data) {
        setUser(response.data.user);
      } else {
        localStorage.removeItem("authToken");
        setToken(null);
      }
    } catch (error) {
      localStorage.removeItem("authToken");
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      loadUser(storedToken);
    } else {
      setIsLoading(false);
    }
  }, [loadUser]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await authAPI.login({ email, password });
    if (!response.success || !response.data) {
      throw new Error(response.message || "Erreur lors de la connexion");
    }
    localStorage.setItem("authToken", response.data.token);
    setToken(response.data.token);
    setUser(response.data.user);
  }, []);

  const register = useCallback(
    async (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => {
      const response = await authAPI.register(data);
      if (!response.success || !response.data) {
        throw new Error(response.message || "Erreur lors de l'inscription");
      }
      localStorage.setItem("authToken", response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);
    },
    []
  );

  const loginWithGoogle = useCallback(async (code: string) => {
    const response = await authAPI.googleCallback(code);
    if (!response.success || !response.data) {
      throw new Error(response.message || "Erreur lors de la connexion Google");
    }
    localStorage.setItem("authToken", response.data.token);
    setToken(response.data.token);
    setUser(response.data.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (error) {
    } finally {
      localStorage.removeItem("authToken");
      setToken(null);
      setUser(null);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    if (token) {
      await loadUser(token);
    }
  }, [token, loadUser]);

  const isAuthenticated = !!user && !!token;

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    loginWithGoogle,
    logout,
    refreshUser,
  };
}
