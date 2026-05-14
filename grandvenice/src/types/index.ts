export interface SanityImage {
  asset: { url: string };
  lqip?: string;
}

export interface Room {
  _id: string;
  name: string;
  slug: { current: string };
  type: string;
  shortDescription: string;
  description?: unknown[];
  pricePerNight: number;
  maxGuests: number;
  squareMeters: number;
  bedType: string;
  view: string;
  amenities: string[];
  featured: boolean;
  available: boolean;
  images: SanityImage[];
}

export interface GalleryItem {
  _id: string;
  title: string;
  altText: string;
  category: "rooms" | "pool" | "dining" | "exterior" | "amenities" | "lobby";
  imageUrl: string;
  lqip?: string;
  aiGenerated?: boolean;
}

export interface Testimonial {
  _id: string;
  guestName: string;
  guestLocation: string;
  rating: number;
  comment: string;
  date: string;
  platform: string;
}

export interface HotelStat {
  value: string;
  label: string;
}

export interface HotelInfo {
  heroHeadline: string;
  heroSubtext: string;
  heroVideoUrl?: string;
  aboutTitle: string;
  aboutBody?: unknown[];
  aboutImageUrl?: string;
  stats: HotelStat[];
}

export interface BookingFormData {
  roomId: string;
  roomName: string;
  roomType: string;
  pricePerNight: number;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
}

export interface PaystackInitResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface BookingConfirmation {
  id: string;
  reference: string;
  roomName: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalAmountNGN: number;
  status: string;
  paymentStatus: string;
}
