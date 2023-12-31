import type { Metadata } from "next";
import "#/styles/styles.css";
import AuthenticationProvider from "#/providers/authentication";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";

export const metadata: Metadata = {
  title: "Payroll",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HydrationOverlay>
          <AuthenticationProvider>{children}</AuthenticationProvider>
        </HydrationOverlay>
      </body>
    </html>
  );
}
