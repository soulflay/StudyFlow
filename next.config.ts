// import { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "firebasestorage.googleapis.com",
//         pathname: "/v0/b/**",
//       },
//     ],
//   },
// };

// export default nextConfig;

/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        pathname: "/**", // Allow all DALL·E images
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**", // Allow Firebase images
      },
    ],
  },
};


export default nextConfig;



// /**
//  * @type {import('next').NextConfig}
//  */
// const nextConfig = {
//   images: {
//           domains: ['firebasestorage.googleapis.com']
//   }
//   } 
// module.exports = nextConfig