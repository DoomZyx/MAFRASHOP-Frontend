import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../API/config";
import { useAuth } from "./useAuth";
import { authAPI } from "../API/auth/api";

interface AdminUser {
  id: string;
  email: string;
  isAdmin: boolean;
}

export const useAdminAuth = () => {
  const { user: authUser, isLoading: authLoading } = useAuth();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;
    checkAdminAuth();
  }, [authUser, authLoading]);

  const checkAdminAuth = async () => {
    try {
      if (authUser && authUser.role === "admin") {
        const response = await fetch(`${API_BASE_URL}/api/auth/admin/check`, {
          credentials: "include",
        });
        if (response.ok) {
          setAdminUser({
            id: authUser.id,
            email: authUser.email,
            isAdmin: true,
          });
          setLoading(false);
          return;
        }
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/admin/me`, {
        credentials: "include",
      });
      if (response.ok) {
        const user = await response.json();
        setAdminUser(user);
      }
    } catch (error) {
      console.error("Erreur vérification admin:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur de connexion");
    }

    const data = await response.json();
    if (data.success && data.user) {
      setAdminUser(data.user);
      return data;
    }
    throw new Error(data.message || "Erreur de connexion");
  };

  const loginWithGoogle = async (code: string) => {
    const response = await authAPI.adminGoogleCallback(code);
    if (!response.success || !response.user) {
      throw new Error(response.message || "Erreur lors de la connexion Google");
    }
    setAdminUser(response.user);
    return response;
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch {
      // ignore
    }
    setAdminUser(null);
    navigate("/admin/login");
  };

  return {
    adminUser,
    loading,
    login,
    loginWithGoogle,
    logout,
    isAuthenticated: !!adminUser,
  };
};

