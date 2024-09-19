/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: false,
  env: {
    COIN_RATE_API_KEY: process.env.COIN_RATE_API_KEY,
  },
};

export default nextConfig;
// @ts-check
