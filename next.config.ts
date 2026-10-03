import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Docker on Windows/macOS doesn't forward file events into bind mounts, so the
  // dev container (see docker-compose.yml) opts into polling for hot reload.
  ...(process.env.NEXT_WATCH_POLL_INTERVAL_MS && {
    watchOptions: { pollIntervalMs: Number(process.env.NEXT_WATCH_POLL_INTERVAL_MS) },
  }),
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Old single-page anchors → new routes, so existing shared links keep working.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/vivek_nilapalle_2026_DS.pdf", destination: "/resume/vivek-nilapalle-resume.pdf", permanent: true },
    ];
  },
};

export default nextConfig;
