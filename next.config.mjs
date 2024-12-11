/** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "*",
//       },
//     ],
//   },
// };

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "*",
      },
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "https",
        hostname:"web.archive.org"
      },
      {
        protocol: "https",
        hostname:"pbs.twimg.com"
      },
      {
        protocol: "https",
        hostname:"assets.coingecko.com"
      },
      {
        protocol: "https",
        hostname: "indexer.nearcatalog.xyz",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // You can specify a specific origin instead of "*"
          },
        ],
      },
    ];
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode:false,

};
export default nextConfig;
