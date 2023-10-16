"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PiShoppingCartFill } from "react-icons/pi";
import { signIn, useSession } from "next-auth/react";
import ProfileIcon from "./ProfileIcon";
const Navbar = () => {
  const { data, status } = useSession();
  return (
    <nav className="fixed w-full left-0 top-0 px-5 py-3 lg:px-14 md:py-5 bg-white z-[50]">
      <div className="flex w-full items-center justify-between">
        <Link href={"/"} className="hidden md:block">
          <Image
            src="/static/icon/logo.svg"
            width={30}
            height={30}
            alt="Logo"
          />
        </Link>
        <Link href={"/"} className="text-base md:text-[25px] font-normal ">
          SoleChic.store
        </Link>
        <div className="flex gap-x-4 md:gap-x-8 items-center">
          <Link href="/cart" className="text-[25px]">
            <PiShoppingCartFill />
          </Link>
          {!data && status === "unauthenticated" ? (
            <button
              className=" rounded-full whitespace-nowrap text-xs py-0.5 px-1 border lg:border-[2px] md:px-3 md:py-1 md:text-lg border-black font-medium"
              onClick={() => signIn()}
            >
              sign in
            </button>
          ) : (
            <ProfileIcon />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
