import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "s.alicdn.com" },
      { protocol: "https", hostname: "img.alicdn.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "restcountries.com" },
      { protocol: "https", hostname: "cdn.dummyjson.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "www.svgrepo.com", pathname: "/show/**" },
      { protocol: "https", hostname: "media.istockphoto.com" }, // thêm iStock
    ],
  },
};

export default nextConfig;
