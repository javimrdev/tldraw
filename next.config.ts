import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Evita el caché en la página principal
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
