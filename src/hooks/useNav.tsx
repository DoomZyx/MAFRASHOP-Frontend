import { useState } from "react";
import { useAuth } from "./useAuth";

export function useNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  return {
    isMenuOpen,
    isAuthModalOpen,
    user,
    isAuthenticated,
    toggleMenu,
    openAuthModal,
    closeAuthModal,
    handleLogout,
  };
}
