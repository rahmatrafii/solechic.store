"use client";
import { ProductType } from "@/types";
import React, { useEffect, useState } from "react";
import CardProduct from "./CardProduct";

const ProductsContent = ({ products }: { products: ProductType[] }) => {
  const [selected, setSelected] = useState("all");
  const [productsSelected, setProductsSelected] = useState(products);
  useEffect(() => {
    if (selected !== "all") {
      const newProducts = products.filter((item) => {
        return item?.category?.includes(selected);
      });
      setProductsSelected(newProducts);
    } else {
      setProductsSelected(products);
    }
  }, [selected]);
  return (
    <div className="w-full">
      <div className="flex-center gap-x-10 mb-10">
        <button
          onClick={() => setSelected("all")}
          className={`${
            selected == "all" ? "border-black" : "border-white"
          }   border-b-[2px] py-2 px-3 transition-all duration-200`}
        >
          All
        </button>
        <button
          onClick={() => setSelected(`Men\'s`)}
          className={`${
            selected == `Men\'s` ? "border-black" : "border-white"
          } border-b-[2px]   py-2 px-3 transition-all duration-200`}
        >
          Men's
        </button>
        <button
          onClick={() => setSelected(`Women\'s`)}
          className={`${
            selected == `Women\'s` ? "border-black" : "border-white"
          }  border-b-[2px]  py-2 px-3 transition-all duration-200`}
        >
          Women's
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2  min-[1100px]:grid-cols-3 gap-10  xl:gap-24 mb-20">
        {productsSelected.map((product: ProductType) => (
          <CardProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsContent;
