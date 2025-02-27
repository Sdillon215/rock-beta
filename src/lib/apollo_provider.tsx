import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

// Function to create Apollo Client
function makeClient(token: string | null): ApolloClient<InMemoryCache> {
  const httpLink = new HttpLink({
    uri: process.env.HASURA_GRAPHQL_ENDPOINT || "",
    headers: {
      ...(token
        ? { Authorization: `Bearer ${token}` } // Authenticated user
        : { "x-hasura-role": "public" } // Public role for guests
      ),
    },
    fetchOptions: { cache: "no-store" },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

// Apollo Provider Component
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const { data: session, status } = useSession(); // Only fetch session **once**
  console.log("Session status:", status);
  console.log("Session data:", session);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const newToken = session?.user?.hasura?.token || null;

    // Only update token if it's different from the current token
    if (newToken !== token) {
      setToken(newToken);
    }
    console.log("User session:", session);
  }, [session, status, token]); // Only run when session, status or token changes

  // Memoize Apollo Client to avoid re-creating it on every render
  const client = useMemo(() => makeClient(token), [token]);

  return (
    <ApolloNextAppProvider makeClient={() => client}>
      {children}
    </ApolloNextAppProvider>
  );
}