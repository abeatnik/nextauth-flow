import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        let role =
            typeof req.nextauth.token?.role === "string"
                ? req.nextauth.token?.role
                : "";
        if (req.nextUrl.pathname.startsWith("/admin") && !role.match(/admin/)) {
            return NextResponse.rewrite(
                new URL("/auth/login?message=Access denied!", req.url)
            );
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/admin/:path*", "/user/:path*"],
};
