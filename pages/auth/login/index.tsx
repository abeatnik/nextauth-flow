"use client";
import React from "react";
import Link from "next/link";
import { FieldErrors, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

type FormData = {
    name: string;
    password: string;
};

const Login = () => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        console.log(data);
        const result = await signIn("credentials", {
            name: data.name,
            password: data.password,
            redirect: true,
            callbackUrl: "/",
        });
        console.log({ result });
    };

    const onError = (e: FieldErrors<FormData>) => console.log(e);

    return (
        <div className="w-screen flex justify-center">
            <div className="p-6 shadow-sm bg-white rounded-md w-2/3 flex flex-col gap-2">
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <h2 className="text-sage-d text-comfortaa text-2xl text-center">
                        Login
                    </h2>
                    <div className="p-2">
                        <label
                            htmlFor="name"
                            className="text-beige-d text-comfortaa"
                        >
                            name:{" "}
                        </label>
                        <input
                            type="text"
                            {...register("name")}
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
                    <button
                        type="submit"
                        className=" w-4/5 text-beige-d text-comfortaa p-2 text-center border-2 border-beige-d rounded-md self-center"
                    >
                        Submit
                    </button>
                    <p>
                        Not yet a user?{" "}
                        <Link className="text-sage-d" href={"/auth/register"}>
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
