"use client";

import MobileLayout from "#/components/layout/mobile-layout";
import { Button } from "#/components/ui/button";
import useLoginState from "../../(auth)/login/use-login-state";

const Profile = () => {
  const { logOut } = useLoginState();

  return (
    <MobileLayout>
      <MobileLayout.Content className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Button size={"lg"} name="logout" onClick={logOut}>
          Logout
        </Button>
      </MobileLayout.Content>
    </MobileLayout>
  );
};

export default Profile;
