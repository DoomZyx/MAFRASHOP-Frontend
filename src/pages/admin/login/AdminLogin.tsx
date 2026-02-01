import { useAdminLogin } from "../../../hooks/useAdminLogin";
import AdminLoginCard from "../../../components/admin/AdminLoginCard/AdminLoginCard";
import "./AdminLogin.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function AdminLogin() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    googleConfig,
    authUser,
    handleSubmit,
    handleGoogleLogin,
  } = useAdminLogin();

  return (
    <div className="admin-login-container">
      <AdminLoginCard
        email={email}
        password={password}
        error={error}
        loading={loading}
        googleConfig={googleConfig}
        authUser={authUser}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
        onGoogleLogin={handleGoogleLogin}
      />
    </div>
  );
}

export default AdminLogin;

