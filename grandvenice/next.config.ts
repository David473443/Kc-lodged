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
    ],
  },
};

export default nextConfig;
