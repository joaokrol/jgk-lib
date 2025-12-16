import { useAuth } from "@app/providers";
import { Spin } from "antd";
import { Navigate, useLocation } from "react-router-dom";
import { APP_PATHS } from "../routes/paths";

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
    return <Navigate to={APP_PATHS.LOGIN} state={{ from: location }} replace />;
  }

  return children;
}
