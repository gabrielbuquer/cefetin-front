/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
    styledJsx: true,
  },
  env: {
    BASE_SERVER: process.env.BASE_SERVER,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://52.201.22.245:8080/:path*`,
      },
    ];
  },
};

export default nextConfig;
