"use client"; // Ensure this is a client component

import { SessionProvider } from "next-auth/react";
import { ApolloWrapper } from "@/lib/apollo_provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ApolloWrapper>{children}</ApolloWrapper>
    </SessionProvider>
  );
}