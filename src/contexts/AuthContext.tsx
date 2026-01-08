import { createContext, ReactNode } from "react";
import { User } from "../API/auth/api";
import { useAuthProvider } from "../hooks/useAuthProvider";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  loginWithGoogle: (code: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const authValue = useAuthProvider();

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}
