import ProductsContent from "@/components/ProductsContent";
import { getProducts } from "@/sanity/sanity-utils";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "All Shoes",
};

const page = async () => {
  const products = await getProducts();
  return (
    <section className="py-20 lg:py-28 w-full ">
      <div className="w-full h-full">
        <ProductsContent products={products} />
      </div>
    </section>
  );
};

export default page;
