import { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "./useAuth";
import { authAPI } from "../API/auth/api";

interface ProRequestFormData {
  companyName: string;
  siret: string;
  address: string;
  city: string;
  zipCode: string;
}

export function useProRequest(onSuccess?: () => void) {
  const [formData, setFormData] = useState<ProRequestFormData>({
    companyName: "",
    siret: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { refreshUser } = useAuth();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Formatage du SIRET (uniquement 14 chiffres)
    if (name === "siret") {
      const numericValue = value.replace(/\D/g, "").slice(0, 14);
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // Validation du SIRET
      if (formData.siret.length !== 14) {
        setError("Le SIRET doit contenir exactement 14 chiffres");
        setIsLoading(false);
        return;
      }

      const response = await authAPI.requestPro({
        companyName: formData.companyName.trim(),
        siret: formData.siret,
        address: formData.address.trim() || undefined,
        city: formData.city.trim() || undefined,
        zipCode: formData.zipCode.trim() || undefined,
      });

      if (!response.success) {
        throw new Error(response.message || "Erreur lors de la demande");
      }

      setSuccess(
        "Votre demande de validation professionnelle a été envoyée. Elle sera traitée sous peu."
      );

      // Rafraîchir les données utilisateur
      await refreshUser();

      // Appeler le callback de succès après un court délai
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (err: any) {
      setError(
        err.message || "Erreur lors de la demande de validation professionnelle"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    error,
    success,
    isLoading,
    handleInputChange,
    handleSubmit,
  };
}
