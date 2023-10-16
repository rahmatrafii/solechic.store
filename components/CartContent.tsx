"use client";

import CardCart from "@/components/CardCart";
import Summary from "@/components/Summary";
import { CartProducType } from "@/types";
import { useEffect, useState } from "react";
import CardCartLoading from "./loading/CardCartLoading";
import Link from "next/link";

const CartContent = () => {
  const [products, setProducts] = useState<CartProducType[]>([]);
  const [isEmpety, setIsEmpety] = useState("wait");
  async function getProducts() {
    const products = await fetch(`/api/products/`);
    const data = await products?.json();
    if (data.res.length > 0) {
      setProducts(data.res);
      setIsEmpety("false");
    } else {
      setIsEmpety("true");
    }
  }
  useEffect(() => {
    getProducts();
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
