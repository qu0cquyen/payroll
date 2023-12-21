"use client";

import { useAuthContext } from "#/providers/authentication";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthContext();
  const pathName = usePathname();

  useEffect(() => {
    if (!isAuthenticated && pathName !== "/login") {
      redirect("/login");
    }

    if (isAuthenticated && pathName === "/login") {
      redirect("/dashboard");
    }
  }, [isAuthenticated, pathName]);

  // if (!isAuthenticated && pathName !== "/login")
  //   return (
  //     <div className="flex justify-center">
  //       <CircleSpinning />
  //     </div>
  //   );

  return <>{children}</>;
}
