import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { gql } from "@apollo/client";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            hasura: Record<string, any>;
        };
    }
}
import { getClient } from "@/lib/apollo_client";

const LOGIN_USER = gql`
    query LoginUser($email: String!) {
        users(where: { email: { _eq: $email } }) {
            id
            email
            password
        }
    }
`;

const client = getClient();

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                // Fetch user from Hasura
                const { data } = await (await client).query({
                    query: LOGIN_USER,
                    variables: { email: credentials.email },
                });

                const user = data.users[0];
                if (!user) {
                    throw new Error("No user found with this email");
                }

                // Verify password
                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) {
                    throw new Error("Invalid password");
                }

                return { id: user.id, email: user.email };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.hasura = {
                    "x-hasura-allowed-roles": ["user"],
                    "x-hasura-default-role": "user",
                    "x-hasura-user-id": user.id,
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id as string,
                email: token.email as string,
                hasura: token.hasura as Record<string, any>,
            };
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
});

export { handler as GET, handler as POST };