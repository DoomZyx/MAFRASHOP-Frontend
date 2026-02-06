import { useState } from "react";
import { API_BASE_URL } from "../API/config";

interface SAVFormData {
  orderNumber: string;
  email: string;
  subject: string;
  message: string;
}

export const useSAVForm = () => {
  const [formData, setFormData] = useState<SAVFormData>({
    orderNumber: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Réinitialiser le statut lors de la modification
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Votre message a été envoyé avec succès.",
        });
        // Réinitialiser le formulaire après succès
        setFormData({
          orderNumber: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Une erreur est survenue. Veuillez réessayer.",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      setSubmitStatus({
        type: "error",
        message: "Erreur de connexion. Veuillez réessayer plus tard.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    submitStatus,
  };
};
