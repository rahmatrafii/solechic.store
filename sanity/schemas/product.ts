const product = {
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90,
      },
    },
    {
      name: "category",
      title: "Category",
      type: "string",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "rate",
      title: "Rate",
      type: "number",
    },
    {
      name: "colour",
      title: "Colour-Shown",
      type: "string",
    },
    {
      name: "origin",
      title: "Region-of-Origin",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
  ],
};

export default product;
