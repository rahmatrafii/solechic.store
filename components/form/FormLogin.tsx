"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { loginSchema } from "@/lib/validations/form";
import Image from "next/image";
import Alert from "../Alert";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import Link from "next/link";

const FormLogin = ({ fromRegister }: { fromRegister: boolean }) => {
  const [passwordShow, setPaswordShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useSearchParams();
  const [showAlert, setShowAlert] = useState({
    error: false,
    success: fromRegister,
  });
  type FormData = z.infer<typeof loginSchema>;
  const callbackUrl = params.get("callbackUrl") || "/";
  const { push } = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        ...data,
      });

      if (res?.ok) {
        push("/");
      } else {
        setShowAlert((prev) => ({ ...prev, error: true }));
      }
    } catch (error) {
      setShowAlert((prev) => ({ ...prev, error: true }));
    } finally {
      setIsLoading(false);
    }
  };
  setTimeout(() => {
    setShowAlert((prev) => ({ ...prev, error: false, success: false }));
  }, 6000);
  return (
    <div className="mb-2 ">
      <Alert
        isShow={showAlert.error}
        type={"error"}
        message="Email or Password Incoret"
      />
      <Alert
        isShow={showAlert.success}
        type={"success"}
        message="Register Succes Please Login"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
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
            <p className="text-red-600 text-sm absolute bottom-[-20px]">
              {errors?.email?.message}
            </p>
          )}
        </div>
        <div className="flex flex-wrap relative mb-7">
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
              errors?.password ? "border-red-600" : "border-black"
            } w-full p-2 rounded-md outline-none border-[2px]  text-lg`}
          />
          <div
            className="text-[20px] cursor-pointer absolute  bottom-[15px] right-[10px] "
            onClick={() => setPaswordShow(!passwordShow)}
          >
            {passwordShow ? <BsEyeFill /> : <BsEyeSlashFill />}
          </div>
          {errors?.password && (
            <p className="text-red-600 text-sm absolute bottom-[-20px]">
              {errors?.password?.message}
            </p>
          )}
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-black rounded-md text-white py-3 mt-2 mb-3"
        >
          Sign In
        </button>
        <p className="text-xs md:text-base">
          don't have an account?{" "}
          <Link href={"/auth/signup"} className="text-blue-400">
            SignUp here{" "}
          </Link>
        </p>
      </form>

      <div>
        <div className="border-t-[2px] relative mb-5">
          <p className="absolute top-[-15px] px-2 bg-white left-1/2 -translate-x-1/2">
            or
          </p>
        </div>
        <button
          onClick={() =>
            signIn("google", {
              callbackUrl,
              redirect: false,
            })
          }
          className="w-full py-3  shadow-xl rounded-md border-[2px] border-black border-opacity-50 flex-center gap-x-3"
        >
          <Image
            src={"/static/icon/google.svg"}
            alt="google"
            width={40}
            height={40}
            className="w-[40px] h-[40px] object-contain"
          />
          <p>Signin with Google</p>
        </button>
      </div>
    </div>
  );
};

export default FormLogin;
