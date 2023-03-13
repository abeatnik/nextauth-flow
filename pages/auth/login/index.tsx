"use client";
import React from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

type FormData = {
    username: string;
    password: string;
};

const page = () => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        console.log(data);
        const result = await signIn("credentials", {
            username: data.username,
            password: data.password,
            redirect: true,
            callbackUrl: "/",
        });
        console.log(result);
    };

    const onError = (e: FieldErrors<FormData>) => console.log(e);

    return (
        <div className="w-screen flex justify-center">
            <div className="p-6 shadow-sm bg-white rounded-md w-2/3 flex flex-col gap-2">
                <form onSubmit={handleSubmit(onSubmit, onError)}>
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
                </form>
                <button
                    type="submit"
                    className=" w-4/5 text-beige-d text-comfortaa p-2 text-center border-2 border-beige-d rounded-md self-center"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default page;
