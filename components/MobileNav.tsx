"use client";
import { navLink } from "@/public/constat";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

import { RxHamburgerMenu } from "react-icons/rx";

const MobileNav = () => {
  const [showMobileNav, setshowMobileNav] = useState(false);
  const pathName = usePathname();
  return (
    <div className="flex-center lg:hidden">
      <button onClick={() => setshowMobileNav(true)} className="text-2xl ">
        <RxHamburgerMenu />
      </button>
      <div
        className={`${
          showMobileNav ? "translate-x-[0%]" : "translate-x-[100%]"
        } transition-all duration-300 fixed right-0 top-0 h-screen bg-white w-[50%] p-5`}
      >
        <button
          className="text-3xl mb-8"
          onClick={() => setshowMobileNav(false)}
        >
          <IoClose />
        </button>
        <div className="flex flex-col items-start justify-start gap-5 ">
          {navLink.map((value) => {
            return (
              <Link
                key={value.title}
                href={value.src}
                className={`${
                  pathName.split("/")[2] == value.title
                    ? "border-b-2 border-black"
                    : "border-b-2 border-white"
                } p-2 capitalize`}
                onClick={() => setshowMobileNav(false)}
              >
                {value.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
