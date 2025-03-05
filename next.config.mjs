/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  assetPrefix: "",
  basePath: "",
  trailingSlash: true,
}

export default nextConfig
