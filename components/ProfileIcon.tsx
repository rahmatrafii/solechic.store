"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
const ProfileIcon = () => {
  const session: any = useSession();
  const name = session.data?.user?.username;
  const image = session.data?.user?.image;
  return (
    <div className="relative group">
      <div className="flex-center gap-x-3 cursor-pointer ">
        <p
          className={`text-xs md:text-base ${
            image ? "hidden md:block" : "block"
          }`}
        >
          {" "}
          {name.length > 12 ? `${name.slice(0, 12)}...` : name}
        </p>
        {image && (
          <Image
            width={20}
            height={20}
            alt={name}
            src={`${image}`}
            className="w-[30px] h-[30px] object-cover rounded-full "
          />
        )}
      </div>
      <div
        className={`absolute py-2 px-1 rounded-sm w-[150px] translate-y-5 opacity-0 invisible transition-all duration-200 text-sm lg:text-base whitespace-nowrap -right-3  border top-full shadow-xl bg-white flex flex-col justify-start items-start  group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible`}
      >
        <h5 className="py-1 px-3 text-base lg:text-xl font-medium border-b w-full  mb-2">
          Account
        </h5>
        <Link
          href="/"
          className="py-1 px-3 hover:bg-slate-100 w-full text-start mb-2"
        >
          Profile
        </Link>
        <button
          onClick={() => signOut()}
          className="py-1 px-3  hover:bg-slate-100 w-full text-start mb-2"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfileIcon;
