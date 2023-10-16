"use client";
import { urlFor } from "@/sanity/sanity-utils";
import { ProductType } from "@/types";
import { GenerateRateing } from "@/utils/generateRating";
import Link from "next/link";
import React from "react";

const CardProduct = ({ product }: { product: ProductType }) => {
  return (
    <div className=" hover:rounded-2xl transition-all duration-300">
      <Link href={`/product/${product.slug.current}`}>
        <img
          src={urlFor(product?.image[0])}
          className="w-full h-[350px] object-cover"
        />
      </Link>
      <div className="p-5">
        <Link
          href={`/product/${product.slug.current}`}
          className="text-[20px] md:text-[25px] mb-1 font-semibold"
        >
          {product?.name}
        </Link>
        <p className="text-[20px] mb-2">$ {product?.price}</p>
        <div className="flex gap-5">{GenerateRateing(product.rate)}</div>
      </div>
    </div>
  );
};

export default CardProduct;
