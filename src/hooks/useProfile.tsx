import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAuth } from "./useAuth";
import { authAPI } from "../API/auth/api";

export function useProfile() {
  const { user, refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string>("");

  // Initialiser les données quand l'utilisateur est chargé
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        zipCode: user.zipCode || "",
      });
    }
  }, [user]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await authAPI.updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
      });

      if (!response.success) {
        throw new Error(response.message || "Erreur lors de la mise à jour");
      }

      setSuccess("Profil mis à jour avec succès !");
      await refreshUser();
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour du profil");
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