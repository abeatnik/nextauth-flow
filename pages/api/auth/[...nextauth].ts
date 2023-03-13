"use client";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, name, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                name: {
                    label: "name",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const { name, password } = credentials as any;
                const user: User | null = await prisma.user.findUnique({
                    where: {
                        name: name,
                    },
                });

                if (user) {
                    const hash: string = user?.password || "";
                    const valid = await bcrypt.compare(password, hash);
                    if (valid) {
                        console.log({ user });
                        return user;
                    }
                }
                return null;
                // If you return null then an error will be displayed advising the user to check their details.
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            },
        }),
        //...add more providers here
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, user };
        },
        async session({ session, token, user }) {
            session.user = token as any;
            return session;
        },
    },
    // secret: process.env.JWT_SECRET,
    session: { strategy: "jwt" },
    jwt: {
        maxAge: 60 * 60 * 24 * 30,
        // encode: async ({ secret, token, maxAge }) => {
        //     const jwtClaims = {
        //         sub: token.id.toString(),
        //         name: token.name,
        //         email: token.email,
        //         iat: Date.now() / 1000,
        //         exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        //         "https://hasura.io/jwt/claims": {
        //             "x-hasura-allowed-roles": ["user"],
        //             "x-hasura-default-role": "user",
        //             "x-hasura-role": "user",
        //             "x-hasura-user-id": token.id,
        //         },
        //     };
        //     const encodedToken = jwt.sign(jwtClaims, secret, {
        //         algorithm: "HS256",
        //     });
        //     return encodedToken;
        // },
    },
    pages: {
        signIn: "/auth/login",
    },
};
export default NextAuth(authOptions);
