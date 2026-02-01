import { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "./useAuth";
import { authAPI } from "../API/auth/api";

interface ProRequestFormData {
  companyName: string;
  siret: string;
  address: string;
  city: string;
  zipCode: string;
  companyCountry: string;
  vatNumber: string;
  hasVatNumber: boolean;
}

export function useProRequest(onSuccess?: () => void) {
  const [formData, setFormData] = useState<ProRequestFormData>({
    companyName: "",
    siret: "",
    address: "",
    city: "",
    zipCode: "",
    companyCountry: "FR",
    vatNumber: "",
    hasVatNumber: false,
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { refreshUser } = useAuth();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    // Formatage du SIRET (uniquement 14 chiffres)
    if (name === "siret") {
      const numericValue = value.replace(/\D/g, "").slice(0, 14);
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else if (name === "vatNumber") {
      // Formatage du numéro de TVA (majuscules, enlever espaces/tirets)
      const cleanValue = value.replace(/[\s\-\.]/g, "").toUpperCase();
      setFormData((prev) => ({
        ...prev,
        [name]: cleanValue,
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
        // Si on décoche, vider les champs TVA
        ...(name === "hasVatNumber" && !checked ? { vatNumber: "", companyCountry: "FR" } : {}),
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
      // Validation du SIRET (obligatoire uniquement si pas de TVA intracommunautaire)
      if (!formData.hasVatNumber && formData.siret.length !== 14) {
        setError("Le SIRET doit contenir exactement 14 chiffres");
        setIsLoading(false);
        return;
      }

      // Si TVA intracommunautaire, le numéro de TVA est obligatoire
      if (formData.hasVatNumber && !formData.vatNumber.trim()) {
        setError("Le numéro de TVA intracommunautaire est requis");
        setIsLoading(false);
        return;
      }

      const response = await authAPI.requestPro({
        companyName: formData.companyName.trim(),
        ...(formData.hasVatNumber ? {} : { siret: formData.siret }),
        address: formData.address.trim() || undefined,
        city: formData.city.trim() || undefined,
        zipCode: formData.zipCode.trim() || undefined,
        companyCountry: formData.hasVatNumber ? formData.companyCountry.trim() : "FR",
        vatNumber: formData.hasVatNumber ? formData.vatNumber.trim() : undefined,
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
