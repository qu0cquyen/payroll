import { userVerification } from "#/actions/user-verification";
import { decodeSession } from "#/utils/jwt-generator";
import { LocalStorage } from "#/utils/local-storage";
import { useEffect, useState } from "react";

const useAuthState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const token = LocalStorage.getAccessToken();

  useEffect(() => {
    if (token === null || token === undefined) {
      setIsAuthenticated(false);
      return;
    }

    userVerification(token).then((isAuthenticated) => {
      if (!isAuthenticated) {
        // Remove refresh token + access token
        LocalStorage.removeAccessToken();
        LocalStorage.removeRefreshToken();
      }

      setIsAuthenticated(isAuthenticated);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isAuthenticated, setIsAuthenticated };
};

export default useAuthState;
