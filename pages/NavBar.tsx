import React from "react";
import Link from "next/link";

const NavBar = () => {
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
        </div>
    );
};

export default NavBar;
