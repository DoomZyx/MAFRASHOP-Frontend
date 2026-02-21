import { useState, useEffect, useCallback } from "react";
import { User, authAPI } from "../API/auth/api";
import { AuthContextType } from "../contexts/AuthContext";

export function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const response = await authAPI.getMe();
      if (response.success && response.data) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Retour OAuth : traiter le callback ici (toujours monté), poser le cookie puis mettre à jour l'état
      (async () => {
        try {
          const response = await authAPI.googleCallback(code);
          if (response.success && response.data) {
            setUser(response.data.user);
          }
        } catch {
          setUser(null);
        } finally {
          setIsLoading(false);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      })();
      return;
    }

    loadUser();
  }, [loadUser]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await authAPI.login({ email, password });
    if (!response.success || !response.data) {
      throw new Error(response.message || "Erreur lors de la connexion");
    }
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
      setUser(response.data.user);
    },
    []
  );

  const loginWithGoogle = useCallback(async (code: string) => {
    const response = await authAPI.googleCallback(code);
    if (!response.success || !response.data) {
      throw new Error(response.message || "Erreur lors de la connexion Google");
    }
    setUser(response.data.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch {
      // ignore
    } finally {
      setUser(null);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    await loadUser();
  }, [loadUser]);

  const isAuthenticated = !!user;

  return {
    user,
    token: null,
    isLoading,
    isAuthenticated,
    login,
    register,
    loginWithGoogle,
    logout,
    refreshUser,
  };
}
