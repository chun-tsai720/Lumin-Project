/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 避免使用者目錄上層的其他 package-lock 讓 Turbopack 誤判專案根目錄。
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
