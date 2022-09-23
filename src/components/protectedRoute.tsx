import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const auth: boolean = false;
  return auth ? <>{children}</> : <Navigate to={"/login"} replace={true} />;
};

export default ProtectedRoute;
