import "./AdminCreateAdminModal.scss";

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
}

interface AdminCreateAdminModalProps {
  formData: FormData;
  creating: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const AdminCreateAdminModal = ({
  formData,
  creating,
  onClose,
  onSubmit,
  onInputChange,
}: AdminCreateAdminModalProps) => {
  return (
    <div className="admin-admins-modal-overlay" onClick={onClose}>
      <div className="admin-admins-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-admins-modal-header">
          <h2>Créer un nouvel administrateur</h2>
          <button className="admin-admins-modal-close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <form onSubmit={onSubmit} className="admin-admins-modal-form">
          <div className="admin-admins-modal-field">
            <label htmlFor="firstName">
              <i className="bi bi-person"></i> Prénom *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={onInputChange}
              required
              disabled={creating}
            />
          </div>

          <div className="admin-admins-modal-field">
            <label htmlFor="lastName">
              <i className="bi bi-person"></i> Nom *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={onInputChange}
              required
              disabled={creating}
            />
          </div>

          <div className="admin-admins-modal-field">
            <label htmlFor="email">
              <i className="bi bi-envelope"></i> Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              required
              disabled={creating}
            />
          </div>

          <div className="admin-admins-modal-field">
            <label htmlFor="password">
              <i className="bi bi-lock"></i> Mot de passe * (min. 6 caractères)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={onInputChange}
              required
              minLength={6}
              disabled={creating}
            />
          </div>

          <div className="admin-admins-modal-actions">
            <button
              type="button"
              className="admin-admins-modal-cancel"
              onClick={onClose}
              disabled={creating}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="admin-admins-modal-submit"
              disabled={creating}
            >
              {creating ? (
                <>
                  <i className="bi bi-arrow-repeat admin-admins-spinning"></i>
                  Création...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle"></i>
                  Créer l'administrateur
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateAdminModal;
