import { defineField, defineType } from "sanity";

export const hotelInfo = defineType({
  name: "hotelInfo",
  title: "Hotel Information",
  type: "document",
  fields: [
    defineField({ name: "heroHeadline", type: "string", title: "Hero Headline" }),
    defineField({ name: "heroSubtext", type: "string", title: "Hero Subtext" }),
    defineField({
      name: "heroVideo",
      type: "file",
      title: "Hero Video",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "heroVideoPoster",
      type: "image",
      title: "Hero Video Poster",
      options: { hotspot: true },
    }),
    defineField({ name: "aboutTitle", type: "string", title: "About Section Title" }),
    defineField({
      name: "aboutBody",
      type: "array",
      title: "About Body Text",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "aboutImage",
      type: "image",
      title: "About Section Image",
      options: { hotspot: true },
    }),
    defineField({
      name: "stats",
      type: "array",
      title: "Statistics",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            { name: "value", type: "string", title: "Value (e.g. 41)" },
            { name: "label", type: "string", title: "Label (e.g. Rooms & Suites)" },
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Hotel Information" };
    },
  },
});
