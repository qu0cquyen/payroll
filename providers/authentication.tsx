"use client";

import useAuthState from "#/hooks/use-auth-state";
import { AppUser } from "#/models/user-model";
import { PropsWithChildren, createContext, useContext, useEffect } from "react";

const AuthContext = createContext<{
  isAuthenticated: AppUser | null;
  updateAuthentication?: (auth: AppUser | null) => void;
}>({
  isAuthenticated: null,
});

export const useAuthContext = () => useContext(AuthContext);

const AuthenticationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, setIsAuthenticated } = useAuthState();

  const updateAuthentication = (auth: AppUser | null) => {
    setIsAuthenticated(auth);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, updateAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticationProvider;
