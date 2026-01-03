import { API_BASE_URL } from "../config";

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  googleId?: string;
  authProvider: "local" | "google";
  isVerified: boolean;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}

export interface GoogleConfig {
  success: boolean;
  data: {
    clientId: string;
    redirectUri: string;
  };
}

const getAuthHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const authToken = token || localStorage.getItem("authToken");
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  return headers;
};

export const authAPI = {
  register: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  login: async (data: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  googleCallback: async (code: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/google/callback`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ code }),
    });
    return response.json();
  },

  getGoogleConfig: async (): Promise<GoogleConfig> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/google/config`);
    return response.json();
  },

  getMe: async (): Promise<{ success: boolean; data: { user: User } }> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  logout: async (): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};


