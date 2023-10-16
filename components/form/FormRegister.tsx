"use client";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/lib/validations/form";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ErrorAlert from "../Alert";
import Link from "next/link";
const FormRegister = () => {
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const [passwordShow, setPaswordShow] = useState<boolean>(false);
  const router = useRouter();
  type FormData = z.infer<typeof registerSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: FormData) => {
    try {
      const results = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (results.status == 200) {
        router.push("/auth/signin?r=success");
      } else {
        setError((prev) => ({
          ...prev,
          status: true,
          message: results.statusText,
        }));
      }
    } catch (error) {
      setError((prev) => ({
        ...prev,
        status: true,
        message: "Register Failed",
      }));
    }
    setTimeout(() => {
      setError((prev) => ({ ...prev, status: false }));
    }, 6000);
  };
  return (
    <div className="mb-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ErrorAlert
          isShow={error.status}
          type="error"
          message={error.message}
        />
        <div className="flex flex-wrap mb-7 relative">
          <label className="mb-1 text-lg font-medium " htmlFor="username">
            Username
          </label>
          <input
            {...register("username", { required: true })}
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            className={`${
              errors?.username ? "border-red-600 " : "border-black"
            } w-full p-2 outline-none rounded-md border-[2px]   text-lg`}
          />
          {errors?.username && (
            <p className="text-red-600 absolute bottom-[-20px] text-sm">
              {errors?.username?.message}
            </p>
          )}
        </div>
        <div className="flex flex-wrap mb-7 relative">
          <label className="mb-1 text-lg font-medium " htmlFor="email">
            Email
          </label>
          <input
            {...register("email", { required: true })}
            id="email"
            name="email"
            type="text"
            autoComplete="off"
            className={`${
              errors?.email ? "border-red-600 " : "border-black"
            } w-full p-2 outline-none rounded-md border-[2px]   text-lg`}
          />
          {errors?.email && (
            <p className="text-red-600 absolute bottom-[-20px] text-sm">
              {errors?.email?.message}
            </p>
          )}
        </div>
        <div className="flex flex-wrap mb-7 relative">
          <label className="mb-1 text-lg font-medium " htmlFor="email">
            Password
          </label>
          <input
            {...register("password", { required: true })}
            id="password"
            name="password"
            type={`${passwordShow ? "text" : "password"}`}
            autoComplete="off"
            className={`${
              errors?.password ? "border-red-600 " : "border-black"
            } w-full p-2 outline-none rounded-md border-[2px]   text-lg`}
          />
          <div
            className="text-[20px] cursor-pointer absolute  bottom-[15px] right-[10px] "
            onClick={() => setPaswordShow(!passwordShow)}
          >
            {passwordShow ? <BsEyeFill /> : <BsEyeSlashFill />}
          </div>
          {errors?.password && (
            <p className="text-red-600 absolute bottom-[-20px] text-sm">
              {errors?.password?.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black rounded-md text-white py-3 mt-2 mb-5"
        >
          Sign Up
        </button>
        <p className="text-xs md:text-base">
          have an account?{" "}
          <Link href={"/auth/signin"} className="text-blue-400">
            SignIn here{" "}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default FormRegister;
