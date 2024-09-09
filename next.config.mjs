/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["files.edgestore.dev", "raw.githubusercontent.com"],
  },
  output: "standalone",
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      Object.defineProperty(config, "devtool", {
        get() {
          return "cheap-source-map";
        },
        set() {},
      });
    }
    return config;
  },
  compiler: {
    removeConsole: false,
  },
};

export default nextConfig;
