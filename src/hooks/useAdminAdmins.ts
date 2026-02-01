import { useState, useEffect } from "react";
import {
  getAllUsers,
  updateUserRole,
  createAdminUser,
  validateProUser,
  retryProInsee,
  AdminUser,
} from "../API/admin/api";

export const useAdminAdmins = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [filteredAdmins, setFilteredAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [proActionUserId, setProActionUserId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [failedAvatars, setFailedAvatars] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "admin" as "user" | "admin",
  });

  useEffect(() => {
    loadAdmins();
  }, []);

  useEffect(() => {
    filterAdmins();
  }, [admins, searchTerm]);

  const loadAdmins = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllUsers();
      if (response.success) {
        const onlyAdmins = (response.data.users as AdminUser[]).filter(
          (u) => u.role === "admin"
        );
        setAdmins(onlyAdmins);
      } else {
        setError("Erreur lors du chargement des administrateurs");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors du chargement des administrateurs"
      );
    } finally {
      setLoading(false);
    }
  };

  const filterAdmins = () => {
    let filtered = [...admins];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.email.toLowerCase().includes(term) ||
          user.firstName.toLowerCase().includes(term) ||
          user.lastName.toLowerCase().includes(term)
      );
    }
    setFilteredAdmins(filtered);
  };

  const handleValidatePro = async (userId: string, approved: boolean) => {
    try {
      setProActionUserId(userId);
      setError("");
      await validateProUser(userId, approved);
      await loadAdmins();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de la décision"
      );
    } finally {
      setProActionUserId(null);
    }
  };

  const handleRetryInsee = async (userId: string) => {
    try {
      setProActionUserId(userId);
      setError("");
      await retryProInsee(userId);
      await loadAdmins();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de la reprise INSEE"
      );
    } finally {
      setProActionUserId(null);
    }
  };

  const handleDemoteToUser = async (userId: string) => {
    try {
      setUpdatingUserId(userId);
      setError("");
      await updateUserRole(userId, "user");
      await loadAdmins();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de la rétrogradation"
      );
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreating(true);
      setError("");
      await createAdminUser(formData);
      setShowCreateModal(false);
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "admin",
      });
      await loadAdmins();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de la création de l'administrateur"
      );
    } finally {
      setCreating(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  return {
    admins,
    filteredAdmins,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    updatingUserId,
    proActionUserId,
    showCreateModal,
    setShowCreateModal,
    creating,
    formData,
    handleValidatePro,
    handleRetryInsee,
    handleDemoteToUser,
    handleCreateAdmin,
    handleInputChange,
    handleImageError,
    shouldShowAvatar,
  };
};
