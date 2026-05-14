export const ROOMS_QUERY = `*[_type == "room" && available == true] | order(pricePerNight asc) {
  _id,
  name,
  slug,
  type,
  shortDescription,
  pricePerNight,
  maxGuests,
  squareMeters,
  bedType,
  view,
  amenities,
  featured,
  "images": images[]{
    "asset": asset->{url},
    "lqip": asset->metadata.lqip,
    alt
  }
}`;

export const ROOM_BY_SLUG_QUERY = `*[_type == "room" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  type,
  shortDescription,
  description,
  pricePerNight,
  maxGuests,
  squareMeters,
  bedType,
  view,
  amenities,
  featured,
  "images": images[]{
    "asset": asset->{url},
    "lqip": asset->metadata.lqip,
    alt
  }
}`;

export const GALLERY_QUERY = `*[_type == "gallery"] | order(sortOrder asc) {
  _id,
  title,
  altText,
  category,
  aiGenerated,
  "imageUrl": image.asset->url,
  "lqip": image.asset->metadata.lqip
}`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(date desc) {
  _id,
  guestName,
  guestLocation,
  rating,
  comment,
  date,
  platform
}`;

export const HOTEL_INFO_QUERY = `*[_type == "hotelInfo"][0] {
  heroHeadline,
  heroSubtext,
  aboutTitle,
  aboutBody,
  stats,
  "heroVideoUrl": heroVideo.asset->url,
  "aboutImageUrl": aboutImage.asset->url
}`;

export const ALL_ROOM_SLUGS_QUERY = `*[_type == "room" && available == true] {
  "slug": slug.current
}`;
