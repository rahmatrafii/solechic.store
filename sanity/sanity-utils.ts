import imageUrlBuilder from "@sanity/image-url";
import { ImageType } from "@/types";
import { createClient } from "next-sanity";
export const client = createClient({
  projectId: "x0ke15e2",
  apiVersion: "2023-10-07",
  dataset: "production",
});

export async function getProducts(type: string = "all") {
  try {
    let query2 = `*[_type == "product" ${
      type == "women"
        ? `&& category match "women*"`
        : type == "men"
        ? `&& category match "men*"`
        : type == "kids"
        ? `&& category match "kids*"`
        : ""
    } ]`;

    return client.fetch(query2 as string);
  } catch (error) {
    console.log(error);
  }
}

export async function getProductsGroupFiltered(query: string) {
  try {
    const query2 = `*[${query}]`;
    const res = await client.fetch(query2);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductsFiltered(query: string) {
  try {
    const query2 = `*[_type == "product" && ${query}]`;
    const res = await client.fetch(query2);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getProduct(slug: string) {
  try {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    return client.fetch(query);
  } catch (error) {
    console.log(error);
  }
}

const builder = imageUrlBuilder(client);

export const urlFor = (source: ImageType) => {
  if (!source) return undefined;
  return builder.image(source) as unknown as string | undefined;
};

export async function getBanner() {
  return await client.fetch('*[_type == "banner"]');
}
