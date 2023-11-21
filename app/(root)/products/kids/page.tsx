import ProductsContent from "@/components/ProductsContent";
import {
  getProducts,
  getProductsFiltered,
  getProductsGroupFiltered,
} from "@/sanity/sanity-utils";
import React from "react";

export const metadata = {
  title: "Kids Shoes",
};

const KidsPage = async ({ searchParams }: any) => {
  let products;
  if (!searchParams.filters || searchParams.filters == "") {
    products = await getProducts("kids");
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

export default KidsPage;
