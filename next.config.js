/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/chat", destination: "/workspace", permanent: false },
      { source: "/admin/upload", destination: "/workspace", permanent: false },
    ];
  },
};

export default nextConfig;
