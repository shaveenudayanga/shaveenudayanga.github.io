import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The resume has lived at both of these paths; old links should still work
      {
        source: "/Resume_Shaveen_Udayanga.pdf",
        destination: "/shaveen-udayanga-resume.pdf",
        permanent: true,
      },
      {
        source: "/Shaveen_Udayanga_Resume.pdf",
        destination: "/shaveen-udayanga-resume.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
