"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

import { runFireworks } from "@/utils/confetti";
const page = ({ params }: { params: { code: string } }) => {
  const { data: session } = useSession();

  async function clearCart() {
    try {
      await fetch("/api/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session?.user?.email }),
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    runFireworks();
    clearCart();
  }, []);

  return (
    <div className="bg-white h-screen flex-center">
      <div className="flex-center flex-col">
        <Image
          src="/static/image/package.svg"
          width={100}
          height={100}
          alt="Package"
          className="w-[200px] md:w-[300px] h-auto "
        />
        <h2 className="text-xl md:text-2xl mb-3 font-semibold">
          Thank you for your order!
        </h2>

        <div className="text-sm md:text-base flex-center flex-col mb-3">
          <p>If you have any questions, please email</p>

          <a className="block mx-auto" href="mailto:solechic.store@gmail.com">
            solechic.store@gmail.com
          </a>
        </div>
        <Link
          href="/"
          className="block py-2 px-4 text-white bg-black rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default page;
