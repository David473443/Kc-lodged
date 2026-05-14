import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({ name: "guestName", type: "string", title: "Guest Name" }),
    defineField({ name: "guestLocation", type: "string", title: "Guest Location" }),
    defineField({
      name: "rating",
      type: "number",
      title: "Rating (1-5)",
      validation: (r) => r.min(1).max(5),
    }),
    defineField({ name: "comment", type: "text", title: "Review Comment", rows: 4 }),
    defineField({ name: "date", type: "date", title: "Date of Stay" }),
    defineField({
      name: "platform",
      type: "string",
      title: "Review Platform",
      options: {
        list: ["Google", "TripAdvisor", "Booking.com", "Kayak", "Direct"],
      },
    }),
  ],
  preview: {
    select: { title: "guestName", subtitle: "rating" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `${"★".repeat(subtitle)}` : "" };
    },
  },
});
