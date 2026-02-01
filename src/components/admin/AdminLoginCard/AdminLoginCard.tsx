import AdminLoginForm from "../AdminLoginForm/AdminLoginForm";
import AdminLoginGoogleButton from "../AdminLoginGoogleButton/AdminLoginGoogleButton";
import "./AdminLoginCard.scss";

interface AdminLoginCardProps {
  email: string;
  password: string;
  error: string;
  loading: boolean;
  googleConfig: { clientId: string; redirectUri: string } | null;
  authUser: any;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleLogin: () => void;
}

const AdminLoginCard = ({
  email,
  password,
  error,
  loading,
  googleConfig,
  authUser,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onGoogleLogin,
}: AdminLoginCardProps) => {
  return (
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

      <AdminLoginForm
        email={email}
        password={password}
        error={error}
        loading={loading}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        onSubmit={onSubmit}
      />

      <div className="admin-login-divider">
        <span>OU</span>
      </div>

      <AdminLoginGoogleButton
        loading={loading}
        googleConfig={googleConfig}
        onClick={onGoogleLogin}
      />
    </div>
  );
};

export default AdminLoginCard;
