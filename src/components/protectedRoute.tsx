import { type PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuth } = useAuth();
  return isAuth ? <>{children}</> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
