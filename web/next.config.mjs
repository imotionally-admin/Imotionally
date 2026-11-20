/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    agentUpgrade: "security",
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
  remotePatterns: [
    { protocol: "https", hostname: "picsum.photos" },
    { protocol: "https", hostname: "fastly.picsum.photos" },
  ],
},
};



export default nextConfig;
