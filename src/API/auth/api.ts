import { API_BASE_URL, API_CREDENTIALS } from "../config";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  avatar?: string;
  googleId?: string;
  authProvider: "local" | "google";
  isVerified: boolean;
  role: "user" | "admin";
  isPro?: boolean;
  proStatus?: "none" | "pending" | "verified" | "rejected";
  verificationMode?: "auto" | "manual";
  decisionSource?: "auto" | "manual" | null;
  lastVerificationError?: string | null;
  company?: {
    name?: string;
    siret?: string;
    address?: string;
    city?: string;
    zipCode?: string;
    phone?: string;
    email?: string;
    country?: string;
    vatNumber?: string;
    vatStatus?: "none" | "pending_manual" | "validated" | "rejected";
    vatValidationDate?: string | null;
  };

  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
  };
}

export interface GoogleConfig {
  success: boolean;
  data: {
    clientId: string;
    redirectUri: string;
  };
}

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
});

const authFetchOptions: RequestInit = {
  credentials: "include",
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
      ...authFetchOptions,
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
      ...authFetchOptions,
    });
    return response.json();
  },

  googleCallback: async (code: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/google/callback`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ code }),
      ...authFetchOptions,
    });
    return response.json();
  },

  getGoogleConfig: async (): Promise<GoogleConfig> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/google/config`, authFetchOptions);
    return response.json();
  },

  getMe: async (): Promise<{ success: boolean; data: { user: User } }> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: "GET",
      headers: getAuthHeaders(),
      ...API_CREDENTIALS,
    });
    return response.json();
  },

  logout: async (): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({}),
      ...authFetchOptions,
    });
    return response.json();
  },

  refreshToken: async (): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({}),
      ...authFetchOptions,
    });
    return response.json();
  },

  updateProfile: async (data: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zipCode: string;
    phone: string;
  }): Promise<{ success: boolean; message: string; data: { user: User } }> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
      ...authFetchOptions,
    });
    return response.json();
  },

  updateCompanyProfile: async (data: {
    companyName: string;
    siret: string;
    address?: string;
    city?: string;
    zipCode?: string;
    companyPhone?: string;
    companyEmail?: string;
  }): Promise<{ success: boolean; message: string; data?: { user: User } }> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/profile/company`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
      ...authFetchOptions,
    });
    return response.json();
  },

  requestPro: async (data: {
    companyName: string;
    siret?: string;
    address?: string;
    city?: string;
    zipCode?: string;
    companyCountry?: string;
    vatNumber?: string;
  }): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/pro/request`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
      ...authFetchOptions,
    });
    return response.json();
  },

  testProRequest: async (data: {
    companyName: string;
    siret: string;
    address?: string;
    city?: string;
    zipCode?: string;
  }): Promise<{ success: boolean; message: string; data?: { user: User } }> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/pro/test-request`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
      ...authFetchOptions,
    });
    return response.json();
  },

  validateProManually: async (data: {
    userId: string;
    approved: boolean;
  }): Promise<{ success: boolean; message: string; data?: { user: User } }> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/pro/validate`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
      ...authFetchOptions,
    });
    return response.json();
  },

  adminGoogleCallback: async (code: string): Promise<{
    success: boolean;
    message: string;
    user?: { id: string; email: string; isAdmin: boolean };
  }> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/admin/google/callback`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ code }),
      ...authFetchOptions,
    });
    return response.json();
  },
};



