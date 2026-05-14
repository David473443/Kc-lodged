import { defineField, defineType } from "sanity";

export const gallery = defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
    }),
    defineField({ name: "altText", type: "string", title: "Alt Text" }),
    defineField({
      name: "category",
      type: "string",
      title: "Category",
      options: {
        list: [
          { title: "Rooms", value: "rooms" },
          { title: "Pool", value: "pool" },
          { title: "Dining", value: "dining" },
          { title: "Exterior", value: "exterior" },
          { title: "Amenities", value: "amenities" },
          { title: "Lobby", value: "lobby" },
        ],
      },
    }),
    defineField({ name: "sortOrder", type: "number", title: "Sort Order" }),
    defineField({
      name: "aiGenerated",
      type: "boolean",
      title: "AI Generated",
      initialValue: false,
    }),
  ],
  orderings: [
    { title: "Sort Order", name: "sortOrder", by: [{ field: "sortOrder", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
