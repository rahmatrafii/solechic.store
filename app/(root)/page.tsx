import React from "react";
import CardProduct from "@/components/CardProduct";
import Link from "next/link";
import Banner from "@/components/Banner";
import { getBanner, getProducts } from "@/sanity/sanity-utils";
import { ProductType } from "@/types";
export default async function Home() {
  const [products, banners] = await Promise.all([getProducts(), getBanner()]);

  return (
    <div className="w-full py-20">
      <section>
        <Banner banners={banners} />
        <h1 className="font-extrabold text-[20px] sm:text-[34px] md:text-[38px] lg:text-[45px] xl:text-[50px]  text-center">
          Step into Style with SoleChic.store – Where Fashion Meets Comfort.
        </h1>
      </section>
      <section className="py-20 w-full ">
        <div className="grid grid-cols-1 sm:grid-cols-2  min-[1100px]:grid-cols-3 gap-10  xl:gap-24 mb-20">
          {products.slice(0, 6).map((product: ProductType) => (
            <CardProduct key={product._id} product={product} />
          ))}
        </div>
        <Link
          href="/products"
          className="py-3 px-6 w-max bg-black text-white  rounded-sm mx-auto block"
        >
          see all shoes
        </Link>
      </section>
    </div>
  );
}
