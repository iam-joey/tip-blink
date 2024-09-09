/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["files.edgestore.dev", "raw.githubusercontent.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "connect-src 'self' https://api.dscvr.one https://api1.stg.dscvr.one https://*.helius-rpc.com https://*.solana.com/ https://*.helius-rpc.com https://files.edgestore.dev/*; script-src 'self' 'wasm-unsafe-eval' 'unsafe-inline' 'unsafe-eval'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
