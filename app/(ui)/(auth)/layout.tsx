export default function UnAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-neutral-lighter">
      {children}
    </div>
  );
}
