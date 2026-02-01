import "./AdminLoginForm.scss";

interface AdminLoginFormProps {
  email: string;
  password: string;
  error: string;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AdminLoginForm = ({
  email,
  password,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: AdminLoginFormProps) => {
  return (
    <form onSubmit={onSubmit} className="admin-login-form">
      {error && <div className="admin-login-error">{error}</div>}

      <div className="admin-login-field">
        <label htmlFor="email">
          <i className="bi bi-envelope"></i> Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
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
          onChange={(e) => onPasswordChange(e.target.value)}
          required
          placeholder="••••••••"
        />
      </div>

      <button type="submit" className="admin-login-submit" disabled={loading}>
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
  );
};

export default AdminLoginForm;
