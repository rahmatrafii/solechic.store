import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { ImageType } from "@/types";

export const client = createClient({
  projectId: "x0ke15e2",
  apiVersion: "2023-10-07",
  dataset: "production",
});

export async function getProducts() {
  return client.fetch(`*[_type == "product"]`, { cache: "no-store" });
}
const builder = imageUrlBuilder(client);

export const urlFor = (source: ImageType) => {
  if (!source) return undefined;
  return builder.image(source) as unknown as string | undefined;
};

export async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  return client.fetch(query);
}

export async function getBanner() {
  return await client.fetch('*[_type == "banner"]');
}
