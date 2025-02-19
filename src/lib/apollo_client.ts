import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: process.env.HASURA_GRAPHQL_ENDPOINT || "",
            headers: {
                "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET || "",
            },
        }),
    });
});