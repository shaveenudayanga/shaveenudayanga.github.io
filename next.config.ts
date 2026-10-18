import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The resume used to live at this path; old links should still work
      {
        source: "/Resume_Shaveen_Udayanga.pdf",
        destination: "/Shaveen_Udayanga_Resume.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
