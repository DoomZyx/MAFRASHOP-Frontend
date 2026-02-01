import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "./useAdminAuth";
import { useAuth } from "./useAuth";
import { authAPI } from "../API/auth/api";

export const useAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleConfig, setGoogleConfig] = useState<{
    clientId: string;
    redirectUri: string;
  } | null>(null);
  
  const { login, loginWithGoogle, isAuthenticated, loading: adminLoading } = useAdminAuth();
  const { user: authUser } = useAuth();
  const navigate = useNavigate();

  // Charger la configuration Google
  useEffect(() => {
    const loadGoogleConfig = async () => {
      try {
        const response = await authAPI.getGoogleConfig();
        if (response.success) {
          setGoogleConfig(response.data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la config Google:", error);
      }
    };

    loadGoogleConfig();
  }, []);

  // Traiter le callback Google
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (code && state === "admin") {
      const processCallback = async () => {
        setLoading(true);
        setError("");
        try {
          await loginWithGoogle(code);
          window.history.replaceState({}, document.title, "/admin/login");
          setTimeout(() => {
            navigate("/admin", { replace: true });
          }, 200);
        } catch (err: any) {
          window.history.replaceState({}, document.title, "/admin/login");
          setError(err.message || "Erreur lors de l'authentification Google");
          setLoading(false);
        }
      };
      processCallback();
    }
  }, [loginWithGoogle, navigate]);

  // Rediriger si déjà authentifié
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    
    if (code && state === "admin") {
      return;
    }
    
    if (loading) {
      return;
    }
    
    if (!adminLoading && isAuthenticated) {
      navigate("/admin", { replace: true });
    } else if (authUser && authUser.role === "admin") {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, adminLoading, authUser, navigate, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      setTimeout(() => {
        navigate("/admin", { replace: true });
      }, 100);
    } catch (err: any) {
      setError(err.message || "Erreur de connexion");
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    if (!googleConfig) {
      setError("Configuration Google non disponible");
      return;
    }

    const { clientId, redirectUri } = googleConfig;

    if (!clientId || !redirectUri) {
      setError("Configuration Google incomplète");
      return;
    }

    const scope = "email profile";
    const state = "admin";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=${encodeURIComponent(
      scope
    )}&access_type=offline&prompt=consent&state=${encodeURIComponent(state)}`;

    window.location.href = authUrl;
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    googleConfig,
    authUser,
    handleSubmit,
    handleGoogleLogin,
  };
};
