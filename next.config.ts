import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/vinicius-romualdo-resume.pdf",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
          {
            key: "Content-Disposition",
            value: 'inline; filename="vinicius-romualdo-resume.pdf"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
