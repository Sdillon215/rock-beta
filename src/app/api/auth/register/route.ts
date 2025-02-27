import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo_client";

const client = getClient();

const INSERT_USER = gql`
    mutation InsertUser($email: String!, $password: String!) {
        insert_users_one(object: { email: $email, password: $password }) {
            id
            email
        }
    }
`;

export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const { data } = await (await client).mutate({
            mutation: INSERT_USER,
            variables: { email, password: hashedPassword },
        });

        return NextResponse.json({ user: data.insert_users_one });
    } catch (error) {
        return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
    }
}