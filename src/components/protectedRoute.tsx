import { type PropsWithChildren, useContext } from "react";
import AuthContext from "../context/authContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? <>{children}</> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
