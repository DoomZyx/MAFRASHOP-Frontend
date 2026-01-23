import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../../hooks/useAdminAuth";
import { useAuth } from "../../../hooks/useAuth";
import "./AdminLogin.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, loading: adminLoading } = useAdminAuth();
  const { user: authUser } = useAuth();
  const navigate = useNavigate();

  // Si l'utilisateur est déjà connecté avec le rôle admin, rediriger vers le dashboard
  useEffect(() => {
    if (!adminLoading && isAuthenticated) {
      navigate("/admin", { replace: true });
    } else if (authUser && authUser.role === "admin") {
      // Si l'utilisateur connecté via Google/local a le rôle admin, rediriger
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, adminLoading, authUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>
            <i className="bi bi-shield-lock"></i> Administration
          </h1>
          <p>Connectez-vous pour accéder au panneau d'administration</p>
          {authUser && authUser.role === "admin" && (
            <div className="admin-login-info">
              <i className="bi bi-info-circle"></i>
              Vous êtes déjà connecté avec un compte administrateur. Redirection...
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && <div className="admin-login-error">{error}</div>}

          <div className="admin-login-field">
            <label htmlFor="email">
              <i className="bi bi-envelope"></i> Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
            />
          </div>

          <div className="admin-login-field">
            <label htmlFor="password">
              <i className="bi bi-lock"></i> Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="admin-login-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="bi bi-hourglass-split"></i> Connexion...
              </>
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right"></i> Se connecter
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;

