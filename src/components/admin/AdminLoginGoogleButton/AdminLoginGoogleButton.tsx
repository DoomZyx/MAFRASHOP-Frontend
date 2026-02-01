import "./AdminLoginGoogleButton.scss";

interface AdminLoginGoogleButtonProps {
  loading: boolean;
  googleConfig: { clientId: string; redirectUri: string } | null;
  onClick: () => void;
}

const AdminLoginGoogleButton = ({
  loading,
  googleConfig,
  onClick,
}: AdminLoginGoogleButtonProps) => {
  return (
    <button
      className="admin-login-google"
      onClick={onClick}
      disabled={loading || !googleConfig}
    >
      <i className="bi bi-google"></i>
      <span>Se connecter avec Google</span>
    </button>
  );
};

export default AdminLoginGoogleButton;
