import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const NavBar = () => {
    const { data: session } = useSession();
    return (
        <div className="p-4 flex gap-4 justify-center w-screen">
            <Link className="" href={"/"}>
                Home
            </Link>
            <Link className="" href={"/admin"}>
                Admin
            </Link>
            <Link className="" href={"/admin/panel"}>
                Panel
            </Link>
            {session?.user ? (
                <>
                    <p className="text-comfortaa">{session.user.name}</p>
                    <button
                        className="text-comfortaa text-sage-d"
                        onClick={() => signOut()}
                    >
                        Sign Out
                    </button>
                </>
            ) : (
                <button
                    className="text-comfortaa text-sage-d"
                    onClick={() => signIn()}
                >
                    Sign In
                </button>
            )}
        </div>
    );
};

export default NavBar;
