import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAuth } from "./useAuth";
import { authAPI } from "../API/auth/api";

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export function useAuthModal(onClose: () => void) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [googleConfig, setGoogleConfig] = useState<{
    clientId: string;
    redirectUri: string;
  } | null>(null);

  const { login, register, loginWithGoogle } = useAuth();

  useEffect(() => {
    const loadGoogleConfig = async () => {
      try {
        const response = await authAPI.getGoogleConfig();
        if (response.success) {
          setGoogleConfig(response.data);
        } else {
          console.error("Config non réussie:", response);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la config Google:", error);
      }
    };

    loadGoogleConfig();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const processCallback = async () => {
        setIsLoading(true);
        try {
          await loginWithGoogle(code);
          onClose();
        } catch (err: any) {
          setError(err.message || "Erreur lors de l'authentification Google");
        } finally {
          setIsLoading(false);
        }
      };
      processCallback();
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [loginWithGoogle, onClose]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (mode === "login") {
        await login(formData.email, formData.password);
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
      }
      onClose();
    } catch (err: any) {
      setError(
        err.message ||
          (mode === "login"
            ? "Erreur lors de la connexion"
            : "Erreur lors de l'inscription")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("handleGoogleLogin - googleConfig:", googleConfig);

    if (!googleConfig) {
      setError("Configuration Google non disponible");
      return;
    }

    const { clientId, redirectUri } = googleConfig;

    if (!clientId || !redirectUri) {
      setError("Configuration Google incomplète");
      console.error(
        "Config incomplète - clientId:",
        clientId,
        "redirectUri:",
        redirectUri
      );
      return;
    }

    const scope = "email profile";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=${encodeURIComponent(
      scope
    )}&access_type=offline&prompt=consent`;

    console.log("Auth URL:", authUrl);
    window.location.href = authUrl;
  };

  const handleGoogleCallback = async (code: string) => {
    setIsLoading(true);
    try {
      await loginWithGoogle(code);
      onClose();
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'authentification Google");
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
    setError("");
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    });
  };

  return {
    mode,
    formData,
    error,
    isLoading,
    googleConfig,
    handleInputChange,
    handleSubmit,
    handleGoogleLogin,
    switchMode,
    handleGoogleCallback,
  };
}
