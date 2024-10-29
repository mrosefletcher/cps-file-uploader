/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/localhost:3000',
            destination: 'https://cps-web-server-target.s3.us-west-2.amazonaws.com/*',
          },
        ]
      },
  };

export default nextConfig;
