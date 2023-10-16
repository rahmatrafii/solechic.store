import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import product from "./sanity/schemas/product";
const config = defineConfig({
  title: "e-comerce",
  apiVersion: "2023-10-7",
  projectId: "x0ke15e2",
  dataset: "production",
  basePath: "/admin",
  plugins: [deskTool()],
  schema: { types: [product] },
});
export default config;
