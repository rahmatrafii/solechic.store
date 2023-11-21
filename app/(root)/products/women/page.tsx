import ProductsContent from "@/components/ProductsContent";
import {
  getProducts,
  getProductsFiltered,
  getProductsGroupFiltered,
} from "@/sanity/sanity-utils";
import React from "react";
export const metadata = {
  title: "Women Shoes",
};
const WomenPage = async ({ searchParams }: any) => {
  let products;
  console.log(searchParams);
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

export default WomenPage;
