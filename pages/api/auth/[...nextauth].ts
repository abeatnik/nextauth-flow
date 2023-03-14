"use client";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

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
                        // console.log({ user });
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
            // console.log("typeof user:", typeof user);
            // console.log("jwt callback function returns:", {
            //     ...token,
            //     user,
            // });
            const userObj: any = Object.assign({}, user);
            const role = userObj.hasOwnProperty("role")
                ? userObj?.role
                : token.role;
            return { ...token, role, user };
        },
        async session({ session, token, user }) {
            // console.log({ token });
            session.user = token as any;
            // console.log("session callback function returns: ", { session });
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    jwt: {
        maxAge: 60 * 60 * 24 * 30,
    },
    pages: {
        signIn: "/auth/login",
    },
};
export default NextAuth(authOptions);
