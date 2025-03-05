/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  basePath: "",
  assetPrefix: "./",
  trailingSlash: true,
}

export default nextConfig
