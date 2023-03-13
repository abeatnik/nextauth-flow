"use client";
import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
    username: string;
    password: string;
    role: string;
};

const page = () => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = handleSubmit((data) => console.log(data));

    return (
        <div className="p-6 shadow-sm bg-white rounded-md flex flex-col gap-2">
            <form onSubmit={onSubmit}>
                <label htmlFor="username">User Name: </label>
                <input {...register("username")} />
                <label htmlFor="password">Password: </label>
                <input {...register("password")} />
                <label htmlFor="role">Role: </label>
                {/* <select {...register("role")}>
                    <option value="">user</option>
                    <option value="A">admin</option>
                    <option value="B">super admin</option>
                </select> */}
            </form>
            <button type="submit">Submit</button>
        </div>
    );
};

export default page;
