/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "cloud.funda.nl",
        protocol: "https",
        port: "",
      },
      {
        hostname: "images.pexels.com",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default config;
