import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { getSession } from "next-auth/react";

export const { getClient, query, PreloadQuery } = registerApolloClient(async () => {
  const session = await getSession(); // Server-side session fetching
  const token = session?.user?.hasura?.token || null; // Retrieve token

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.HASURA_GRAPHQL_ENDPOINT || "", // Hasura GraphQL endpoint
      headers: {
        ...(token
          ? { Authorization: `Bearer ${token}` } // Authenticated users
          : { "X-Hasura-Role": "public" } // Public access for guests
        ),
      },
    }),
  });
});