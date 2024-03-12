/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "cdn.discordapp.com"
         },
         {
            protocol: "https",
            hostname: "static.cdninstagram.com"
         }

      ]
   }
};

export default nextConfig;
