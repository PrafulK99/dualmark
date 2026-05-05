/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  transpilePackages: ["@dualmark/core", "@dualmark/converters"],
};

export default nextConfig;
