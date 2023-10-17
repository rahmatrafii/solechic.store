"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PiShoppingCartFill } from "react-icons/pi";
import { signIn, useSession } from "next-auth/react";
import ProfileIcon from "./ProfileIcon";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import firestore from "@/lib/firebase/init";

const Navbar = () => {
  const { data, status } = useSession();
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (data?.user && status === "authenticated") {
      const q = query(
        collection(firestore, "cart"),
        where("user_email", "==", data?.user?.email)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let newItems: any = [];
        querySnapshot.forEach((doc) => {
          newItems.push({ ...doc.data(), id: doc.id });
        });
        setItems(newItems);

        const qty = newItems.reduce((acc: number, item: any) => {
          return acc + item.quantity;
        }, 0);
        setQuantity(qty);
        return () => unsubscribe();
      });
    }
  }, []);

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
          <Link href="/cart" className="text-[25px] relative">
            <PiShoppingCartFill />
            {quantity > 0 ? (
              <p className=" absolute top-[-5px] right-[-5px] w-[18px] h-[18px] flex-center shadow-md text-xs rounded-full bg-white text-black ">
                {quantity}
              </p>
            ) : null}
          </Link>
          {!data && status === "unauthenticated" ? (
            <button
              className=" rounded-full whitespace-nowrap text-xs py-1 px-2 border lg:border-[2px] md:px-3 md:py-1 md:text-lg border-black font-medium"
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
