import React, { type PropsWithChildren, useState } from "react";

interface IAuthContext {
  token: string;
  isAuth: boolean;
  signIn: (props: string) => void;
  signOut: () => void;
}

const initContext: IAuthContext = {
  token: "",
  isAuth: false,
  signIn: () => {},
  signOut: () => {},
};

const AuthContext = React.createContext<IAuthContext>(initContext);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const userIsLogin = !!token;

  const loginHandler = async (token: string) => {
    setToken(token);
  };

  const logoutHandler = async () => {
    setToken(null);
  };

  const contextValue: IAuthContext = {
    token: String(token),
    isAuth: userIsLogin,
    signIn: loginHandler,
    signOut: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
