import { defineField, defineType } from "sanity";

export const room = defineType({
  name: "room",
  title: "Rooms & Suites",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Room Name",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      type: "string",
      title: "Room Type",
      options: {
        list: [
          { title: "Standard City View", value: "standard-city" },
          { title: "Standard Twin", value: "standard-twin" },
          { title: "Executive Single", value: "executive-single" },
          { title: "Double Suite with Balcony", value: "double-suite-balcony" },
          { title: "Double Suite", value: "double-suite" },
        ],
      },
    }),
    defineField({
      name: "shortDescription",
      type: "text",
      title: "Short Description",
      rows: 3,
    }),
    defineField({
      name: "description",
      type: "array",
      title: "Full Description",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "pricePerNight",
      type: "number",
      title: "Price Per Night (NGN)",
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: "maxGuests",
      type: "number",
      title: "Max Guests",
      validation: (r) => r.required().min(1).max(6),
    }),
    defineField({
      name: "squareMeters",
      type: "number",
      title: "Size (sqm)",
    }),
    defineField({
      name: "bedType",
      type: "string",
      title: "Bed Type",
    }),
    defineField({
      name: "view",
      type: "string",
      title: "Room View",
    }),
    defineField({
      name: "images",
      type: "array",
      title: "Room Images",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "amenities",
      type: "array",
      title: "Room Amenities",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured Room",
      initialValue: false,
    }),
    defineField({
      name: "available",
      type: "boolean",
      title: "Available for Booking",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Price, Low to High",
      name: "priceAsc",
      by: [{ field: "pricePerNight", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "pricePerNight",
      media: "images.0",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `₦${subtitle.toLocaleString()}/night` : "",
        media,
      };
    },
  },
});
