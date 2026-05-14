import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { room } from "./schemas/room";
import { gallery } from "./schemas/gallery";
import { testimonial } from "./schemas/testimonial";
import { hotelInfo } from "./schemas/hotelInfo";

export default defineConfig({
  name: "default",
  title: "GrandVenice CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [room, gallery, testimonial, hotelInfo],
  },
});
