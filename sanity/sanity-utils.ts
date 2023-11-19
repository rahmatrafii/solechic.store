import imageUrlBuilder from "@sanity/image-url";
import { FilterGroup, FilterItem, ImageType } from "@/types";

import { Patch, createClient } from "next-sanity";
import {
  ganerateCountryOfOriginFilter,
  ganerateNameFilter,
  ganeratePriceFilter,
  ganerateRatingFilter,
} from "@/utils/filterAction";

export const client = createClient({
  projectId: "x0ke15e2",
  apiVersion: "2023-10-07",
  dataset: "production",
});

export async function getProducts(type: string = "all") {
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
}

export async function getProductsGroupFiltered(query: string) {
  // let group: any[] = [];
  // data.map((item) => {
  //   let string = "";
  //   if (!item[0]) return false;
  //   item.map((value: any) => {
  //     if (value.type == "name" && value.value) {
  //       const res = ganerateNameFilter(
  //         value as { type: string; param: string; value: string }
  //       );

  //       string += ` && ${res}`;
  //     } else if (value.type == "price" && (value.from || value.to)) {
  //       const res = ganeratePriceFilter(
  //         value as { type: string; from: string; to: string }
  //       );

  //       string += ` && ${res}`;
  //     } else if (value.type == "rating" && value.value) {
  //       const res = ganerateRatingFilter(
  //         value as { type: string; param: string; value: string }
  //       );

  //       string += ` && ${res}`;
  //     } else if (value.type == "country of origin" && value.value) {
  //       const res = ganerateCountryOfOriginFilter(
  //         value as { type: string; param: string; value: string }
  //       );

  //       string += ` && ${res}`;
  //     }
  //   });
  //   group.push(
  //     `(_type == "product" ${
  //       path !== "all" ? `&& category match "${path}*"` : ""
  //     } ${string})`
  //   );
  // });
  const query2 = `*[${query}]`;
  console.log(query2);
  const res = await client.fetch(query2);

  console.log(res);
  return res;
}

export async function getProductsFiltered(query: string) {
  // let string = "";
  // data.map((value) => {
  //   if (value.type == "name" && value.value) {
  //     const res = ganerateNameFilter(
  //       value as { type: string; param: string; value: string }
  //     );

  //     string += ` && ${res}`;
  //   } else if (value.type == "price" && (value.from || value.to)) {
  //     const res = ganeratePriceFilter(
  //       value as { type: string; from: string; to: string }
  //     );

  //     string += ` && ${res}`;
  //   } else if (value.type == "rating" && value.value) {
  //     const res = ganerateRatingFilter(
  //       value as { type: string; param: string; value: string }
  //     );

  //     string += ` && ${res}`;
  //   } else if (value.type == "country of origin" && value.value) {
  //     const res = ganerateCountryOfOriginFilter(
  //       value as { type: string; param: string; value: string }
  //     );

  //     string += ` && ${res}`;
  //   }
  // });

  // const newQuery = `*[_type == "product" ${
  //   path !== "all" ? `&& category match "${path}*"` : ""
  // } ${query}]`;

  // console.log(newQuery);

  const query2 = `*[_type == "product" && ${query}]`;

  const res = await client.fetch(query2);

  console.log(res);

  return res;
}

export async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  return client.fetch(query);
}

const builder = imageUrlBuilder(client);

export const urlFor = (source: ImageType) => {
  if (!source) return undefined;
  return builder.image(source) as unknown as string | undefined;
};

export async function getBanner() {
  return await client.fetch('*[_type == "banner"]');
}

// export async function getProducts() {
//   const query = `*[(_type == "product" && price >= 10000 && price <= 250000 && !(name match 'apel')) || (_type == "product" && price > 1000000 && rating < 4 && country_of_origin == 'indonesia']`;
//   return client.fetch(query);
// }

// export async function getProducts() {
//   return client.fetch(
//     `*[_type == "product" && price >= 10000 && price <= 250000 && !(name match 'apel')]`
//   );
// }

// export async function getProducts() {
//   return client.fetch(`*[_type == "product" && name match "*nike*"]`, {
//     cache: "no-store",
//   });
// }

// { type: 'price', from: '90', to: '120' },

// "price >= 90 && price <= 120"
