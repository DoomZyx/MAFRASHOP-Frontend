import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../API/config";
import { useAuth } from "./useAuth";

interface AdminUser {
  id: string;
  email: string;
  isAdmin: boolean;
}

export const useAdminAuth = () => {
  const { user: authUser, token: authToken, isLoading: authLoading } = useAuth();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Attendre que l'authentification normale soit chargée
    if (authLoading) {
      return;
    }
    checkAdminAuth();
  }, [authUser, authToken, authLoading]);

  const checkAdminAuth = async () => {
    try {
      // Si l'utilisateur est connecté via Google/local et a le rôle admin, utiliser ce token
      if (authUser && authUser.role === "admin" && authToken) {
        // Vérifier que le token est valide et que l'utilisateur est toujours admin
        const response = await fetch(`${API_BASE_URL}/api/auth/admin/check`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
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

      // Sinon, vérifier le adminToken
      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) {
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/admin/me`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setAdminUser(user);
      } else {
        localStorage.removeItem("adminToken");
      }
    } catch (error) {
      console.error("Erreur vérification admin:", error);
      localStorage.removeItem("adminToken");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur de connexion");
      }

      const data = await response.json();
      if (data.success && data.token) {
        localStorage.setItem("adminToken", data.token);
        setAdminUser(data.user);
        return data;
      } else {
        throw new Error(data.message || "Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur connexion admin:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdminUser(null);
    // Si l'utilisateur était connecté via Google/local, ne pas le déconnecter complètement
    // Juste rediriger vers la page admin login
    navigate("/admin/login");
  };

  return {
    adminUser,
    loading,
    login,
    logout,
    isAuthenticated: !!adminUser,
  };
};

