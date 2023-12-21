import BottomNavigator from "#/components/bottom-navigator";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <BottomNavigator />
    </>
  );
}
