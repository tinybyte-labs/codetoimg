/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => [
    {
      source: "/editor",
      destination: "/",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
