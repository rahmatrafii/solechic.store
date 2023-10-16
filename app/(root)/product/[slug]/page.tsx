import DetailProductImage from "@/components/DetailProductImage";
import DetailProductInfo from "@/components/DetailProductInfo";
import Recommen from "@/components/Recommen";
import { client, getProduct, getProducts } from "@/sanity/sanity-utils";
import { ProductType } from "@/types";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product: ProductType = await getProduct(params.slug);

  return {
    title: product.name,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const query = `*[_type == 'product'] {
    slug {
      current
    }
  }`;
  const products = await client.fetch(query);
  return products.map((item: ProductType) => ({
    slug: item.slug.current,
  }));
}

const page = async ({ params }: { params: { slug: string } }) => {
  const product: ProductType = await getProduct(params.slug);
  const products = await getProducts();
  return (
    <section className="py-32 w-full ">
      <div className="w-full lg:flex lg:gap-5 mb-40">
        <div className="w-full lg:w-1/2 mb-10">
          <DetailProductImage images={product.image} />
        </div>
        <div className="w-full lg:w-1/2">
          <DetailProductInfo product={product} />
        </div>
      </div>
      <Recommen products={products} />
    </section>
  );
};

export default page;
