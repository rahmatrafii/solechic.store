import ProductsContent from "@/components/ProductsContent";
import {
  getProducts,
  getProductsFiltered,
  getProductsGroupFiltered,
} from "@/sanity/sanity-utils";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "All Shoes",
};

const AllPage = async ({ searchParams }: any) => {
  console.log(searchParams.filters);
  console.log(searchParams.type);
  let products;
  if (!searchParams.filters || searchParams.filters == "") {
    products = await getProducts("all");
  } else {
    if (searchParams.type) {
      products = await getProductsGroupFiltered(searchParams.filters);
    } else {
      products = await getProductsFiltered(searchParams.filters);
    }
  }

  return (
    <section className="py-20 lg:py-28 w-full ">
      <div className="w-full h-full">
        <ProductsContent products={products} />
      </div>
    </section>
  );
};

export default AllPage;
