import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh" 
      }}>
        Chargement...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedAdminRoute;

