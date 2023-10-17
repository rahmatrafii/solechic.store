"use client";

import CardCart from "@/components/CardCart";
import Summary from "@/components/Summary";
import { CartProducType } from "@/types";
import { useEffect, useState } from "react";
import CardCartLoading from "./loading/CardCartLoading";
import Link from "next/link";
import { collection, onSnapshot, query } from "firebase/firestore";
import firestore from "@/lib/firebase/init";
const CartContent = () => {
  const [products, setProducts] = useState<CartProducType[]>([]);
  const [isEmpety, setIsEmpety] = useState("wait");

  useEffect(() => {
    setIsEmpety("wait");
    const q = query(collection(firestore, "cart"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let newItems: any = [];
      querySnapshot.forEach((doc) => {
        newItems.push({ ...doc.data(), id: doc.id });
      });

      if (newItems.length > 0) {
        setProducts(newItems);
        setIsEmpety("false");
      } else {
        setProducts([]);
        setIsEmpety("true");
      }
      return () => unsubscribe();
    });
  }, []);
  return (
    <div className="lg:flex gap-10  py-4">
      <div className="flex flex-col w-full lg:w-[63%]">
        {isEmpety == "false" ? (
          products?.map((product: any) => (
            <CardCart key={product._id} product={product} />
          ))
        ) : isEmpety == "true" ? (
          <div className="text-center my-9">
            <p className="mb-3 text-sm md:text-base">
              Oopss your trolley is empty, let's go shopping now
            </p>
            <Link
              href="/products"
              className="px-3 py-2 text-white shadow-sm bg-black rounded-md"
            >
              Shop Now
            </Link>
          </div>
        ) : isEmpety == "wait" ? (
          <CardCartLoading />
        ) : null}
      </div>
      <div className=" w-full lg:flex-1">
        <Summary products={products} />
      </div>
    </div>
  );
};

export default CartContent;
