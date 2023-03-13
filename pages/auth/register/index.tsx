"use client";
import React from "react";
import { FieldErrors, useForm } from "react-hook-form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

type FormData = {
    username: string;
    password: string;
    role: string;
};

const Register = () => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        const result = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const res = result.json();
        console.log(res);
        // if (res.ok) {
        //     signIn("credentials", {
        //         username: data.username,
        //         password: data.password,
        //         redirect: true,
        //         callbackUrl: "/",
        //     });
        // }
    };

    const onError = (e: FieldErrors<FormData>) => console.log(e);

    return (
        <div className="w-screen flex justify-center">
            <div className="p-6 shadow-sm bg-white rounded-md w-2/3 flex flex-col gap-2">
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <h2 className="text-sage-d text-comfortaa text-2xl text-center">
                        Register
                    </h2>
                    <div className="p-2">
                        <label
                            htmlFor="username"
                            className="text-beige-d text-comfortaa"
                        >
                            username:{" "}
                        </label>
                        <input
                            type="text"
                            {...register("username")}
                            className="bg-beige-d rounded-md p-2"
                        />
                    </div>
                    <div className="p-2">
                        <label
                            htmlFor="password"
                            className="text-beige-d text-comfortaa"
                        >
                            password:{" "}
                        </label>
                        <input
                            type="password"
                            {...register("password")}
                            className="bg-beige-d rounded-md p-2"
                        />
                    </div>
                    <label htmlFor="role-select">Choose a role:</label>
                    <select id="role-select" {...register("role")}>
                        <option value="">--Please choose an option--</option>
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                        <option value="chief-admin">chief admin</option>
                    </select>
                    <p>
                        Already a user?{" "}
                        <Link className="text-sage-d" href={"/auth/login"}>
                            Login
                        </Link>
                    </p>
                    <button
                        type="submit"
                        className=" w-4/5 text-beige-d text-comfortaa p-2 text-center border-2 border-beige-d rounded-md self-center"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
