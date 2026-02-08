import { useState } from "react";
import "./AdminContact.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { sendResponseToClient, ContactResponseRequest } from "../../../API/contact/api";

function AdminContact() {
  const [formData, setFormData] = useState<ContactResponseRequest>({
    clientEmail: "",
    responseMessage: "",
    originalSubject: "",
    orderNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await sendResponseToClient(formData);
      setSubmitStatus({
        type: "success",
        message: "Votre réponse a été envoyée au client avec succès.",
      });
      setFormData({
        clientEmail: "",
        responseMessage: "",
        originalSubject: "",
        orderNumber: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Une erreur est survenue.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-contact-container">
      <div className="admin-contact-header">
        <h1>
          <i className="bi bi-envelope-paper"></i> Répondre à un client
        </h1>
        <p className="admin-contact-subtitle">
          Envoyez une réponse professionnelle au client avec le design MAFRASHOP
        </p>
      </div>

      <div className="admin-contact-content">
        {submitStatus.type && (
          <div
            className={`admin-contact-status ${
              submitStatus.type === "success"
                ? "admin-contact-status--success"
                : "admin-contact-status--error"
            }`}
          >
            <i
              className={`bi ${
                submitStatus.type === "success"
                  ? "bi-check-circle-fill"
                  : "bi-exclamation-triangle-fill"
              }`}
            ></i>
            <span>{submitStatus.message}</span>
            <button
              className="admin-contact-status-close"
              onClick={() => setSubmitStatus({ type: null, message: "" })}
              aria-label="Fermer"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        )}

        <form className="admin-contact-form" onSubmit={handleSubmit}>
          <div className="admin-contact-form-row">
            <div className="admin-contact-form-group">
              <label htmlFor="clientEmail">
                Email du client <span className="required">*</span>
              </label>
              <input
                type="email"
                id="clientEmail"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                placeholder="client@example.com"
                required
              />
            </div>

            <div className="admin-contact-form-group">
              <label htmlFor="orderNumber">Numéro de commande</label>
              <input
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleChange}
                placeholder="CMD-12345"
              />
            </div>
          </div>

          <div className="admin-contact-form-group">
            <label htmlFor="originalSubject">Sujet original</label>
            <input
              type="text"
              id="originalSubject"
              name="originalSubject"
              value={formData.originalSubject}
              onChange={handleChange}
              placeholder="Question sur un produit"
            />
          </div>

          <div className="admin-contact-form-group">
            <label htmlFor="responseMessage">
              Votre réponse <span className="required">*</span>
            </label>
            <textarea
              id="responseMessage"
              name="responseMessage"
              value={formData.responseMessage}
              onChange={handleChange}
              placeholder="Tapez votre réponse au client ici..."
              rows={10}
              required
            ></textarea>
            <p className="admin-contact-form-hint">
              Votre réponse sera envoyée avec un design professionnel MAFRASHOP
            </p>
          </div>

          <button
            type="submit"
            className="admin-contact-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="bi bi-hourglass-split"></i> Envoi en cours...
              </>
            ) : (
              <>
                <i className="bi bi-send-fill"></i> Envoyer la réponse
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminContact;

