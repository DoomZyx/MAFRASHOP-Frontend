import { useState, useEffect } from "react";
import { AuthContext, AuthProviderProps } from "../contexts/AuthContext";
import { authAPI, User } from "../API/auth/api";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        try {
          const response = await authAPI.getMe();
          if (response.success) {
            setUser(response.data.user);
            setToken(storedToken);
          } else {
            localStorage.removeItem("authToken");
            setToken(null);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération du profil:", error);
          localStorage.removeItem("authToken");
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      
      if (!response.success || !response.data) {
        throw new Error(response.message || "Erreur de connexion");
      }

      const { user: userData, token: authToken } = response.data;
      setUser(userData);
      setToken(authToken);
      localStorage.setItem("authToken", authToken);
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      const response = await authAPI.register(data);
      
      if (!response.success || !response.data) {
        throw new Error(response.message || "Erreur d'inscription");
      }

      const { user: userData, token: authToken } = response.data;
      setUser(userData);
      setToken(authToken);
      localStorage.setItem("authToken", authToken);
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      throw error;
    }
  };

  const loginWithGoogle = async (code: string) => {
    try {
      const response = await authAPI.googleCallback(code);
      
      if (!response.success || !response.data) {
        throw new Error(response.message || "Erreur d'authentification Google");
      }

      const { user: userData, token: authToken } = response.data;
      setUser(userData);
      setToken(authToken);
      localStorage.setItem("authToken", authToken);
    } catch (error) {
      console.error("Erreur lors de l'authentification Google:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    authAPI.logout().catch((error) => {
      console.error("Erreur lors de la déconnexion:", error);
    });
  };

  const refreshUser = async () => {
    try {
      const response = await authAPI.getMe();
      if (response.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Erreur lors du rafraîchissement du profil:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        login,
        register,
        loginWithGoogle,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


