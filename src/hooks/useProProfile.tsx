import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAuth } from "./useAuth";
import { authAPI } from "../API/auth/api";

interface ProProfileFormData {
  companyName: string;
  siret: string;
  address: string;
  city: string;
  zipCode: string;
  companyPhone: string;
  companyEmail: string;
}

export function useProProfile() {
  const { user, refreshUser } = useAuth();
  const [formData, setFormData] = useState<ProProfileFormData>({
    companyName: "",
    siret: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.isPro && user?.company) {
      setFormData({
        companyName: user.company.name || "",
        siret: user.company.siret || "",
        address: user.company.address || "",
        city: user.company.city || "",
        zipCode: user.company.zipCode || "",
        companyPhone: user.company.phone || "",
        companyEmail: user.company.email || "",
      });
    }
  }, [user?.isPro, user?.company]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

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
      if (formData.siret.length !== 14) {
        setError("Le SIRET doit contenir exactement 14 chiffres");
        setIsLoading(false);
        return;
      }

      const response = await authAPI.updateCompanyProfile({
        companyName: formData.companyName.trim(),
        siret: formData.siret,
        address: formData.address.trim() || undefined,
        city: formData.city.trim() || undefined,
        zipCode: formData.zipCode.trim() || undefined,
        companyPhone: formData.companyPhone.trim() || undefined,
        companyEmail: formData.companyEmail.trim() || undefined,
      });

      if (!response.success) {
        throw new Error(response.message || "Erreur lors de la mise a jour");
      }

      setSuccess("Informations entreprise mises a jour avec succes.");
      await refreshUser();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de la mise a jour des informations entreprise"
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
