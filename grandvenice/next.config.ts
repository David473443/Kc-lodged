import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "a.otcdn.com" },
      { protocol: "https", hostname: "www.grandvenicenigeria.com" },
      { protocol: "https", hostname: "i.travelapi.com" },
      { protocol: "https", hostname: "hotelcms-contents-live.almosafer.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" },
    ],
  },
};

export default nextConfig;
