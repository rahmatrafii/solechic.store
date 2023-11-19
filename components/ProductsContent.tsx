"use client";
import { ProductType } from "@/types";
import React, { useState } from "react";
import CardProduct from "./CardProduct";
import Filter from "./Filter";

const ProductsContent = ({ products }: { products: ProductType[] }) => {
  const [productsSelected, setProductsSelected] = useState(products);

  return (
    <div className="w-full">
      <div className="flex justify-end items-center gap-x-10 mb-10">
        <Filter />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2  min-[1100px]:grid-cols-3 gap-10  xl:gap-24 mb-20">
        {productsSelected?.map((product: ProductType) => (
          <CardProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsContent;
