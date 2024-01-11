import BottomNavigator from "#/components/bottom-navigator";
import ResetAppStateProvider from "#/providers/reset-app-states";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResetAppStateProvider>
      {children}
      <BottomNavigator />
    </ResetAppStateProvider>
  );
}
