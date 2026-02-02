'use client';

import { usePathname } from 'next/navigation';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/" || pathname === "/login";

  return (
    <main
      className={
        isAuthPage
          ? "flex-1 w-full h-screen" // Full screen for auth/landing pages, no padding
          : "flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 md:pb-12" // Default app layout with padding
      }
    >
      {children}
    </main>
  );
}
