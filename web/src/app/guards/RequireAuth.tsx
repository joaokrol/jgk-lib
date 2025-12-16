import { useAuth } from "@app/providers/AuthProvider";
import { Spin } from "antd";
import { Navigate, useLocation } from "react-router-dom";

type RequireAuthProps = {
  children: React.ReactNode;
};
export function RequireAuth({ children }: RequireAuthProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Spin fullscreen />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
