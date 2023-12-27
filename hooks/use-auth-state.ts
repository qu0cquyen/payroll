import { userVerification } from "#/actions/user-verification";
import { AppUser } from "#/models/user-model";
import { decodeSession } from "#/utils/jwt-generator";
import { LocalStorage } from "#/utils/local-storage";
import { useEffect, useState } from "react";
import useCurrentUserInfoState from "./use-current-user-info-state";

const useAuthState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<AppUser | null>(null);

  const { updateCurrentUser } = useCurrentUserInfoState();

  const token = LocalStorage.getAccessToken();

  useEffect(() => {
    if (token === null || token === undefined) {
      setIsAuthenticated(null);
      return;
    }

    userVerification(token).then((user) => {
      if (!user) {
        // Remove refresh token + access token
        LocalStorage.removeAccessToken();
        LocalStorage.removeRefreshToken();

        updateCurrentUser(null);
        setIsAuthenticated(null);
        return;
      }

      updateCurrentUser(user);
      setIsAuthenticated(user);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isAuthenticated, setIsAuthenticated };
};

export default useAuthState;
