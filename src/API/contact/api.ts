import { API_BASE_URL } from "../config";

const getAuthHeaders = () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  return headers;
};

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
    headers: getAuthHeaders(),
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Erreur lors de l'envoi de la réponse");
  }

  return result;
};

