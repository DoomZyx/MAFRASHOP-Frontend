import { useState } from "react";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter l'envoi du formulaire
    console.log("Formulaire SAV soumis:", formData);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};
