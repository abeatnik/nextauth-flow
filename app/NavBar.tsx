import React from "react";
import Link from "next/link";

const NavBar = () => {
    return (
        <div className="p-4 flex gap-x-44 justify-center">
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
