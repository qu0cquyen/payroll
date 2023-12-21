"use client";

import useAuthState from "#/hooks/use-auth-state";
import { PropsWithChildren, createContext, useContext, useEffect } from "react";

const AuthContext = createContext<{
  isAuthenticated: boolean;
  updateAuthentication?: (auth: boolean) => void;
}>({
  isAuthenticated: false,
});

export const useAuthContext = () => useContext(AuthContext);

const AuthenticationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, setIsAuthenticated } = useAuthState();

  const updateAuthentication = (auth: boolean) => {
    setIsAuthenticated(auth);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, updateAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticationProvider;
