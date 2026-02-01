import { useState, useEffect } from "react";
import { getAllUsers, validateProUser, validateVatUser, retryProInsee, AdminUser } from "../API/admin/api";

export const useAdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [proActionUserId, setProActionUserId] = useState<string | null>(null);
  const [vatActionUserId, setVatActionUserId] = useState<string | null>(null);
  const [failedAvatars, setFailedAvatars] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllUsers();
      if (response.success) {
        const onlyUsers = (response.data.users as AdminUser[]).filter((u) => u.role === "user");
        setUsers(onlyUsers);
      } else {
        setError("Erreur lors du chargement des utilisateurs");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement des utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.email.toLowerCase().includes(term) ||
          user.firstName.toLowerCase().includes(term) ||
          user.lastName.toLowerCase().includes(term)
      );
    }
    setFilteredUsers(filtered);
  };

  const handleValidatePro = async (userId: string, approved: boolean) => {
    try {
      setProActionUserId(userId);
      setError("");
      await validateProUser(userId, approved);
      await loadUsers();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de la décision");
    } finally {
      setProActionUserId(null);
    }
  };

  const handleRetryInsee = async (userId: string) => {
    try {
      setProActionUserId(userId);
      setError("");
      await retryProInsee(userId);
      await loadUsers();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de la reprise INSEE");
    } finally {
      setProActionUserId(null);
    }
  };

  const handleValidateVat = async (userId: string, approved: boolean) => {
    try {
      setVatActionUserId(userId);
      setError("");
      await validateVatUser(userId, approved);
      await loadUsers();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de la validation TVA");
    } finally {
      setVatActionUserId(null);
    }
  };

  const handleImageError = (userId: string) => {
    setFailedAvatars((prev) => new Set(prev).add(userId));
  };

  const shouldShowAvatar = (user: AdminUser) => {
    return (
      user.avatar &&
      user.avatar.trim() !== "" &&
      !failedAvatars.has(user.id)
    );
  };

  const pendingProCount = users.filter(
    (u) => u.proStatus === "pending" && u.decisionSource == null
  ).length;

  return {
    users,
    filteredUsers,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    proActionUserId,
    vatActionUserId,
    pendingProCount,
    handleValidatePro,
    handleRetryInsee,
    handleValidateVat,
    handleImageError,
    shouldShowAvatar,
  };
};
