import { API_BASE_URL, API_CREDENTIALS } from "../config";

const getHeaders = () => ({ "Content-Type": "application/json" });

export interface ContactResponseRequest {
  clientEmail: string;
  responseMessage: string;
  originalSubject?: string;
  orderNumber?: string;
}

export interface ContactResponseResponse {
  success: boolean;
  message: string;
}

export const sendResponseToClient = async (
  data: ContactResponseRequest
): Promise<ContactResponseResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/contact/response`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
    ...API_CREDENTIALS,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Erreur lors de l'envoi de la réponse");
  }

  return result;
};

