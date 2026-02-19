import "./authModal.scss";
import { useAuthModal } from "../../hooks/useAuthModal";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const {
    mode,
    formData,
    error,
    isLoading,
    googleConfig,
    handleInputChange,
    handleSubmit,
    handleGoogleLogin,
    switchMode,
  } = useAuthModal(onClose);

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="auth-modal-content">
          <h2 className="auth-modal-title">
            {mode === "login" ? "CONNEXION" : "INSCRIPTION"}
          </h2>

          {error && <div className="auth-modal-error">{error}</div>}

          <form className="auth-modal-form" onSubmit={handleSubmit}>
            {mode === "register" && (
              <>
                <div className="auth-modal-row">
                  <div className="auth-modal-field">
                    <label htmlFor="firstName">Prénom</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="auth-modal-field">
                    <label htmlFor="lastName">Nom</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="auth-modal-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="auth-modal-field">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className="auth-modal-submit"
              disabled={isLoading}
            >
              {isLoading
                ? "CHARGEMENT..."
                : mode === "login"
                ? "SE CONNECTER"
                : "S'INSCRIRE"}
            </button>
          </form>

          <div className="auth-modal-divider">
            <span>OU</span>
          </div>

          <button
            className="auth-modal-google"
            onClick={handleGoogleLogin}
          >
            <i className="bi bi-google"></i>
            <span>CONTINUER AVEC GOOGLE</span>
          </button>

          <div className="auth-modal-switch">
            {mode === "login" ? (
              <p>
                Pas encore de compte ?{" "}
                <button onClick={switchMode} disabled={isLoading}>
                  S'inscrire
                </button>
              </p>
            ) : (
              <p>
                Déjà un compte ?{" "}
                <button onClick={switchMode} disabled={isLoading}>
                  Se connecter
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;



