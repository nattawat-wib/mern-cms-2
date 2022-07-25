/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["data.whicdn.com"]
    }
}

module.exports = nextConfig
