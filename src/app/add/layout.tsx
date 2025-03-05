export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col py-4 max-w-screen-lg mx-auto">
      {children}
    </div>
  );
}