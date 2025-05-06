import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../business/store/authStore";

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useAuthStore();
  return token ? <>{children}</> : <Navigate to="/login" />;
};
